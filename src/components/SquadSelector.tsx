"use client";

import { useState } from "react";
import type { SheetTeam } from "@/lib/sheets";

// ─── Hard-coded fallback data ─────────────────────────────────────────────────
// These are used when no Teams tab has been configured in Google Sheets.
// To override from the sheet, set SHEET_GID_TEAMS in .env.local and populate
// the tab with columns: category | name | day | time | format
const FALLBACK_SQUADS = [
  {
    category: "Minis & Juniors",
    emoji: "🏉",
    description: "Age-grade rugby from U6 to U18. Tag, contact, and junior competitions.",
    teams: [
      { name: "U6 / U7 (Minis)", day: "Sunday", time: "10:00 AM", format: "Tag Rugby" },
      { name: "U8 / U9", day: "Sunday", time: "10:00 AM", format: "Tag & First Contact" },
      { name: "U10 / U11", day: "Sunday", time: "10:00 AM", format: "Mini Rugby" },
      { name: "U12 / U13", day: "Sunday", time: "10:30 AM", format: "Junior League" },
      { name: "U14 / U15", day: "Sunday", time: "10:30 AM", format: "Junior League" },
      { name: "U16 / Colts (U18)", day: "Tuesday & Thursday", time: "6:30 PM", format: "Midi Rugby" },
    ],
  },
  {
    category: "Senior Men",
    emoji: "💪",
    description: "Competitive senior rugby from Counties 1 down to our social 'Bandits' side.",
    teams: [
      {
        name: "1st XV",
        day: "Tuesday & Thursday",
        time: "7:00 PM",
        format: "Counties 1 Midlands East (North)",
      },
      {
        name: "2nd XV",
        day: "Tuesday & Thursday",
        time: "7:00 PM",
        format: "Midlands League",
      },
      {
        name: "Bandits (3rd XV)",
        day: "Thursday",
        time: "7:00 PM",
        format: "Social / Friendly matches",
      },
    ],
  },
  {
    category: "Women & Girls",
    emoji: "⭐",
    description: "The Peaches — our senior women's team. Girls rugby also available at junior level.",
    teams: [
      {
        name: "Southwell Peaches",
        day: "Wednesday",
        time: "7:00 PM",
        format: "Women's League",
      },
    ],
  },
  {
    category: "Social & Veterans",
    emoji: "🍺",
    description: "Touch rugby, veterans rugby, and the legendary Bandits 3rd XV.",
    teams: [
      {
        name: "Touch Rugby",
        day: "Summertime",
        time: "07:30 PM",
        format: "Non-contact",
      },
    ],
  },
];

const CATEGORY_META: Record<string, { emoji: string; description: string }> = {
  "Minis & Juniors": {
    emoji: "🏉",
    description: "Age-grade rugby from U6 to U18. Tag, contact, and junior competitions.",
  },
  "Senior Men": {
    emoji: "💪",
    description: "Competitive senior rugby from Counties 1 down to our social 'Bandits' side.",
  },
  "Women & Girls": {
    emoji: "⭐",
    description: "The Peaches — our senior women's team. Girls rugby also available at junior level.",
  },
  "Social & Veterans": {
    emoji: "🍺",
    description: "Touch rugby, veterans rugby, and the legendary Bandits 3rd XV.",
  },
};

type SquadSelectorProps = {
  /** Teams fetched from Google Sheets. When non-empty, overrides the hard-coded fallback. */
  sheetTeams?: SheetTeam[];
};

export function SquadSelector({ sheetTeams = [] }: SquadSelectorProps) {
  // Build squads from sheet data if available, otherwise use fallback
  const squads =
    sheetTeams.length > 0
      ? (() => {
        // Group sheet rows by category, preserving insertion order
        const grouped = new Map<string, SheetTeam[]>();
        for (const t of sheetTeams) {
          const cat = t.category.trim();
          const existing = grouped.get(cat) ?? [];
          existing.push(t);
          grouped.set(t.category, existing);
        }
        return Array.from(grouped.entries()).map(([category, teams]) => ({
          category,
          emoji: CATEGORY_META[category]?.emoji ?? "🏉",
          description: CATEGORY_META[category]?.description ?? "",
          teams: teams.map((t) => ({ name: t.name, day: t.day, time: t.time, format: t.format })),
        }));
      })()
      : FALLBACK_SQUADS;

  const [activeCategory, setActiveCategory] = useState(squads[0]?.category ?? "");
  const active = squads.find((s) => s.category === activeCategory) ?? squads[0];

  if (!active) return null;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Category tabs */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {squads.map((squad) => (
          <button
            key={squad.category}
            onClick={() => setActiveCategory(squad.category)}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-body font-semibold text-sm transition-all duration-200 ${activeCategory === squad.category
              ? "bg-maroon text-white shadow-lg shadow-maroon/30"
              : "bg-white text-slate border border-border hover:border-maroon/30 hover:text-maroon"
              }`}
          >
            <span>{squad.emoji}</span>
            {squad.category}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm">
        <div className="bg-maroon px-6 py-5">
          <h3 className="font-display font-bold text-2xl text-white">{active.category}</h3>
          <p className="font-body text-white/70 text-sm mt-1">{active.description}</p>
        </div>

        <div className="divide-y divide-border">
          {active.teams.map((team, idx) => (
            <div key={`${active.category}-${team.name}-${idx}`} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="font-display font-bold text-lg text-slate block">{team.name}</span>
                <span className="font-body text-muted text-sm">{team.format}</span>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="bg-cream border border-border rounded-lg px-3 py-2 font-body text-sm text-slate">
                  <span className="font-semibold">{team.day}</span>
                  <br />
                  <span className="text-muted text-xs">{team.time}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="px-6 py-4 bg-cream border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-muted text-sm">
            🎉 First session is free — no commitment required
          </p>
          <a
            href="/contacts"
            className="inline-flex items-center gap-2 bg-maroon text-white font-body font-semibold text-sm px-5 py-2.5 rounded-lg hover:bg-maroon-deep transition-colors"
          >
            Contact the coach →
          </a>
        </div>
      </div>
    </div>
  );
}
