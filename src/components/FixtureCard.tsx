import type { Fixture } from "@/lib/rfu";

interface FixtureCardProps {
  fixture: Fixture;
  dark?: boolean;
}

export function FixtureCard({ fixture, dark = false }: FixtureCardProps) {
  const date = new Date(fixture.date);
  const isResult = fixture.status === "result";
  const isPostponed = fixture.status === "postponed";

  const dateStr = date.toLocaleDateString("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  });

  const cardBase = dark
    ? "bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/15"
    : "bg-white border border-border hover:border-maroon/30 hover:shadow-md";

  const textPrimary = dark ? "text-white" : "text-slate";
  const textMuted = dark ? "text-white/60" : "text-muted";
  const teamBadge = dark
    ? "bg-white/20 text-white/80"
    : "bg-maroon/10 text-maroon";

  return (
    <div className={`${cardBase} rounded-2xl p-5 transition-all duration-200`}>
      {/* Top row */}
      <div className="flex items-center justify-between mb-4">
        <span className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${teamBadge}`}>
          {fixture.team}
        </span>
        <div className="flex items-center gap-2">
          {isPostponed && (
            <span className="font-body text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-check/20 text-amber-check">
              POSTPONED
            </span>
          )}
          <span
            className={`font-body text-xs font-semibold px-2.5 py-1 rounded-full ${
              fixture.home
                ? dark
                  ? "bg-green-open/30 text-emerald-300"
                  : "bg-green-open/10 text-green-open"
                : dark
                ? "bg-white/10 text-white/60"
                : "bg-slate/10 text-slate"
            }`}
          >
            {fixture.home ? "HOME" : "AWAY"}
          </span>
        </div>
      </div>

      {/* Score / Teams */}
      <div className="flex items-center justify-between gap-2 my-3">
        <span className={`font-display font-bold text-lg leading-tight flex-1 text-right ${textPrimary}`}>
          {fixture.homeTeam}
        </span>

        {isResult ? (
          <div className="flex-shrink-0 text-center">
            <span className="font-display font-extrabold text-2xl text-gold">
              {fixture.homeScore} – {fixture.awayScore}
            </span>
          </div>
        ) : (
          <span className={`font-display font-bold text-lg ${dark ? "text-gold" : "text-maroon"} flex-shrink-0`}>
            vs
          </span>
        )}

        <span className={`font-display font-bold text-lg leading-tight flex-1 text-left ${textPrimary}`}>
          {fixture.awayTeam}
        </span>
      </div>

      {/* Date / Venue */}
      <div className={`border-t ${dark ? "border-white/10" : "border-border"} pt-3 mt-3 flex items-center justify-between`}>
        <span className={`font-body text-xs ${textMuted}`}>
          📅 {dateStr} · {fixture.time}
        </span>
        <a
          href={`https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(`${fixture.homeTeam} vs ${fixture.awayTeam}`)}&dates=${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z/${date.toISOString().replace(/[-:]/g, "").split(".")[0]}Z&details=${encodeURIComponent(fixture.competition)}&location=${encodeURIComponent(fixture.venue)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`font-body text-xs ${dark ? "text-gold/70 hover:text-gold" : "text-maroon/60 hover:text-maroon"} transition-colors`}
          title="Add to Google Calendar"
        >
          + Cal
        </a>
      </div>
    </div>
  );
}
