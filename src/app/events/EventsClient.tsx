"use client";

import type { SheetEvent } from "@/lib/sheets";
import { EventCard } from "./EventCard";
import Link from "next/link";

interface EventsClientProps {
  socialEvents: SheetEvent[];
  bookingLink: string;
}

export function EventsClient({ socialEvents, bookingLink }: EventsClientProps) {

  return (
    <>
      <div className="w-full">
        <h2 className="font-display font-bold text-2xl text-slate mb-4">CLUB EVENTS</h2>

        {socialEvents.length === 0 ? (
          <div className="bg-white border border-border rounded-2xl p-6 text-center">
            <p className="font-body text-muted text-sm">
              Club events are added by the club secretary in the club spreadsheet.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {socialEvents.map((event, i) => (
              <EventCard key={i} event={event}></EventCard>
            ))}
          </div>
        )}

        {/* Clubhouse info card */}
        <div className="bg-maroon-deep rounded-2xl p-5 text-white mt-4">
          <h3 className="font-display font-bold text-lg mb-2">THE CLUBHOUSE</h3>
          <p className="font-body text-white/70 text-sm leading-relaxed mb-3">
            Bar open after all home matches. Hot food on selected matchdays.
          </p>
          <p className="font-body text-white/60 text-xs">
            Park Lane, Southwell, NG25 0QN<br />
            📞 01636 812576
          </p>
        </div>
      </div >
      <div className="bg-maroon rounded-2xl p-5 text-white mt-4">
        <h3 className="font-display font-bold text-lg mb-2">Bookings</h3>
        <p className="font-body text-white/70 text-sm leading-relaxed mb-3">
          Book an event<Link className="text-white ml-1 bold" href={bookingLink} >here</Link>
        </p>
        <p className="font-body text-white/60 text-xs">
          Park Lane, Southwell, NG25 0QN<br />
          📞 01636 812576
        </p>
      </div>
    </>
  );
}
