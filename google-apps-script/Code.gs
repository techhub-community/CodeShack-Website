/**
 * CodeShack recruitment form -> Google Sheet bridge.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions > Apps Script, delete any boilerplate, paste this file's contents.
 * 3. In the function dropdown (top toolbar) select "setupSheet", then click
 *    Run once — this creates the "Sheet1" tab and header row for you.
 *    (The header row is also created automatically on the first form
 *    submission if you skip this step.)
 * 4. Deploy > New deployment > type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the resulting Web App URL and set it as VITE_GOOGLE_SCRIPT_URL
 *    in the website's .env file.
 * 6. Re-run "Deploy > Manage deployments" and use "New version" any time
 *    you edit this script, otherwise the live URL keeps serving old code.
 */

const SHEET_NAME = "Sheet1"; // change if your tab is named differently
const HEADERS = ["Timestamp", "Name", "USN", "Phone", "Branch", "Year"];

/**
 * Run this once from the Apps Script editor (select "setupSheet" in the
 * function dropdown, then click Run) to create the header row. Safe to
 * run more than once — it won't duplicate headers if they're already there.
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

  // Keep phone numbers as plain text so Sheets doesn't reformat/round them.
  const phoneColumn = HEADERS.indexOf("Phone") + 1;
  sheet.getRange(1, phoneColumn, sheet.getMaxRows(), 1).setNumberFormat("@");
}

function getOrCreateSheet() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(SHEET_NAME) || spreadsheet.insertSheet(SHEET_NAME);
}

function doPost(e) {
  try {
    const sheet = getOrCreateSheet();
    if (sheet.getLastRow() === 0) {
      setupSheet();
    }

    const params = e.parameter;

    const name = (params.name || "").toString().trim();
    const usn = (params.usn || "").toString().trim().toUpperCase();
    const phone = (params.phone || "").toString().trim();
    const branch = (params.branch || "").toString().trim();
    const year = (params.year || "").toString().trim();

    if (!name || !usn || !phone || !branch || !year) {
      return jsonResponse({ result: "error", message: "Missing required field(s)." });
    }

    sheet.appendRow([new Date(), name, usn, phone, branch, year]);

    return jsonResponse({ result: "success" });
  } catch (err) {
    return jsonResponse({ result: "error", message: err.message });
  }
}

function doGet() {
  return jsonResponse({ result: "ok", message: "CodeShack registration endpoint is live." });
}

function jsonResponse(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
