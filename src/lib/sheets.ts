/**
 * Google Sheets CMS
 * ==================
 * Uses publicly-published Google Sheets as a zero-config CMS.
 * 
 * Setup for club volunteers:
 * 1. Open the club Google Sheet (link shared by web team)
 * 2. Edit any cell (events, contacts, pitch status, sponsors)
 * 3. Save — site updates automatically within ~5 minutes
 * 
 * To publish a sheet tab as CSV:
 * File > Share > Publish to web > Select tab > CSV > Publish
 * Copy the URL and paste the Sheet ID + GID into the config below.
 * 
 * Sheet URL format:
 * https://docs.google.com/spreadsheets/d/{SHEET_ID}/export?format=csv&gid={TAB_GID}
 */

import Papa from "papaparse";
import { Fixture } from "./rfu";

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Replace SHEET_ID with the real ID from the Google Sheets URL
// e.g. https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
//                                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "10xjLm-IJ86twxHg-osUyAjqIkksG0NrX_KBQO_YWK78";

// Tab GIDs — find by clicking each tab and checking the URL: ...#gid=XXXXXXXX
const TABS = {
  events: process.env.SHEET_GID_EVENTS ?? "0",
  contacts: process.env.SHEET_GID_CONTACTS ?? "325683942",
  sponsors: process.env.SHEET_GID_SPONSORS ?? "2041061867",
  settings: process.env.SHEET_GID_SETTINGS ?? "903076713",
  teams: process.env.SHEET_GID_TEAMS ?? "1451747871",
  subscritions: process.env.SHEET_GID_SUBS ?? "1265768918",
  fixtures: process.env.SHEET_GID_FIXTURES ?? "522066772"
} as const;

// Cache duration in seconds (Next.js ISR)
const REVALIDATE = 300; // 5 minutes

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function sheetUrl(gid: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
}

async function fetchCsv<T>(gid: string, toLowerCase = true): Promise<T[]> {
  if (SHEET_ID === "YOUR_SHEET_ID_HERE") {
    console.warn("[sheets] GOOGLE_SHEET_ID not configured — returning empty data");
    return [];
  }
  try {
    const res = await fetch(sheetUrl(gid), {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "text/csv" },
    });
    if (!res.ok) {
      console.error(`[sheets] HTTP ${res.status} fetching gid=${gid}`);
      return [];
    }
    const text = await res.text();
    const transformHeader = toLowerCase ? (h: string) => h.trim().toLowerCase().replace(/\s+/g, "_")
      : (h: string) => h.trim().replace(/\s+/g, "_");
    const { data, errors } = Papa.parse<T>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader,
    });
    if (errors.length) console.warn("[sheets] CSV parse warnings:", errors);
    return data;
  } catch (err) {
    console.error("[sheets] Fetch failed:", err);
    return [];
  }
}

function parseCsvToRecord(csvString?: string): Record<string, string> {
  try {
    // 1. Guard against empty or invalid inputs
    if (!csvString || typeof csvString !== "string") {
      return {};
    }

    // 2. Split into non-empty lines
    const lines = csvString.split(/\r?\n/).filter(line => line.trim() !== "");

    // We need at least a header row and a data row
    if (lines.length < 2) {
      return {};
    }

    // 3. Extract headers (row 1) and values (row 2)
    const headers = lines[0].split(',').map(h => h.trim());
    const values = lines[1].split(',').map(v => v.trim());

    const result: Record<string, string> = {};

    // 4. Zip them together into a single key-value object
    for (let i = 0; i < headers.length; i++) {
      const key = headers[i];
      if (key) {
        result[key] = values[i] ?? "";
      }
    }

    return result;
  } catch (error) {
    console.error("Failed to parse CSV string:", error);
    return {};
  }
}

async function fetchSettings(): Promise<Record<string, string>> {
  const gid = TABS.settings;
  if (SHEET_ID === "YOUR_SHEET_ID_HERE") {
    console.warn("[sheets] GOOGLE_SHEET_ID not configured — returning empty data");
    return {};
  }
  try {
    const res = await fetch(sheetUrl(gid), {
      next: { revalidate: REVALIDATE },
      headers: { Accept: "text/csv" },
    });
    if (!res.ok) {
      console.error(`[sheets] HTTP ${res.status} fetching settings gid=${gid}`);
      return {}
    };

    const csvString = await res.text();
    return parseCsvToRecord(csvString);
  } catch (err) {
    console.error("[sheets] Fetch failed:", err);
    return {};
  }
}


// ─── TYPES ────────────────────────────────────────────────────────────────────

/**
 * Events tab columns (case-insensitive, spaces → underscores):
 * title | date | time | type | notes | cancelled
 *
 * NOTE: Fixtures come from the RFU API automatically — do NOT add
 * fixture rows here. This sheet is for social events, training
 * cancellations, and other club notices only.
 *
 * Valid types: social | training | other
 */
export interface SheetEvent {
  title: string;
  date: string;       // YYYY-MM-DD
  time?: string;      // HH:MM (24h), e.g. "19:30"
  type: "social" | "training" | "other";
  notes?: string;     // Short description shown on site
  cancelled?: string; // "TRUE" to hide the event
  payment?: string;
  contact?: string;
  name?: string;
}

/**
 * Contacts tab columns:
 * category | role | name | email | phone
 */
export interface SheetContact {
  category: string;
  role: string;
  name: string;
  email?: string;
  phone?: string;
  photo?: string;
}

/**
 * Sponsors tab columns:
 * name | url | logo_url | active
 */
export interface SheetSponsor {
  name: string;
  url?: string;
  logo?: string;
  active?: string;  // "TRUE" or ""
  logowhite?: string; // "TRUE" or ""
}

