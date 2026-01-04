"use client";
import { useEffect, useRef } from "react";

export default function RetroGameEmbed() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;

    const resizeToParent = () => {
      const parent = wrapRef.current;
      if (!parent) return;
      const rect = parent.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      canvas.width = Math.max(100, Math.floor(rect.width * ratio));
      canvas.height = Math.max(80, Math.floor(rect.height * ratio));
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    resizeToParent();

    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(() => resizeToParent());
      if (wrapRef.current) ro.observe(wrapRef.current);
    } else {
      window.addEventListener("resize", resizeToParent);
    }

    let running = true;
    const player = { x: 24, y: 0, w: 14, h: 14, vx: 1.2, vy: 0, grounded: false };
    type Obstacle = { type: "cactus" | "bird"; x: number; y: number; w: number; h: number; vx: number };
    const obstacles: Obstacle[] = [];
    const groundY = () => canvas.height / (window.devicePixelRatio || 1) - 60;
    let spawn = 0;
    let dead = false;
    let state: "menu" | "playing" | "dead" = "menu";
    let deathAt = 0;
    let score = 0;
    let highScore = 0;
    let startBtn: { x: number; y: number; w: number; h: number } | null = null;
    let lastGroundedAt = 0;
    let crouching = false;
    let worldSpeed = 2.0;
    type Diff = "easy" | "normal" | "hard";
    let difficulty: Diff = "normal";
    const diffBtns: { id: Diff; rect: { x: number; y: number; w: number; h: number } }[] = [];
    const anchorX = 24;

    const clamp = (v: number, min: number, max: number) => Math.max(min, Math.min(max, v));
    const resetGame = () => {
      player.x = anchorX; player.y = 0; player.vx = 0; player.vy = 0; player.grounded = false;
      obstacles.length = 0; spawn = 0; score = 0; dead = false;
    };

    const startPlaying = () => {
      resetGame();
      worldSpeed = difficulty === "easy" ? 1.6 : difficulty === "hard" ? 2.4 : 2.0;
      state = "playing";
    };

    const jump = () => {
      if (state !== "playing") return;
      const now = Date.now();
      const coyoteMs = difficulty === "easy" ? 160 : difficulty === "hard" ? 90 : 120;
      const jumpVy = difficulty === "easy" ? -7.2 : difficulty === "hard" ? -6.8 : -7.0;
      if (player.grounded || now - lastGroundedAt < coyoteMs) { player.vy = jumpVy; player.grounded = false; }
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.key === " " || e.key === "ArrowUp" || e.key === "w") {
        e.preventDefault();
        if (state === "menu") startPlaying(); else if (state === "playing") jump(); else if (state === "dead") startPlaying();
      } else if (e.key === "Enter") {
        if (state === "menu" || state === "dead") startPlaying();
      } else if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") {
        if (state === "playing") crouching = true;
      } else if (e.key === "ArrowLeft" || e.key === "ArrowRight") {
        if (state === "menu") {
          const order: Diff[] = ["easy", "normal", "hard"];
          const idx = order.indexOf(difficulty);
          const next = e.key === "ArrowRight" ? (idx + 1) % order.length : (idx - 1 + order.length) % order.length;
          difficulty = order[next];
        }
      }
    };
    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || e.key.toLowerCase() === "s") crouching = false;
    };
    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left; const y = e.clientY - rect.top;
      if (state === "menu") {
        // difficulty selection
        for (const b of diffBtns) {
          const r = b.rect;
          if (x >= r.x && x <= r.x + r.w && y >= r.y && y <= r.y + r.h) {
            difficulty = b.id;
            return;
          }
        }
        if (startBtn && x >= startBtn.x && x <= startBtn.x + startBtn.w && y >= startBtn.y && y <= startBtn.y + startBtn.h) {
          startPlaying();
        }
      } else if (state === "dead") {
        if (startBtn && x >= startBtn.x && x <= startBtn.x + startBtn.w && y >= startBtn.y && y <= startBtn.y + startBtn.h) {
          startPlaying();
        }
      } else {
        jump();
      }
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKeyUp);
    canvas.addEventListener("mousedown", onClick);

    const loop = () => {
      if (!running) return;
      const DPR = window.devicePixelRatio || 1;
      const cw = canvas.width / DPR;
      const ch = canvas.height / DPR;
      ctx.clearRect(0, 0, cw, ch);

      // BG grid
      ctx.save();
      ctx.globalAlpha = 0.1;
      ctx.strokeStyle = "#33ff00";
      const step = 16;
      for (let y = 0; y < ch; y += step) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(cw, y); ctx.stroke(); }
      for (let x = 0; x < cw; x += step) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, ch); ctx.stroke(); }
      ctx.restore();

      // Ground
      const gy = groundY();
      ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = "#33ff00"; ctx.fillRect(0, gy + 2, cw, 1); ctx.restore();

      if (state === "menu") {
        // Title
        ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = "#33ff00"; ctx.font = "bold 22px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("Retro Runner", cw / 2, ch / 2 - 40);
        ctx.restore();
        // Controls
        ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = "#33ff00"; ctx.font = "12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("Space/Click: Jump   •   Down/S: Duck", cw / 2, ch / 2 - 12);
        ctx.restore();
        // Difficulty buttons
        const labels: { id: Diff; text: string }[] = [
          { id: "easy", text: "Easy" },
          { id: "normal", text: "Normal" },
          { id: "hard", text: "Hard" },
        ];
        diffBtns.length = 0;
        const gap = 12; const bwSmall = 90; const bhSmall = 26;
        const totalW = labels.length * bwSmall + (labels.length - 1) * gap;
        let dx = cw / 2 - totalW / 2; const dy = ch / 2 + 44;
        for (const lab of labels) {
          diffBtns.push({ id: lab.id, rect: { x: dx, y: dy, w: bwSmall, h: bhSmall } });
          ctx.save();
          ctx.fillStyle = "#DFDFDF"; ctx.fillRect(dx, dy, bwSmall, bhSmall);
          ctx.strokeStyle = "#FFFFFF"; ctx.beginPath(); ctx.moveTo(dx, dy + bhSmall); ctx.lineTo(dx, dy); ctx.lineTo(dx + bwSmall, dy); ctx.stroke();
          ctx.strokeStyle = "#808080"; ctx.beginPath(); ctx.moveTo(dx + bwSmall, dy); ctx.lineTo(dx + bwSmall, dy + bhSmall); ctx.lineTo(dx, dy + bhSmall); ctx.stroke();
          ctx.fillStyle = difficulty === lab.id ? "#000080" : "#000";
          ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText(lab.text, dx + bwSmall / 2, dy + bhSmall / 2 + 1);
          ctx.restore();
          dx += bwSmall + gap;
        }
        // Start button
        const bw = 120, bh = 32;
        const bx = cw / 2 - bw / 2; const by = ch / 2 + 10;
        startBtn = { x: bx, y: by, w: bw, h: bh };
        ctx.save();
        ctx.fillStyle = "#DFDFDF"; ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = "#FFFFFF"; ctx.beginPath(); ctx.moveTo(bx, by + bh); ctx.lineTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke();
        ctx.strokeStyle = "#808080"; ctx.beginPath(); ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx, by + bh); ctx.stroke();
        ctx.fillStyle = "#000"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Start", bx + bw / 2, by + bh / 2 + 1);
        ctx.restore();

        // High score display (below difficulty options)
        ctx.save(); ctx.globalAlpha = 0.8; ctx.fillStyle = "#33ff00"; ctx.font = "12px monospace"; ctx.textAlign = "center";
        ctx.fillText(`High: ${highScore}`, cw / 2, dy + bhSmall + 20);
        ctx.restore();

        requestAnimationFrame(loop); return;
      }

      if (dead || state === "dead") {
        const elapsed = Date.now() - deathAt;
        // Dim
        ctx.save(); ctx.globalAlpha = 0.25; ctx.fillStyle = "#000"; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.restore();
        // Popup
        const pw = Math.min(320, cw - 40), ph = 150;
        const px = Math.floor(cw / 2 - pw / 2);
        const py = Math.floor(ch / 2 - ph / 2);
        ctx.save(); ctx.globalAlpha = 0.35; ctx.fillStyle = "#000"; ctx.fillRect(px + 4, py + 4, pw, ph); ctx.restore();
        ctx.save();
        ctx.fillStyle = "#C0C0C0"; ctx.fillRect(px, py, pw, ph);
        ctx.fillStyle = "#FFFFFF"; ctx.fillRect(px + 2, py + 22, pw - 4, ph - 24);
        ctx.fillStyle = "#000080"; ctx.fillRect(px + 2, py + 2, pw - 4, 18);
        ctx.font = "bold 11px monospace"; ctx.fillStyle = "#FFFFFF"; ctx.textAlign = "left"; ctx.textBaseline = "middle";
        ctx.fillText("Game Over", px + 8, py + 11);
        ctx.restore();
        ctx.save(); ctx.fillStyle = "#000"; ctx.font = "bold 14px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(`Score: ${score}`, px + pw / 2, py + ph / 2 - 16);
        ctx.fillText(`High: ${highScore}`, px + pw / 2, py + ph / 2 + 2);
        ctx.restore();
        const bw = 90, bh = 24; const bx = px + pw / 2 - bw / 2; const by = py + ph - bh - 12;
        ctx.save();
        ctx.fillStyle = "#DFDFDF"; ctx.fillRect(bx, by, bw, bh);
        ctx.strokeStyle = "#FFFFFF"; ctx.beginPath(); ctx.moveTo(bx, by + bh); ctx.lineTo(bx, by); ctx.lineTo(bx + bw, by); ctx.stroke();
        ctx.strokeStyle = "#808080"; ctx.beginPath(); ctx.moveTo(bx + bw, by); ctx.lineTo(bx + bw, by + bh); ctx.lineTo(bx, by + bh); ctx.stroke();
        ctx.fillStyle = "#000"; ctx.font = "bold 12px monospace"; ctx.textAlign = "center"; ctx.textBaseline = "middle"; ctx.fillText("Restart", bx + bw / 2, by + bh / 2 + 1);
        ctx.restore();
        startBtn = { x: bx, y: by, w: bw, h: bh };
        state = "dead"; // remain until user restarts
        requestAnimationFrame(loop); return;
      }

      // Physics
      // Keep player anchored horizontally so it doesn't drift
      player.x = anchorX;
      player.vy += 0.32; if (!player.grounded && crouching) player.vy += 0.15; // fast fall while ducking
      player.y += player.vy;
      // Adjust crouch hitbox when grounded
      if (player.y >= gy - player.h) {
        player.y = gy - player.h; player.vy = 0; player.grounded = true; lastGroundedAt = Date.now();
      } else { player.grounded = false; }
      if (player.grounded) {
        if (crouching) { if (player.h !== 9) { player.h = 9; player.y = gy - player.h; } }
        else if (player.h !== 14) { player.h = 14; player.y = gy - player.h; }
      }

      // Spawns
      // Gradual speed ramp (difficulty-based)
      const ramp = difficulty === "easy" ? 0.0005 : difficulty === "hard" ? 0.0012 : 0.0008;
      worldSpeed = Math.min(5.0, worldSpeed + ramp);
      spawn++;
      const baseEvery = Math.max(55, Math.floor(85 - Math.min(25, cw / 140)) + (difficulty === "easy" ? 12 : difficulty === "hard" ? -8 : 0));
      if (spawn % baseEvery === 0) {
        // cactus vs bird distribution by difficulty
        const birdRatio = difficulty === "easy" ? 0.2 : difficulty === "hard" ? 0.4 : 0.3;
        if (Math.random() > birdRatio) {
          const h = 12 + Math.random() * 10;
          const w = 10 + Math.random() * 10;
          obstacles.push({ type: "cactus", x: cw, y: gy - h, w, h, vx: worldSpeed });
        } else {
          const level = Math.random() < 0.5 ? 28 : 48; // two flight levels
          const h = 12, w = 18;
          const birdBonus = difficulty === "hard" ? 0.6 : difficulty === "easy" ? 0.2 : 0.3;
          obstacles.push({ type: "bird", x: cw, y: gy - level, w, h, vx: worldSpeed + birdBonus });
        }
        if (obstacles.length > 30) obstacles.shift();
      }

      // User controls: jump on input only
      const near = obstacles.find(o => o.x - player.x < 44 && o.x - player.x > 8);

      // Update/draw obstacles
      for (const o of obstacles) o.x -= o.vx;
      // Draw obstacles
      ctx.save(); ctx.globalAlpha = 0.45; ctx.fillStyle = "#33ff00"; ctx.strokeStyle = "#33ff00";
      for (const o of obstacles) {
        if (o.type === "cactus") {
          ctx.fillRect(o.x, o.y, o.w, o.h);
          // small arms
          ctx.fillRect(o.x + o.w * 0.2, o.y + o.h * 0.3, 3, 8);
          ctx.fillRect(o.x + o.w * 0.65, o.y + o.h * 0.5, 3, 7);
        } else {
          // bird: simple flapping V
          const t = Date.now() * 0.01;
          const wing = Math.sin(t) * 4;
          ctx.beginPath();
          ctx.moveTo(o.x, o.y + o.h / 2);
          ctx.lineTo(o.x + o.w / 2, o.y + wing);
          ctx.lineTo(o.x + o.w, o.y + o.h / 2);
          ctx.stroke();
        }
      }
      ctx.restore();

      // Collision
      for (const o of obstacles) {
        const shrink = difficulty === "easy" ? 6 : difficulty === "hard" ? 2 : 4;
        const px = player.x + shrink/2, py = player.y + shrink/2, pw = player.w - shrink, ph = player.h - shrink; // forgiving hitbox
        if (px < o.x + o.w && px + pw > o.x && py < o.y + o.h && py + ph > o.y) { dead = true; deathAt = Date.now(); state = "dead"; highScore = Math.max(highScore, score); break; }
      }

      // Player
      // Player
      ctx.save(); ctx.shadowColor = "#33ff00"; ctx.shadowBlur = 6; ctx.globalAlpha = 0.6; ctx.fillStyle = "#33ff00";
      if (crouching && player.grounded) {
        // draw crouched wider rectangle
        ctx.fillRect(player.x, player.y, player.w + 6, player.h);
      } else {
        ctx.fillRect(player.x, player.y, player.w, player.h);
      }
      ctx.restore();

      // Score
      score += 1;
      ctx.save(); ctx.globalAlpha = 0.9; ctx.fillStyle = "#33ff00"; ctx.font = "12px monospace"; ctx.textAlign = "right";
      ctx.fillText(`Score: ${score}`, cw - 8, 16);
      ctx.fillText(`High: ${highScore}  •  ${difficulty.toUpperCase()}`, cw - 8, 30);
      ctx.restore();

      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      running = false;
      if (ro && wrapRef.current) ro.unobserve(wrapRef.current);
      window.removeEventListener("resize", resizeToParent);
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("keyup", onKeyUp);
      canvas.removeEventListener("mousedown", onClick);
    };
  }, []);

  return (
    <div ref={wrapRef} className="w-full h-full bg-black" role="application" aria-label="Retro Runner">
      <canvas ref={canvasRef} className="block" />
    </div>
  );
}
