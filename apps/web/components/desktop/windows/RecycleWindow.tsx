"use client";

export default function RecycleWindow() {
  return (
    <div className="p-4 text-black space-y-2">
      <div className="text-3xl">🗑️</div>
      <p>Recycle Bin is empty.</p>
      <p className="text-xs text-gray-700">Nothing to restore. Dummy state.</p>
      <div className="flex gap-2 pt-2">
        <button className="win98-btn opacity-60 pointer-events-none">Restore</button>
        <button className="win98-btn opacity-60 pointer-events-none">Empty Bin</button>
      </div>
    </div>
  );
}
