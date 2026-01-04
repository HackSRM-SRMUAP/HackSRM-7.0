"use client";
import { useEffect, useRef } from "react";

export default function Starfield() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    const stars = new Array(180).fill(0).map(() => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 2 + 0.6,
    }));

    let running = true;
    const render = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(51,255,0,0.7)";
      for (const s of stars) {
        s.y += s.z;
        if (s.y > canvas.height) {
          s.y = 0;
          s.x = Math.random() * canvas.width;
          s.z = Math.random() * 2 + 0.6;
        }
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.z * 0.75, 0, Math.PI * 2);
        ctx.fill();
      }
      requestAnimationFrame(render);
    };

    render();
    return () => {
      running = false;
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="fixed inset-0 -z-20 pointer-events-none opacity-30"
    />
  );
}
