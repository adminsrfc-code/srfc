"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";

const links = [
  { label: "Fixtures ", href: "/fixtures" },
  { label: "Events", href: "/events" },
  { label: "Club History", href: "/history" },
  { label: "Contacts", href: "/contacts" },
];

// External links shown in desktop nav alongside internal links
const externalLinks = [
  {
    label: "🛍 Kit Shop",
    href: "https://www.gilbertrugby.com/collections/southwell-rfc",
    title: "Official Southwell RFC kit — powered by Gilbert Rugby",
  },
];

type NavProps = {
  /** Membership sign-up URL — passed from layout (sourced from Google Sheets settings). */
  membershipUrl: string;
};

export function Nav({ membershipUrl }: NavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
          ? "bg-maroon-deep shadow-lg shadow-maroon-deep/30"
          : "bg-maroon-deep/95 backdrop-blur-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group flex-shrink-0">
            <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full overflow-hidden border-2 border-gold/40 flex-shrink-0">
              <Image
                src="/badge.jpg"
                alt="Southwell RFC badge"
                width={48}
                height={48}
                className="w-full h-full object-cover"
                priority
              />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-display font-bold text-lg lg:text-xl tracking-wide leading-none block">
                SOUTHWELL RFC
              </span>
              <span className="text-gold text-xs font-body font-medium tracking-widest block">
                EST. 1922
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white/80 hover:text-white font-body font-medium text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                title={link.title}
                className="text-gold/80 hover:text-gold font-body font-medium text-sm px-4 py-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* CTA + Hamburger */}
          <div className="flex items-center gap-3">
            <a
              href={membershipUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 bg-maroon-vibrant hover:bg-red-700 text-white font-body font-semibold text-sm px-4 py-2 rounded-lg transition-all duration-200 hover:shadow-lg hover:shadow-maroon-vibrant/40"
            >
              🏉 Join Us
            </a>
            <button
              onClick={() => setOpen(!open)}
              className="md:hidden p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
              aria-label="Toggle menu"
            >
              <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
              <span className="block w-6 h-0.5 bg-white mb-1.5 transition-all" />
              <span className="block w-6 h-0.5 bg-white transition-all" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden bg-maroon-deep border-t border-white/10">
          <div className="px-4 py-3 space-y-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="block text-white/80 hover:text-white font-body font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            {externalLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="block text-gold/80 hover:text-gold font-body font-medium px-3 py-3 rounded-lg hover:bg-white/10 transition-colors"
              >
                {link.label} ↗
              </a>
            ))}
            <a
              href={membershipUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block bg-maroon-vibrant text-white font-body font-semibold px-3 py-3 rounded-lg text-center mt-3"
            >
              🏉 Join Southwell RFC
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
