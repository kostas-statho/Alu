# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E-commerce catalogue website (no payment gateway) for an aluminium retailer. Currently in **pre-development / discovery phase** — no Next.js app exists yet. The repo contains discovery deliverables (questionnaire, proposal, project plan, architecture doc) as static HTML files and supporting scripts.

## Repository Structure

```
01_discovery/    Questionnaire HTML, call agenda, Apps Script source, setup guide
02_proposal/     Client proposal (HTML + PDF, Greek)
03_planning/     Project schedule with Gantt chart
04_architecture/ Technical architecture blueprint
```

Root-level `.html` and `.pdf` files are legacy copies of the organized versions above.

## File Naming Convention

`[category]_[description]_[LANG]_v[N].[ext]` — e.g. `proposal_client_GR_v1.html`
- LANG: `GR` or `EN` (omit if language-agnostic)
- Categories: `questionnaire`, `proposal`, `plan`, `architecture`, `call-agenda`

## Commands

### Deploy questionnaire to Surge.sh
```bash
bash deploy.sh
```
Copies `01_discovery/questionnaire_client-discovery_v1.html` as `index.html` to https://alu-questionnaire.surge.sh. Requires `surge` CLI (Node v22 expected at `~/local/node-v22.14.0-linux-x64/bin`).

### Run E2E webhook test
```bash
node test-e2e.js
```
Sends a full test payload to the Google Apps Script webhook and prints the response. Verify email receipt, PDF attachment, and Sheets row manually after running.

## Architecture: Form Submission Pipeline

```
Browser (questionnaire HTML)
  └─ POST JSON ──► Google Apps Script webhook (01_discovery/apps-script.js)
                      ├─ Writes row to Google Sheets ("Sheet1")
                      ├─ Generates PDF via Google Docs API (then trashes temp doc)
                      ├─ Emails owner (kos.statho@gmail.com) with PDF attachment
                      └─ Sends confirmation email to client
```

- **No EmailJS** — Google Apps Script handles both email and Sheets in a single call.
- The Apps Script `sanitize()` function strips emojis from fields going to email/Sheets, but preserves `_display` variants (with icons) for the PDF.
- Submissions get a unique ID (`yyyymmdd_XXXXX`) returned as `uid` in the JSON response.

## Proposed Tech Stack (for the actual site, not yet built)

Next.js 14 (App Router), Sanity.io CMS, Vercel, Tailwind CSS, Resend (email), Plausible (analytics), Clerk (auth, Phase 2).

## Key Context

- All discovery documents and the questionnaire UI are in Greek.
- The questionnaire HTML is a self-contained single-file app (HTML + CSS + JS inline) with auto-pricing logic.
- The `test-e2e.js` prefixes all field values with "TEST" for easy identification in Sheets/email.
