import { SheetSponsor } from "@/lib/sheets";

interface SponsorStripProps {
  sponsors: SheetSponsor[];
}

export function SponsorsStrip({ sponsors }: SponsorStripProps) {
  return (
    <section>
      {sponsors.length > 0 && (
        <div className="bg-maroon-deep text-cream border-b border-cream/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-0 sm:h-9 flex items-center justify-center sm:justify-between gap-4">
            {/* Subtle Label (Hidden on mobile) */}
            <span className="hidden sm:inline-block font-body text-[10px] font-semibold tracking-widest uppercase text-cream/70 shrink-0">
              Club Partners
            </span>

            {/* Compact Logo Strip (Wraps onto two lines on mobile, single row on sm+) */}
            <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 sm:gap-7">
              {sponsors.map((sponsor) =>
                sponsor.logo ? (
                  <a
                    key={sponsor.name}
                    href={sponsor.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={sponsor.name}
                    className="opacity-75 hover:opacity-100 transition-opacity flex items-center"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {sponsor.logowhite ? (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-4 sm:h-5 w-auto object-contain"
                      />
                    ) : (
                      <img
                        src={sponsor.logo}
                        alt={sponsor.name}
                        className="h-4 sm:h-5 w-auto object-contain bg-cream/95 px-1.5 py-0.5 rounded-sm"
                      />
                    )}
                  </a>
                ) : (
                  <a
                    key={sponsor.name}
                    href={sponsor.url ?? "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-[11px] sm:text-xs text-cream/70 hover:text-cream transition-colors uppercase tracking-wider"
                  >
                    {sponsor.name}
                  </a>
                )
              )}
            </div>

            {/* Partner CTA */}
            <a
              href="/contacts"
              className="hidden md:inline-block font-body text-[10px] font-medium tracking-wider uppercase text-cream/70 hover:text-cream transition-colors shrink-0"
            >
              Partner with us →
            </a>
          </div>
        </div>
      )}
    </section>
  );
}