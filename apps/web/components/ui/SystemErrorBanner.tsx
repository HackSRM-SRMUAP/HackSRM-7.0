"use client";
import { useEffect, useState } from "react";
import GlitchText from "@/components/effects/GlitchText";

export default function SystemErrorBanner({
  lowerZ = false,
  messages,
  intervalMs = 6000,
}: {
  lowerZ?: boolean;
  messages?: string[];
  intervalMs?: number;
}) {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  // Persist until the user explicitly closes
  useEffect(() => {
    if (!messages || messages.length === 0) return;
    const iv = window.setInterval(() => {
      setIdx((i) => (i + 1) % messages.length);
    }, Math.max(2500, intervalMs));
    return () => clearInterval(iv);
  }, [messages, intervalMs]);

  if (!visible) return null;

  return (
    <div
      id="system-error-banner"
      className={`fixed top-0 left-0 right-0 ${lowerZ ? "z-20" : "z-50"}`}
      style={{ mixBlendMode: "screen" }}
    >
      <div className="mx-auto max-w-4xl">
        <div className="flex items-center justify-between border-2 border-red-600 bg-black/85 px-4 py-2 shadow-[0_0_16px_rgba(255,0,0,0.65)]">
          <div className="flex items-center gap-3">
            <span className="inline-block w-2 h-6 bg-red-600 animate-blink" />
            <GlitchText text="SYSTEM NOTICE" className="text-rose-500 font-bold text-lg glow-text" />
            <span className="text-[#33ff00] text-sm glow-text">
              {messages && messages.length > 0 ? (
                messages[idx]
              ) : (
                <>Open <strong>Register.exe</strong> to register</>
              )}
            </span>
          </div>
          <button
            className="text-black bg-red-500 hover:bg-red-400 px-2 py-1 font-bold shadow-[0_0_10px_rgba(255,0,0,0.5)]"
            onClick={() => setVisible(false)}
            aria-label="Dismiss system error banner"
          >
            CLOSE
          </button>
        </div>
        {/* hazard stripes */}
        <div className="h-2 bg-[repeating-linear-gradient(135deg,rgba(255,0,0,1)_0px,rgba(255,0,0,1)_10px,transparent_10px,transparent_20px)]" />
      </div>
    </div>
  );
}
