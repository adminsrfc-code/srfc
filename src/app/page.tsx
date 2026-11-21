import Link from "next/link";
import { getSouthwellFixtures } from "@/lib/rfu";
import { getSheetEvents, getSheetSponsors, getSheetSettings, getSheetTeams } from "@/lib/sheets";
import { FixtureCard } from "@/components/FixtureCard";
import { HeroSection } from "@/components/HeroSection";
import { SquadSelector } from "@/components/SquadSelector";
import { EventCard } from "./events/EventCard";

export const revalidate = 300; // 5 minutes — synced with Google Sheets cache

export default async function HomePage() {
  // Fetch in parallel — RFU fixtures + Sheet data
  const [rfuFixtures, sheetEvents, sponsors, settings, sheetTeams] = await Promise.all([
    getSouthwellFixtures(),
    getSheetEvents(),
    getSheetSponsors(),
    getSheetSettings(),
    getSheetTeams(),
  ]);

  const nextFixture = rfuFixtures.find((f) => f.status === "upcoming") ?? null;

  // Social events from Google Sheets (type = social | other)
  const socialEvents = sheetEvents
    .filter((e) => ["social", "other"].includes(e.type) && e.cancelled?.toUpperCase() !== "TRUE")
    .slice(0, 3);

  // Time-bounded banner from Settings sheet
  const bannerImageUrl = settings["banner_image_url"] ?? "";
  const bannerExpires = settings["banner_expires"] ?? "";
  const isBannerActive =
    bannerImageUrl !== "" &&
    (bannerExpires === "" || Date.now() <= new Date(`${bannerExpires}T23:59:59Z`).getTime());

  return (
    <>
      {/* Hero */}
      <HeroSection nextFixture={nextFixture} expires={bannerExpires} imageURL={bannerImageUrl} activeBanner={isBannerActive} />

      {/* Club Intro */}
      <section className="bg-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <span className="text-maroon font-display font-bold text-sm tracking-widest uppercase mb-3 block">
                Welcome to
              </span>
              <h2 className="font-display font-bold text-4xl lg:text-5xl text-slate mb-5 leading-tight">
                RUGBY FOR<br />
                <span className="text-maroon">EVERYONE</span>
              </h2>
              <p className="font-body text-muted text-lg leading-relaxed mb-4">
                Founded in 1922 from the roots of The Minster School, Southwell RFC is a
                friendly, inclusive community club at the heart of Nottinghamshire rugby.
                We welcome players of all ages and abilities — from your first muddy U6 session
                to running out for the 1st XV.
              </p>
              <p className="font-body text-muted leading-relaxed mb-8">
                We field teams across senior men, women, colts, and a full mini/junior programme
                covering U6 through to U18. Not played before? Come along to training — we
                promise the clubhouse bar makes it worth it.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacts"
                  className="inline-flex items-center gap-2 bg-maroon hover:bg-maroon-deep text-white font-body font-semibold px-6 py-3 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-maroon/30"
                >
                  🏉 Get Involved
                </Link>
                <Link
                  href="/history"
                  className="inline-flex items-center gap-2 border-2 border-maroon text-maroon hover:bg-maroon hover:text-white font-body font-semibold px-6 py-3 rounded-lg transition-all duration-200"
                >
                  Our Story
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {[
                { num: "1922", label: "Year Founded", sub: "Over 100 years of rugby" },
                { num: "11+", label: "Teams", sub: "From U6 to Senior Men" },
                { num: "Minis", label: "to Masters", sub: "Welcoming all abilities" },
                { num: "NG25", label: "0QN", sub: "Park Lane, Southwell" },
              ].map((stat) => (
                <div
                  key={stat.num}
                  className="bg-cream border border-border rounded-2xl p-6 text-center hover:border-maroon/30 hover:shadow-md transition-all duration-200"
                >
                  <span className="font-display font-bold text-3xl lg:text-4xl text-maroon block">{stat.num}</span>
                  <span className="font-display font-bold text-sm text-slate block mt-1">{stat.label}</span>
                  <span className="font-body text-xs text-muted block mt-1">{stat.sub}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Find Your Team */}
      <section id="FindYourTeam" className="bg-cream py-14 lg:py-20 border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate mb-3">
              FIND YOUR TEAM
            </h2>
            <p className="font-body text-muted max-w-xl mx-auto">
              We have a squad for everyone. Select your category to find training times and how to get started.
            </p>
          </div>
          {/* sheetTeams is [] when not configured — SquadSelector uses built-in fallback */}
          <SquadSelector sheetTeams={sheetTeams} />
        </div>
      </section>

      {/* Upcoming Fixtures from RFU API */}
      {rfuFixtures.filter((f) => f.status === "upcoming").length > 0 && (
        <section className="bg-maroon-deep py-14 lg:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display font-bold text-2xl lg:text-3xl text-white">
                UPCOMING FIXTURES
              </h2>
              <Link href="/events" className="font-body text-gold hover:text-white text-sm font-semibold transition-colors">
                View all →
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {rfuFixtures
                .filter((f) => f.status === "upcoming")
                .slice(0, 3)
                .map((fixture) => (
                  <FixtureCard key={fixture.id} fixture={fixture} dark />
                ))}
            </div>
          </div>
        </section>
      )}

      {/* Social Events from Google Sheets */}
      {socialEvents.length > 0 && (
        <section className="bg-white py-14 lg:py-20 border-t border-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate">
                  WHAT'S ON AT THE CLUB
                </h2>
                <p className="font-body text-muted mt-1">More than just rugby</p>
              </div>
              <Link href="/events" className="hidden sm:block font-body text-maroon hover:text-maroon-deep text-sm font-semibold transition-colors">
                All events →
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {socialEvents.map((event, i) => (
                <EventCard key={i} event={event}></EventCard>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Sponsors from Google Sheets */}
      {sponsors.length > 0 ? (
        <section className="bg-cream border-t border-border py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <p className="text-center font-body text-muted text-xs font-semibold tracking-widest uppercase mb-6">
              Our Club Partners &amp; Sponsors
            </p>
            <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
              {sponsors.map((sponsor) =>
                sponsor.logo ? (
                  <a key={sponsor.name} href={sponsor.url ?? "#"} target="_blank" rel="noopener noreferrer"
                    className="opacity-60 hover:opacity-100 transition-opacity">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {sponsor.logowhite ?
                      <img src={sponsor.logo} alt={sponsor.name} className="h-10 object-contain bg-black p-3 rounded" />
                      :
                      <img src={sponsor.logo} alt={sponsor.name} className="h-10 object-contain" />}
                  </a>
                ) : (
                  <a key={sponsor.name} href={sponsor.url ?? "#"} target="_blank" rel="noopener noreferrer"
                    className="font-display font-bold text-lg text-border hover:text-muted transition-colors uppercase">
                    {sponsor.name}
                  </a>
                )
              )}
            </div>
            <p className="text-center mt-6">
              <a href="/contacts" className="font-body text-xs text-maroon/60 hover:text-maroon transition-colors">
                Become a club partner →
              </a>
            </p>
          </div>
        </section>
      ) : (
        /* Placeholder sponsors strip when sheet not yet configured */
        <section className="bg-cream border-t border-border py-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="font-body text-muted text-xs font-semibold tracking-widest uppercase mb-4">Our Club Partners</p>
            <p className="font-body text-muted/60 text-sm">
              Sponsor logos will appear here once configured in the club spreadsheet.{" "}
              <a href="/contacts" className="text-maroon hover:underline">Become a partner →</a>
            </p>
          </div>
        </section>
      )}
    </>
  );
}
