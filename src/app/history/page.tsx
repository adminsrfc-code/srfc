import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Club History",
  description:
    "The story of Southwell RFC — founded in 1922 from the roots of The Minster School, Southwell. Over 100 years of community rugby in Nottinghamshire.",
};

const milestones = [
  { year: "1922", event: "Club founded from The Minster School, Southwell" },
  { year: "1950s", event: "Moved to permanent home at Park Lane ground" },
  { year: "1970s", event: "Junior and mini rugby sections established" },
  { year: "1990s", event: "Women's rugby introduced — the Peaches are born" },
  { year: "2000s", event: "Floodlights installed; year-round training capability" },
  { year: "2010s", event: "Club reaches Counties 1 Midlands East (North)" },
  { year: "2022", event: "Centenary year — 100 years of Southwell RFC" },
  { year: "Today", event: "11+ teams, from U6 Minis to Senior Men and Women" },
];

export default function HistoryPage() {
  return (
    <div className="pt-16 lg:pt-20">
      {/* Header */}
      <div className="bg-maroon-deep text-white py-14 lg:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" aria-hidden="true">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-gold blur-3xl -translate-y-1/2 translate-x-1/2" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-body text-gold text-xs font-semibold tracking-widest uppercase block mb-3">
            Founded 1922
          </span>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-white">
            OUR STORY
          </h1>
          <p className="font-body text-white/60 mt-4 text-lg max-w-xl">
            Over a century of community rugby in the heart of Nottinghamshire.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">

          {/* Article */}
          <article className="lg:col-span-2 prose prose-slate max-w-none">
            <h2 className="font-display font-bold text-3xl text-slate !mb-4 !mt-0">
              FROM MINSTER SCHOOL TO PARK LANE
            </h2>
            <p className="font-body text-muted text-lg leading-relaxed">
              Southwell Rugby Football Club was founded in 1922, growing out of rugby played at
              The Minster School in Southwell — one of the oldest schools in Nottinghamshire.
              What began as a school sport quickly grew into a community institution, as old
              boys and local players came together to form a proper club.
            </p>
            <p className="font-body text-muted leading-relaxed">
              The club found a permanent home at Park Lane, Southwell — a ground that has hosted
              more than a century of Saturday afternoon battles, junior festivals, and post-match
              celebrations. The clubhouse has been extended and improved over the decades,
              becoming a central hub for the town's social life as well as its rugby.
            </p>

            <h2 className="font-display font-bold text-3xl text-slate !mb-4 !mt-10">
              A CLUB FOR THE WHOLE COMMUNITY
            </h2>
            <p className="font-body text-muted leading-relaxed">
              Today, Southwell RFC is one of the most inclusive rugby clubs in the East Midlands.
              We field teams from Under 6 (our youngest Minis) all the way through to senior
              men competing in Counties 1 Midlands East (North), women playing in the
              Nottinghamshire leagues, and our beloved 3rd XV — the Bandits — who play the
              game the way it should be played: competitively enough to win, sociably enough
              to enjoy it.
            </p>
            <p className="font-body text-muted leading-relaxed">
              We believe rugby is for everyone. You don't need experience, a certain build, or
              a certain background. Turn up, give it a go, and you'll find a welcoming club that
              will challenge you on the pitch and look after you off it.
            </p>

            <h2 className="font-display font-bold text-3xl text-slate !mb-4 !mt-10">
              THE CENTENARY (2022)
            </h2>
            <p className="font-body text-muted leading-relaxed">
              In 2022, we celebrated 100 years of Southwell RFC with a year of special events,
              a centenary dinner, and a commemorative booklet documenting the club's remarkable
              history. It was a reminder of how much the club means to the town — and a
              commitment to the next 100 years.
            </p>

            <h2 className="font-display font-bold text-3xl text-slate !mb-4 !mt-10">
              THE GROUND & FACILITIES
            </h2>
            <p className="font-body text-muted leading-relaxed">
              Park Lane offers multiple pitches with floodlighting for evening training, a
              purpose-built clubhouse with a licensed bar, function room available for hire,
              and full changing facilities for players and match officials. We're located in the
              heart of Southwell — just minutes from the Minster and the town centre.
            </p>
            <p className="font-body text-muted leading-relaxed">
              The clubhouse hosts regular social events, quiz nights, fundraisers, and the
              annual Bonfire & Fireworks display — one of the highlights of the Southwell
              social calendar.
            </p>
          </article>

          {/* Sidebar */}
          <aside className="space-y-6">
            {/* Club facts */}
            <div className="bg-white border border-border rounded-2xl overflow-hidden">
              <div className="bg-maroon px-5 py-4">
                <h3 className="font-display font-bold text-lg text-white">CLUB FACTS</h3>
              </div>
              <div className="divide-y divide-border">
                {[
                  { label: "Founded", value: "1922" },
                  { label: "Home Ground", value: "Park Lane, Southwell" },
                  { label: "Postcode", value: "NG25 0QN" },
                  { label: "Phone", value: "01636 812576" },
                  { label: "Colours", value: "Maroon & White" },
                  { label: "Division", value: "Counties 1 Midlands East (North)" },
                  { label: "Teams", value: "11+ across all ages" },
                ].map((fact) => (
                  <div key={fact.label} className="px-5 py-3 flex justify-between items-start gap-3">
                    <span className="font-body text-muted text-sm">{fact.label}</span>
                    <span className="font-body text-slate text-sm font-semibold text-right">
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* RFU values */}
            <div className="bg-cream border border-border rounded-2xl p-5">
              <h3 className="font-display font-bold text-lg text-slate mb-3">RFU CORE VALUES</h3>
              <ul className="space-y-2">
                {["Teamwork", "Respect", "Enjoyment", "Discipline", "Sportsmanship"].map((v) => (
                  <li key={v} className="flex items-center gap-2 font-body text-muted text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-maroon flex-shrink-0" />
                    {v}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        {/* Timeline */}
        <div className="mt-16 lg:mt-24">
          <h2 className="font-display font-bold text-3xl lg:text-4xl text-slate mb-10 text-center">
            CLUB MILESTONES
          </h2>
          <div className="relative">
            {/* Centre line */}
            <div className="absolute left-4 lg:left-1/2 top-0 bottom-0 w-0.5 bg-border lg:-translate-x-0.5" />

            <div className="space-y-8">
              {milestones.map((m, i) => (
                <div
                  key={m.year}
                  className={`relative flex gap-6 lg:gap-0 ${
                    i % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Dot */}
                  <div className="absolute left-4 lg:left-1/2 top-4 w-3 h-3 rounded-full bg-maroon border-2 border-white shadow-md lg:-translate-x-1.5" />

                  {/* Spacer for alternating layout */}
                  <div className="hidden lg:block lg:w-1/2" />

                  {/* Card */}
                  <div className={`ml-10 lg:ml-0 lg:w-1/2 ${i % 2 === 0 ? "lg:pr-12" : "lg:pl-12"}`}>
                    <div className="bg-white border border-border rounded-xl p-4 hover:border-maroon/30 hover:shadow-sm transition-all">
                      <span className="font-display font-bold text-maroon text-lg block">
                        {m.year}
                      </span>
                      <p className="font-body text-slate text-sm leading-relaxed mt-1">
                        {m.event}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
