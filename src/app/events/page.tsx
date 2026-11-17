import type { Metadata } from "next";
import { getSouthwellFixtures } from "@/lib/rfu";
import { getSheetEvents } from "@/lib/sheets";
import { EventsClient } from "./EventsClient";

export const metadata: Metadata = {
  title: "Events",
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
      <EventsClient fixtures={fixtures} socialEvents={socialEvents} />
    </div>
  );
}
