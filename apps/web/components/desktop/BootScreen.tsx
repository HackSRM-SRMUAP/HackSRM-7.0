"use client";
import { useEffect, useRef, useState } from "react";

export default function BootScreen({ onDone, dumpMs = 5000, loadMs = 2600 }: { onDone: () => void; dumpMs?: number; loadMs?: number }) {
  const [phase, setPhase] = useState<"dump"|"loading"|"done">("dump");
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>([]);
  const chimed = useRef(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const ensureAudioContext = async () => {
    try {
      if (!audioCtxRef.current) {
        const Ctx = (window as any).AudioContext || (window as any).webkitAudioContext;
        audioCtxRef.current = Ctx ? new Ctx() : null;
      }
      if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
        await audioCtxRef.current.resume();
      }
      return audioCtxRef.current;
    } catch {
      return null;
    }
  };

  const playChime = async () => {
    if (chimed.current) return;
    const ctx = await ensureAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const master = ctx.createGain();
    master.gain.value = 0.08; // gentle volume
    master.connect(ctx.destination);

    const mkTone = (freq: number, start: number, dur: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, now + start);
      gain.gain.setValueAtTime(0, now + start);
      gain.gain.linearRampToValueAtTime(1, now + start + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + start + dur);
      osc.connect(gain);
      gain.connect(master);
      osc.start(now + start);
      osc.stop(now + start + dur + 0.02);
    };

    // Simple pleasant triad (not Windows melody): C4, E4, G4
    mkTone(261.63, 0.00, 0.35);
    mkTone(329.63, 0.10, 0.35);
    mkTone(392.00, 0.20, 0.35);

    chimed.current = true;
  };

  // Kernel/OS dump simulation
  useEffect(() => {
    if (phase !== "dump") return;
    // Attach gesture fallback early so audio can unlock during dump
    const onGesture = () => { playChime(); window.removeEventListener("pointerdown", onGesture); };
    window.addEventListener("pointerdown", onGesture, { once: true });
    const script = [
      "HACKSRM-BOOT v7.0 — Kernel 3.11.98",
      "ACPI: probing devices ... OK",
      "PCI: enumerating busses ... OK",
      "NET: link up on eth0 @ 10Mbps",
      "FS: mounting /system (fat16) ... OK",
      "MEM: 64MB detected | 8MB DMA reserved",
      "DRM: CRT-Adapter enabled (Trinitron mode)",
      "KBD: PS/2 keyboard initialized",
      "AUDIO: SoundBlaster compatible — OK",
      "BOOT: loading hackathon services ...",
      "svc://ideas      READY",
      "svc://collab     READY",
      "svc://shipping   READY",
      "SEC: Safe Mode enforced",
      "INIT: launching UI shell ...",
    ];
    let i = 0;
    setLines([]);
    const iv = setInterval(() => {
      setLines(prev => [...prev, script[i]]);
      i++;
      if (i >= script.length) clearInterval(iv);
    }, Math.max(80, Math.floor(dumpMs / (script.length + 4))));
    const t = setTimeout(() => setPhase("loading"), dumpMs);
    return () => { clearInterval(iv); clearTimeout(t); window.removeEventListener("pointerdown", onGesture); };
  }, [phase, dumpMs]);

  // Loading progress (Win98 style)
  useEffect(() => {
    if (phase !== "loading") return;
    // Try to play chime when loading begins; also attach a one-time gesture fallback
    playChime();
    const onGesture = () => { playChime(); window.removeEventListener("pointerdown", onGesture); };
    window.addEventListener("pointerdown", onGesture, { once: true });
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, Math.floor((elapsed / loadMs) * 100));
      setProgress(pct);
      if (pct < 100) requestAnimationFrame(tick);
    };
    const r = requestAnimationFrame(tick);
    const t = setTimeout(() => setPhase("done"), loadMs);
    return () => { cancelAnimationFrame(r); clearTimeout(t); window.removeEventListener("pointerdown", onGesture); };
  }, [phase, loadMs]);

  useEffect(() => {
    if (phase === "done") onDone();
  }, [phase, onDone]);

  const handleSkip = () => { playChime(); setPhase("done"); };

  if (phase === "dump") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black text-[#33ff00] crt-open" role="dialog" aria-label="Kernel Dump">
        <div className="win98-window w-[700px]">
          <div className="win98-titlebar">HACKSRM Boot Diagnostics</div>
          <div className="win98-body-dark overflow-hidden">
            <div className="p-3 text-[#33ff00] font-mono text-sm h-[360px] overflow-auto">
              {lines.map((ln, idx) => (
                <div key={idx} className="whitespace-pre">
                  {"> "}{ln}
                </div>
              ))}
            </div>
            <div className="p-2 flex justify-end bg-black/60">
              <button className="win98-btn win98-task-btn" onClick={handleSkip}>Skip</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // loading page
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#008080] text-black crt-open" role="dialog" aria-label="Boot Screen">
      <div className="win98-window w-[560px]">
        <div className="win98-titlebar">HACKSRM 98</div>
        <div className="p-4 bg-[#C0C0C0]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-[#000080] pixel-border" />
            <div>
              <div className="font-bold">Starting HackSRM</div>
              <div className="text-xs">© 1998 HackSRM Team</div>
            </div>
          </div>
          <div className="text-sm mb-2">Loading components...</div>
          <div className="win98-progress w-full h-6">
            <div className="win98-progress-fill" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-4 flex justify-end">
            <button className="win98-btn" onClick={handleSkip}>Skip</button>
          </div>
        </div>
      </div>
    </div>
  );
}
