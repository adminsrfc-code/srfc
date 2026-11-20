# Southwell RFC — Project Status

> This file is the persistent "where were we?" tracker. Update it at the end of
> every work session. Last updated: 2026-11-20 (session 5)

---

## 🏉 What This Project Is

A Next.js 16 (App Router, TypeScript, Tailwind CSS v4) website for **Southwell
RFC**, a community rugby club in Nottinghamshire, UK.

**Live URL (once deployed):** https://www.southwellrfc.com\
**Hosting:** Vercel (Git push → auto-deploy)\
**Repo root:** `/home/mick/srfc`\
**Spec:** [`spec.md`](./spec.md)

---

## ✅ Completed

### Core Site (Phase 1) — DONE, builds cleanly

All routes compile with `npm run build` (Next.js 16.4.2 / Turbopack, 0 TS
errors).

| Route           | File                                                | Status                                                           |
| --------------- | --------------------------------------------------- | ---------------------------------------------------------------- |
| `/`             | `src/app/page.tsx`                                  | ✅ Hero + intro + squad selector + fixtures + events + sponsors  |
| `/fixtures`     | `src/app/fixtures/page.tsx` + `FixtureClient.tsx`   | ✅ Full fixtures/results browser — split from /events            |
| `/events`       | `src/app/events/page.tsx` + `EventsClient.tsx`      | ✅ Club social events + banner + bookings link (sheet-driven)    |
| `/history`      | `src/app/history/page.tsx`                          | ✅ Club story article + alternating milestone timeline           |
| `/contacts`     | `src/app/contacts/page.tsx` + `ObfuscatedEmail.tsx` | ✅ Officials directory + photos + map + visiting teams info      |
| `/membership`   | `src/app/membership/page.tsx`                       | ✅ Sheet-driven subscription stepper — rates, bank details, etc. |
| `/api/fixtures` | `src/app/api/fixtures/route.ts`                     | ✅ RFU proxy, 1h ISR                                             |

### Components — all in `src/components/`

- `Nav.tsx` — fixed top nav, scroll-aware bg, mobile hamburger menu, **Kit Shop
  link (Gilbert)**, **Fixtures link added**, **membershipUrl prop** sourced
  dynamically from Google Sheets settings via layout
- `Footer.tsx` — club identity, quick links (**Kit Shop + Membership links
  added**), social icons, address
- `HeroSection.tsx` — full-screen maroon hero with next fixture card
- `FixtureCard.tsx` — dark/light variant, shows result score or vs, Google
  Calendar link
- `SquadSelector.tsx` — tabbed squad/training time browser; **accepts
  `sheetTeams` prop** for sheet-driven times with hard-coded fallback; **direct
  England Rugby team links added for each squad**
- `PitchStatusBanner.tsx` — top-of-page pitch status (OPEN / INSPECTION /
  CLOSED)
- `HeroBanner.tsx` — time-bounded promotional image (replaces stats grid in
  Club Intro when configured)
- `MembershipStepper.tsx` — **NEW** multi-step membership/subscription wizard
  with progress bar, navigation pills, rates table and bank details box
- `SponsorsStrip.tsx` — **NEW** static fallback sponsors strip (shown on
  homepage when sheet sponsors not yet configured)

### Data Layer — all in `src/lib/`

- `sheets.ts` — Google Sheets CSV reader; expanded with:
  - `SheetTeam` + `getSheetTeams()` — training times from sheet
  - `SheetSubs` + `getSheetSubs()` — subscription rates and season info
  - `SheetFixtures` + `getSheetFixtures()` — optional sheet-based fixture data
  - **New tabs registered:** `subscritions` (matches actual sheet tab name) and
    `fixtures`, each with hardcoded GID defaults so no env vars needed in prod
  - `getSetting()` / `getSheetSettings()` — documented `membership_url` and
    `booking` settings keys; `membership_url` now plumbed through layout → Nav
    + Footer dynamically
  - **Hardcoded default Sheet ID** present as fallback — site reads live club
    data without any env vars being set
- `rfu.ts` — RFU cluster API fixture fetcher; club ID 1523 comment + stability
  docs
- `scrapeRfu.ts` — **NEW** Cheerio-based HTML scraper for `englandrugby.com`
  search-results pages; fallback/experimental path if the cluster API changes
- `contacts.ts` — wraps sheets contacts and groups by category

### Session 3 work completed (2026-11-13)

