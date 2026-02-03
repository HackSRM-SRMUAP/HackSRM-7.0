"use client";
import { urlFor } from "@/lib/sanity";

export default function SponsorsWindow({ sponsors }: { sponsors: { _id: string; name: string; tier: string; logo?: any; url?: string }[] }) {
  return (
    <div className="p-4 text-black space-y-4">
      {(["Platinum", "Gold", "Silver", "Community"] as const).map((tier) => {
        const list = sponsors.filter((s) => s.tier === tier);
        if (list.length === 0) return null;
        return (
          <div key={tier} className="space-y-2">
            <div className="text-base sm:text-lg text-gray-700 font-semibold">{tier}</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {list.map((s) => (
                  <div key={s._id} className="bg-white/80 p-4 shadow-inner text-center">
                    <div className="mx-auto mb-3 w-36 h-20 sm:w-44 sm:h-24 md:w-52 md:h-28 bg-white/80 border border-gray-200 flex items-center justify-center overflow-hidden">
                      {s.logo ? (
                        <img
                          src={urlFor(s.logo).width(600).fit('max').url()}
                          alt={`${s.name} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      ) : (
                        <div className="text-xs text-gray-500">No Logo</div>
                      )}
                    </div>
                    <div className="text-2xl font-bold tracking-wide">{s.name}</div>
                    <div className="text-xs text-gray-600">{s.tier}</div>
                    {s.url && (
                      <a href={s.url} className="text-[12px] mt-1 inline-block underline" target="_blank" rel="noopener noreferrer">Visit website</a>
                    )}
                  </div>
                ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
