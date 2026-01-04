"use client";

export default function ErrorPopup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="win98-window" style={{ width: 320 }}>
      <div className="win98-titlebar">Hacker-Tips</div>
      <div className="win98-body p-3 text-black flex items-start gap-2">
        <span>⚠</span>
        <div className="flex-1 text-sm">{message}</div>
        <button className="win98-btn" onClick={onClose}>OK</button>
      </div>
    </div>
  );
}
