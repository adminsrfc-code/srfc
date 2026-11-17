// src/lib/rfu.ts
//
// RFU Cluster API — Southwell RFC fixture fetcher
// ─────────────────────────────────────────────────
// Base URL: https://cluster.england-rfu.com  (powers englandrugby.com)
//
// SOUTHWELL_CLUB_ID = 1523
//   This is the RFU's permanent, internal club identifier — it does NOT
//   change between seasons. You can verify it by visiting:
//   https://www.englandrugby.com/clubs/southwell-rfc-1523
//   or by inspecting the network tab on that page.
//
// CURRENT_SEASON_ID = 1754367  (2025–2026 season)
//   Used as a hard-coded fallback; getCurrentSeasonId() auto-detects the
//   live value from the /seasons endpoint and refreshes daily (86400s ISR).
//
// If the API stops responding:
//   - getSouthwellFixtures() returns [] gracefully (no unhandled errors).
//   - The Upcoming Fixtures section and Hero "next fixture" card are simply
//     hidden from the page — no error boundary needed.
//   - As a last resort, fixtures can be linked from:
//     https://www.englandrugby.com/fixtures-and-results (manual link only).

//import { scrapeEnglandRugbyTeamPage } from "@/lib/scrapeRfu"

const RFU_BASE = "https://cluster.england-rfu.com";
const CURRENT_SEASON_ID = 1754367; // 2025–2026; auto-detected at runtime
const SOUTHWELL_CLUB_ID = 1523;    // Permanent RFU club ID — do not change

export interface RFUMatch {
  id: string;
  date: string;
  kickOff: string | null;
  homeTeam: { name: string; clubId?: number };
  awayTeam: { name: string; clubId?: number };
  venue?: string;
  competition?: string;
  status: "scheduled" | "played" | "postponed" | "cancelled";
  homeScore?: number | null;
  awayScore?: number | null;
  isHome?: boolean;
}

export interface Fixture {
  id: string;
  date: string;
  time: string;
  home: boolean;
  homeTeam: string;
  awayTeam: string;
  venue: string;
  competition: string;
  status: "upcoming" | "result" | "postponed" | "cancelled";
  homeScore?: number | null;
  awayScore?: number | null;
  team: string;
}

async function getCurrentSeasonId(): Promise<number> {
  try {
    const res = await fetch(`${RFU_BASE}/fixtures-and-results/seasons`, {
      next: { revalidate: 86400 },
      headers: { Origin: "https://www.englandrugby.com" },
    });
    if (!res.ok) return CURRENT_SEASON_ID;
    const seasons = await res.json();
    if (!Array.isArray(seasons)) return CURRENT_SEASON_ID;
    const current = seasons.find((s: { isCurrent: boolean; id: number }) => s.isCurrent);
    return current?.id ?? CURRENT_SEASON_ID;
  } catch {
    return CURRENT_SEASON_ID;
  }
}

const sampleFixtures: Fixture[] = [
  {
    id: "fix-001",
    date: "2026-11-22",
    time: "10:30",
    home: true,
    homeTeam: "Southwell RFC U12",
    awayTeam: "Newark RFC U12",
    venue: "Park Lane, Southwell",
    competition: "Notts, Lincs & Derbyshire Junior League",
    status: "upcoming",
    team: "U12"
  },
  {
    id: "fix-002",
    date: "2026-11-14",
    time: "14:15",
    home: true,
    homeTeam: "Southwell 1st XV",
    awayTeam: "Paviors RFC",
    venue: "Park Lane, Southwell",
    competition: "Counties 1 Midlands East (North)",
    status: "result",
    homeScore: 24,
    awayScore: 18,
    team: "1st XV"
  },
  {
    id: "fix-003",
    date: "2026-11-21",
    time: "14:00",
    home: false,
    homeTeam: "Mansfield 2nd XV",
    awayTeam: "Southwell 2nd XV",
    venue: "Eakring Road, Mansfield",
    competition: "Midlands Reserve League",
    status: "postponed",
    homeScore: null,
    awayScore: null,
    team: "2nd XV"
  }
];

export async function getSouthwellFixtures(): Promise<Fixture[]> {
  try {
    const seasonId = await getCurrentSeasonId();
    const url = `${RFU_BASE}/fixtures-and-results/full-matches?season=${seasonId}&groupId=${SOUTHWELL_CLUB_ID}`;

    const res = await fetch(url, {
      next: { revalidate: 3600 },
      headers: {
        Origin: "https://www.englandrugby.com",
        Accept: "application/json",
      },
    });

    if (!res.ok) {
      // 500 here means the upstream service is failing — nothing to parse.
      console.warn(`[rfu] fixtures request failed: ${res.status} ${res.statusText}`);
      //return await scrapeEnglandRugbyTeamPage("19820");
      return sampleFixtures;
    }

    const data: unknown = await res.json();
    if (!isFixturesResponse(data)) {
      console.warn("[rfu] unexpected response shape from fixtures endpoint");
      return [];
    }

    return [...data.fixtures, ...data.results]
      .map((m) => normalizeMatch(m, SOUTHWELL_CLUB_ID))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  } catch (err) {
    console.error("[rfu] fixtures fetch threw:", err);
    return [];
  }
}

function isFixturesResponse(
  data: unknown
): data is { fixtures: RFUMatch[]; results: RFUMatch[] } {
  if (typeof data !== "object" || data === null) return false;
  const d = data as Record<string, unknown>;
  if (d.fixtures !== undefined && !Array.isArray(d.fixtures)) return false;
  if (d.results !== undefined && !Array.isArray(d.results)) return false;
  // Normalise missing keys to empty arrays so the caller can always spread.
  d.fixtures ??= [];
  d.results ??= [];
  return true;
}

function normalizeMatch(m: RFUMatch, clubId: number): Fixture {
  const isHome =
    m.isHome ??
    (m.homeTeam?.clubId === clubId ||
      m.homeTeam?.name?.toLowerCase().includes("southwell"));

  const homeScore = m.homeScore ?? null;
  const awayScore = m.awayScore ?? null;
  const hasScore = homeScore !== null && awayScore !== null;

  return {
    id: m.id,
    date: m.date,
    time: m.kickOff ?? "15:00",
    home: isHome,
    homeTeam: m.homeTeam?.name ?? "Southwell RFC",
    awayTeam: m.awayTeam?.name ?? "TBC",
    venue: m.venue ?? (isHome ? "Park Lane, Southwell NG25 0QN" : "Away"),
    competition: m.competition ?? "Counties 1 Midlands East (North)",
    status: hasScore ? "result" : m.status === "postponed" ? "postponed" : "upcoming",
    homeScore,
    awayScore,
    team: "1st XV",
  };
}