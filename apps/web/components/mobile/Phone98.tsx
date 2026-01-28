"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { VT323 } from "next/font/google";
import BootScreen from "@/components/desktop/BootScreen";
import AboutWindow from "@/components/desktop/windows/AboutWindow";
import ScheduleWindow from "@/components/desktop/windows/ScheduleWindow";
import PrizesWindow from "@/components/desktop/windows/PrizesWindow";
import RulesWindow from "@/components/desktop/windows/RulesWindow";
import AnnouncementsWindow from "@/components/desktop/windows/AnnouncementsWindow";
import SponsorsWindow from "@/components/desktop/windows/SponsorsWindow";
import RegisterWindow from "@/components/desktop/windows/RegisterWindow";
import SystemErrorBanner from "@/components/ui/SystemErrorBanner";
import CountdownTimer from "@/components/ui/CountdownTimer";
import CRTSettings from "@/components/desktop/CRTSettings";
import DesktopIcon from "@/components/desktop/DesktopIcon";
const pixelFont = VT323({ subsets: ["latin"], weight: "400" });

function ErrorPopup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="win98-window w-64 shadow-lg text-sm">
      <div className="win98-titlebar flex justify-between items-center">
        <span className="font-bold">Hacker-Tips</span>
        <button className="win98-btn" onClick={onClose}>X</button>
      </div>
      <div className="p-3 bg-white text-black">
        <p>{message}</p>
      </div>
    </div>
  );
}

interface ScheduleItem {
  _id: string;
  title: string;
  startTime: string;
  type: string;
  location?: string;
}

interface AboutDoc {
  _id: string;
  title: string;
  subtitle?: string;
  heroImage?: any;
  body?: any;
  highlights?: string[];
  cta?: { label?: string; href?: string };
}

interface PersonDoc {
  _id: string;
  name: string;
  role?: string;
  image?: any;
  bio?: string;
  socials?: { github?: string; linkedin?: string; twitter?: string; website?: string };
}

interface OrganizerDoc {
  _id: string;
  name: string;
  logo?: any;
  url?: string;
  description?: string;
}

interface FaqDoc {
  _id: string;
  question: string;
  answer: string;
  category?: string;
  order?: number;
}

