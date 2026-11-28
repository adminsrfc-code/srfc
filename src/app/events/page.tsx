import type { Metadata } from "next";
import { getSheetEvents, getSheetSettings } from "@/lib/sheets";
import { EventsClient } from "./EventsClient";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Southwell RFC fixtures, results and upcoming events. Counties 1 Midlands East (North) and all team schedules.",
};

export const revalidate = 300;


function getLocalDateString(now = new Date()): string {
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default async function EventsPage() {
  // RFU API owns ALL fixture data — no duplicate entry in sheets
  // Google Sheets only provides social/club events (bonfire night, Christmas party, etc.)
  const [sheetEvents, settings] = await Promise.all([
    getSheetEvents(),
    getSheetSettings()
  ]);

  const todayStr = getLocalDateString();

  const socialEvents = sheetEvents.filter(
    (e) => e.date >= todayStr
  );

  // Time-bounded banner from Settings sheet
  const imageURL = settings["banner_image_url"] ?? "";
  const expires = settings["banner_expires"] ?? "";
  const isBannerActive =
    imageURL !== "" &&
    (expires === "" || Date.now() <= new Date(`${expires}T23:59:59Z`).getTime());

  return (
    <>
      {isBannerActive ? (
        <div className="pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-4xl mb-5 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* Left Column: Events Section */}
            <div className="w-full">
              <EventsClient socialEvents={socialEvents} bookingLink={settings.booking} />
            </div>

            {/* Right Column: Banner Image */}
            <div className="w-full lg:mt-10 flex justify-center">
              <img
                src={imageURL}
                alt="Club announcement"
                width={800}
                height={500}
                className="w-full h-auto object-cover rounded-2xl overflow-hidden shadow-lg border border-border"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="pt-16 lg:pt-20 px-4 sm:px-6 lg:px-8 flex justify-center">
          <div className="w-full max-w-4xl mb-5">
            <EventsClient socialEvents={socialEvents} bookingLink={settings.booking} />
          </div>
        </div>
      )}
    </>
  )
};
