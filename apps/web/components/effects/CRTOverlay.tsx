"use client";

export default function CRTOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-50 crt-overlay">
      <div className="vignette" />
      <div className="chroma" />
      <div className="curvature" />
      <div className="shadow-mask" />
      <div className="aperture" />
      <div className="scanlines" />
      <div className="deconvergence" />
      <div className="refresh" />
      <div className="glass" />
      <div className="noise" />
    </div>
  );
}
