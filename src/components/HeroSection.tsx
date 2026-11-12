import Link from "next/link";
import Image from "next/image";
import type { Fixture } from "@/lib/rfu";

interface HeroSectionProps {
  nextFixture: Fixture | null;
}

export function HeroSection({ nextFixture }: HeroSectionProps) {
  const fixtureDate = nextFixture
    ? new Date(nextFixture.date).toLocaleDateString("en-GB", {
      weekday: "short",
      day: "numeric",
      month: "short",
    })
    : null;

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-16 lg:pt-20">
      {/* Hero photo background */}
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/BanditsRun.png"
          alt="Southwell RFC match action"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw"
        />
      </div>

      {/* Maroon gradient overlay — keeps text legible over the photo */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-maroon-deep/92 via-maroon/80 to-maroon-vibrant/70"
        aria-hidden="true"
      />

      {/* Subtle dot pattern over the overlay */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <circle cx="30" cy="30" r="1.5" fill="white" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Gold accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Main text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6">
              <span className="w-2 h-2 rounded-full bg-green-open animate-pulse" />
              <span className="font-body text-white/80 text-sm font-medium">
                Now Welcoming New Members
              </span>
            </div>

            <h1 className="font-display font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-4">
              RUGBY FOR
              <br />
              <span className="text-gold">EVERYONE</span>
              <br />
              IN NOTTS.
            </h1>

            <p className="font-body text-white/70 text-lg lg:text-xl leading-relaxed mb-4 max-w-lg">
              From your first muddy U6 session to senior rugby and social tours —
              Southwell RFC has been the home of community rugby in Nottinghamshire since 1922.
            </p>

            <p className="font-body text-gold/80 text-sm font-medium mb-8 tracking-wide">
              All ages · All abilities · Always welcoming
            </p>

            <div className="flex flex-wrap gap-4">
              <Link
                href="#FindYourTeam"
                className="inline-flex items-center gap-2 bg-white text-maroon-deep hover:bg-cream font-body font-bold px-8 py-4 rounded-xl text-base transition-all duration-200 hover:shadow-xl hover:shadow-white/20 hover:-translate-y-0.5"
              >
                🏉 Find Your Team
              </Link>
              <Link
                href="/events"
                className="inline-flex items-center gap-2 border-2 border-white/30 text-white hover:border-white hover:bg-white/10 font-body font-semibold px-8 py-4 rounded-xl text-base backdrop-blur-sm transition-all duration-200"
              >
                📅 This Week's Fixtures
              </Link>
            </div>
          </div>

          {/* Next Fixture / Club Card */}
          <div className="flex flex-col gap-4">
            {/* Next Fixture card */}
            {nextFixture ? (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-body text-white/60 text-xs font-semibold tracking-widest uppercase">
                    Next Fixture
                  </span>
                  <span className="bg-maroon-vibrant/80 text-white font-body text-xs font-semibold px-3 py-1 rounded-full">
                    {nextFixture.home ? "HOME" : "AWAY"}
                  </span>
                </div>
                <div className="text-center py-2">
                  <p className="font-body text-white/60 text-sm mb-1">{nextFixture.team}</p>
                  <div className="flex items-center justify-center gap-4 my-3">
                    <span className="font-display font-bold text-xl text-white text-right w-28 truncate">
                      {nextFixture.homeTeam}
                    </span>
                    <span className="font-display font-bold text-2xl text-gold px-3">vs</span>
                    <span className="font-display font-bold text-xl text-white text-left w-28 truncate">
                      {nextFixture.awayTeam}
                    </span>
                  </div>
                  <p className="font-body text-white/70 text-sm mt-2">
                    {fixtureDate} · {nextFixture.time}
                  </p>
                  <p className="font-body text-white/50 text-xs mt-1 truncate">
                    {nextFixture.venue}
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 text-center">
                <p className="font-display font-bold text-xl text-white mb-2">
                  TRAINING CONTINUES
                </p>
                <p className="font-body text-white/60 text-sm">
                  Check the fixtures page for the latest schedule
                </p>
              </div>
            )}

            {/* Club quick-facts */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: "🏆", label: "Est. 1922" },
                { icon: "👥", label: "11+ Teams" },
                { icon: "📍", label: "Southwell" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 text-center"
                >
                  <span className="text-2xl block mb-1">{item.icon}</span>
                  <span className="font-body text-white/80 text-xs font-medium">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
        <span className="font-body text-white/40 text-xs tracking-widest">SCROLL</span>
        <svg className="w-4 h-4 text-white/40" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </section>
  );
}
