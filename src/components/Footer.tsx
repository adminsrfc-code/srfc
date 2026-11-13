import Link from "next/link";
import Image from "next/image";

const navLinks = [
  { label: "Fixtures & Events", href: "/events" },
  { label: "Club History", href: "/history" },
  { label: "Contacts", href: "/contacts" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://www.facebook.com/SouthwellRFC",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: "https://twitter.com/SouthwellRugby",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/southwellrfc",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
      </svg>
    ),
  },
];

type FooterProps = {
  /** Membership sign-up URL — passed from layout (sourced from Google Sheets settings). */
  membershipUrl: string;
};

export function Footer({ membershipUrl }: FooterProps) {
  return (
    <footer className="bg-maroon-deep text-white">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {/* Club Identity */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-gold/40 flex-shrink-0">
                <Image
                  src="/badge.jpg"
                  alt="Southwell RFC badge"
                  width={40}
                  height={40}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="text-white font-display font-bold text-lg tracking-wide block">
                  SOUTHWELL RFC
                </span>
                <span className="text-gold text-xs font-body tracking-widest">EST. 1922</span>
              </div>
            </div>
            <p className="text-white/60 font-body text-sm leading-relaxed mb-4">
              Southwell Rugby Football Club — founded from Minster School roots, serving the
              Nottinghamshire community for over 100 years.
            </p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/50 hover:text-gold transition-colors duration-200"
                  aria-label={s.label}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display font-bold text-base tracking-wide text-gold mb-4">
              QUICK LINKS
            </h3>
            <ul className="space-y-2">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white font-body text-sm transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://gms.rfu.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white font-body text-sm transition-colors duration-200"
                >
                  RFU Member Login ↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.gilbertrugby.com/collections/southwell-rfc"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/60 hover:text-gold font-body text-sm transition-colors duration-200"
                >
                  🛍 Club Kit Shop ↗
                </a>
              </li>
              <li>
                <a
                  href={membershipUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gold/60 hover:text-gold font-body text-sm transition-colors duration-200"
                >
                  🏉 Join / Membership Subs
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-display font-bold text-base tracking-wide text-gold mb-4">
              FIND US
            </h3>
            <address className="not-italic text-white/60 font-body text-sm leading-relaxed space-y-1">
              <p>Park Lane</p>
              <p>Southwell</p>
              <p>Nottinghamshire</p>
              <p>NG25 0QN</p>
            </address>
            <a
              href="tel:01636812576"
              className="block mt-3 text-white/60 hover:text-white font-body text-sm transition-colors duration-200"
            >
              📞 01636 812576
            </a>
          </div>
        </div>
      </div>

      {/* RFU Values bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/40 font-body text-xs text-center sm:text-left">
            © {new Date().getFullYear()} Southwell Rugby Football Club. All rights reserved.
          </p>
          <p className="text-white/30 font-body text-xs text-center italic">
            Teamwork · Respect · Enjoyment · Discipline · Sportsmanship
          </p>
        </div>
      </div>
    </footer>
  );
}
