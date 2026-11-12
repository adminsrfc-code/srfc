"use client";

import { useState } from "react";
import type { Fixture } from "@/lib/rfu";
import type { SheetEvent } from "@/lib/sheets";
import { FixtureCard } from "@/components/FixtureCard";

type Filter = "all" | "upcoming" | "results";

interface EventsClientProps {
  fixtures: Fixture[];
  socialEvents: SheetEvent[];
}

export function EventsClient({ fixtures, socialEvents }: EventsClientProps) {
  const [filter, setFilter] = useState<Filter>("upcoming");
  const [showSocial, setShowSocial] = useState(true);

  const filtered = fixtures.filter((f) => {
    if (filter === "upcoming") return f.status === "upcoming";
    if (filter === "results") return f.status === "result";
    return true;
  });

  const noFixtures = filtered.length === 0;
  const noUpcoming = fixtures.filter((f) => f.status === "upcoming").length === 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex gap-2 flex-wrap">
          {(["upcoming", "results", "all"] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-5 py-2 rounded-xl font-body font-semibold text-sm transition-all capitalize ${
                filter === f
                  ? "bg-maroon text-white shadow-md shadow-maroon/30"
                  : "bg-white text-slate border border-border hover:border-maroon/30"
              }`}
            >
              {f === "all" ? "All Fixtures" : f === "upcoming" ? "Upcoming" : "Results"}
            </button>
          ))}
        </div>
        {socialEvents.length > 0 && (
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showSocial}
              onChange={(e) => setShowSocial(e.target.checked)}
              className="rounded accent-maroon"
            />
            <span className="font-body text-sm text-muted">Show club events</span>
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Fixtures */}
        <div className="lg:col-span-2">
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
                  <a
                    href="https://www.englandrugby.com/fixtures-results"
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

          {fixtures.length > 0 && (
            <div className="mt-6 p-4 bg-cream border border-border rounded-xl flex items-center justify-between gap-3">
              <div>
                <p className="font-body text-sm font-semibold text-slate">Subscribe to calendar</p>
                <p className="font-body text-xs text-muted">Get all fixtures automatically in your calendar app</p>
              </div>
              <a
                href="https://www.englandrugby.com/fixtures-results"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-shrink-0 bg-maroon text-white font-body font-semibold text-sm px-4 py-2 rounded-lg hover:bg-maroon-deep transition-colors"
              >
                📅 England Rugby
              </a>
            </div>
          )}
        </div>

        {/* Club events sidebar from Google Sheets */}
        {showSocial && (
          <div>
            <h2 className="font-display font-bold text-2xl text-slate mb-4">CLUB EVENTS</h2>

            {socialEvents.length === 0 ? (
              <div className="bg-white border border-border rounded-2xl p-6 text-center">
                <p className="font-body text-muted text-sm">
                  Club events are added by the club secretary in the club spreadsheet.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {socialEvents.map((event, i) => (
                  <div
                    key={`${event.title}-${i}`}
                    className="bg-white border border-border rounded-2xl p-5 hover:border-maroon/30 hover:shadow-sm transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-gold/20 text-maroon font-body text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                        {event.type}
                      </span>
                      <span className="font-body text-muted text-xs">
                        {new Date(event.date).toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="font-display font-bold text-lg text-slate mb-1">{event.title}</h3>
                    {event.notes && (
                      <p className="font-body text-muted text-sm leading-relaxed">{event.notes}</p>
                    )}
                    {event.time && (
                      <p className="font-body text-muted text-xs mt-2">⏰ {event.time}</p>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Clubhouse info card */}
            <div className="bg-maroon-deep rounded-2xl p-5 text-white mt-4">
              <h3 className="font-display font-bold text-lg mb-2">THE CLUBHOUSE</h3>
              <p className="font-body text-white/70 text-sm leading-relaxed mb-3">
                Bar open after all home matches. Hot food on selected matchdays.
              </p>
              <p className="font-body text-white/60 text-xs">
                Park Lane, Southwell, NG25 0QN<br />
                📞 01636 812576
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
