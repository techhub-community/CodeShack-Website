# Registration form → Google Sheet

This connects the site's `/register` form to a Google Sheet using a free Apps Script Web App (no backend/server needed).

## 1. Create the sheet
1. Create a new Google Sheet (any name).

## 2. Add the script
1. In the Sheet: `Extensions > Apps Script`.
2. Delete the default `Code.gs` contents and paste in this folder's `Code.gs`.
3. Save the project (any name).
4. In the toolbar's function dropdown, select **setupSheet**, then click **Run**.
   The first time, Google will ask you to authorize the script — approve it.
   This creates a `Sheet1` tab (if it doesn't exist) with a bold, frozen
   header row: `Timestamp | Name | USN | Phone | Branch | Year`.
   - You can skip this — `doPost` creates the header row automatically the
     first time someone submits the form — but running it once means the
     sheet looks right before any real submissions come in.
   - If you already had a sheet from before the Phone field was added,
     re-run **setupSheet** once after updating the script — it'll rewrite
     the header row to include Phone. Any rows submitted before that will
     still only have 5 columns of data, so they'll look shifted; only new
     submissions land under the correct columns.

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
  CORS headers `fetch` can read, so the response is opaque either way. Apps
  Script round-trips also take a couple of seconds (script boot + sheet write
  + redirect), so the form doesn't wait for the request to finish — it fires
  the POST in the background and shows success immediately.
- Test the deployed endpoint directly by opening its URL in a browser — you
  should see `{"result":"ok","message":"CodeShack registration endpoint is live."}`.
