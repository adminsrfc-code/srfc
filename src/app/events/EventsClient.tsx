"use client";

import { useState } from "react";
import type { SheetEvent, SheetSetting } from "@/lib/sheets";
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
              <div
                key={`${event.title}-${i}`}
                className="bg-white border border-border rounded-2xl p-5 hover:border-maroon/30 hover:shadow-sm transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="bg-gold/20 text-maroon font-body text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                    {event.type}
                  </span>
                  <span className="font-body text-muted text-xs">
                    {new Date(event.date).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="font-display font-bold text-lg text-slate mb-1">{event.title}</h3>
                {event.notes && (
                  <p className="font-body text-muted text-sm leading-relaxed">{event.notes}</p>
                )}
                <div className="flex justify-between items-center mt-2">
                  {event.time && (
                    <p className="font-body text-muted text-xs mt-2">⏰ {event.time}</p>
                  )}
                  {event.payment && (
                    <p className="font-body text-muted text-xs "><Link href={event.payment} >Pay here</Link></p>
                  )}
                </div>
              </div>
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
