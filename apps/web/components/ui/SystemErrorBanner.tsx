"use client";
import { useEffect, useState } from "react";
import GlitchText from "@/components/effects/GlitchText";

export default function SystemErrorBanner({
  lowerZ = false,
  messages,
  intervalMs = 6000,
  slug, // <--- Add the slug prop here
}: {
  lowerZ?: boolean;
  messages?: string[];
  intervalMs?: number;
  slug: string; // Ensure this is passed from your layout/page
}) {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://apply.devfolio.co/v2/sdk.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
    // script.onload = () => {
    //   if (window.devfolio) window.devfolio.init();
    // };
  }, [slug]);

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
            
            {/* Devfolio Button replaces the static text */}
            <div 
              className="apply-button" 
              data-hackathon-slug={slug} 
              data-button-theme="dark" // 'dark' fits your black/red theme better
              style={{ height: "32px", width: "150px" }} // Scaled down for the banner
            />
          </div>
          
          {/* <button
            className="text-black bg-red-500 hover:bg-red-400 px-2 py-1 font-bold shadow-[0_0_10px_rgba(255,0,0,0.5)] transition-colors"
            onClick={() => setVisible(false)}
            aria-label="Dismiss system error banner"
          >
            CLOSE
          </button> */}
        </div>
        {/* hazard stripes */}
        <div className="h-2 bg-[repeating-linear-gradient(135deg,rgba(255,0,0,1)_0px,rgba(255,0,0,1)_10px,transparent_10px,transparent_20px)]" />
      </div>
    </div>
  );
}