# Deployment Pipeline — Aluminium Company Ltd

Step-by-step guide to take the codebase from local development to production.

---

## Phase 2: Create Sanity Project & Deploy Schemas

### 2.1 — Create Sanity project
1. Go to https://www.sanity.io/manage → **Create new project**
2. Project name: `Aluminium Company Ltd`
3. Dataset: `production`
4. Note the **Project ID** (e.g. `abc123de`)

### 2.2 — Generate API token
1. Sanity dashboard → **API** → **Tokens**
2. Create token with **Editor** permissions (read + write)
3. Copy the token — you won't see it again

### 2.3 — Create `.env.local`
```bash
cp .env.local.example .env.local
```

Fill in:
```env
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=<your-editor-token>
SANITY_WEBHOOK_SECRET=<generate-a-random-string>
RESEND_API_KEY=
RESEND_FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_SITE_URL=http://localhost:3000
PLAUSIBLE_DOMAIN=
CONTACT_EMAIL=kos.statho@gmail.com
CONTACT_PHONE=+306984106315
```

> Tip: generate a webhook secret with `openssl rand -hex 32`

### 2.4 — Add CORS origin in Sanity
1. Sanity dashboard → **API** → **CORS Origins**
2. Add `http://localhost:3000` (allow credentials)
3. Add production domain later (Phase 5)

### 2.5 — Verify Sanity Studio
```bash
npm run dev
# Open http://localhost:3000/studio
# Verify schema types appear: Services, FAQ Items, Εξοικονομώ Page, Site Settings
```

### 2.6 — Verify build
```bash
npm run build
# Should pass — empty Sanity data returns []
```

---

## Phase 3: Create Resend Account & Test Forms

### 3.1 — Sign up at Resend
1. Go to https://resend.com → Sign up
2. Free tier: 100 emails/day (sufficient for launch)

### 3.2 — Get API key
1. Resend dashboard → **API Keys** → **Create API Key**
2. Add to `.env.local`:
```env
RESEND_API_KEY=re_XXXXXXXXXXXX
RESEND_FROM_EMAIL=onboarding@resend.dev
```
> Use Resend's default sender initially. Custom domain sender requires DNS verification (Phase 5).

### 3.3 — Test form submission
```bash
npm run dev
# Open http://localhost:3000/contact
# Submit quote form → verify email arrives at kos.statho@gmail.com
# Submit appointment form → verify email arrives
```

### 3.4 — (After domain purchase) Verify custom domain
1. Resend dashboard → **Domains** → Add domain
2. Add DNS records: SPF, DKIM, DMARC
3. Update `.env.local`: `RESEND_FROM_EMAIL=noreply@yourdomain.com`

---

## Phase 4: Populate CMS Content (Sanity Studio)

Open http://localhost:3000/studio and create the following documents.

### 4.1 — Site Settings (singleton)

| Field | Value |
|-------|-------|
| companyName | Aluminium Company Ltd |
| phone | +306984106315 |
| email | kos.statho@gmail.com |
| whatsappNumber | 306984106315 |
| viberNumber | +306984106315 |
| address | Αθήνα |
| city | Αθήνα |
| businessHours | Δευτέρα - Παρασκευή: 08:00 - 17:00\nΣάββατο: 09:00 - 14:00 |
| googleMapsUrl | (Google Maps embed URL for business location) |

### 4.2 — Create 9 Service Documents

| # | Title | Slug | Icon |
|---|-------|------|------|
| 1 | Συρόμενα Κουφώματα | syromena-koufomata | DoorOpen |
| 2 | Ανοιγόμενα Κουφώματα | anoigomena-koufomata | DoorClosed |
| 3 | Πόρτες Ασφαλείας | portes-asfaleias | ShieldCheck |
| 4 | Στέγαστρα | stegastra | Home |
| 5 | Κιγκλιδώματα | kigklidomata | Fence |
| 6 | Τζαμαρίες & Διαχωριστικά | tzamaries-diachoristika | GlassWater |
| 7 | Προσόψεις (Facades) | prosopseis-facades | Building2 |
| 8 | Ρολά | rola | ArrowUpDown |
| 9 | Σιδηροκατασκευές | sidirokataskeues | Wrench |

For each service, add:
- **shortDescription**: 1-2 sentence summary
- **description**: Rich text content (supports bold, italic, lists, headings)
- **specs**: Technical specifications table rows (label + value pairs)
- **faq**: 2-3 service-specific questions and answers
- **seoTitle** and **seoDescription**: For search engine optimization

> Content source: `build/architecture.md` section 4.3 has service descriptions.

### 4.3 — Create 13 FAQ Items

| Category | Count | Topics |
|----------|-------|--------|
| general | 3 | Company info, service area, certifications |
| products | 3 | Exalco systems, glass types, colours |
| installation | 2 | Timeline, process |
| exoikonomw | 3 | Eligibility, subsidy rates, process |
| pricing | 2 | Quote process, payment |

> Content source: `build/architecture.md` lines 243-265.

### 4.4 — Create Εξοικονομώ Page (singleton)

| Field | Notes |
|-------|-------|
| heroTitle | Main heading for the page |
| subsidyTiers | 5 rows (defaults exist in code as fallback) |
| processSteps | 7 steps (defaults exist in code as fallback) |
| whyUsPoints | 5 points |
| programmeStatus | `open` or `closed` |

### 4.5 — Verify all pages render
```bash
npm run dev
# Check each route:
# /                               (home)
# /services                       (services listing)
# /services/syromena-koufomata    (service detail — try all 9)
# /contact                        (contact forms)
# /exoikonomw                     (subsidy programme)
# /faq                            (FAQ page)
# /about                          (about)
# /privacy-policy                 (privacy)
```

