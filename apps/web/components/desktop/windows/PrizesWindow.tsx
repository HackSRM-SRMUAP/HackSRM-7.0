"use client";
import { urlFor } from "@/lib/sanity";

export default function PrizesWindow({ prizes }: { prizes: { _id: string; name: string; amount: string; by?: string; tier?: string; desc?: string; sponsor?: { _id: string; name: string; logo?: any; url?: string } }[] }) {
  return (
    <div className="p-4 text-black grid grid-cols-1 sm:grid-cols-2 gap-3">
      {prizes.map((p) => (
        <div key={p._id} className="bg-white/80 p-3 shadow-inner">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 min-w-0">
              {p.sponsor?.logo ? (
                <img
                  src={urlFor(p.sponsor.logo).width(140).fit('max').url() || ''}
                  alt={`${p.sponsor.name} logo`}
                  className="w-16 h-10 object-contain bg-white/70 border border-gray-300 p-1"
                />
              ) : null}
              <div className="text-sm text-gray-700 truncate">
                {p.by}
                {p.sponsor?.url && (
                  <a href={p.sponsor.url} target="_blank" rel="noreferrer" className="ml-2 text-[11px] underline">Visit</a>
                )}
              </div>
            </div>
            <span className="text-[10px] px-2 py-0.5 border border-black/30 bg-[#EAEAEA]">{p.tier}</span>
          </div>
          <div className="text-lg font-bold mt-2">{p.name}</div>
          <div className="text-green-700 font-semibold">{p.amount}</div>
          <p className="text-xs mt-1 text-gray-700">{p.desc}</p>
        </div>
      ))}
    </div>
  );
}
