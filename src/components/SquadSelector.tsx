"use client";

import { useState } from "react";

const squads = [
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
        time: "09:30 PM",
        format: "Non-contact",
      },
    ],
  },
];

export function SquadSelector() {
  const [activeCategory, setActiveCategory] = useState(squads[0].category);

  const active = squads.find((s) => s.category === activeCategory)!;

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
          {active.teams.map((team) => (
            <div key={team.name} className="px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
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
