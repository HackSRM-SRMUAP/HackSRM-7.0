"use client";

export default function RetroBackground() {
  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 opacity-30"
      style={{
        backgroundImage:
          "repeating-linear-gradient(0deg, rgba(51,255,0,0.06) 0px, rgba(51,255,0,0.06) 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(51,255,0,0.06) 0px, rgba(51,255,0,0.06) 1px, transparent 2px)",
        backgroundColor: "#000",
      }}
    />
  );
}
