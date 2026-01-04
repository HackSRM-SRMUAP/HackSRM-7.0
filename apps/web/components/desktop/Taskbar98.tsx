"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

export default function Taskbar98({
  windows,
  onToggle,
  onStart,
  startOpen,
  menu,
  startAt,
}: {
  windows: { id: string; title: string; active: boolean; minimized?: boolean }[];
  onToggle: (id: string) => void;
  onStart: () => void;
  startOpen: boolean;
  menu: { label: string; onClick: () => void }[];
  startAt?: number;
}) {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hh = `${now.getHours()}`.padStart(2, "0");
  const mm = `${now.getMinutes()}`.padStart(2, "0");
  let countdown: string | null = null;
  if (startAt && startAt > 0) {
    const diff = Math.max(0, startAt - now.getTime());
    const d = Math.floor(diff / (24*60*60*1000));
    const h = Math.floor((diff % (24*60*60*1000)) / (60*60*1000));
    const m = Math.floor((diff % (60*60*1000)) / (60*1000));
    countdown = `T-${d}d ${String(h).padStart(2,'0')}h ${String(m).padStart(2,'0')}m`;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[60] bg-[#C0C0C0] border-t border-black/40 shadow-inner">
      <div className="flex items-center gap-2 p-1">
        <button className="win98-btn win98-start-btn" onClick={onStart}>Start</button>
        <div className="flex-1 flex gap-1 overflow-x-auto">
          {windows.map(w => (
            <button
              key={w.id}
              className={clsx(
                "win98-task-btn",
                w.active && !w.minimized ? "active" : undefined,
                w.id === "game" ? "win98-task-btn--dark" : undefined,
                w.id === "crt-settings" ? "win98-task-btn--teal" : undefined
              )}
              onClick={() => onToggle(w.id)}
            >
              {w.title}
            </button>
          ))}
        </div>
        <div className="win98-clock flex items-center gap-2">
          {countdown && <span className="win98-countdown hidden sm:inline">{countdown}</span>}
          <span>{hh}:{mm}</span>
        </div>
      </div>
      {startOpen && (
        <div className="win98-start absolute bottom-full left-0 mb-1">
          <div className="font-bold mb-2">System Status: BUILDING</div>
          <ul className="text-sm">
            {menu.map((m, i) => (
              <li key={i}>
                <button className="win98-menu-item" onClick={m.onClick}>{m.label}</button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
