"use client";

export default function AnnouncementsWindow({ announcements }: { announcements: { _id: string; title: string; date?: string; time?: string; pinned?: boolean; level?: string; _updatedAt?: string }[] }) {
  return (
    <div className="p-4 text-black space-y-2">
      {announcements.some(a => a.pinned) && (
        <div className="bg-[#E0F0FF] border border-blue-700/30 text-blue-900 px-3 py-2 text-xs shadow">
          Pinned: {announcements.find(a => a.pinned)?.title}
        </div>
      )}
      {announcements.map((a) => {
        const now = new Date();
        const baseIso = a.date || a._updatedAt || undefined;
        const dt = baseIso ? new Date(baseIso) : null;
        const sameDay = dt && dt.toDateString() === now.toDateString();
        const yest = dt && (() => { const d = new Date(now); d.setDate(d.getDate() - 1); return dt.toDateString() === d.toDateString(); })();
        const absLabel = dt
          ? (sameDay
              ? `Today, ${dt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
              : yest
              ? `Yesterday, ${dt.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })}`
              : dt.toLocaleString(undefined, { year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit' }))
          : (a.time || '');
        const rel = dt
          ? (() => {
              const diffMs = now.getTime() - dt.getTime();
              const sec = Math.round(Math.abs(diffMs) / 1000);
              if (sec < 45) return 'just now';
              const min = Math.round(sec / 60);
              if (min < 60) return `${min}m ago`;
              const hr = Math.round(min / 60);
              if (hr < 24) return `${hr}h ago`;
              const day = Math.round(hr / 24);
              return `${day}d ago`;
            })()
          : '';
        const when = [absLabel, rel].filter(Boolean).join(' • ');
        return (
          <div key={a._id} className="bg-white/80 p-3 shadow-inner">
            <div className="flex items-center justify-between">
              <div className="text-xs text-gray-600">{when}</div>
              <span className="text-[10px] px-2 py-0.5 border border-black/30 bg-[#EAEAEA]">{a.level || 'Info'}</span>
            </div>
            <div className="text-sm font-semibold mt-1">{a.title}</div>
          </div>
        );
      })}
    </div>
  );
}
