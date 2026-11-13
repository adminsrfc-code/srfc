# Southwell RFC — Website

A Next.js 16 website for **Southwell RFC** (Park Lane, Southwell, NG25 0QN).

---

## Developer Quick Start

```bash
cp .env.local.example .env.local   # fill in your Sheet ID and GIDs
npm install
npm run dev        # http://localhost:3000
npm run build      # production build check
```

---

## Admin Guide — Managing the Site via Google Sheets

> **For club volunteers.** You do not need any coding knowledge to update most of the website.
> Everything in this section is done through a Google Spreadsheet.

### Overview

The website reads from a single Google Sheet with **five tabs**:

| Tab name | What it controls |
|----------|-----------------|
| **Settings** | Pitch status, promotional banner, clubhouse notices |
| **Events** | Social events, training notices, club announcements |
| **Contacts** | Officials directory (shown on the Contacts page) |
| **Sponsors** | Sponsor logos and links (shown at the bottom of every page) |
| **Teams** *(optional)* | Training days and times in the "Find Your Team" section |

---

### How to Publish the Sheet (one-time setup)

1. Open the club Google Sheet
2. For **each tab** you want the website to read:
   - Click **File → Share → Publish to web**
   - Select the tab name from the first dropdown
   - Select **Comma-separated values (.csv)** from the second dropdown
   - Click **Publish** and confirm
3. The URL will look like:\
   `https://docs.google.com/spreadsheets/d/SHEET_ID/pub?gid=TAB_GID&single=true&output=csv`
4. Copy `SHEET_ID` (the long string in the URL) and each tab's `gid=XXXXXXXX` number
5. Add them to Vercel: **Project Settings → Environment Variables** (see `.env.local.example`)

---

### Tab Structures

#### Settings tab

Columns: `key` | `value`

| key | value | Description |
|-----|-------|-------------|
| `pitch_status` | `OPEN` | Shown in the coloured banner at the top of every page. Options: `OPEN`, `INSPECTION`, `CLOSED` |
| `pitch_message` | `Main pitch waterlogged — Sunday sessions on Pitch 2` | Optional extra message shown next to the pitch status |
| `clubhouse_note` | `Bar open from 2pm Saturday` | *(reserved for future use)* |
| `membership_url` | `https://www.southwellrfc.com/a/membership-subscriptions-...` | Link used by the "Join Us" button in the nav and "Join / Membership Subs" in the footer. Update this if the sign-up page URL ever changes — no code deploy needed |
| `banner_image_url` | `https://drive.google.com/uc?id=1AbCd...` | Full public URL of a promotional image shown in the Club Intro section |
| `banner_expires` | `2026-11-06` | Date (YYYY-MM-DD) after which the banner is hidden automatically. Leave blank to show indefinitely |

**How to get a Google Drive image URL:**
1. Upload the image to Google Drive
2. Right-click → **Share** → **Anyone with the link** → Copy link
3. The share link looks like: `https://drive.google.com/file/d/FILE_ID/view?usp=sharing`
4. Transform it to: `https://drive.google.com/uc?id=FILE_ID`
5. Paste that URL into the `banner_image_url` row

---

#### Events tab

Columns: `title` | `date` | `time` | `type` | `notes` | `cancelled`

| Column | Format | Example | Notes |
|--------|--------|---------|-------|
| `title` | Text | `Bonfire Night Social` | Required |
| `date` | YYYY-MM-DD | `2026-11-05` | Required |
| `time` | HH:MM (24h) | `19:30` | Optional |
| `type` | `social`, `training`, or `other` | `social` | Required |
| `notes` | Short description | `Fireworks from 7:30pm, bar open` | Optional |
| `cancelled` | `TRUE` or blank | `TRUE` | Set to TRUE to hide the event without deleting the row |

> ⚠️ **Do NOT add fixtures here.** Fixtures come automatically from the RFU API.

**Example rows:**

| title | date | time | type | notes | cancelled |
|-------|------|------|------|-------|-----------|
| Bonfire Night Social | 2026-11-05 | 19:30 | social | Fireworks from 7:30pm, bar open | |
| Training cancelled | 2026-12-24 | | training | No training Christmas Eve | |
| Club AGM | 2027-01-15 | 20:00 | other | All members welcome | |

---

#### Contacts tab

Columns: `category` | `role` | `name` | `email` | `phone`

