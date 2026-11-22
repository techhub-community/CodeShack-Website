/**
 * CodeShack Form -> Google Sheet bridge.
 *
 * Each role gets its own tab (e.g. "Design", "Technical") instead of one
 * shared tab, so recruiters for each role only see their own applicants.
 *
 * Setup:
 * 1. Create a Google Sheet.
 * 2. Extensions > Apps Script, delete any boilerplate, paste this file's contents.
 * 3. In the function dropdown (top toolbar) select "setupSheet", then click
 *    Run once — this creates one tab per role in ROLES below, each with its
 *    own header row. (Tabs are also created automatically as submissions
 *    for that role come in, if you skip this step.)
 * 4. Deploy > New deployment > type "Web app".
 *      - Execute as: Me
 *      - Who has access: Anyone
 * 5. Copy the resulting Web App URL and set it as VITE_GOOGLE_SCRIPT_URL
 *    in the website's .env file.
 * 6. Re-run "Deploy > Manage deployments" and use "New version" any time
 *    you edit this script, otherwise the live URL keeps serving old code.
 */

// Must stay in sync with ROLES in src/Pages/Register_Page/Register.jsx —
// each entry here becomes its own sheet tab, named exactly as listed.
const ROLES = ["Video Editing", "Design", "Social Media", "Technical", "Manager"];
const HEADERS = ["Timestamp", "Name", "USN", "Phone", "Branch", "Year"];

/**
 * Run this once from the Apps Script editor (select "setupSheet" in the
 * function dropdown, then click Run) to create a tab + header row per role.
 * Safe to run more than once — it won't duplicate headers if they're
 * already there.
 */
function setupSheet() {
  ROLES.forEach(setupRoleSheet);
}

function setupRoleSheet(role) {
  const sheet = getOrCreateSheet(role);
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

  return sheet;
}

function getOrCreateSheet(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  return spreadsheet.getSheetByName(sheetName) || spreadsheet.insertSheet(sheetName);
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
    const params = e.parameter;

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

    if (ROLES.indexOf(role) === -1) {
      return jsonResponse({ result: "error", message: "Unknown role." });
    }

    const sheet = setupRoleSheet(role);
    sheet.appendRow([new Date(), name, usn, phone, branch, year]);

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
