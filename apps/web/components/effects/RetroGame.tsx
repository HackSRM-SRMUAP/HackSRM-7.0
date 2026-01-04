"use client";
import { useEffect, useRef } from "react";

interface Props {
  onFail?: () => void;
}

export default function RetroGame({ onFail }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d")!;

    const resize = () => {
      canvas.width = Math.min(window.innerWidth, 900);
      canvas.height = 220;
    };
    resize();
    window.addEventListener("resize", resize);

    // Game state
    let running = true;
    let restartTimer: number | null = null;
    const player = { x: 20, y: 170, w: 14, h: 14, vx: 0, vy: 0, grounded: true };
    const obstacles: { x: number; y: number; w: number; h: number; vx: number }[] = [];
    let spawn = 0;
    let score = 0;

    // Autopilot: no user input, the runner moves and auto-jumps
    const keydown = () => {};
    const keyup = () => {};

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const loop = () => {
      // draw background
      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#001100";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = "rgba(51,255,0,0.2)";
      for (let y = 0; y < canvas.height; y += 10) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
      ctx.fillStyle = "rgba(51,255,0,0.25)";
      ctx.fillRect(0, 184, canvas.width, 4);

      if (running) {
        // physics
        player.vx = 1.2;
        player.x = clamp(player.x + player.vx, 0, canvas.width - player.w);

      player.vy += 0.35; // gravity
      player.y += player.vy;
      if (player.y >= 170) {
        player.y = 170;
        player.vy = 0;
        player.grounded = true;
      }

      // update obstacles
      spawn++;
      if (spawn % 45 === 0) {
        const h = 10 + Math.random() * 20;
        obstacles.push({ x: canvas.width, y: 180 - h, w: 10 + Math.random() * 14, h, vx: 2 + Math.random() * 1.5 });
      }

      // update obstacles
      for (const o of obstacles) o.x -= o.vx;
      while (obstacles.length > 0 && obstacles[0].x + obstacles[0].w < 0) {
        obstacles.shift();
        score += 10;
      }

        // autopilot jump
        const nearest = obstacles.find(o => o.x - player.x < 40 && o.x - player.x > 8);
        if (nearest && player.grounded) {
          player.vy = -6.8;
          player.grounded = false;
        }

        // collision
        for (const o of obstacles) {
          if (player.x < o.x + o.w && player.x + player.w > o.x && player.y < o.y + o.h && player.y + player.h > o.y) {
            running = false;
            onFail?.();
            if (restartTimer == null) {
              restartTimer = window.setTimeout(() => {
                obstacles.splice(0, obstacles.length);
                player.x = 20; player.y = 170; player.vx = 0; player.vy = 0; player.grounded = true;
                spawn = 0; score = 0; restartTimer = null; running = true;
              }, 1200);
            }
            break;
          }
        }
      } else {
        // failure HUD
        ctx.fillStyle = "#ff0033";
        ctx.font = "12px monospace";
        ctx.fillText("SYSTEM FAILURE — REBOOTING...", canvas.width / 2 - 90, canvas.height / 2);
      }

      // draw player & obstacles
      ctx.fillStyle = "#33ff00";
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.fillStyle = "rgba(51,255,0,0.7)";
      for (const o of obstacles) ctx.fillRect(o.x, o.y, o.w, o.h);

      // HUD
      ctx.fillStyle = "#33ff00";
      ctx.font = "12px monospace";
      ctx.fillText(`SCORE: ${score}`, 10, 14);

      requestAnimationFrame(loop);
    };

    loop();

    // Auto-restart scheduling handled in loop

    // Touch/Pointer jump support
    const pointerJump = () => {};
    canvas.addEventListener("pointerdown", pointerJump);

    return () => {
      running = false;
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", keydown);
      window.removeEventListener("keyup", keyup);
      canvas.removeEventListener("pointerdown", pointerJump);
      if (restartTimer != null) clearTimeout(restartTimer);
    };
  }, []);

  return (
    <div className="pixel-border bg-black/60">
      <canvas ref={ref} className="w-full h-[220px] block" />
    </div>
  );
}
