const SPREADSHEET_ID = "REPLACE_WITH_YOUR_SPREADSHEET_ID";
const SHEET_NAME = "AuditRequests";
const EXPECTED_SOURCE = "portfolio-seo-audit";
const MIN_CLIENT_COMPLETION_MS = 3000;
const DUPLICATE_WINDOW_SECONDS = 600;

const REQUIRED_FIELDS = [
  "fullName",
  "businessEmail",
  "companyName",
  "websiteUrl",
  "industry",
  "primaryGoals",
  "monthlyTrafficEstimate",
  "targetAudience",
  "topCompetitors",
  "mainChallenges",
  "timelineUrgency",
  "preferredContactMethod",
];

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const URL_REGEX = /^https?:\/\/.+/i;

function doPost(e) {
  try {
    const payload = parsePayload(e);

    const antiSpamMessage = getAntiSpamMessage(payload);
    if (antiSpamMessage) {
      return jsonResponse({ success: false, message: antiSpamMessage });
    }

    const validationMessage = getValidationMessage(payload);
    if (validationMessage) {
      return jsonResponse({ success: false, message: validationMessage });
    }

    const throttleKey = getThrottleKey(payload);
    if (isDuplicateSubmission(throttleKey)) {
      return jsonResponse({
        success: false,
        message: "Please wait a few minutes before submitting another request.",
      });
    }
    rememberSubmission(throttleKey);

    const sheet = getOrCreateSheet();
    ensureHeaderRow(sheet);

    sheet.appendRow([
      new Date().toISOString(),
      safeString(payload.fullName),
      safeString(payload.businessEmail),
      safeString(payload.companyName),
      safeString(payload.websiteUrl),
      safeString(payload.industry),
      safeString(payload.primaryGoals),
      safeString(payload.monthlyTrafficEstimate),
      safeString(payload.targetAudience),
      safeString(payload.topCompetitors),
      safeString(payload.mainChallenges),
      safeString(payload.timelineUrgency),
      safeString(payload.preferredContactMethod),
      safeString(payload.source),
      safeString(payload.submittedAt),
      safeString(payload.clientCompletionMs),
    ]);

    return jsonResponse({ success: true, message: "Saved" });
  } catch (error) {
    return jsonResponse({
      success: false,
      message: error && error.message ? error.message : "Unknown server error",
    });
  }
}

function doGet() {
  return jsonResponse({ success: true, message: "Audit endpoint is running" });
}

function getAntiSpamMessage(payload) {
  if (safeString(payload.website)) {
    return "Spam detected.";
  }

  const source = safeString(payload.source);
  if (!source || source !== EXPECTED_SOURCE) {
    return "Invalid request source.";
  }

  const completionMs = Number(payload.clientCompletionMs || 0);
  if (
    Number.isFinite(completionMs) &&
    completionMs > 0 &&
    completionMs < MIN_CLIENT_COMPLETION_MS
  ) {
    return "Form submitted too quickly. Please try again.";
  }

  return "";
}

function getValidationMessage(payload) {
  const missingField = REQUIRED_FIELDS.find(function (field) {
    return !safeString(payload[field]);
  });

  if (missingField) {
    return "Missing required field: " + missingField;
  }

  if (!EMAIL_REGEX.test(safeString(payload.businessEmail))) {
    return "Please provide a valid email address.";
  }

  if (!URL_REGEX.test(safeString(payload.websiteUrl))) {
    return "Please provide a valid website URL including http or https.";
  }

  return "";
}

function parsePayload(e) {
  const body =
    e && e.postData && e.postData.contents ? e.postData.contents : "{}";
  return JSON.parse(body);
}

function getThrottleKey(payload) {
  const base = [
    safeString(payload.businessEmail).toLowerCase(),
    safeString(payload.websiteUrl).toLowerCase(),
  ].join("|");
  return "audit:" + Utilities.base64EncodeWebSafe(base).slice(0, 150);
}

function isDuplicateSubmission(throttleKey) {
  const cache = CacheService.getScriptCache();
  return Boolean(cache.get(throttleKey));
}

function rememberSubmission(throttleKey) {
  const cache = CacheService.getScriptCache();
  cache.put(throttleKey, "1", DUPLICATE_WINDOW_SECONDS);
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  return sheet;
}

function ensureHeaderRow(sheet) {
  if (sheet.getLastRow() > 0) {
    return;
  }

  sheet.appendRow([
    "receivedAt",
    "fullName",
    "businessEmail",
    "companyName",
    "websiteUrl",
    "industry",
    "primaryGoals",
    "monthlyTrafficEstimate",
    "targetAudience",
    "topCompetitors",
    "mainChallenges",
    "timelineUrgency",
    "preferredContactMethod",
    "source",
    "submittedAt",
    "clientCompletionMs",
  ]);
}

function safeString(value) {
  return value === null || value === undefined ? "" : String(value).trim();
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
