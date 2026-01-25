"use client";

interface ScheduleItem {
  _id: string;
  title: string;
  startTime: string;
  type: string;
  location?: string;
}

const fallback: ScheduleItem[] = [
  { _id: "1", title: "Opening Ceremony", startTime: new Date().toISOString(), type: "Ceremony" },
  { _id: "2", title: "Team Formation", startTime: new Date(Date.now() + 60*60*1000).toISOString(), type: "Activity" },
  { _id: "3", title: "Hacking Starts", startTime: new Date(Date.now() + 2*60*60*1000).toISOString(), type: "Milestone" },
  { _id: "4", title: "Lightning Talk: AI", startTime: new Date(Date.now() + 5*60*60*1000).toISOString(), type: "Talk" },
];

export default function ScheduleWindow({ events }: { events?: ScheduleItem[] }) {
  const list = events && events.length > 0 ? events : fallback;

  return (
    <div className="p-3 text-black space-y-3">
      <div className="text-xs text-gray-700">Times shown in your local timezone.</div>
      {/* Next Up banner */}
      {(() => {
        const now = Date.now();
        const next = [...list]
          .map(ev => ({ ev, ts: new Date(ev.startTime).getTime() }))
          .filter(x => x.ts >= now)
          .sort((a,b) => a.ts - b.ts)[0];
        if (!next) return null;
        const diff = Math.max(0, next.ts - now);
        const fmt = (ms: number) => {
          if (ms < 60_000) return "<1m";
          const minTotal = Math.round(ms / 60_000);
          if (minTotal < 60) return `${minTotal}m`;
          const hours = Math.floor(minTotal / 60);
          const mins = minTotal % 60;
          if (hours < 24) return mins ? `${hours}h ${mins}m` : `${hours}h`;
          const days = Math.floor(hours / 24);
          const remH = hours % 24;
          return remH ? `${days}d ${remH}h` : `${days}d`;
        };
        return (
          <div className="bg-[#E0FFE0] border border-green-700/30 text-green-900 px-3 py-2 text-sm shadow">
            Next up: <span className="font-semibold">{next.ev.title}</span> in {fmt(diff)}
          </div>
        );
      })()}
      <table className="w-full text-sm bg-white">
        <thead>
          <tr className="bg-[#E0E0E0]">
            <th className="text-left p-2">Time</th>
            <th className="text-left p-2">Title</th>
            <th className="text-left p-2">Type</th>
            <th className="hidden sm:table-cell text-left p-2">Location</th>
          </tr>
        </thead>
        <tbody>
          {list.map(ev => {
            const now = Date.now();
            const ts = new Date(ev.startTime).getTime();
            const isNext = ts > now && ts - now < 2 * 60 * 60 * 1000;
            const started = ts <= now;
            return (
              <tr key={ev._id} className={isNext ? "bg-[#CCFFCC]" : started ? "bg-[#FFF4D6]" : undefined}>
                <td className="p-2">{new Date(ev.startTime).toLocaleString()}</td>
                <td className="p-2">
                  {ev.title}
                  <div className="text-[11px] text-gray-600 sm:hidden">{ev.location || '-'}</div>
                </td>
                <td className="p-2">
                  <span className="px-2 py-0.5 border border-black/20 bg-[#EFEFEF] text-[11px]">{ev.type}</span>
                </td>
                <td className="hidden sm:table-cell p-2">{ev.location || '-'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