export default function Phone98({ events, about, leaders, organizers, faqs, announcements, prizes, sponsors, rulesPage, settings, slug }: {
  events: ScheduleItem[];
  about: AboutDoc | null;
  leaders: PersonDoc[];
  organizers: OrganizerDoc[];
  faqs: FaqDoc[];
  announcements: { _id: string; title: string; date?: string; time?: string; pinned?: boolean; level?: string; _updatedAt?: string }[];
  prizes: { _id: string; name: string; amount: string; by?: string; tier?: string; desc?: string }[];
  sponsors: { _id: string; name: string; tier: string; logo?: any; url?: string }[];
  rulesPage: { _id: string; title?: string; core?: string[]; conduct?: string[]; submissions?: string[]; eligibility?: string[]; note?: string } | null;
  settings: { _id: string; registerUrl?: string } | null;
  slug: string;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [boot, setBoot] = useState(true);
  const [errors, setErrors] = useState<{ id: number; message: string }[]>([]);
  const [popupInterval, setPopupInterval] = useState<number>(12000);
  const [popupChance, setPopupChance] = useState<number>(0.8);

  const scheduleContent = (<ScheduleWindow events={events} />);
  const aboutContent = (<AboutWindow about={about} leaders={leaders} organizers={organizers} faqs={faqs} />);
  const prizesContent = (<PrizesWindow prizes={prizes} />);
  const rulesContent = (<RulesWindow rules={rulesPage || undefined} />);
  const sponsorsContent = (<SponsorsWindow sponsors={sponsors} />);
  const announcementsContent = (<AnnouncementsWindow announcements={announcements} />);
  const registerContent = (<RegisterWindow registerUrl={settings?.registerUrl} />);
  const crtContent = (<CRTSettings />);

  const items = useMemo(() => ([
    { id: "about", title: "About.exe", content: aboutContent },
    { id: "schedule", title: "Schedule.exe", content: scheduleContent },
    { id: "prizes", title: "Prizes.exe", content: prizesContent },
    { id: "rules", title: "Rules.txt", content: rulesContent },
    { id: "ann", title: "Announcements.log", content: announcementsContent },
    { id: "sponsors", title: "Sponsors.html", content: sponsorsContent },
    { id: "register", title: "Register.exe", content: registerContent },
    { id: "crt-settings", title: "CRT Settings.exe", content: crtContent },
  ]), [events]);

  // Desktop-style pixel icons for mobile grid
  const mobileIcons = useMemo(() => ([
    { id: "about", title: "About.exe", pixelName: "about" as const, pixelColor: "#0000cc" },
    { id: "schedule", title: "Schedule.exe", pixelName: "schedule" as const, pixelColor: "#ffcc00" },
    { id: "prizes", title: "Prizes.exe", pixelName: "prizes" as const, pixelColor: "#ff00ff" },
    { id: "rules", title: "Rules.txt", pixelName: "rules" as const, pixelColor: "#cccccc" },
    { id: "ann", title: "Announcements.log", pixelName: "ann" as const, pixelColor: "#ff3300" },
    { id: "sponsors", title: "Sponsors.html", pixelName: "sponsors" as const, pixelColor: "#00aaff" },
    { id: "register", title: "Register.exe", pixelName: "register" as const, pixelColor: "#33ffaa" },
    { id: "crt-settings", title: "CRT Settings.exe", pixelName: "settings" as const, pixelColor: "#00ffff" },
  ]), []);

  const messages = useMemo(() => ([
    "Tap an item to open",
    "Schedule.exe shows event timings",
    "Register.exe opens the registration link",
  ]), []);

  // Subtle click sound for icon taps (WebAudio)
  const audioCtxRef = useRef<AudioContext | null>(null);
  const ensureAudio = () => {
    if (!audioCtxRef.current) {
      const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
      if (AC) audioCtxRef.current = new AC();
    }
  };
  const playClick = () => {
    ensureAudio();
    const ctx = audioCtxRef.current;
    if (!ctx) return;
    const startPlay = () => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "square";
      osc.frequency.value = 900;
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.07);
      osc.connect(gain).connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    };
    if (ctx.state === "suspended") {
      ctx.resume().then(startPlay).catch(() => {});
    } else {
      startPlay();
    }
  };

  // Sync popup settings from CRTSettings and localStorage
  useEffect(() => {
    try {
      const iv = Number(localStorage.getItem("popup.interval") || "");
      const ch = Number(localStorage.getItem("popup.chance") || "");
      if (!Number.isNaN(iv) && iv > 0) setPopupInterval(iv);
      if (!Number.isNaN(ch) && ch >= 0 && ch <= 1) setPopupChance(ch);
    } catch {}
    const onSettings = (e: Event) => {
      const anyE = e as CustomEvent<{ interval?: number; chance?: number }>;
      if (anyE?.detail?.interval) setPopupInterval(anyE.detail.interval);
      if (typeof anyE?.detail?.chance === "number") setPopupChance(anyE.detail.chance);
    };
    window.addEventListener("popup-settings", onSettings);
    return () => window.removeEventListener("popup-settings", onSettings);
  }, []);

  // Non-blocking mobile popups
  useEffect(() => {
    const tips = [
      "Tip: Submit early, update often",
      "Tip: Check Schedule.exe for next events",
      "Tip: Register via Register.exe",
      "Tip: Commit and push frequently",
      "Tip: Ask mentors early if blocked",
      "Tip: Keep scope tight, ship MVP",
      "Tip: Demo readiness beats perfect code",
      "Tip: Use CRT Settings.exe for visibility",
    ];
    const tick = () => {
      if (Math.random() < popupChance) {
        const msg = tips[Math.floor(Math.random() * tips.length)];
        if (!msg) return;
        const id = Date.now();
        setErrors(prev => [...prev.slice(-2), { id, message: msg }]);
        setTimeout(() => setErrors(prev => prev.filter(e => e.id !== id)), 4000);
      }
    };
    const iv = setInterval(tick, Math.max(3000, popupInterval));
    return () => clearInterval(iv);
  }, [popupInterval, popupChance]);

  return (
    boot ? (
      <BootScreen onDone={() => setBoot(false)} />
    ) : (
    <div
      className={`${pixelFont.className} fixed inset-0 text-white`}
      style={{
        backgroundImage: "url(\"/hacksrm-logo.webp\")",
        backgroundSize: "var(--wallpaper-size, contain)",
        backgroundPosition: "var(--wallpaper-pos, center)",
        backgroundRepeat: "no-repeat",
        backgroundColor: "#0b0b0b",
      }}
    >
      {/* Top bar */}
      <SystemErrorBanner lowerZ={false} messages={messages} intervalMs={8000} slug={slug}/>
      {/* Spacer to keep content below fixed banner */}
      <div className="h-14" aria-hidden="true" />
      {/* Contrast overlay for readability */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.45) 60%, rgba(0,0,0,0.55) 100%), linear-gradient(to bottom, rgba(0,0,0,0.20), rgba(0,0,0,0.45))",
        }}
      />
      {/* CRT scanlines overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-20"
        style={{
          background:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.05) 0px, rgba(255,255,255,0.05) 1px, rgba(0,0,0,0) 1px, rgba(0,0,0,0) 3px)",
          mixBlendMode: "overlay",
        }}
      />

      {/* Phone container */}
      {activeId === null ? (
        <div className="pt-16 px-3 pb-16 max-w-md mx-auto relative z-30">
          <div className="grid grid-cols-3 gap-x-3 gap-y-4 place-items-center">
            {mobileIcons.map(ic => (
              <DesktopIcon
                key={ic.id}
                label={ic.title}
                pixelName={ic.pixelName}
                pixelColor={ic.pixelColor}
                clickToOpen
                onOpen={() => { playClick(); setActiveId(ic.id); }}
              />
            ))}
          </div>
        </div>
      ) : (
        <div className="pt-12 pb-16 max-w-md mx-auto h-full relative z-30">
          {/* Title bar */}
          <div className="sticky top-14 z-40 flex items-center justify-between border-2 border-gray-600 bg-black px-3 py-2">
            <div className="font-bold text-base">{items.find(x => x.id === activeId)?.title || "Window"}</div>
            <div className="flex gap-2">
              <button className="win98-btn text-black" onClick={() => setActiveId(null)}>Back</button>
            </div>
          </div>
          {/* Content */}
          <div className="bg-white text-black h-[calc(100vh-140px)] overflow-auto p-2 pb-24 border-x-2 border-b-2 border-gray-600">
            {items.find(x => x.id === activeId)?.content}
          </div>
        </div>
      )}

      {/* Bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-50">
        {/* Retro footer bar */}
        <div className="border-t-2 border-black/40 bg-[#C0C0C0] px-3 py-2">
          <div className="flex items-center justify-between">
            <div className="text-sm text-black">
              {activeId ? "Window open: tap Back to close" : "Ready: tap an item to open"}
            </div>
            <div className="flex items-center gap-2">
              {activeId && (
                <button className="win98-btn text-black" onClick={() => setActiveId(null)}>Home</button>
              )}
              <button className="win98-btn text-black" onClick={() => setActiveId("about")}>About</button>
              <button className="win98-btn text-black" onClick={() => setActiveId("crt-settings")}>CRT Settings</button>
            </div>
          </div>
        </div>
        {/* Hazard stripes for retro vibe */}
        <div className="h-2 bg-[repeating-linear-gradient(135deg,rgba(255,0,0,1)_0px,rgba(255,0,0,1)_10px,transparent_10px,transparent_20px)]" />
      </div>
      {/* Mobile popups */}
      <div className="fixed right-2 bottom-20 space-y-2 z-50">
        {errors.map(e => (
          <ErrorPopup key={e.id} message={e.message} onClose={() => setErrors(prev => prev.filter(x => x.id !== e.id))} />
        ))}
      </div>

      {/* Bottom countdown timer (above footer, only on home) */}
      {activeId === null && (
        <div className="fixed left-0 right-0 bottom-12 z-40 flex justify-center">
          <CountdownTimer target={new Date("2026-02-25T00:00:00")} label="Hackathon starts in:" compact />
        </div>
      )}
    </div>
    )
  );
}
