/**
 * CodeShack recruitment form -> Google Sheet bridge.
 *
 * Setup:
 * 1. Create a Google Sheet. Add a header row to the first sheet (tab 1):
 *      Timestamp | Name | USN | Branch | Year
 * 2. Extensions > Apps Script, delete any boilerplate, paste this file's contents.
 * 3. Deploy > New deployment > type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 4. Copy the resulting Web App URL and set it as VITE_GOOGLE_SCRIPT_URL
 *    in the website's .env file.
 * 5. Re-run "Deploy > Manage deployments" and use "New version" any time
 *    you edit this script, otherwise the live URL keeps serving old code.
 */

const SHEET_NAME = "Sheet1"; // change if your tab is named differently

function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    const params = e.parameter;

    const name = (params.name || "").toString().trim();
    const usn = (params.usn || "").toString().trim().toUpperCase();
    const branch = (params.branch || "").toString().trim();
    const year = (params.year || "").toString().trim();

    if (!name || !usn || !branch || !year) {
      return jsonResponse({ result: "error", message: "Missing required field(s)." });
    }

    sheet.appendRow([new Date(), name, usn, branch, year]);

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
