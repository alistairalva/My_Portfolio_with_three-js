import type { APIRoute } from "astro";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS_PER_WINDOW = 8;
const MAX_BODY_CHARS = 25_000;

const ipRequestLog = new Map<string, number[]>();

const GOOGLE_APPS_SCRIPT_URL_REGEX =
  /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec(?:\?.*)?$/i;

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

const json = (status: number, payload: Record<string, JsonValue>) => {
  return new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
    },
  });
};

const getClientIp = (request: Request): string => {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp.trim();
  }

  return "unknown";
};

const normalizeOrigin = (value: string | null | undefined): string => {
  return String(value || "")
    .trim()
    .replace(/\/$/, "")
    .toLowerCase();
};

const getAllowedOrigins = (request: Request): Set<string> => {
  const configuredOrigins = String(
    import.meta.env.AUDIT_ALLOWED_ORIGINS ||
      process.env.AUDIT_ALLOWED_ORIGINS ||
      "",
  )
    .split(",")
    .map((entry) => normalizeOrigin(entry))
    .filter(Boolean);

  const forwardedProto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host");

  if (forwardedProto && host) {
    configuredOrigins.push(normalizeOrigin(`${forwardedProto}://${host}`));
  }

  return new Set(configuredOrigins);
};

const isRateLimited = (ip: string, nowMs: number): boolean => {
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
};

const parseBody = async (
  request: Request,
): Promise<Record<string, JsonValue>> => {
  const bodyText = await request.text();

  if (bodyText.length > MAX_BODY_CHARS) {
    throw new Error("Request body too large");
  }

  return JSON.parse(bodyText || "{}") as Record<string, JsonValue>;
};

const parseJsonSafely = async (
  response: Response,
): Promise<Record<string, JsonValue>> => {
  const responseText = await response.text();

  if (!responseText) {
    return {};
  }

  try {
    return JSON.parse(responseText) as Record<string, JsonValue>;
  } catch {
    return { message: responseText };
  }
};

export const POST: APIRoute = async ({ request }) => {
  const origin = normalizeOrigin(request.headers.get("origin"));

  if (origin) {
    const allowedOrigins = getAllowedOrigins(request);

    if (allowedOrigins.size > 0 && !allowedOrigins.has(origin)) {
      return json(403, {
        success: false,
        message: "Invalid request origin",
      });
    }
  }

  const clientIp = getClientIp(request);
  if (isRateLimited(clientIp, Date.now())) {
    return json(429, {
      success: false,
      message: "Too many requests. Please wait before trying again.",
    });
  }

  const upstreamUrl =
    import.meta.env.AUDIT_APPS_SCRIPT_URL || process.env.AUDIT_APPS_SCRIPT_URL;

  if (!upstreamUrl || !GOOGLE_APPS_SCRIPT_URL_REGEX.test(upstreamUrl)) {
    return json(500, {
      success: false,
      message: "Audit backend is not configured.",
    });
  }

  let payload: Record<string, JsonValue>;
  try {
    payload = await parseBody(request);
  } catch {
    return json(400, {
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

    if (!upstreamResponse.ok || upstreamResult.success === false) {
      const message =
        typeof upstreamResult.message === "string"
          ? upstreamResult.message
          : "Submission was rejected by the audit backend.";

      return json(400, { success: false, message });
    }

    return json(200, {
      success: true,
      message: "Saved",
    });
  } catch {
    return json(502, {
      success: false,
      message: "Unable to reach audit backend.",
    });
  }
};

export const ALL: APIRoute = async () => {
  return json(405, {
    success: false,
    message: "Method not allowed",
  });
};
