"use client";
import { useEffect, useMemo, useState } from "react";
import GlitchText from "@/components/effects/GlitchText";

type CountdownProps = {
  target: Date | string;
  label?: string;
  compact?: boolean;
};

function formatRemaining(ms: number) {
  if (ms <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  return { days, hours, minutes, seconds };
}

export default function CountdownTimer({ target, label, compact }: CountdownProps) {
  const targetTime = useMemo(() => (typeof target === "string" ? new Date(target) : target), [target]);
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const remainingMs = Math.max(0, targetTime.getTime() - now);
  const { days, hours, minutes, seconds } = formatRemaining(remainingMs);
  const done = remainingMs <= 0;

  return (
    <div className="relative w-[280px]">
      {/* Neon gradient aura */}
      <div
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "conic-gradient(from 180deg at 50% 50%, rgba(255,0,255,0.6), rgba(0,255,255,0.6), rgba(51,255,0,0.6), rgba(255,0,255,0.6))",
          filter: "blur(16px)",
          opacity: 0.35,
        }}
      />
      <div className="rounded-md border border-fuchsia-500/60 bg-black/70 backdrop-blur-sm shadow-[0_0_18px_rgba(255,0,255,0.35)]">
        <div className={compact ? "px-2 pt-1 pb-0 flex items-center justify-between" : "px-3 pt-2 pb-1 flex items-center justify-between"}>
          <GlitchText text="COUNTDOWN" className="text-fuchsia-400 font-bold text-sm" />
          <div className="h-1 w-20 bg-[linear-gradient(90deg,#ff00ff,#00ffff,#33ff00)] animate-pulse opacity-60 rounded" />
        </div>
        <div className={compact ? "px-2 pb-1" : "px-3 pb-3"}>
          {done ? (
            <div className={compact ? "text-lg font-bold glow-text text-[#33ff00]" : "text-base font-bold glow-text text-[#33ff00]"}>Hackathon Day!</div>
          ) : (
            <>
              <div className={compact ? "text-base text-fuchsia-200" : "text-[11px] text-fuchsia-200"}>
                {label ?? "Hackathon starts in:"}
              </div>
              <div className={compact ? "grid grid-cols-2 sm:grid-cols-4 gap-1 mt-1" : "grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2"}>
                {/* Days */}
                <div className={compact ? "px-2 py-1 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50" : "px-3 py-2 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50"}>
                  <div className={compact ? "text-4xl leading-tight font-mono text-[#33ff00] glow-text" : "text-2xl font-mono text-[#33ff00] glow-text"}>{days}</div>
                  <div className="text-[10px] uppercase tracking-wider text-cyan-200">Days</div>
                </div>
                {/* Hours */}
                <div className={compact ? "px-2 py-1 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50" : "px-3 py-2 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50"}>
                  <div className={compact ? "text-4xl leading-tight font-mono text-[#33ff00] glow-text" : "text-2xl font-mono text-[#33ff00] glow-text"}>{String(hours).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-wider text-cyan-200">Hours</div>
                </div>
                {/* Minutes */}
                <div className={compact ? "px-2 py-1 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50" : "px-3 py-2 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50"}>
                  <div className={compact ? "text-4xl leading-tight font-mono text-[#33ff00] glow-text" : "text-2xl font-mono text-[#33ff00] glow-text"}>{String(minutes).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-wider text-cyan-200">Minutes</div>
                </div>
                {/* Seconds */}
                <div className={compact ? "px-2 py-1 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50 flicker" : "px-3 py-2 text-center rounded border border-cyan-400/60 shadow-[0_0_12px_rgba(0,255,255,0.35)] bg-black/50 flicker"}>
                  <div className={compact ? "text-4xl leading-tight font-mono text-[#33ff00] glow-text" : "text-2xl font-mono text-[#33ff00] glow-text"}>{String(seconds).padStart(2, "0")}</div>
                  <div className="text-[10px] uppercase tracking-wider text-cyan-200">Seconds</div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
