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

// ─── CONFIGURATION ────────────────────────────────────────────────────────────
// Replace SHEET_ID with the real ID from the Google Sheets URL
// e.g. https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgVE2upms/edit
//                                               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
const SHEET_ID = process.env.GOOGLE_SHEET_ID ?? "YOUR_SHEET_ID_HERE";

// Tab GIDs — find by clicking each tab and checking the URL: ...#gid=XXXXXXXX
const TABS = {
  events:   process.env.SHEET_GID_EVENTS   ?? "0",
  contacts: process.env.SHEET_GID_CONTACTS ?? "1",
  sponsors: process.env.SHEET_GID_SPONSORS ?? "2",
  settings: process.env.SHEET_GID_SETTINGS ?? "3",
} as const;

// Cache duration in seconds (Next.js ISR)
const REVALIDATE = 300; // 5 minutes

// ─── HELPERS ──────────────────────────────────────────────────────────────────
function sheetUrl(gid: string) {
  return `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${gid}`;
}

async function fetchCsv<T>(gid: string): Promise<T[]> {
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
    const { data, errors } = Papa.parse<T>(text, {
      header: true,
      skipEmptyLines: true,
      transformHeader: (h) => h.trim().toLowerCase().replace(/\s+/g, "_"),
    });
    if (errors.length) console.warn("[sheets] CSV parse warnings:", errors);
    return data;
  } catch (err) {
    console.error("[sheets] Fetch failed:", err);
    return [];
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
}

/**
 * Sponsors tab columns:
 * name | url | logo_url | active
 */
export interface SheetSponsor {
  name: string;
  url?: string;
  logo_url?: string;
  active?: string;  // "TRUE" or ""
}

/**
 * Settings tab columns:
 * key | value
 * 
 * Supported keys:
 *   pitch_status  → OPEN | INSPECTION | CLOSED
 *   pitch_message → e.g. "Main pitch waterlogged — Sunday sessions on Pitch 2"
 *   clubhouse_note → e.g. "Bar open from 2pm Saturday"
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

export async function getSheetSettings(): Promise<Record<string, string>> {
  const rows = await fetchCsv<SheetSetting>(TABS.settings);
  return Object.fromEntries(rows.filter((r) => r.key).map((r) => [r.key.trim(), r.value?.trim() ?? ""]));
}

// Convenience: get a single setting value
export async function getSetting(key: string, fallback = ""): Promise<string> {
  const settings = await getSheetSettings();
  return settings[key] ?? fallback;
}
