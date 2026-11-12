export function SponsorsStrip() {
  const sponsors = [
    { name: "Gascoines", url: "#" },
    { name: "Miller Homes", url: "#" },
    { name: "Local Business Partner", url: "#" },
    { name: "Your Logo Here", url: "/contacts" },
  ];

  return (
    <section className="bg-cream border-t border-border py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center font-body text-muted text-xs font-semibold tracking-widest uppercase mb-6">
          Our Club Partners & Sponsors
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 lg:gap-14">
          {sponsors.map((sponsor) => (
            <a
              key={sponsor.name}
              href={sponsor.url}
              className="font-display font-bold text-lg text-border hover:text-muted transition-colors duration-200 tracking-wide uppercase"
            >
              {sponsor.name}
            </a>
          ))}
        </div>
        <p className="text-center mt-6">
          <a
            href="/contacts"
            className="font-body text-xs text-maroon/60 hover:text-maroon transition-colors"
          >
            Become a club partner →
          </a>
        </p>
      </div>
    </section>
  );
}
