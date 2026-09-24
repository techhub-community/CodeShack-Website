# Registration form → Google Sheet

This connects the site's `/register` form to a Google Sheet using a free Apps Script Web App (no backend/server needed).

## 1. Create the sheet
1. Create a new Google Sheet.
2. In row 1 of the first tab, add headers: `Timestamp | Name | USN | Branch | Year`.
3. Rename the tab if you like, but update `SHEET_NAME` in `Code.gs` to match (default is `Sheet1`).

## 2. Add the script
1. In the Sheet: `Extensions > Apps Script`.
2. Delete the default `Code.gs` contents and paste in this folder's `Code.gs`.
3. Save the project (any name).

## 3. Deploy as a Web App
1. Click `Deploy > New deployment`.
2. Click the gear icon next to "Select type" and choose `Web app`.
3. Settings:
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click `Deploy`, authorize the permissions Google asks for.
5. Copy the **Web app URL** it gives you (ends in `/exec`).

## 4. Wire it into the website
In `CodeShack-Website/.env` (create it from `.env.example`), set:

```
VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXX/exec
```

Restart the dev server after adding/changing `.env`.

## 5. Updating the script later
Any time you edit `Code.gs` in the Apps Script editor, you must go to
`Deploy > Manage deployments > edit (pencil) > New version` and deploy again —
otherwise the live URL keeps serving the old code.

## Notes
- The frontend posts with `mode: "no-cors"` since Apps Script doesn't return
  CORS headers `fetch` can read — the request still lands in the sheet, but the
  app can't read back a JSON response, so we optimistically show success after
  the request completes without a network error.
- Test the deployed endpoint directly by opening its URL in a browser — you
  should see `{"result":"ok","message":"CodeShack registration endpoint is live."}`.
