import { SheetEvent } from "@/lib/sheets";
import Link from "next/link";

interface EventCardProps {
    event: SheetEvent;
}

export function EventCard({ event }: EventCardProps) {

    const isCancelled = event.cancelled?.toUpperCase() === "TRUE";
    return (
        <div
            key={event.title + event.date}
            className={`relative overflow-hidden flex flex-col bg-cream border rounded-2xl p-6 transition-all duration-200 ${isCancelled
                ? "border-red-300/80 opacity-85"
                : "border-border hover:border-maroon/30 hover:shadow-md"
                }`}
        >
            {/* Red Cancelled Overlay */}
            {isCancelled && (
                <div
                    aria-label="Event Cancelled"
                    className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center bg-red-950/10"
                >
                    <span className="-rotate-12 border-4 border-red-600/85 bg-white/50 px-5 py-1.5 font-display text-2xl font-black uppercase tracking-widest text-red-600 shadow-sm">
                        Cancelled
                    </span>
                </div>
            )}

            <div className="flex items-start justify-between gap-3 mb-3">
                <span className="bg-maroon/10 text-maroon font-body font-semibold text-xs px-3 py-1 rounded-full capitalize">
                    {event.type}
                </span>
                <span className="font-body text-muted text-sm">
                    {new Date(event.date).toLocaleDateString("en-GB", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                    })}
                </span>
            </div>

            <h3
                className={`font-display font-bold text-xl text-slate mb-2 ${isCancelled ? "line-through decoration-red-600/60" : ""
                    }`}
            >
                {event.title}
            </h3>

            {event.notes && (
                <div className="mb-4">
                    {event.notes.split("\n").map((line, index) => (
                        <p key={index} className="font-body text-muted text-sm leading-relaxed">
                            {line}
                        </p>
                    ))}
                </div>
            )}

            <div className="mt-auto pt-3 flex flex-wrap justify-between items-center gap-2">
                {event.time && (
                    <p className="font-body text-muted text-xs">⏰ {event.time}</p>
                )}
                <div className="flex items-center gap-4">
                    {/* Hide the payment link if the event is cancelled */}
                    {event.payment && !isCancelled && (
                        <p className="font-body text-muted text-xs">
                            <Link target="_blank" href={event.payment} className="underline hover:text-slate">
                                Pay here
                            </Link>
                        </p>
                    )}
                    {event.contact && (
                        <p className="font-body text-muted text-xs">
                            Contact {event.name}: {event.contact}
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
