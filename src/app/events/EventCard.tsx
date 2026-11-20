import { SheetEvent } from "@/lib/sheets";
import Link from "next/link";

interface EventCardProps {
    event: SheetEvent;
}

export function EventCard({ event }: EventCardProps) {

    return (
        <div
            key={event.title + event.date}
            className="flex flex-col bg-cream border border-border rounded-2xl p-6 hover:border-maroon/30 hover:shadow-md transition-all duration-200"
        >
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

            <h3 className="font-display font-bold text-xl text-slate mb-2">
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
                    {event.payment && (
                        <p className="font-body text-muted text-xs">
                            <Link href={event.payment} className="underline hover:text-slate">
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
    )
}