| Item                                             | Status  |
| ------------------------------------------------ | ------- |
| `rfu.ts` — club ID comment + stability docs      | ✅ Done |
| Nav: Gilbert kit shop link                       | ✅ Done |
| Footer: Kit shop + membership links              | ✅ Done |
| `sheets.ts`: SheetTeam type + getSheetTeams()    | ✅ Done |
| `sheets.ts`: Banner settings documented          | ✅ Done |
| `SquadSelector.tsx`: Sheet-driven training times | ✅ Done |
| `HeroBanner.tsx`: Time-bounded promotional image | ✅ Done |
| `page.tsx`: Wired up teams + banner              | ✅ Done |
| `README.md`: Full admin guide for volunteers     | ✅ Done |
| `.env.local.example`: Added SHEET_GID_TEAMS      | ✅ Done |

### Session 4 work completed (2026-11-13 → 2026-11-15)

| Item                                                     | Status  |
| -------------------------------------------------------- | ------- |
| `SquadSelector.tsx`: Direct England Rugby team links     | ✅ Done |
| `sheets.ts`: Real sheet ID wired in as default fallback  | ✅ Done |
| `/membership` route + `MembershipStepper.tsx` component  | ✅ Done |
| `sheets.ts`: `SheetSubs` type + `getSheetSubs()`         | ✅ Done |
| `HeroSection.tsx`: Better banner integration             | ✅ Done |
| `/history`: Clubhouse photo added                        | ✅ Done |

### Session 5 work completed (2026-11-17 → 2026-11-20)

| Item                                                              | Status  |
| ----------------------------------------------------------------- | ------- |
| `/events` and `/fixtures` split into two separate routes          | ✅ Done |
| `/fixtures/page.tsx` + `FixtureClient.tsx`: Full fixtures browser | ✅ Done |
| `sheets.ts`: `SheetFixtures` type + `getSheetFixtures()`          | ✅ Done |
| `sheets.ts`: `SheetSubs` tab registered + `getSheetSubs()`        | ✅ Done |
| `EventsClient.tsx`: Bookings link (from sheet `booking` setting)  | ✅ Done |
| `EventsClient.tsx`: Payment link opens in new tab                 | ✅ Done |
| `EventCard.tsx`: Payment/event card improvements                  | ✅ Done |
| `/events/page.tsx`: Banner shown alongside events (two-col)       | ✅ Done |
| `contacts/page.tsx`: Optional photo support (`photo` column)      | ✅ Done |
| `scrapeRfu.ts`: Cheerio scraper for England Rugby pages           | ✅ Done |
| `SponsorsStrip.tsx`: Static fallback sponsors component           | ✅ Done |
| Nav: `Fixtures` link added                                        | ✅ Done |
| Sponsor logos: improved logo/white-logo handling on homepage      | ✅ Done |

### Earlier Bug Fixes Applied

- `src/app/events/page.tsx` — removed impossible `type !== "fixture"` TS
  comparison (SheetEvent.type is already `"social" | "training" | "other"`).
  Fixed in session 2026-11-06.

---

## 🔧 Needs Doing / In Progress

### Environment Variables

The hardcoded fallback Sheet ID means the site reads live data without any env
vars. Override with real values when switching to a different sheet:

```
# .env.local (copy from .env.local.example)
GOOGLE_SHEET_ID=<id from Google Sheets URL>
SHEET_GID_EVENTS=0
SHEET_GID_CONTACTS=325683942
SHEET_GID_SPONSORS=2041061867
SHEET_GID_SETTINGS=903076713
SHEET_GID_TEAMS=1451747871    # optional — leave blank for built-in defaults
SHEET_GID_SUBS=1265768918     # subscription rates tab
SHEET_GID_FIXTURES=522066772  # optional sheet fixture overrides
```

**How to get the Sheet ID:** Open the club Google Sheet → copy the long ID from
the URL\
**How to get GIDs:** Click each tab → look at `#gid=XXXXXXXX` in the URL\
**Vercel:** Add these in Project Settings → Environment Variables\
**Full guide:** See `README.md` → "Admin Guide"

### Settings Tab — Supported Keys

| Key              | Purpose                                            | Example value              |
| ---------------- | -------------------------------------------------- | -------------------------- |
| `pitch_status`   | OPEN / INSPECTION / CLOSED banner at top of site   | `OPEN`                     |
| `pitch_message`  | Optional message shown alongside pitch status      | `Main pitch waterlogged`   |
| `membership_url` | Overrides membership join link in Nav / Footer     | Full URL to join/subs page |
| `booking`        | Booking/payment link shown on `/events` page       | Full URL to booking form   |
| `banner_image_url` | Time-bounded promo banner image URL              | Google Drive `uc?id=…` URL |
| `banner_expires`   | Auto-hide date for banner                        | `YYYY-MM-DD`               |

### Subscription Rates Tab (`subs`)

The `/membership` page reads from a `subs` sheet tab. Expected columns:

```
season | dueDate | seniorMen | seniorMenNote | seniorWomenStudents | U13toU18 | U7toU12 | U6 | social
```

If the tab is missing or empty, hardcoded fallback values in
`membership/page.tsx` are used (£225 / £100 / £175 / £150 / £95 / £50).

