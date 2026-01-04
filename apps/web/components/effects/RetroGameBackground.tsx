"use client";
import { useEffect, useRef } from "react";

export default function RetroGameBackground() {
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

    let running = true;
    const player = { x: 40, y: 0, w: 16, h: 16, vx: 1.6, vy: 0, grounded: false };
    const obstacles: { x: number; y: number; w: number; h: number; vx: number }[] = [];
    const groundY = () => canvas.height - 100;
    let spawn = 0;
    let dead = false;
    let deathAt = 0;

    const resetGame = () => {
      player.x = 40; player.y = 0; player.vx = 1.6; player.vy = 0; player.grounded = false;
      obstacles.length = 0;
      spawn = 0;
    };

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));

    const loop = () => {
      if (!running) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Background grid (very subtle)
      ctx.save();
      ctx.globalAlpha = 0.12;
      ctx.strokeStyle = "#33ff00";
      for (let y = 0; y < canvas.height; y += 20) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(canvas.width, y); ctx.stroke();
      }
      for (let x = 0; x < canvas.width; x += 24) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, canvas.height); ctx.stroke();
      }
      ctx.restore();

      // Ground line
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#33ff00";
      ctx.fillRect(0, groundY() + 4, canvas.width, 2);
      ctx.restore();

      // Handle death state with brief overlay + reboot (no flash)
      if (dead) {
        const elapsed = Date.now() - deathAt;
        // Dim background
        ctx.save();
        ctx.globalAlpha = 0.25;
        ctx.fillStyle = "#000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.restore();

        // Popup window (Win98-ish)
        const pw = 340, ph = 150;
        const px = Math.floor(canvas.width / 2 - pw / 2);
        const py = Math.floor(canvas.height / 2 - ph / 2);

        // Shadow
        ctx.save();
        ctx.globalAlpha = 0.35;
        ctx.fillStyle = "#000";
        ctx.fillRect(px + 4, py + 4, pw, ph);
        ctx.restore();

        // Window body
        ctx.save();
        // Outer border
        ctx.fillStyle = "#C0C0C0"; // classic grey
        ctx.fillRect(px, py, pw, ph);
        // Inner face
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(px + 2, py + 24, pw - 4, ph - 26);
        // Title bar
        ctx.fillStyle = "#000080"; // navy
        ctx.fillRect(px + 2, py + 2, pw - 4, 20);
        // Title text
        ctx.font = "bold 12px monospace";
        ctx.fillStyle = "#FFFFFF";
        ctx.textAlign = "left";
        ctx.textBaseline = "middle";
        ctx.fillText("Retro Runner", px + 10, py + 12);
        ctx.restore();

        // Content text
        ctx.save();
        ctx.fillStyle = "#000";
        ctx.font = "bold 16px monospace";
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText("Restarting…", px + pw / 2, py + ph / 2 - 8);
        ctx.restore();

        // Fake button
        const bw = 80, bh = 24;
        const bx = px + pw / 2 - bw / 2;
        const by = py + ph - bh - 12;
        ctx.save();
        // Button bevel
        ctx.fillStyle = "#DFDFDF"; ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = "#FFFFFF"; ctx.beginPath(); ctx.moveTo(bx, by + bh); ctx.lineTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke();
        ctx.strokeStyle = "#808080"; ctx.beginPath(); ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx, by + bh); ctx.stroke();
        // Button label
        ctx.fillStyle = "#000"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("OK", bx + bw / 2, by + bh / 2 + 1);
        ctx.restore();

        // Longer pause (2.2s)
        if (elapsed > 2200) {
          resetGame();
          dead = false;
        }
        requestAnimationFrame(loop);
        return;
      }

      // Physics
      player.x = clamp(player.x + player.vx, 0, canvas.width - player.w);
      player.vy += 0.35; // gravity
      player.y += player.vy;
      if (player.y >= groundY() - player.h) {
        player.y = groundY() - player.h;
        player.vy = 0; player.grounded = true;
      } else {
        player.grounded = false;
      }

      // Spawn obstacles proportional to width
      spawn++;
      const spawnEvery = Math.max(30, Math.floor(60 - Math.min(30, canvas.width / 80)));
      if (spawn % spawnEvery === 0) {
        const h = 12 + Math.random() * 22;
        obstacles.push({ x: canvas.width, y: groundY() - h, w: 12 + Math.random() * 18, h, vx: 2 + Math.random() * 1.5 });
        if (obstacles.length > 40) obstacles.shift();
      }

      // Auto-jump when obstacle near
      const nearest = obstacles.find(o => o.x - player.x < 48 && o.x - player.x > 10);
      if (nearest && player.grounded) {
        if (Math.random() < 0.85) { // occasional fail to trigger restarts naturally
          player.vy = -7.2; player.grounded = false;
        }
      }

      // Update obstacles
      for (const o of obstacles) o.x -= o.vx;

      // Draw obstacles
      ctx.save();
      ctx.globalAlpha = 0.35;
      ctx.fillStyle = "#33ff00";
      for (const o of obstacles) ctx.fillRect(o.x, o.y, o.w, o.h);
      ctx.restore();

      // Collision detection
      for (const o of obstacles) {
        if (
          player.x < o.x + o.w &&
          player.x + player.w > o.x &&
          player.y < o.y + o.h &&
          player.y + player.h > o.y
        ) {
          dead = true; deathAt = Date.now();
          break;
        }
      }

      // Draw player (glow)
      ctx.save();
      ctx.shadowColor = "#33ff00"; ctx.shadowBlur = 8; ctx.globalAlpha = 0.6;
      ctx.fillStyle = "#33ff00";
      ctx.fillRect(player.x, player.y, player.w, player.h);
      ctx.restore();

      // Title (top center)
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.fillStyle = "#33ff00";
      ctx.font = "bold 48px monospace";
      ctx.textAlign = "center";
      ctx.fillText("HACKSRM 7.0", canvas.width / 2, 120);
      ctx.restore();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => { running = false; window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={ref} className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}
