import type { Metadata } from "next";
import { getSouthwellFixtures } from "@/lib/rfu";
import { getSheetEvents } from "@/lib/sheets";
import { EventsClient } from "./EventsClient";

export const metadata: Metadata = {
  title: "Fixtures & Events",
  description:
    "Southwell RFC fixtures, results and upcoming events. Counties 1 Midlands East (North) and all team schedules.",
};

export const revalidate = 300;

export default async function EventsPage() {
  // RFU API owns ALL fixture data — no duplicate entry in sheets
  // Google Sheets only provides social/club events (bonfire night, Christmas party, etc.)
  const [fixtures, sheetEvents] = await Promise.all([
    getSouthwellFixtures(),
    getSheetEvents(),
  ]);

  // Only non-cancelled events from the sheet — social, training, other
  // (fixtures are already excluded upstream in getSheetEvents)
  const socialEvents = sheetEvents.filter(
    (e) => e.cancelled?.toUpperCase() !== "TRUE"
  );

  return (
    <div className="pt-16 lg:pt-20">
      <div className="bg-maroon-deep text-white py-14 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <span className="font-body text-gold text-xs font-semibold tracking-widest uppercase block mb-3">
            2025–2026 Season
          </span>
          <h1 className="font-display font-extrabold text-4xl lg:text-6xl text-white">
            FIXTURES &<br />EVENTS
          </h1>
          <p className="font-body text-white/60 mt-4 text-lg max-w-xl">
            Fixtures pulled live from England Rugby. Club events managed by the secretary.
          </p>
        </div>
      </div>

      <EventsClient fixtures={fixtures} socialEvents={socialEvents} />
    </div>
  );
}