### Contacts Photos

Add a `photo` column to the contacts tab with a public image URL (e.g. Google
Drive `uc?id=…`). Photos are optional — contacts without a photo display as
text-only cards.

### Minor Known Issues

- `membership/page.tsx` has a typo in one note field: `"Or twosssss payments"` —
  fix when updating subscription rates.
- `sheets.ts` has a spelling inconsistency: tab key is `subscritions` (matches
  the actual sheet tab name — fix both together if renaming the tab).
- `FixtureClient.tsx`: Teams with `null` RFU team IDs (U6–U13) generate links
  to `/undefined` on England Rugby — these links are shown only in the empty
  state fallback; low priority.

---

## 📋 Phase 2 (Future Work)

Per `spec.md`, Phase 2 items not started:

- **News/blog** — route `/news` - using https://comark.dev
- **Player profiles** — deferred
- **Online membership / joining form** — the `/membership` stepper page exists;
  actual online form/payment not yet integrated

---

## 🏗️ Tech Stack Quick Reference

| Thing      | Detail                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------- |
| Framework  | Next.js 16.4.2, App Router, TypeScript                                                      |
| Styling    | Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` in `globals.css`)                       |
| Fonts      | Barlow Condensed (headings) + Plus Jakarta Sans (body) via Google Fonts                     |
| Colours    | Maroon `#800000`, Gold `#C5A059`, Cream `#FBF9F5`, Slate `#1E2229` — all as `@theme` tokens |
| Data       | Google Sheets CSV (no-auth, publicly published) + RFU cluster API                           |
| Deployment | Vercel                                                                                      |
| ISR        | 5 min (`revalidate = 300`) on all pages; 1h on `/api/fixtures`                              |
| RFU season | 2025–2026, ID `1754367` (auto-detected from API)                                            |
| Club ID    | `1523` — permanent RFU internal club ID, not season-dependent                               |
| Club facts | Park Lane, Southwell, NG25 0QN · 01636 812576 · Founded 1922                                |

---

## 🚦 How to Resume Work

1. Read this file first
2. Read `spec.md` for full requirements
3. Run `npm run build` to confirm baseline still compiles
4. Pick the next item from "Needs Doing" above

```bash
cd /home/mick/srfc
npm run dev    # dev server on http://localhost:3000
npm run build  # production build check
```

---

## 🏉 What This Project Is

A Next.js 16 (App Router, TypeScript, Tailwind CSS v4) website for **Southwell
RFC**, a community rugby club in Nottinghamshire, UK.

**Live URL (once deployed):** https://www.southwellrfc.com\
**Hosting:** Vercel (Git push → auto-deploy)\
**Repo root:** `/home/mick/srfc`\
**Spec:** [`spec.md`](./spec.md)

---

## ✅ Completed

### Core Site (Phase 1) — DONE, builds cleanly

All routes compile with `npm run build` (Next.js 16.4.2 / Turbopack, 0 TS
errors).

| Route           | File                                                | Status                                                          |
| --------------- | --------------------------------------------------- | --------------------------------------------------------------- |
| `/`             | `src/app/page.tsx`                                  | ✅ Hero + intro + squad selector + fixtures + events + sponsors |
| `/events`       | `src/app/events/page.tsx` + `EventsClient.tsx`      | ✅ Filterable fixtures (RFU API) + social events sidebar        |
| `/history`      | `src/app/history/page.tsx`                          | ✅ Club story article + alternating milestone timeline          |
| `/contacts`     | `src/app/contacts/page.tsx` + `ObfuscatedEmail.tsx` | ✅ Officials directory + map + visiting teams info              |
| `/api/fixtures` | `src/app/api/fixtures/route.ts`                     | ✅ RFU proxy, 1h ISR                                            |

### Components — all in `src/components/`

- `Nav.tsx` — fixed top nav, scroll-aware bg, mobile hamburger menu, **Kit Shop
  link (Gilbert)**
- `Footer.tsx` — club identity, quick links (**Kit Shop + Membership links
  added**), social icons, address
- `HeroSection.tsx` — full-screen maroon hero with next fixture card
- `FixtureCard.tsx` — dark/light variant, shows result score or vs, Google
  Calendar link
- `SquadSelector.tsx` — tabbed squad/training time browser; **accepts
  `sheetTeams` prop** for sheet-driven times with hard-coded fallback
- `PitchStatusBanner.tsx` — top-of-page pitch status (OPEN / INSPECTION /
  CLOSED)
- `HeroBanner.tsx` — **NEW** time-bounded promotional image (replaces stats grid
  in Club Intro when configured)

### Data Layer — all in `src/lib/`

