# Southwell RFC — Website Specification

> Living document. Last updated: October 2026.

## Tech Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **Styling:** Tailwind CSS v4 (CSS-first, no config file)
- **Fonts:** Barlow Condensed (headings) + Plus Jakarta Sans (body) via Google
  Fonts
- **Content:** MDX + gray-matter (events, history), JSON (contacts)
- **CMS:** Outstatic — web admin at /outstatic, GitHub OAuth, commits MDX to
  repo
- **Fixtures:** RFU cluster API (`cluster.england-rfu.com`), current season id:
  1754367 (2025-2026)
- **Deployment:** Vercel (Git push = auto-deploy)
- **Database:** None in Phase 1

## Club Facts

- Founded: 1922 (Minster School roots)
- Address: Park Lane, Southwell, Nottinghamshire, NG25 0QN
- Phone: 01636 812576
- Colours: Maroon #800000 + White
- Competition: Counties 1 Midlands East (North)

## Pages

- `/` — Homepage (hero, next fixture, squad selector, events strip, sponsors)
- `/events` — Fixtures from RFU API + MDX fallback, filterable
- `/history` — MDX rich content page
- `/contacts` — JSON-driven officials directory + map
- `/api/fixtures` — RFU proxy route

## Design Colours

- --srfc-maroon: #800000
- --srfc-maroon-deep: #520000
- --srfc-maroon-vibrant: #A31D24
- --srfc-gold: #C5A059
- --srfc-cream: #FBF9F5
- --srfc-slate: #1E2229
- --srfc-muted: #5E6573

## Decisions Made

- Admin: Outstatic (easy photo upload, no code needed)
- Contacts: Display emails only (no contact form)
- News blog: Phase 2
- Fixtures: RFU API pull (cluster.england-rfu.com)
- Tailwind: v4
- Hosting: Vercel, costs TBD
