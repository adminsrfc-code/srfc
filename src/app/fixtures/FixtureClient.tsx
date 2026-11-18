"use client";

import { useState } from "react";
import type { Fixture } from "@/lib/rfu";
import type { SheetEvent } from "@/lib/sheets";
import { FixtureCard } from "@/components/FixtureCard";

type Filter = "all" | "upcoming" | "results";

interface FixtureClientProps {
  fixtures: Fixture[];
}

export function FixtureClient({ fixtures }: FixtureClientProps) {
  const [filter, setFilter] = useState<Filter>("upcoming");

  const filtered = fixtures.filter((f) => {
    if (filter === "upcoming") return f.status === "upcoming";
    if (filter === "results") return f.status === "result";
    return true;
  });

  const noFixtures = filtered.length === 0;
  const noUpcoming = fixtures.filter((f) => f.status === "upcoming").length === 0;

  const rfuURL = "https://www.englandrugby.com/fixtures-and-results/search-results?team=";
  const southwellTeams = [
    { name: "Southwell", team: 19818 },
    { name: "Southwell Women", team: 129983 },
    { name: "Southwell II", team: 19819 },
    { name: "Southwell III", team: 19820 },
    { name: "Southwell Colts", team: 19821 },
    { name: "Southwell Colts Development", team: 130033 },
    { name: "Southwell U16", team: 19832 },
    { name: "Southwell U15", team: 19831 },
    { name: "Southwell U14", team: 19830 },
    { name: "Southwell U13", team: null },
    { name: "Southwell U12", team: null },
    { name: "Southwell U11", team: null },
    { name: "Southwell U10", team: null },
    { name: "Southwell U9", team: null },
    { name: "Southwell U8", team: null },
    { name: "Southwell U7", team: null },
    { name: "Southwell U6", team: null }
  ];



  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {(["upcoming", "results", "all"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl font-body font-semibold text-sm transition-all capitalize ${filter === f
                ? "bg-maroon text-white shadow-md shadow-maroon/30"
                : "bg-white text-slate border border-border hover:border-maroon/30"
                }`}
            >
              {f === "all" ? "All Fixtures" : f === "upcoming" ? "Upcoming" : "Results"}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-3">
          <h2 className="font-display font-bold text-2xl text-slate mb-4">
            {filter === "results" ? "RESULTS" : filter === "upcoming" ? "UPCOMING FIXTURES" : "ALL FIXTURES"}
          </h2>

          {noFixtures && (
            <div className="bg-white border border-border rounded-2xl p-10 text-center">
              {noUpcoming && filter === "upcoming" ? (
                <>
                  <p className="text-4xl mb-3">🏉</p>
                  <p className="font-display font-bold text-xl text-slate mb-2">NO FIXTURES LOADED YET</p>
                  <p className="font-body text-muted text-sm">
                    Fixtures are pulled automatically from England Rugby. If none appear, they may
                    not yet be scheduled for this season — or add them to the club spreadsheet.
                  </p>
                  <div className="grid grid-cols-3">
                    {southwellTeams.map((team) => (
                      <a
                        href={rfuURL + team.team}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mt-4 text-maroon font-body font-semibold text-sm hover:underline"
                      >
                        📅 {team.name}
                      </a>
                    ))}
                  </div>
                  <a
                    href="https://www.englandrugby.com/fixtures-and-results"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block mt-4 text-maroon font-body font-semibold text-sm hover:underline"
                  >
                    Check England Rugby ↗
                  </a>
                </>
              ) : (
                <p className="font-body text-muted">No fixtures for this filter.</p>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((fixture) => (
              <FixtureCard key={fixture.id} fixture={fixture} />
            ))}
          </div>

          {/* {fixtures.length > 0 && ( */}
          <div className="mt-6 p-4 bg-cream border border-border rounded-xl flex items-center justify-between gap-3">
            <div>
              <p className="font-body text-sm font-semibold text-slate">Subscribe to calendar</p>
              <p className="font-body text-xs text-muted">Get all fixtures automatically in your calendar app</p>
            </div>
            <a
              href="https://www.englandrugby.com/fixtures-and-results"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 bg-maroon text-white font-body font-semibold text-sm px-4 py-2 rounded-lg hover:bg-maroon-deep transition-colors"
            >
              📅 England Rugby
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