- `sheets.ts` — Google Sheets CSV reader; **added `SheetTeam` +
  `getSheetTeams()`**; **documented banner settings keys**; `SHEET_GID_TEAMS`
  env var (optional)
- `rfu.ts` — RFU cluster API fixture fetcher; **added comprehensive comment
  block** explaining club ID 1523 stability and fallback strategy
- `contacts.ts` — wraps sheets contacts and groups by category

### Session 3 work completed (2026-11-13)

| Item                                             | Status  |
| ------------------------------------------------ | ------- |
| `rfu.ts` — club ID comment + stability docs      | ✅ Done |
| Nav: Gilbert kit shop link                       | ✅ Done |
| Footer: Kit shop + membership links              | ✅ Done |
| `sheets.ts`: SheetTeam type + getSheetTeams()    | ✅ Done |
| `sheets.ts`: Banner settings documented          | ✅ Done |
| `SquadSelector.tsx`: Sheet-driven training times | ✅ Done |
| `HeroBanner.tsx`: Time-bounded promotional image | ✅ Done |
| `page.tsx`: Wired up teams + banner              | ✅ Done |
| `README.md`: Full admin guide for volunteers     | ✅ Done |
| `.env.local.example`: Added SHEET_GID_TEAMS      | ✅ Done |

### Bug Fixes Applied

- `src/app/events/page.tsx` — removed impossible `type !== "fixture"` TS
  comparison (SheetEvent.type is already `"social" | "training" | "other"`).
  Fixed in session 2026-11-06.

---

## 🔧 Needs Doing / In Progress

### Environment Variables (Blocking — required to go live)

The site works in dev/build but all data sources return empty without these:

```
# .env.local (copy from .env.local.example)
GOOGLE_SHEET_ID=<id from Google Sheets URL>
SHEET_GID_EVENTS=0       # adjust to actual tab GIDs
SHEET_GID_CONTACTS=1
SHEET_GID_SPONSORS=2
SHEET_GID_SETTINGS=3
SHEET_GID_TEAMS=         # optional — leave blank for built-in defaults
```

**How to get the Sheet ID:** Open the club Google Sheet → copy the long ID from
the URL\
**How to get GIDs:** Click each tab → look at `#gid=XXXXXXXX` in the URL\
**Vercel:** Add these in Project Settings → Environment Variables\
**Full guide:** See `README.md` → "Admin Guide"

### Teams Tab (once you have the Sheet set up)

Add a `teams` tab to the Google Sheet with columns:
`category | name | day | time | format`

Set `SHEET_GID_TEAMS=<gid>` in env vars. Training times on "Find Your Team" will
then be managed from the sheet. Until then, the hard-coded defaults in
`SquadSelector.tsx` are used.

### Promotional Banners

To put up a time-bounded banner (e.g. bonfire night photo):

1. Upload the image to Google Drive → Share (Anyone with link)
2. Transform the URL: `https://drive.google.com/uc?id=FILE_ID`
3. In Settings tab, add rows:
   - `banner_image_url` = the transformed URL
   - `banner_expires` = `YYYY-MM-DD` (e.g. `2026-11-06`)
4. Site updates within 5 minutes automatically

---

## 📋 Phase 2 (Future Work)

Per `spec.md`, Phase 2 items not started:

- **News/blog** — route `/news` - using https://comark.dev
- **Player profiles** — deferred
- **Online membership / joining form** — deferred

---

## 🏗️ Tech Stack Quick Reference

| Thing      | Detail                                                                                      |
| ---------- | ------------------------------------------------------------------------------------------- |
| Framework  | Next.js 16.4.2, App Router, TypeScript                                                      |
| Styling    | Tailwind CSS v4 (CSS-first, `@import "tailwindcss"` in `globals.css`)                       |
| Fonts      | Barlow Condensed (headings) + Plus Jakarta Sans (body) via Google Fonts                     |
| Colours    | Maroon `#800000`, Gold `#C5A059`, Cream `#FBF9F5`, Slate `#1E2229` — all as `@theme` tokens |
| Data       | Google Sheets CSV (no-auth, publicly published) + RFU cluster API                           |
| Deployment | Vercel                                                                                      |
| ISR        | 5 min (`revalidate = 300`) on all pages; 1h on `/api/fixtures`                              |
| RFU season | 2025–2026, ID `1754367` (auto-detected from API)                                            |
| Club ID    | `1523` — permanent RFU internal club ID, not season-dependent                               |
| Club facts | Park Lane, Southwell, NG25 0QN · 01636 812576 · Founded 1922                                |

---

## 🚦 How to Resume Work

1. Read this file first
2. Read `spec.md` for full requirements
3. Run `npm run build` to confirm baseline still compiles
4. Pick the next item from "Needs Doing" above

```bash
cd /home/mick/srfc
npm run dev    # dev server on http://localhost:3000
npm run build  # production build check
```
