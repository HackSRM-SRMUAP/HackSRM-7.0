"use client";
import { urlFor } from "@/lib/sanity";

export default function SponsorsWindow({ sponsors }: { sponsors: { _id: string; name: string; tier: string; logo?: any; url?: string }[] }) {
  return (
    <div className="p-4 text-black space-y-4">
      <div className="text-base sm:text-lg text-gray-700 font-semibold">Platinum and Gold</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {sponsors.filter(s => ["Platinum","Gold"].includes(s.tier)).map((s) => (
          <div key={s._id} className="bg-white/80 p-4 shadow-inner text-center">
            {s.logo ? (
              <img src={urlFor(s.logo).width(300).url()} alt={`${s.name} logo`} className="mx-auto mb-3 w-40 sm:w-52 h-auto" />
            ) : (
              <div className="mx-auto mb-3 w-40 sm:w-52 h-16 bg-white/60 flex items-center justify-center text-xs">No Logo</div>
            )}
            <div className="text-2xl font-bold tracking-wide">{s.name}</div>
            <div className="text-xs text-gray-600">{s.tier}</div>
            <a href={s.url} className="text-[12px] mt-1 inline-block underline">Visit website</a>
          </div>
        ))}
      </div>
      <div className="text-base sm:text-lg text-gray-700 font-semibold">Silver and Community</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {sponsors.filter(s => ["Silver","Community"].includes(s.tier)).map((s) => (
          <div key={s._id} className="bg-white/80 p-4 shadow-inner text-center">
            {s.logo ? (
              <img src={urlFor(s.logo).width(300).url()} alt={`${s.name} logo`} className="mx-auto mb-3 w-40 sm:w-52 h-auto" />
            ) : (
              <div className="mx-auto mb-3 w-40 sm:w-52 h-16 bg-white/60 flex items-center justify-center text-xs">No Logo</div>
            )}
            <div className="text-2xl font-bold tracking-wide">{s.name}</div>
            <div className="text-xs text-gray-600">{s.tier}</div>
            <a href={s.url} className="text-[12px] mt-1 inline-block underline">Visit website</a>
          </div>
        ))}
      </div>
    </div>
  );
}