export interface SheetSubs {




  season: string;
  dueDate: string;
  seniorMen: string;
  seniorMenNote: string;
  seniorWomenStudents: string;
  U13toU18: string;
  U7toU12: string;
  U6: string;
  social: string
}

/**
 * Settings tab columns:
 * key | value
 *
 * Supported keys:
 *   pitch_status    → OPEN | INSPECTION | CLOSED
 *   pitch_message   → e.g. "Main pitch waterlogged — Sunday sessions on Pitch 2"
 *   clubhouse_note  → e.g. "Bar open from 2pm Saturday"
 *
 * Banner (time-bounded promotional image in the Club Intro section):
 *   banner_image_url → Full public URL of the image (e.g. from Google Drive or Cloudinary)
 *                      To get a shareable Google Drive image URL:
 *                        Upload → Share (Anyone with link) → copy ID from URL →
 *                        use: https://drive.google.com/uc?id=FILE_ID
 *   banner_expires   → YYYY-MM-DD (e.g. "2026-11-06"). Banner is hidden automatically
 *                      after midnight on this date. Leave blank to show indefinitely.
 *
 * Links (keeps URLs out of code — update from the sheet, no deploy needed):
 *   membership_url → Full URL for membership / subscription sign-up page
 *                    e.g. https://www.southwellrfc.com/a/membership-subscriptions-...
 *                    Falls back to the hardcoded URL in Nav/Footer if not set.
 *
 * Example rows:
 *   key               | value
 *   pitch_status      | OPEN
 *   banner_image_url  | https://drive.google.com/uc?id=1AbCdEfG...
 *   banner_expires    | 2026-11-06
 *   membership_url    | https://www.southwellrfc.com/a/membership-subscriptions-information-inc-online-registration-61282.html?page=2
 */
export interface SheetSetting {
  key: string;
  value: string;
}

// ─── FETCHERS ─────────────────────────────────────────────────────────────────

export async function getSheetEvents(): Promise<SheetEvent[]> {
  const rows = await fetchCsv<SheetEvent>(TABS.events);
  return rows
    .filter((r) => r.title && r.date)
    // Fixtures come from the RFU API — ignore any accidentally added here
    .filter((r) => (r.type as string) !== "fixture")
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
}

export async function getSheetContacts(): Promise<SheetContact[]> {
  return fetchCsv<SheetContact>(TABS.contacts);
}

export async function getSheetSponsors(): Promise<SheetSponsor[]> {
  const rows = await fetchCsv<SheetSponsor>(TABS.sponsors);
  return rows.filter((r) => r.name && r.active?.toUpperCase() === "TRUE");
}

export async function getSheetSubs(): Promise<SheetSubs> {
  const rows = await fetchCsv<SheetSubs>(TABS.subscritions, false);
  return rows[0];
}

export async function getSheetSettings(): Promise<Record<string, string>> {
  const records = await fetchSettings();
  return records;
}

// Convenience: get a single setting value
export async function getSetting(key: string, fallback = ""): Promise<string> {
  const settings = await getSheetSettings();
  return settings[key] ?? fallback;
}

// ─── TEAMS ────────────────────────────────────────────────────────────────────

/**
 * Teams tab columns (case-insensitive, spaces → underscores):
 * category | name | day | time | format
 *
 * Column meanings:
 *   category → Minis & Juniors | Senior Men | Women & Girls | Social & Veterans
 *   name     → e.g. "1st XV", "U6 / U7 (Minis)"
 *   day      → e.g. "Tuesday & Thursday", "Sunday"
 *   time     → e.g. "7:00 PM"  (displayed as-is)
 *   format   → e.g. "Counties 1 Midlands East (North)"
 *
 * If SHEET_GID_TEAMS is not set, getSheetTeams() returns [] and
 * SquadSelector falls back to its built-in hard-coded data.
 */
export interface SheetTeam {
  category: string;
  name: string;
  day: string;
  time: string;
  format: string;
}

export interface SheetFixtures {
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


export async function getSheetTeams(): Promise<SheetTeam[]> {
  if (!TABS.teams) {
    // GID not configured — caller uses hard-coded fallback
    return [];
  }
  const rows = await fetchCsv<SheetTeam>(TABS.teams);
  return rows.filter((r) => r.category && r.name);
}

export async function getSheetFixtures(): Promise<SheetFixtures[]> {
  if (!TABS.fixtures) {
    // GID not configured — caller uses hard-coded fallback
    return [];
  }
  const rawRows = await fetchCsv<Record<string, string | undefined>>(TABS.fixtures);
  const sheetFixtures: Omit<Fixture, "id">[] = rawRows.map((row) => ({
    date: (row.date ?? "").trim(),
    time: (row.time ?? "").trim(),
    home: String(row.home).trim().toUpperCase() === "TRUE",
    // Handle camelCase, lowercase, or snake_case headers safely
    homeTeam: (row.homeTeam ?? row.hometeam ?? row.home_team ?? "").trim(),
    awayTeam: (row.awayTeam ?? row.awayteam ?? row.away_team ?? "").trim(),
    venue: (row.venue ?? "").trim(),
    competition: (row.competition ?? "").trim(),
    status: ((row.status ?? "upcoming").trim() as Fixture["status"]),
    homeScore: row.homeScore || row.homescore || row.home_score
      ? Number(row.homeScore ?? row.homescore ?? row.home_score)
      : null,
    awayScore: row.awayScore || row.awayscore || row.away_score
      ? Number(row.awayScore ?? row.awayscore ?? row.away_score)
      : null,
    team: (row.team ?? "").trim(),
  }));
  return sheetFixtures;
}