| Column | Example |
|--------|---------|
| `category` | `Club Officers`, `Coaches`, `Welfare` |
| `role` | `Club Chairman`, `1st XV Coach` |
| `name` | `John Smith` |
| `email` | `chairman@southwellrfc.com` *(displayed obfuscated)* |
| `phone` | `07700 900000` |

**Example rows:**

| category | role | name | email | phone |
|----------|------|------|-------|-------|
| Club Officers | Chairman | John Smith | john@example.com | 07700 900000 |
| Club Officers | Secretary | Jane Doe | jane@example.com | |
| Coaches | 1st XV Head Coach | Mike Jones | mike@example.com | |
| Welfare | Safeguarding Officer | Sarah Brown | sarah@example.com | |

---

#### Sponsors tab

Columns: `name` | `url` | `logo_url` | `active`

| Column | Example | Notes |
|--------|---------|-------|
| `name` | `Acme Builders` | Shown as text if no logo |
| `url` | `https://acmebuilders.co.uk` | Link when clicked |
| `logo_url` | `https://acmebuilders.co.uk/logo.png` | Optional — public image URL |
| `active` | `TRUE` | Only rows with `TRUE` are shown |

---

#### Teams tab *(optional)*

Columns: `category` | `name` | `day` | `time` | `format`

If this tab is set up and `SHEET_GID_TEAMS` is configured, training days/times on the
"Find Your Team" section will come from the sheet instead of the built-in defaults.

| Column | Example |
|--------|---------|
| `category` | `Senior Men`, `Minis & Juniors`, `Women & Girls`, `Social & Veterans` |
| `name` | `1st XV`, `U8 / U9` |
| `day` | `Tuesday & Thursday`, `Sunday` |
| `time` | `7:00 PM` |
| `format` | `Counties 1 Midlands East (North)` |

**Example rows:**

| category | name | day | time | format |
|----------|------|-----|------|--------|
| Minis & Juniors | U6 / U7 (Minis) | Sunday | 10:00 AM | Tag Rugby |
| Minis & Juniors | U8 / U9 | Sunday | 10:00 AM | Tag & First Contact |
| Senior Men | 1st XV | Tuesday & Thursday | 7:00 PM | Counties 1 Midlands East (North) |
| Senior Men | 2nd XV | Tuesday & Thursday | 7:00 PM | Midlands League |
| Women & Girls | Southwell Peaches | Wednesday | 7:00 PM | Women's League |

> If you don't set up this tab, the website uses sensible defaults and continues to work normally.

---

### Environment Variables Reference

Copy `.env.local.example` to `.env.local` and fill in:

```bash
GOOGLE_SHEET_ID=1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms   # from Sheet URL
SHEET_GID_EVENTS=0        # gid= from Events tab URL
SHEET_GID_CONTACTS=1      # gid= from Contacts tab URL
SHEET_GID_SPONSORS=2      # gid= from Sponsors tab URL
SHEET_GID_SETTINGS=3      # gid= from Settings tab URL
SHEET_GID_TEAMS=          # gid= from Teams tab (leave blank to use built-in defaults)
```

For production, add these in **Vercel → Project → Settings → Environment Variables**.

---

### Deploying to Vercel

The site auto-deploys on every `git push` to the `main` branch.

1. Push your changes: `git add . && git commit -m "Update X" && git push`
2. Vercel builds and deploys automatically (usually ~60 seconds)
3. Live at: https://www.southwellrfc.com

To trigger a manual redeploy (e.g. to pick up new Sheet data immediately):
- Vercel Dashboard → Deployments → Redeploy

> The site also auto-refreshes from Google Sheets every **5 minutes** via Next.js ISR, so most changes appear without redeploying.

---

## Tech Stack (developer reference)

| Thing | Detail |
|-------|--------|
| Framework | Next.js 16.4.2, App Router, TypeScript |
| Styling | Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` in globals.css) |
| Fonts | Barlow Condensed (headings) + Plus Jakarta Sans (body) via Google Fonts |
| Colours | Maroon `#800000`, Gold `#C5A059`, Cream `#FBF9F5`, Slate `#1E2229` |
| Data | Google Sheets CSV (publicly published) + RFU cluster API |
| Deployment | Vercel (Git push → auto-deploy) |
| ISR | 5 min on all pages; 1h on `/api/fixtures` |
