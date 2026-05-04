const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MAX_BODY_CHARS = 25_000;

const ipRequestLog = new Map();

const GOOGLE_APPS_SCRIPT_URL_REGEX =
  /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/i;

function json(res, statusCode, payload) {
  res.status(statusCode);
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.setHeader("Cache-Control", "no-store");
  res.send(JSON.stringify(payload));
}

function getClientIp(req) {
  const forwardedFor = req.headers["x-forwarded-for"];
  if (typeof forwardedFor === "string") {
    return forwardedFor.split(",")[0].trim();
  }

  if (Array.isArray(forwardedFor) && forwardedFor.length > 0) {
    return String(forwardedFor[0]).split(",")[0].trim();
  }

  const realIp = req.headers["x-real-ip"];
  if (typeof realIp === "string") {
    return realIp.trim();
  }

  return "unknown";
}

function normalizeOrigin(value) {
  return String(value || "")
    .trim()
    .replace(/\/$/, "")
    .toLowerCase();
}

function getAllowedOrigins(req) {
  const configuredOrigins = String(process.env.AUDIT_ALLOWED_ORIGINS || "")
    .split(",")
    .map((entry) => normalizeOrigin(entry))
    .filter(Boolean);

  const forwardedProto = req.headers["x-forwarded-proto"];
  const host = req.headers.host;
  if (forwardedProto && host) {
    configuredOrigins.push(
      normalizeOrigin(`${String(forwardedProto)}://${String(host)}`),
    );
  }

  return new Set(configuredOrigins);
}

function isRateLimited(ip, nowMs) {
  const existing = ipRequestLog.get(ip) || [];
  const recent = existing.filter(
    (timestampMs) => nowMs - timestampMs < RATE_LIMIT_WINDOW_MS,
  );

  recent.push(nowMs);
  ipRequestLog.set(ip, recent);

  for (const [key, timestamps] of ipRequestLog.entries()) {
    const active = timestamps.filter(
      (timestampMs) => nowMs - timestampMs < RATE_LIMIT_WINDOW_MS,
    );
    if (active.length === 0) {
      ipRequestLog.delete(key);
    } else {
      ipRequestLog.set(key, active);
    }
  }

  return recent.length > MAX_REQUESTS_PER_WINDOW;
}

function parseBody(req) {
  if (typeof req.body === "string") {
    if (req.body.length > MAX_BODY_CHARS) {
      throw new Error("Request body too large");
    }

    return JSON.parse(req.body || "{}");
  }

  if (Buffer.isBuffer(req.body)) {
    const text = req.body.toString("utf-8");
    if (text.length > MAX_BODY_CHARS) {
      throw new Error("Request body too large");
    }

    return JSON.parse(text || "{}");
  }

  if (req.body && typeof req.body === "object") {
    return req.body;
  }

  return {};
}

async function parseJsonSafely(response) {
  const responseText = await response.text();
  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText);
  } catch {
    return { message: responseText };
  }
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return json(res, 405, { success: false, message: "Method not allowed" });
  }

  const origin = normalizeOrigin(req.headers.origin);
  if (origin) {
    const allowedOrigins = getAllowedOrigins(req);
    if (allowedOrigins.size > 0 && !allowedOrigins.has(origin)) {
      return json(res, 403, {
        success: false,
        message: "Invalid request origin",
      });
    }
  }

  const clientIp = getClientIp(req);
  if (isRateLimited(clientIp, Date.now())) {
    return json(res, 429, {
      success: false,
      message: "Too many requests. Please wait before trying again.",
    });
  }

  const upstreamUrl = process.env.AUDIT_APPS_SCRIPT_URL;
  if (!upstreamUrl || !GOOGLE_APPS_SCRIPT_URL_REGEX.test(upstreamUrl)) {
    return json(res, 500, {
      success: false,
      message: "Audit backend is not configured.",
    });
  }

  let payload;
  try {
    payload = parseBody(req);
  } catch {
    return json(res, 400, {
      success: false,
      message: "Invalid JSON payload.",
    });
  }

  try {
    const upstreamResponse = await fetch(upstreamUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const upstreamResult = await parseJsonSafely(upstreamResponse);

    if (!upstreamResponse.ok || upstreamResult?.success === false) {
      const message =
        typeof upstreamResult?.message === "string"
          ? upstreamResult.message
          : "Submission was rejected by the audit backend.";
      return json(res, 400, { success: false, message });
    }

    return json(res, 200, { success: true, message: "Saved" });
  } catch {
    return json(res, 502, {
      success: false,
      message: "Unable to reach audit backend.",
    });
  }
}
