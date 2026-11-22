# Registration / Queries form → Google Sheet

This connects the website form to a Google Sheet using a free Apps Script Web App (no server needed).

### Columns
- `Timestamp`
- `Name`
- `USN` (Unique identifier — duplicate submissions are rejected)
- `Branch`
- `Questions and Queries`

---

## 1. Create the sheet with `avinashpal24013@gmail.com`
1. Log in to Google with **`avinashpal24013@gmail.com`**.
2. Go to [sheets.new](https://sheets.new) and create a new sheet (e.g., *CodeShack Registrations & Queries*).
3. **Privacy / Abstraction Note**: 
   - Leave the sheet's Share settings as **Restricted / Private** (only accessible by you). 
   - **Do NOT** share the sheet publicly. Website visitors never see the sheet.

## 2. Add the script
1. In the sheet, go to `Extensions > Apps Script`.
2. Delete any boilerplate code in `Code.gs` and paste the contents of [`Code.gs`](./Code.gs).
3. In the toolbar function dropdown, select **`setupSheet`** and click **Run**.
4. Grant the permissions requested by Google. This will create the header row and format the USN column.

## 3. Deploy as a Web App (Abstracted execution)
1. In the Apps Script editor, click **Deploy > New deployment**.
2. Select type: **Web app** (click the gear icon ⚙️).
3. Configure:
   - **Description**: `CodeShack Form Endpoint`
   - **Execute as**: **Me (avinashpal24013@gmail.com)** *(This ensures the script has permission to write to your sheet without exposing the sheet itself)*
   - **Who has access**: **Anyone** *(Allows form submissions from the web without requiring users to log into your Google account)*
4. Click **Deploy** and copy the **Web app URL** (`https://script.google.com/macros/s/.../exec`).

## 4. Connect to Vercel & Website
Set the environment variable:
- In `.env` (locally):
  ```env
  VITE_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/XXXXXXXXX/exec
  ```
- In **Vercel Project Settings > Environment Variables** and **GitHub Secrets**:
  Add `VITE_GOOGLE_SCRIPT_URL` with the new Web App URL.
