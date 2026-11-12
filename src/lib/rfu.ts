// src/lib/rfu.ts

const RFU_BASE = "https://cluster.england-rfu.com";
const CURRENT_SEASON_ID = 1754367;
const SOUTHWELL_CLUB_ID = 1523;

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
      return [];
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