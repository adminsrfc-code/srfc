"use client";

interface PitchStatusProps {
  status: string;
  message: string;
}

const statusConfig = {
  OPEN: {
    bg: "bg-green-open",
    dot: "bg-emerald-300",
    label: "PITCHES OPEN",
    icon: "🟢",
  },
  INSPECTION: {
    bg: "bg-amber-check",
    dot: "bg-yellow-200",
    label: "PITCH INSPECTION",
    icon: "🟡",
  },
  CLOSED: {
    bg: "bg-maroon-vibrant",
    dot: "bg-red-300",
    label: "PITCHES CLOSED",
    icon: "🔴",
  },
} as const;

export function PitchStatusBanner({ status, message }: PitchStatusProps) {
  const key = (status?.toUpperCase() as keyof typeof statusConfig) ?? "OPEN";
  const config = statusConfig[key] ?? statusConfig.OPEN;

  return (
    <div className={`${config.bg} text-white py-2 px-4`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${config.dot} animate-pulse flex-shrink-0`} />
          <span className="font-display font-bold text-xs tracking-widest">
            {config.label}
          </span>
          {message && (
            <span className="font-body text-xs text-white/80 hidden sm:block">
              — {message}
            </span>
          )}
        </div>
        <div className="flex items-center gap-3">
          <a
            href="/contacts"
            className="font-body text-xs text-white/70 hover:text-white transition-colors"
          >
            Clubhouse info →
          </a>
        </div>
      </div>
    </div>
  );
}
