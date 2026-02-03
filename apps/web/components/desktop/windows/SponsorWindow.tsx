"use client";
import { urlFor } from "@/lib/sanity";

export default function SponsorWindow({ sponsor }: { sponsor: any }) {
  return (
    <div className="p-4 text-black">
      <div className="flex items-center gap-4">
        <img
          src={typeof sponsor.logo === "string" ? sponsor.logo : (urlFor(sponsor.logo)?.width(800).fit('max').url() || "")}
          alt={sponsor?.logo?.alt || `${sponsor?.name || "Sponsor"} logo`}
          className="bg-white/90 p-2 shadow-inner border border-gray-300 w-65 h-40 object-contain"
        />
        <div>
          <div className="text-2xl font-bold tracking-wide">{sponsor.name}</div>
          <div className="text-sm text-gray-700">{sponsor.tier}</div>
          <div className="mt-2 flex flex-wrap items-center gap-2">
            {sponsor.url && (
              <a
                href={sponsor.url}
                target="_blank"
                rel="noopener noreferrer"
                className="win98-btn text-black px-3 py-1 text-sm"
                title="Open sponsor website"
              >
                Visit website
              </a>
            )}
            <button
              className="win98-btn text-black px-3 py-1 text-sm"
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.dispatchEvent(new CustomEvent('open-prizes'));
                }
              }}
              title="check sponsor prizes"
            >
              Check Prizes
            </button>
          </div>
          <div className="mt-3">
            <button
              className="px-3 py-1 text-xs bg-gray-100 hover:bg-white border border-gray-500 shadow active:translate-y-[1px]"
              onClick={() => {
                if (sponsor.url) {
                  window.open(sponsor.url, "_blank", "noopener,noreferrer");
                }
              }}
            >
              Click me for more details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
