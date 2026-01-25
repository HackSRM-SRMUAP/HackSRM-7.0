"use client";
import { urlFor } from "@/lib/sanity";

export default function SponsorWindow({ sponsor }: { sponsor: any }) {
  return (
    <div className="p-4 text-black">
      <div className="flex items-center gap-4">
        <img
          src={typeof sponsor.logo === "string" ? sponsor.logo : (urlFor(sponsor.logo)?.width(300).height(150).url() || "")}
          alt={`${sponsor.name} logo`}
          width={160}
          height={80}
          className="bg-white/80 p-2 shadow-inner"
        />
        <div>
          <div className="text-2xl font-bold tracking-wide">{sponsor.name}</div>
          <div className="text-sm text-gray-700">{sponsor.tier}</div>
          <a href={sponsor.url} className="text-[13px] mt-1 inline-block underline" target="_blank" rel="noopener noreferrer">Visit website</a>
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
