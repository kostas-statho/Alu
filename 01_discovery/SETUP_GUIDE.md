# Setup Guide — Online Questionnaire Submission
**File:** `questionnaire_client-discovery_v1.html`
**Goal:** When a client finishes the form → you get an email + a row is added to Google Sheets.

---

## Step 1 — EmailJS (receive email when form is submitted)

**Free tier:** 200 emails/month — no credit card needed.

### 1.1 Create account
1. Go to [https://emailjs.com](https://emailjs.com) → **Sign Up Free**
2. Confirm your email

### 1.2 Add Email Service
1. Dashboard → **Email Services** → **Add New Service**
2. Choose **Gmail** (easiest) → Connect your Google account
3. Copy the **Service ID** (e.g. `service_abc123`)

### 1.3 Create Email Template
1. Dashboard → **Email Templates** → **Create New Template**
2. Set **To email** = your email address
3. Set **Subject** = `Νέο Ερωτηματολόγιο — {{company}}`
4. In the **Content / Body** paste:

```
Νέα υποβολή ερωτηματολογίου:

Εταιρεία: {{company}}
Υπεύθυνος: {{contact}}
Τηλέφωνο: {{phone}}
Email πελάτη: {{client_email}}
Πόλη: {{city}}
Εκτιμώμενο Σύνολο: {{total}}

────────────────────────────
{{summary}}
```

5. **Save** → Copy the **Template ID** (e.g. `template_xyz789`)

### 1.4 Get Public Key
1. Dashboard → Account → **API Keys**
2. Copy your **Public Key** (e.g. `abcDEFghiJKL`)

### 1.5 Update the HTML file
Open `questionnaire_client-discovery_v1.html` and replace:
```js
const EMAILJS_PUBLIC_KEY  = 'YOUR_EMAILJS_PUBLIC_KEY';  // ← paste Public Key
const EMAILJS_SERVICE_ID  = 'YOUR_SERVICE_ID';           // ← paste Service ID
const EMAILJS_TEMPLATE_ID = 'YOUR_TEMPLATE_ID';          // ← paste Template ID
```

---

## Step 2 — Google Sheets (log every submission as a row)

**Free:** No limits via Google Apps Script.

### 2.1 Create the Google Sheet
1. Go to [https://sheets.google.com](https://sheets.google.com) → create a new sheet
2. Rename it to **Questionnaire Submissions**
3. Copy the Spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`THIS_PART`**`/edit`

### 2.2 Create the Apps Script
1. In the Sheet: **Extensions → Apps Script**
2. Delete all existing code and paste this:

```javascript
const SHEET_NAME = 'Sheet1'; // or rename your sheet tab

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);

    // Add header row if sheet is empty
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        'Timestamp', 'Εταιρεία', 'Υπεύθυνος', 'Τηλέφωνο', 'Email', 'Πόλη',
        'Χρόνια', 'Υπηρεσίες', 'Συστήματα', 'Κύρια Υπηρ.', 'Σελίδες',
        'Features', 'Φωτογραφίες', 'Logo', 'Κείμενα', 'Άρθρα',
        'Παλέτα', 'Στυλ', 'Παλιό Site', 'Ανταγ. Site', 'Χρονοδ.',
        'Budget', 'Hosting', 'Γεωγραφία', 'Συντήρηση', 'Σημειώσεις', 'Σύνολο'
      ]);
    }

    sheet.appendRow([
      new Date().toLocaleString('el-GR'),
      data.company, data.contact, data.phone, data.client_email, data.city,
      data.years, data.services, data.systems, data.main_service, data.pages,
      data.features, data.photos, data.logo, data.copy, data.articles,
      data.palette, data.style, data.existing, data.competitor,
      data.timeline, data.budget, data.hosting, data.geo,
      data.maintenance, data.notes, data.total
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Click **Save** (floppy disk icon)
4. Click **Deploy → New Deployment**
5. Type: **Web App**
6. Description: `Questionnaire Webhook`
7. Execute as: **Me**
8. Who has access: **Anyone** ← important
9. Click **Deploy** → authorize when prompted
10. Copy the **Web App URL** (ends in `/exec`)

### 2.3 Update the HTML file
Open `questionnaire_client-discovery_v1.html` and replace:
```js
const SHEETS_WEBHOOK_URL = 'https://script.google.com/macros/s/AKfycbxc5vJu1Lu9EwomjtAoTAqlSrnnkEcsrEC_rL32y3LjDp78P-1yLMr38dmzKPMAb0RE/exec';
```

---

## Step 3 — Surge.sh Hosting

**Site is already deployed and live:**

> **https://alu-questionnaire.surge.sh**

Account: kos.statho@gmail.com (Student plan — unlimited free static sites)

To redeploy after changes, run from the project root:
```bash
bash deploy.sh
```

---

## Quick Test Checklist

- [ ] Fill out the form yourself end-to-end
- [ ] Click "Δημιουργία Προσφοράς"
- [ ] Check you received an email (may take ~30 seconds)
- [ ] Check the Google Sheet has a new row
- [ ] Toast notification shows "Τα αποτελέσματα στάλθηκαν επιτυχώς!" (green)

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| No email received | Check EmailJS dashboard → Logs for errors |
| EmailJS "public key invalid" | Re-copy from Account → API Keys |
| Sheets not updating | Redeploy the Apps Script (new version) |
| CORS error in console | Normal for `mode: 'no-cors'` — check Sheet directly |
| Toast shows red error | Open browser DevTools (F12) → Console for details |

---

*Document: `SETUP_GUIDE.md` — Questionnaire Submission Setup*
