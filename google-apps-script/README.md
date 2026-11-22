# Registration / Queries form → Google Sheet

This connects the website form to a Google Sheet using a free Apps Script Web App (no server needed).

### Columns
- `Timestamp`
- `Name`
- `USN` (Unique identifier — duplicate submissions are rejected)
- `Branch`
- `Questions and Queries`

## 2. Add the script
1. In the Sheet: `Extensions > Apps Script`.
2. Delete the default `Code.gs` contents and paste in this folder's `Code.gs`.
3. Save the project (any name).
4. In the toolbar's function dropdown, select **setupSheet**, then click **Run**.
   The first time, Google will ask you to authorize the script — approve it.
   This creates **one tab per role** (`Video Editing`, `Design`, `Social
   Media`, `Technical`, `Manager` — must match `ROLES` in `Register.jsx`),
   each with its own bold, frozen header row: `Timestamp | Name | USN |
   Phone | Branch | Year`. Applicants for a given role only land in that
   role's tab — there's no shared/combined tab.
   - You can skip this — `doPost` creates a role's tab automatically the
     first time someone submits for that role — but running it once means
     every tab exists and looks right before any real submissions come in.
   - If you add/rename a role, update the `ROLES` array in **both**
     `Code.gs` and `Register.jsx`, then re-run **setupSheet** to create the
     new tab.

**Migrating from the old single-tab setup:** if your sheet already has a
`Sheet1` tab with rows in it from before roles existed, those rows stay put —
the script no longer writes to `Sheet1` at all, only to the per-role tabs.
Feel free to keep `Sheet1` around as an archive or delete it once you've
copied anything you need out of it.

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
