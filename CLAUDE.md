# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

E-commerce catalogue website (no payment gateway) for an aluminium retailer. Currently in **pre-development / discovery phase** — no Next.js app exists yet. The repo contains discovery deliverables (questionnaire, proposal, project plan, architecture doc) as static HTML files and supporting scripts.

**Key decisions already made:**
- Scope: Catalogue + quote request + appointment forms (no cart, no payment)
- B2B portal deferred to Phase 2
- Language: Greek only (Phase 1)
- System partner: Exalco (not Alumil)
- WhatsApp + Viber integration planned
- Client will manage CMS (Sanity Studio) after training

## Repository Structure

All project files live under `Eshop/`:

```
Eshop/
├── 01_discovery/    Questionnaire HTML, call agenda, Apps Script source, setup guide
├── 02_proposal/     Client proposal (HTML + PDF, Greek)
├── 03_planning/     Project schedule with Gantt chart
├── 04_architecture/ Technical architecture blueprint
├── 05_pages/        Full sitemap, page specs, forms, design system
```

Root-level `.html` and `.pdf` files in `Eshop/` are legacy copies of the organized versions above.

## File Naming Convention

`[category]_[description]_[LANG]_v[N].[ext]` — e.g. `proposal_client_GR_v1.html`
- LANG: `GR` or `EN` (omit if language-agnostic)
- Categories: `questionnaire`, `proposal`, `plan`, `architecture`, `call-agenda`

## Commands

### Deploy questionnaire to Surge.sh
```bash
cd Eshop && bash deploy.sh
```
Copies `01_discovery/questionnaire_client-discovery_v1.html` as `index.html` to https://alu-questionnaire.surge.sh. Requires `surge` CLI (Node v22 expected at `~/local/node-v22.14.0-linux-x64/bin`).

### Run E2E webhook test
```bash
cd Eshop && node test-e2e.js
```
Sends a full test payload (all fields prefixed with "TEST") to the Google Apps Script webhook and prints the response. Verify email receipt, PDF attachment, and Sheets row manually after running.

## Architecture: Form Submission Pipeline

```
Browser (questionnaire HTML)
  └─ POST JSON ──► Google Apps Script webhook (01_discovery/apps-script.js)
                      ├─ Writes row to Google Sheets ("Sheet1")
                      ├─ Generates PDF via Google Docs API (then trashes temp doc)
                      ├─ Emails owner (kos.statho@gmail.com) with PDF attachment
                      └─ Sends confirmation email to client
```

- Google Apps Script handles both email and Sheets in a single call (no EmailJS).
- Submissions get a unique ID (`yyyymmdd_XXXXX`) returned as `uid` in the JSON response.

### Display Variants Pattern

The Apps Script `sanitize()` function strips emojis from fields going to email/Sheets, but the questionnaire also sends `_display` variants (e.g. `services_display`, `pages_display`, `features_display`) that preserve emoji/icon formatting for PDF generation. When modifying the questionnaire or Apps Script, always keep both the plain and `_display` fields in sync.

### Questionnaire Architecture (`01_discovery/questionnaire_client-discovery_v1.html`)

Self-contained single-file SPA (HTML + CSS + JS inline) with:
- **9-step wizard**: Company Info → Services → Pages → Features → Content → Design → Timeline & Budget → Extras → Review & Confirm
- **Pricing engine**: Uses `data-group` and `data-price` attributes on option cards. `calcTotal()` aggregates selections and returns `{ total, lines[], scopeItems[], maintPrice }`.
- **Live sidebar**: `updateSidebar()` recalculates and displays price breakdown on every option change.

### Apps Script Response Format

```json
{ "status": "ok", "uid": "20260303_A1B2C" }
```

### Google Sheets Header Order

Timestamp, UID, Etaireia, Ypefthynos, Tilefono, Email, Poli, Chronia, Pleonektima, Domain, Ypiresies, Systimata, Kyria Yp., Selides, Features, Fotografies, Logo, Keimena, Arthra, Paleta, Stylos, Apoyfgi Design, Template, Palaio Site, Antagwnistis Site, Antagwnistes (keim.), Chronod., Budget, Hosting, Geografia, Syntirisi, Simeiosis

## Proposed Tech Stack (for the actual site, not yet built)

Next.js 14 (App Router), Sanity.io CMS, Vercel, Tailwind CSS, Resend (email), Plausible (analytics), Clerk (auth, Phase 2).

## Live Services

| Service | URL / Status |
|---------|-------------|
| Questionnaire | https://alu-questionnaire.surge.sh |
| Google Apps Script webhook | Deployed (see `Eshop/01_discovery/SETUP_GUIDE.md` for config) |
| Google Sheets (submission log) | Configured and live |
