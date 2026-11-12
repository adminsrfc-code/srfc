# Southwell RFC — Project Status

> This file is the persistent "where were we?" tracker. Update it at the end of
> every work session. Last updated: 2026-11-06 (session 2)

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

- `Nav.tsx` — fixed top nav, scroll-aware bg, mobile hamburger menu
- `Footer.tsx` — club identity, quick links, social icons, address
- `HeroSection.tsx` — full-screen maroon hero with next fixture card
- `FixtureCard.tsx` — dark/light variant, shows result score or vs, Google
  Calendar link
- `SquadSelector.tsx` — tabbed squad/training time browser (client component)
- `PitchStatusBanner.tsx` — top-of-page pitch status (OPEN / INSPECTION /
  CLOSED)

### Data Layer — all in `src/lib/`

- `sheets.ts` — Google Sheets CSV reader (events, contacts, sponsors, settings
  tabs)
- `rfu.ts` — RFU cluster API (`cluster.england-rfu.com`) fixture fetcher, season
  auto-detect
- `contacts.ts` — wraps sheets contacts and groups by category

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
```

**How to get the Sheet ID:** Open the club Google Sheet → copy the long ID from
the URL\
**How to get GIDs:** Click each tab → look at `#gid=XXXXXXXX` in the URL\
**Vercel:** Add these in Project Settings → Environment Variables

### Outstatic CMS (`/outstatic`) — Not yet set up

Outstatic (`outstatic@^2.2.4`) is installed but needs:

1. GitHub OAuth app credentials (`OUTSTATIC_SECRET`, `GITHUB_ID`,
   `GITHUB_SECRET`)
2. A `content/` directory structure for MDX articles
3. The `/outstatic` admin route — verify outstatic auto-registers it or needs a
   catch-all

### ~~Club Logo~~ ✅ DONE 2026-11-06

- Badge generated and saved to `public/badge.jpg`
- `Nav.tsx` and `Footer.tsx` updated to use `next/image` with the badge
- If the club provides an official SVG logo later, drop it in as
  `public/badge.svg` and update the `src` prop

### Hero Background Image

- `HeroSection.tsx` uses a CSS gradient background
- Club may want a real action photo — add to `public/hero.jpg` and use
  `<Image priority fill>`

### ~~Google Maps Embed (Contacts page)~~ ✅ DONE 2026-11-06

- Real coordinates `53.069039, -0.958455` confirmed via doogal.co.uk
- Both the iframe embed and the "Get Directions" link updated in
  `contacts/page.tsx`

### SEO / OG Image

- `layout.tsx` has `metadataBase` set but no OG image configured
- Add `src/app/opengraph-image.png` (1200×630) for social sharing previews

### rfu.ts API incorrect

I noticed the `${RFU_BASE}/find-rugby/search?code=NG250QN` API call was using
"postCode" which is wrong it should be code So commented it out and hardcoded it
as https://cluster.england-rfu.com/clubs/1523 is southwells api and the clubs id
is 1523 can you clean this up a little - use constants for the club id. But also
will this approach work? Is the id static? If this fails, can we scrape?

### Missing links

https://www.gilbertrugby.com/collections/southwell-rfc Social links Membership
subs

### Find Your Team

These date and times are wrong can they be configured from the google sheets?

### Hero Links

"Find Your Team" links goes to contacts instead of scrolling down to "Find Your
Team". Also the buttons on the right should go to the approprate place.

### Admin Help Page

Can you give me an example of a googlesheet. Also need a seperate secret admin
page for how to use google sheets and general instructions.

### Banner for news

Also be nice to have a banner for annoncement for a period of time - There is a
lot more buzz on the orginal site: https://www.southwellrfc.com/ We need to put
up pictures for a time span - IE bombfire night picture until 6th of November.
The site should be dynamic, acurate and up to date.

---

## 📋 Phase 2 (Future Work)

Per `spec.md`, Phase 2 items not started:

- **News/blog** — MDX posts via Outstatic, route `/news`
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
| CMS        | Outstatic (installed, not configured)                                                       |
| Deployment | Vercel                                                                                      |
| ISR        | 5 min (`revalidate = 300`) on all pages; 1h on `/api/fixtures`                              |
| RFU season | 2025–2026, ID `1754367` (auto-detected from API)                                            |
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
