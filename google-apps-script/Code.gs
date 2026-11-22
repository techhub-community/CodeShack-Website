/**
 * CodeShack Form -> Google Sheet bridge.
 *
 * Configured columns: Timestamp, Name, USN, Branch, Questions and Queries
 * Rejects duplicate USN submissions.
 */

const SHEET_NAME = "Sheet1";
const HEADERS = ["Timestamp", "Name", "USN", "Branch", "Questions and Queries"];

/**
 * Run setupSheet once from the Apps Script editor toolbar.
 */
function setupSheet() {
  const sheet = getOrCreateSheet();
  const firstRow = sheet.getRange(1, 1, 1, HEADERS.length).getValues()[0];
  const hasHeaders = HEADERS.every((h, i) => firstRow[i] === h);

  if (!hasHeaders) {
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }

  // Ensure USN column is treated as plain text to avoid formatting glitches
  const usnColumn = HEADERS.indexOf("USN") + 1;
  sheet.getRange(1, usnColumn, sheet.getMaxRows(), 1).setNumberFormat("@");
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function doPost(e) {
  // Use LockService to prevent race conditions during concurrent submissions
  const lock = LockService.getScriptLock();
  try {
    // Wait up to 10 seconds for concurrent requests
    lock.waitLock(10000);
  } catch (lockError) {
    return jsonResponse({ result: "error", message: "Server is busy. Please try again." });
  }

  try {
    const sheet = getOrCreateSheet();
    if (sheet.getLastRow() === 0) {
      setupSheet();
    }

    const params = (e && e.parameter) ? e.parameter : {};

    const name = (params.name || "").toString().trim();
    const usn = (params.usn || "").toString().trim().toUpperCase();
    const branch = (params.branch || "").toString().trim();
    const questionsAndQueries = (params.questionsAndQueries || params.query || "").toString().trim();

    if (!name || !usn || !branch) {
      return jsonResponse({ result: "error", message: "Missing required fields (name, usn, branch)." });
    }

    // Check for duplicate USNs
    const lastRow = sheet.getLastRow();
    if (lastRow > 1) {
      const usnColumnIndex = HEADERS.indexOf("USN") + 1;
      const existingUsns = sheet.getRange(2, usnColumnIndex, lastRow - 1, 1).getValues().flat();
      const isDuplicate = existingUsns.some(val => val.toString().trim().toUpperCase() === usn);

      if (isDuplicate) {
        return jsonResponse({
          result: "duplicate",
          message: "A submission with this USN (" + usn + ") already exists."
        });
      }
    }

    sheet.appendRow([new Date(), name, usn, branch, questionsAndQueries]);

    return jsonResponse({ result: "success" });
  } catch (err) {
    return jsonResponse({ result: "error", message: err.message });
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return jsonResponse({ result: "ok", message: "CodeShack registration/query endpoint is live." });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
