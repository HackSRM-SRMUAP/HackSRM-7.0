"use client";
import { useEffect, useState } from "react";
import clsx from "clsx";

export interface WindowItem {
  id: string;
  title: string;
  minimized?: boolean;
  content: React.ReactNode;
  initialPos?: { x: number; y: number };
}

export default function Window98({
  item,
  active,
  onClose,
  onMinimize,
  onFocus,
  onMaxChange,
  width = 680,
  height = 440,
  dark = false,
}: {
  item: WindowItem;
  active: boolean;
  onClose: (id: string) => void;
  onMinimize: (id: string) => void;
  onFocus: (id: string) => void;
  onMaxChange?: (id: string, max: boolean) => void;
  width?: number;
  height?: number;
  dark?: boolean;
}) {
  const [minimizing, setMinimizing] = useState(false);
  const [maximizing, setMaximizing] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [pos, setPos] = useState<{ x: number; y: number }>(
    item.initialPos ?? { x: 40 + Math.random() * 80, y: 60 + Math.random() * 40 }
  );
  const [max, setMax] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(item.id); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [item.id, onClose]);

  // simple dragging
  const onTitleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    onFocus(item.id);
    const startX = e.clientX;
    const startY = e.clientY;
    const startPos = pos;
    const move = (ev: MouseEvent) => {
      const dx = ev.clientX - startX; const dy = ev.clientY - startY;
      const maxX = Math.max(0, window.innerWidth - width - 12);
      const maxY = Math.max(0, window.innerHeight - height - 40);
      setPos({ x: Math.max(0, Math.min(maxX, startPos.x + dx)), y: Math.max(0, Math.min(maxY, startPos.y + dy)) });
    };
    const up = () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseup", up);
    };
    document.addEventListener("mousemove", move);
    document.addEventListener("mouseup", up);
  };

  // Clamp position within viewport on mount and resize
  useEffect(() => {
    const clamp = () => {
      setPos(prev => {
        const maxX = Math.max(0, window.innerWidth - width - 12);
        const maxY = Math.max(0, window.innerHeight - height - 40);
        return { x: Math.max(0, Math.min(maxX, prev.x)), y: Math.max(0, Math.min(maxY, prev.y)) };
      });
    };
    clamp();
    window.addEventListener("resize", clamp);
    return () => window.removeEventListener("resize", clamp);
  }, [width, height]);

  if (item.minimized) return null;

  return (
    <div
      className={clsx(
        "win98-window fixed overflow-auto flex flex-col",
        active ? "win98-active z-40" : "z-30",
        max ? "win98-maximized" : undefined,
        minimizing ? "minimizing" : undefined,
        maximizing ? "maximizing" : undefined,
        restoring ? "restoring" : undefined,
        item.id === "game" ? "win98-window--dark-edge" : undefined,
        item.id === "crt-settings" ? "win98-window--teal-edge" : undefined
      )}
      style={
        max
          ? ({ left: 0, top: 0, right: 0, bottom: 28 } as any)
          : { left: pos.x, top: pos.y, width, height, maxWidth: "95vw", maxHeight: "calc(100vh - 80px)" }
      }
      onMouseDown={() => onFocus(item.id)}
    >
      <div
        className={clsx(
          "win98-titlebar flex items-center justify-between",
          active ? "active" : undefined,
          item.id === "game" ? "win98-titlebar--dark" : undefined,
          item.id === "crt-settings" ? "win98-titlebar--teal" : undefined
        )}
        onMouseDown={onTitleMouseDown}
      >
        <span className="truncate pr-2">{item.title}</span>
        <div className="flex gap-1">
          <button className="win98-btn square win98-btn-min" onClick={() => {
            if (minimizing) return;
            setMinimizing(true);
            setTimeout(() => { onMinimize(item.id); setMinimizing(false); }, 200);
          }} aria-label="Minimize">_</button>
          <button
            className="win98-btn square win98-btn-max"
            onClick={() => {
              if (minimizing || maximizing || restoring) return;
              if (!max) {
                setMaximizing(true);
                setTimeout(() => { setMax(true); setMaximizing(false); onMaxChange?.(item.id, true); }, 200);
              } else {
                setRestoring(true);
                setTimeout(() => { setRestoring(false); setMax(false); onMaxChange?.(item.id, false); }, 200);
              }
            }}
            aria-label="Maximize"
          >▢</button>
          <button className="win98-btn square win98-btn-close" onClick={() => onClose(item.id)} aria-label="Close">×</button>
        </div>
      </div>
      <div className={clsx(dark ? "win98-body-dark" : "win98-body", "overflow-auto flex-1 p-3 sm:p-4 text-base sm:text-lg")}> 
        {item.content}
      </div>
    </div>
  );
}
