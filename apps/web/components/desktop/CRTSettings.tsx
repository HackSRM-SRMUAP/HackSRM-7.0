"use client";
import { useEffect, useState } from "react";

export default function CRTSettings() {
  const [dotsIntensity, setDotsIntensity] = useState(0.2);
  const [grilleIntensity, setGrilleIntensity] = useState(0.6);
  const [dotsEnabled, setDotsEnabled] = useState(true);
  const [grilleEnabled, setGrilleEnabled] = useState(true);
  const [curvature, setCurvature] = useState(0.12);
  const [bloom, setBloom] = useState(0.06);
  const [deconv, setDeconv] = useState(0.25);
  const [wallpaperMode, setWallpaperMode] = useState<"fill" | "fit">("fit");
  const [popupPreset, setPopupPreset] = useState<"quiet"|"normal"|"frequent"|"chaos">("frequent");

  // Initialize both sliders from current CSS variables (or enforce defaults if missing)
  useEffect(() => {
    const root = document.documentElement;
    const styles = getComputedStyle(root);
    let dots = parseFloat(styles.getPropertyValue("--mask-dots-opacity") || "");
    let grille = parseFloat(styles.getPropertyValue("--mask-grille-opacity") || "");
    let curv = parseFloat(styles.getPropertyValue("--crt-curvature") || "");
    let blm = parseFloat(styles.getPropertyValue("--crt-bloom") || "");
    let dcv = parseFloat(styles.getPropertyValue("--deconvergence-opacity") || "");
    if (Number.isNaN(dots)) dots = 0.20;
    if (Number.isNaN(grille)) grille = 0.60;
    if (Number.isNaN(curv)) curv = 0.12;
    if (Number.isNaN(blm)) blm = 0.06;
    if (Number.isNaN(dcv)) dcv = 0.25;
    // Apply to CSS so overlays reflect immediately
    root.style.setProperty("--mask-dots-opacity", String(dots));
    root.style.setProperty("--mask-grille-opacity", String(grille));
    root.style.setProperty("--crt-curvature", String(curv));
    root.style.setProperty("--crt-bloom", String(blm));
    root.style.setProperty("--deconvergence-opacity", String(dcv));
    // Initialize wallpaper fit vars if missing
    const size = (styles.getPropertyValue("--wallpaper-size") || "").trim();
    if (!size) {
      root.style.setProperty("--wallpaper-size", "contain");
      root.style.setProperty("--wallpaper-pos", "center");
      setWallpaperMode("fit");
    } else {
      setWallpaperMode(size === "contain" ? "fit" : "fill");
    }
    setDotsIntensity(dots);
    setGrilleIntensity(grille);
    setCurvature(curv);
    setBloom(blm);
    setDeconv(dcv);
    setDotsEnabled(dots > 0);
    setGrilleEnabled(grille > 0);

    // Initialize popup preset from localStorage if present
    try {
      const iv = Number(localStorage.getItem("popup.interval") || "");
      const ch = Number(localStorage.getItem("popup.chance") || "");
      // Map to nearest preset
      const preset = (() => {
        if (iv <= 9000 || ch >= 0.95) return "chaos" as const;
        if (iv <= 13000 || ch >= 0.75) return "frequent" as const;
        if (iv <= 20000 || ch >= 0.55) return "normal" as const;
        return "quiet" as const;
      })();
      if (!Number.isNaN(iv) || !Number.isNaN(ch)) setPopupPreset(preset);
    } catch {}
  }, []);

  return (
    <div className="p-3 space-y-3 text-black">
      <h3 className="font-bold">CRT Settings</h3>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={dotsEnabled}
            onChange={(e) => {
              const enabled = e.target.checked;
              setDotsEnabled(enabled);
              document.documentElement.style.setProperty(
                "--mask-dots-opacity",
                String(enabled ? dotsIntensity : 0)
              );
            }}
          />
          Phosphor Dots Enabled
        </label>
        <label className="block text-sm">Phosphor Dots Intensity ({dotsIntensity.toFixed(2)})</label>
        <input
          type="range"
          min={0}
          max={0.8}
          step={0.02}
          value={dotsIntensity}
          onChange={(e) => {
            const v = Number(e.target.value);
            setDotsIntensity(v);
            document.documentElement.style.setProperty(
              "--mask-dots-opacity",
              String(dotsEnabled ? v : 0)
            );
          }}
        />
      </div>

      <div className="space-y-2 pt-2">
        <div className="font-bold">Wallpaper Fit</div>
        <div className="flex items-center gap-4 text-sm">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="wallpaper-fit"
              checked={wallpaperMode === "fill"}
              onChange={() => {
                setWallpaperMode("fill");
                const root = document.documentElement;
                root.style.setProperty("--wallpaper-size", "cover");
                root.style.setProperty("--wallpaper-pos", "top center");
              }}
            />
            Fill (cover)
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="wallpaper-fit"
              checked={wallpaperMode === "fit"}
              onChange={() => {
                setWallpaperMode("fit");
                const root = document.documentElement;
                root.style.setProperty("--wallpaper-size", "contain");
                root.style.setProperty("--wallpaper-pos", "center");
              }}
            />
            Fit (contain)
          </label>
        </div>
      </div>

      <div className="space-y-2 pt-2">
        <div className="font-bold">Popup Frequency</div>
        <select
          className="win98-input text-sm"
          value={popupPreset}
          onChange={(e) => {
            const val = e.target.value as typeof popupPreset;
            setPopupPreset(val);
            const mapping = {
              quiet: { interval: 25000, chance: 0.4 },
              normal: { interval: 18000, chance: 0.6 },
              frequent: { interval: 12000, chance: 0.8 },
              chaos: { interval: 8000, chance: 1.0 },
            } as const;
            const sel = mapping[val];
            try {
              localStorage.setItem("popup.interval", String(sel.interval));
              localStorage.setItem("popup.chance", String(sel.chance));
            } catch {}
            // Notify listeners
            window.dispatchEvent(new CustomEvent("popup-settings", { detail: sel }));
          }}
        >
          <option value="quiet">Quiet (rare)</option>
          <option value="normal">Normal</option>
          <option value="frequent">Frequent</option>
          <option value="chaos">Chaos (lots)</option>
        </select>
        <p className="text-xs text-black/70">Controls hackathon tip popups frequency.</p>
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Screen Curvature ({curvature.toFixed(2)})</label>
        <input
          type="range"
          min={0}
          max={0.5}
          step={0.02}
          value={curvature}
          onChange={(e) => {
            const v = Number(e.target.value);
            setCurvature(v);
            document.documentElement.style.setProperty("--crt-curvature", String(v));
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Bloom / Halation ({bloom.toFixed(2)})</label>
        <input
          type="range"
          min={0}
          max={0.6}
          step={0.02}
          value={bloom}
          onChange={(e) => {
            const v = Number(e.target.value);
            setBloom(v);
            document.documentElement.style.setProperty("--crt-bloom", String(v));
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm">Deconvergence ({deconv.toFixed(2)})</label>
        <input
          type="range"
          min={0}
          max={0.6}
          step={0.02}
          value={deconv}
          onChange={(e) => {
            const v = Number(e.target.value);
            setDeconv(v);
            document.documentElement.style.setProperty("--deconvergence-opacity", String(v));
          }}
        />
      </div>
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={grilleEnabled}
            onChange={(e) => {
              const enabled = e.target.checked;
              setGrilleEnabled(enabled);
              document.documentElement.style.setProperty(
                "--mask-grille-opacity",
                String(enabled ? grilleIntensity : 0)
              );
            }}
          />
          Aperture Grille Enabled
        </label>
        <label className="block text-sm">Aperture Grille Intensity ({grilleIntensity.toFixed(2)})</label>
        <input
          type="range"
          min={0}
          max={0.8}
          step={0.02}
          value={grilleIntensity}
          onChange={(e) => {
            const v = Number(e.target.value);
            setGrilleIntensity(v);
            document.documentElement.style.setProperty(
              "--mask-grille-opacity",
              String(grilleEnabled ? v : 0)
            );
          }}
        />
      </div>

      <div className="mt-3">
        <button
          className="win98-btn win98-task-btn"
          onClick={() => {
            setDotsIntensity(0.20);
            setGrilleIntensity(0.60);
            setDotsEnabled(true);
            setGrilleEnabled(true);
            setCurvature(0.12);
            setBloom(0.06);
            setDeconv(0.25);
            const root = document.documentElement;
            root.style.setProperty("--mask-dots-opacity", "0.20");
            root.style.setProperty("--mask-grille-opacity", "0.60");
            root.style.setProperty("--crt-curvature", "0.12");
            root.style.setProperty("--crt-bloom", "0.06");
            root.style.setProperty("--deconvergence-opacity", "0.25");
            // Reset popup frequency to Frequent
            setPopupPreset("frequent");
            try {
              localStorage.setItem("popup.interval", String(12000));
              localStorage.setItem("popup.chance", String(0.8));
            } catch {}
            window.dispatchEvent(new CustomEvent("popup-settings", { detail: { interval: 12000, chance: 0.8 } }));
          }}
        >
          Reset to Defaults
        </button>
      </div>
      <p className="text-xs text-black/70">Tip: Dots feel glassy; grille feels Trinitron. Adjust intensity to taste.</p>
    </div>
  );
}
