import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PitchStatusBanner } from "@/components/PitchStatusBanner";
import { getSheetSettings, getSheetSponsors } from "@/lib/sheets";

export const revalidate = 300; // 5 min — matches sheet cache

export const metadata: Metadata = {
  title: {
    default: "Southwell RFC | Rugby for Everyone in Nottinghamshire",
    template: "%s | Southwell RFC",
  },
  description:
    "Southwell Rugby Football Club — founded 1922. Community rugby in Nottinghamshire for all ages and abilities, from Under 6s to senior level. Based at Park Lane, Southwell NG25 0QN.",
  keywords: ["Southwell RFC", "Southwell Rugby Club", "Nottinghamshire rugby", "rugby club"],
  openGraph: {
    siteName: "Southwell RFC",
    type: "website",
    locale: "en_GB",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Southwell RFC — Rugby for Everyone in Nottinghamshire",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/opengraph-image.jpg"],
  },
  metadataBase: new URL("https://www.southwellrfc.com"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch pitch status from Google Sheets settings tab
  const [sponsors, settings] = await Promise.all([
    getSheetSponsors(),
    getSheetSettings(),
  ]);

  const pitchStatus = settings["pitch_status"] ?? "OPEN";
  const pitchMessage = settings["pitch_message"] ?? "";
  const membershipUrl =
    settings["membership_url"] ??
    "https://www.southwellrfc.com/a/membership-subscriptions-information-inc-online-registration-61282.html?page=2";

  return (
    <html lang="en">
      <head>
        {/* Prevent flash of un-themed browser UI on systems with dark-mode preference */}
        <meta name="color-scheme" content="light" />
      </head>
      <body className="min-h-screen flex flex-col bg-cream">
        {/* Skip link — allows keyboard users to bypass repeated navigation */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-maroon focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:font-body focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        {/* Pitch status bar — top of every page, updated from Google Sheets */}
        <PitchStatusBanner status={pitchStatus} message={pitchMessage} />
        <Nav membershipUrl={membershipUrl} />
        <main id="main-content" className="flex-1">{children}</main>
        <Footer membershipUrl={membershipUrl} sponsors={sponsors} />
      </body>
    </html>
  );
}