---

## Phase 5: Domain Purchase & DNS Setup

### 5.1 — Choose & purchase domain
Recommended registrars:
- **Papaki** (for `.gr` domains)
- **Cloudflare Registrar** (cheapest renewals)
- **Namecheap** (good alternative)

Decide with client: `aluminium-company.gr`, `.com`, or preferred name.

### 5.2 — Configure DNS for Vercel
Add these DNS records:

| Type | Name | Value |
|------|------|-------|
| A | @ | 76.76.21.21 |
| CNAME | www | cname.vercel-dns.com |

Or use **Vercel Nameservers** for automatic SSL and configuration.

### 5.3 — Update project config
After domain is live, update:

1. `.env.local` / Vercel env vars:
   ```
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   PLAUSIBLE_DOMAIN=yourdomain.com
   ```

2. `public/robots.txt`: Update sitemap URL:
   ```
   Sitemap: https://yourdomain.com/sitemap.xml
   ```

### 5.4 — Add domain to Sanity CORS origins
Sanity dashboard → API → CORS Origins → Add `https://yourdomain.com`

### 5.5 — Verify domain in Resend
1. Add domain in Resend dashboard
2. Add DNS records (SPF, DKIM, DMARC)
3. Update `RESEND_FROM_EMAIL=noreply@yourdomain.com`

---

## Phase 6: Deploy to Vercel

### 6.1 — Initialize git & push to GitHub
```bash
git init
git add -A
git commit -m "Initial commit — Aluminium Company Ltd catalogue site"
git remote add origin https://github.com/USER/eshop.git
git push -u origin main
```

### 6.2 — Connect to Vercel
1. Go to https://vercel.com → **Import Project**
2. Select GitHub repo
3. Framework: **Next.js** (auto-detected)

### 6.3 — Add environment variables in Vercel
Go to Project → **Settings** → **Environment Variables** and add all 10:

```
NEXT_PUBLIC_SANITY_PROJECT_ID
NEXT_PUBLIC_SANITY_DATASET
SANITY_API_TOKEN
SANITY_WEBHOOK_SECRET
RESEND_API_KEY
RESEND_FROM_EMAIL
NEXT_PUBLIC_SITE_URL
PLAUSIBLE_DOMAIN
CONTACT_EMAIL
CONTACT_PHONE
```

### 6.4 — Add custom domain
Vercel → Project → **Settings** → **Domains** → Add domain

SSL is auto-provisioned.

### 6.5 — Deploy & verify
- Auto-deploys on every push to `main`
- Test all routes + forms on production URL

---

## Phase 7: Set Up Sanity ISR Webhook

### 7.1 — Create webhook in Sanity
1. Sanity dashboard → **API** → **Webhooks** → **Create**
2. Configure:

| Setting | Value |
|---------|-------|
| Name | Revalidate Next.js |
| URL | `https://yourdomain.com/api/revalidate` |
| Secret | Same as `SANITY_WEBHOOK_SECRET` |
| HTTP method | POST |
| Trigger on | Create, Update, Delete |
| HTTP Headers | `x-sanity-webhook-secret: <your-secret>` |

### 7.2 — Test webhook
1. Edit a service in Sanity Studio (e.g. change a description)
2. Save
3. Visit the service page on production
4. Verify updated content appears within seconds

---

## Phase 8: SEO & Launch Checklist

### 8.1 — Google Search Console
1. Go to https://search.google.com/search-console
2. Add property → Enter domain
3. Verify via DNS TXT record
4. Submit sitemap: `https://yourdomain.com/sitemap.xml`

### 8.2 — Plausible Analytics
1. Go to https://plausible.io → Add site
2. Enter domain name
3. The tracking script is already in `layout.tsx` (loads when `PLAUSIBLE_DOMAIN` is set)
4. Verify script loads in browser DevTools → Network tab

### 8.3 — Final Launch Checklist

| Check | Status |
|-------|--------|
| All 10 routes return HTTP 200 | ☐ |
| Quote form delivers email | ☐ |
| Appointment form delivers email | ☐ |
| WhatsApp FAB opens chat | ☐ |
| Viber FAB opens chat | ☐ |
| Mobile navigation works | ☐ |
| `sitemap.xml` lists all routes + 9 service slugs | ☐ |
| JSON-LD validates (Google Rich Results Test) | ☐ |
| SSL active (green padlock) | ☐ |
| 404 page shows custom design | ☐ |
| 500 error page shows custom design | ☐ |
| Sanity Studio accessible at `/studio` | ☐ |
| ISR webhook working (edit in CMS → auto-update on site) | ☐ |
| Plausible tracking script loads | ☐ |
| `robots.txt` has correct sitemap URL | ☐ |

---

## Quick Reference: All Environment Variables

| Variable | Source | Example |
|----------|--------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity dashboard | `abc123de` |
| `NEXT_PUBLIC_SANITY_DATASET` | Fixed | `production` |
| `SANITY_API_TOKEN` | Sanity → API → Tokens | `sk...` |
| `SANITY_WEBHOOK_SECRET` | Self-generated | `openssl rand -hex 32` |
| `RESEND_API_KEY` | Resend dashboard | `re_...` |
| `RESEND_FROM_EMAIL` | After domain verification | `noreply@yourdomain.com` |
| `NEXT_PUBLIC_SITE_URL` | Your domain | `https://yourdomain.com` |
| `PLAUSIBLE_DOMAIN` | Your domain | `yourdomain.com` |
| `CONTACT_EMAIL` | Business email | `kos.statho@gmail.com` |
| `CONTACT_PHONE` | Business phone | `+306984106315` |
