"use client";
import clsx from "clsx";

interface Props {
  visible: boolean;
  details: {
    date?: string;
    location?: string;
    duration?: string;
  };
}

export default function SystemErrorBanner({ visible, details }: Props) {
  return (
    <div
      className={clsx(
        "fixed top-0 left-0 right-0 z-40 flex items-center justify-center",
        "bg-black/85 border-b-2 border-red-600 text-red-500",
        "px-4 py-2",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
        "transition-opacity duration-400"
      )}
    >
      <div className="flex items-center gap-3">
        <span className="glow-text animate-blink">SYSTEM ERROR</span>
        <span className="text-sm uppercase tracking-widest text-red-400">
          {details.date ? `DATE: ${details.date}` : "DATE: TBA"} • {details.duration ?? "36 HOURS"} • {details.location ?? "SRM University-AP"}
        </span>
      </div>
    </div>
  );
}
