# Eshop — Aluminium Retailer
**Project Type:** E-commerce website (no payment gateway)
**Client:** Aluminium retailer (κουφώματα / profiles / accessories)
**Status:** Pre-development — Pages Planning Phase
**Last Updated:** 2026-03-03

---

## Live Services (Discovery Phase)

| Service | Purpose | Status |
|---------|---------|--------|
| **Surge.sh** — [alu-questionnaire.surge.sh](https://alu-questionnaire.surge.sh) | Hosts the questionnaire | ✅ Live |
| **Google Apps Script** | Form submissions → email + Sheets log | ✅ Configured |
| **Google Sheets** — Questionnaire Submissions | Submission log | ✅ Live |

**Deploy:** `bash deploy.sh` from project root

---

## Project Summary

An e-commerce catalogue website for an aluminium retailer. Customers browse products and submit inquiries/quote requests — no online payment processing. The site serves both end consumers and trade (B2B) customers.

---

## Document Index

### 01 / Discovery
| File | Description | Status |
|------|-------------|--------|
| `01_discovery/questionnaire_client-discovery_v1.html` | Interactive questionnaire + auto-pricing + email/Sheets submission | ✅ Live |
| `01_discovery/SETUP_GUIDE.md` | Services setup guide (Google Apps Script, Netlify) | ✅ Done |
| `01_discovery/apps-script.js` | Google Apps Script source (form webhook) | ✅ Deployed |
| `01_discovery/call-agenda_first-call_v1.md` | First phone call agenda and question guide | Ready |

### 02 / Proposal
| File | Description | Status |
|------|-------------|--------|
| `02_proposal/proposal_client_GR_v1.html` | Full client proposal — Greek (HTML, printable) | Ready |
| `02_proposal/proposal_client_GR_v1.pdf` | Full client proposal — Greek (PDF) | Ready |

### 03 / Planning
| File | Description | Status |
|------|-------------|--------|
| `03_planning/plan_project-schedule_GR_v1.html` | Project plan with Gantt chart, sprints, milestones | Ready |

### 04 / Architecture
| File | Description | Status |
|------|-------------|--------|
| `04_architecture/architecture_technical_v1.html` | Technical blueprint: stack, CMS schema, routes, SEO, design system | Ready |

### 05 / Pages
| File | Description | Status |
|------|-------------|--------|
| `05_pages/plan_pages-sitemap_v1.html` | Full sitemap, page specs, forms, WhatsApp/Viber, Εξοικονομώ, FAQ, sprint plan, design system | Ready |

---

## Tech Stack (Proposed)

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 14 (App Router) |
| CMS | Sanity.io |
| Hosting | Vercel |
| Styling | Tailwind CSS |
| Email | Resend |
| Analytics | Plausible |
| Auth (Phase 2) | Clerk |

---

## Key Decisions — Resolved

- [x] Scope: Catalogue + quote request + appointment forms (no cart, no payment)
- [x] B2B portal: Phase 2
- [x] Services: 9 categories (Exalco systems)
- [x] Language: Greek only (Phase 1)
- [x] Client manages CMS (Sanity Studio training at launch)
- [x] Brand: White & Blue palette, Bold & Dynamic style
- [x] Domain/hosting: to be arranged (Vercel)
- [x] System partner: Exalco (not Alumil)
- [x] WhatsApp + Viber integration
- [x] Εξοικονομώ dedicated page

## Key Decisions Still Open

- [ ] Domain name: purchase and DNS setup
- [ ] Exact shade of blue (need hex value or reference from client)
- [ ] Client content delivery timeline (service page descriptions)

---

## File Naming Convention

```
[category]_[description]_[LANG]_v[N].[ext]
```

- **LANG:** `GR` = Greek, `EN` = English (omit if language-agnostic)
- **v[N]:** version number, start at `v1`
- **Categories:** `questionnaire`, `proposal`, `plan`, `architecture`, `call-agenda`

---

## Original Files (Root — Legacy)

The following files in the project root are the original agent outputs. The organized copies above should be used going forward. These can be archived or deleted once reviewed.

- `aluminum-site-architecture.html`
- `client-questionnaire.html`
- `client-proposal-gr.html`
- `project-plan-gr.html`
- `gr_alu.pdf`
