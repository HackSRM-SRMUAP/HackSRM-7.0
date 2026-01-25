"use client";
import { useMemo, useState, useEffect, useRef } from "react";
import BootScreen from "@/components/desktop/BootScreen";
import DesktopIcon from "@/components/desktop/DesktopIcon";
import Window98, { type WindowItem } from "@/components/desktop/Window98";
import Taskbar98 from "@/components/desktop/Taskbar98";
import SystemErrorBanner from "@/components/ui/SystemErrorBanner";
import CountdownTimer from "@/components/ui/CountdownTimer";
import RetroGameEmbed from "@/components/effects/RetroGameEmbed";
import CRTSettings from "@/components/desktop/CRTSettings";
import AboutWindow from "@/components/desktop/windows/AboutWindow";
import ScheduleWindow from "@/components/desktop/windows/ScheduleWindow";
import PrizesWindow from "@/components/desktop/windows/PrizesWindow";
import RulesWindow from "@/components/desktop/windows/RulesWindow";
import AnnouncementsWindow from "@/components/desktop/windows/AnnouncementsWindow";
import SponsorsWindow from "@/components/desktop/windows/SponsorsWindow";
import RegisterWindow from "@/components/desktop/windows/RegisterWindow";
import RecycleWindow from "@/components/desktop/windows/RecycleWindow";
import SponsorWindow from "@/components/desktop/windows/SponsorWindow";
import { urlFor } from "@/lib/sanity";

function ErrorPopup({ message, onClose }: { message: string; onClose: () => void }) {
  return (
    <div className="win98-window w-64 shadow-lg text-sm">
      <div className="win98-titlebar flex justify-between items-center">
        <span className="font-bold">Hacker-Tips</span>
        <button className="win98-btn" onClick={onClose}>X</button>
      </div>
      <div className="p-4 bg-white text-black flex items-start space-x-2">
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

export default function Desktop98({ events, about, leaders, organizers, faqs, announcements, prizes, sponsors, rulesPage, settings }: {
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
}) {
  const [boot, setBoot] = useState(true);
  const [startMenu, setStartMenu] = useState(false);
  const [windows, setWindows] = useState<WindowItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ id: number; message: string }[]>([]);
  const START_AT = Number(process.env.NEXT_PUBLIC_HACKATHON_START || 0);
  // no auto-open game by default
  const [popupInterval, setPopupInterval] = useState<number>(12000);
  const [popupChance, setPopupChance] = useState<number>(0.8);
  const [maximizedIds, setMaximizedIds] = useState<Set<string>>(new Set());
  const anyMaximized = maximizedIds.size > 0;
  // Sidebar sponsor tier filter
  const [sponsorTier, setSponsorTier] = useState<string>("All");
  const tiers = ["All", "Platinum", "Gold", "Silver", "Community"];
  const tierBadgeClass = (t: string) => (
    t === "Platinum" ? "bg-gray-300 text-gray-800 border-gray-400" :
    t === "Gold" ? "bg-amber-200 text-amber-900 border-amber-300" :
    t === "Silver" ? "bg-slate-200 text-slate-900 border-slate-300" :
    t === "Community" ? "bg-green-200 text-green-900 border-green-300" :
    "bg-white text-black border-gray-300"
  );
    // Lightweight click sound for empty desktop areas (WebAudio)
    const audioCtxRef = useRef<AudioContext | null>(null);
    const ensureAudio = () => {
      if (!audioCtxRef.current) {
        const AC = (window as any).AudioContext || (window as any).webkitAudioContext;
        if (AC) audioCtxRef.current = new AC();
      }
    };
    const playClickSound = () => {
      ensureAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      const startPlay = () => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = 850;
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
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
  const bannerMessages = useMemo(() => ([
    "Open About.exe to learn about HACK SRM",
    "Open Schedule.exe to view event timings",
    "Open Prizes.exe to see rewards",
    "Open Rules.txt to read guidelines",
    "Open Announcements.log for latest updates",
    "Open Sponsors.html to explore partners",
    "Open Register.exe to register",
    "Open Recycle Bin to manage deleted items",
    "Launch Retro Runner.exe to play the game",
    "Open CRT Settings.exe to adjust effects and popup frequency",
  ]), []);

  // Sync popup settings from localStorage and listen for runtime changes
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

  const openWindow = (id: string, title: string, content: React.ReactNode, initialPos?: { x: number; y: number }) => {
    setWindows(prev => {
      const exists = prev.find(w => w.id === id);
      if (exists) {
        // un-minimize and focus
        return prev.map(w => w.id === id ? { ...w, minimized: false } : w);
      }
      return [...prev, { id, title, content, initialPos }];
    });
    setActiveId(id);
  };
  const closeWindow = (id: string) => {
    setWindows(prev => prev.filter(w => w.id !== id));
    if (activeId === id) setActiveId(null);
    setMaximizedIds(prev => { const next = new Set(prev); next.delete(id); return next; });
  };
  const minimizeWindow = (id: string) => setWindows(prev => prev.map(w => w.id === id ? { ...w, minimized: !w.minimized } : w));

  // fun non-blocking error popups (frequency configurable)
  useEffect(() => {
    const messages = [
      "Tip: Submit early, update often",
      "Tip: Check Schedule.exe for next events",
      "Tip: Register via Register.exe",
      "Tip: Commit and push frequently",
      "Tip: Ask mentors early if blocked",
      "Tip: Keep scope tight, ship MVP",
      "Tip: Demo readiness > perfect code",
      "Tip: Use CRT Settings.exe for visibility",
    ];
    const tick = () => {
      // show at most one error per tick based on chance
      if (Math.random() < popupChance) {
        const msg = messages[Math.floor(Math.random() * messages.length)];
        if (!msg) return;
        const id = Date.now();
        setErrors(prev => [...prev.slice(-2), { id, message: msg }]);
        setTimeout(() => setErrors(prev => prev.filter(e => e.id !== id)), 4000);
      }
    };
    const iv = setInterval(tick, Math.max(3000, popupInterval));
    return () => clearInterval(iv);
  }, [popupInterval, popupChance]);

  const scheduleContent = (<ScheduleWindow events={events} />);
  const aboutContent = (<AboutWindow about={about} leaders={leaders} organizers={organizers} faqs={faqs} />);
  const prizesContent = (<PrizesWindow prizes={prizes} />);
  const rulesContent = (<RulesWindow rules={rulesPage || undefined} />);
  const sponsorsContent = (<SponsorsWindow sponsors={sponsors} />);
  const announcementsContent = (<AnnouncementsWindow announcements={announcements} />);
  const gameContent = (<RetroGameEmbed />);
  const registerContent = (<RegisterWindow registerUrl={settings?.registerUrl} />);
  const recycleContent = (<RecycleWindow />);

  const icons = useMemo(() => ([
    { id: "about", title: "About.exe", pixelName: "about" as const, pixelColor: "#0000cc", content: aboutContent },
    { id: "schedule", title: "Schedule.exe", pixelName: "schedule" as const, pixelColor: "#ffcc00", content: scheduleContent },
    { id: "game", title: "Retro Runner.exe", pixelName: "game" as const, pixelColor: "#33ff00", content: gameContent },
    { id: "crt-settings", title: "CRT Settings.exe", pixelName: "settings" as const, pixelColor: "#00ffff", content: <CRTSettings /> },
    { id: "recycle", title: "Recycle Bin", pixelName: "recycle" as const, pixelColor: "#00cc66", content: recycleContent },
    { id: "prizes", title: "Prizes.exe", pixelName: "prizes" as const, pixelColor: "#ff00ff", content: prizesContent },
    { id: "rules", title: "Rules.txt", pixelName: "rules" as const, pixelColor: "#cccccc", content: rulesContent },
    { id: "ann", title: "Announcements.log", pixelName: "ann" as const, pixelColor: "#ff3300", content: announcementsContent },
    { id: "sponsors", title: "Sponsors.html", pixelName: "sponsors" as const, pixelColor: "#00aaff", content: sponsorsContent },
    { id: "register", title: "Register.exe", pixelName: "register" as const, pixelColor: "#33ffaa", content: registerContent },
  ]), []);

  // No auto-open windows after boot; user opens via desktop icons
  useEffect(() => {
    // intentionally left blank
  }, [boot]);

  if (boot) return <BootScreen onDone={() => setBoot(false)} />;

  return (
    <div
      className="fixed inset-0"
      style={{
        // backgroundColor: "#000080",
        backgroundImage: "url(\"/hacksrm-logo.webp\")",
        backgroundSize: "var(--wallpaper-size, contain)",
        backgroundPosition: "var(--wallpaper-pos, center)",
        backgroundRepeat: "no-repeat",
      }}
      onMouseDown={(e) => {
        // Only play when clicking empty desktop area (not icons/windows/banner/taskbar)
        if (e.target === e.currentTarget) {
          playClickSound();
        }
      }}
    >
      <SystemErrorBanner lowerZ={anyMaximized} messages={bannerMessages} intervalMs={7000} />
      {/* Countdown widget (positioned to the right, before sidebar) */}
      <div className="fixed z-40" style={{ top: "4.5rem", right: "19rem" }}>
        <CountdownTimer target={new Date("2026-02-25T00:00:00")} label="Hackathon starts in:" />
      </div>
      {/* Contrast overlay over wallpaper for readability */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(120% 100% at 50% 0%, rgba(0,0,0,0.20) 0%, rgba(0,0,0,0.30) 60%, rgba(0,0,0,0.35) 100%), linear-gradient(to bottom, rgba(0,0,0,0.10), rgba(0,0,0,0.25))",
        }}
      />
      {/* Icons layout: column-wise wrap (fill down, then new column). Bumped below banner. */}
      <div
        className={"absolute top-[4.5rem] left-4 right-64 bottom-12 flex flex-col flex-wrap content-start gap-2 z-30"}
        onMouseDown={(e) => {
          // click within icons area but not on an icon
          if (e.target === e.currentTarget) {
            playClickSound();
          }
        }}
      >
        {icons.map(ic => (
          <DesktopIcon key={ic.id} label={ic.title} pixelName={ic.pixelName} pixelColor={ic.pixelColor} onOpen={() => openWindow(ic.id, ic.title, ic.content)} />
        ))}
      </div>

      {/* Sponsors sidebar */}
      <aside className={"absolute top-[4.5rem] right-4 bottom-12 w-70 z-30 overflow-hidden"}>
        <div className="win98-window h-full flex flex-col shadow-[0_0_12px_rgba(0,0,0,0.25)]">
          <div className="win98-titlebar flex justify-between items-center" style={{backgroundImage: "linear-gradient(to bottom, rgba(0,0,0,0.25), rgba(0,0,0,0.10))"}}>
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-green-600 animate-blink" />
              <span className="font-bold">Sponsors</span>
            </div>
          </div>
          <div className="win98-body text-black p-2 flex flex-col h-full overflow-hidden">
            <div className="flex items-center justify-between mb-2 pr-1">
              <div className="flex flex-wrap gap-1">
                {tiers.map((t) => (
                  <button
                    key={t}
                    className={`win98-btn px-2 py-1 text-xs${sponsorTier === t ? " bg-black text-white" : ""}`}
                    onClick={() => setSponsorTier(t)}
                  >
                    {t}
                  </button>
                ))}
              </div>
              <button
                className="win98-btn px-2 py-1 text-xs"
                onClick={() => openWindow("sponsors", "Sponsors.html", <SponsorsWindow sponsors={sponsors} />)}
              >
                Open Sponsors.html
              </button>
            </div>
            <div className="overflow-auto no-scrollbar overflow-x-hidden">
            <ul className="space-y-1 pr-1">
              {(sponsorTier === "All" ? sponsors : sponsors.filter(s => s.tier === sponsorTier)).map((s) => (
                <li key={(s as any)._id ?? (s as any).id ?? (s as any).name}>
                  <div
                    role="button"
                    tabIndex={0}
                    className="w-full text-left text-xs bg-white/80 hover:bg-white px-2 py-2 border border-gray-500 flex items-start gap-2 min-w-0 transition duration-100 hover:shadow-sm"
                    onClick={() => {
                      const safeX = Math.max(24, window.innerWidth - 680 - 96);
                      const safeY = 80;
                      openWindow(
                        `sponsor-${(s as any)._id ?? (s as any).id ?? (s as any).name}`,
                        `${s.name}.html`,
                        <SponsorWindow sponsor={s as any} />,
                        { x: safeX, y: safeY }
                      );
                    }}
                    >
                    <img
                      src={typeof (s as any).logo === "string"
                        ? (s as any).logo
                        : (urlFor((s as any).logo)?.width(200).fit('max').url() || "")}
                      alt=""
                      className="bg-white/80 w-20 h-12 object-contain p-1 flex-shrink-0 border border-gray-300"
                    />
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold truncate whitespace-nowrap overflow-hidden text-ellipsis">{s.name}</span>
                      <span className={`mt-1 text-[10px] px-1 rounded border ${tierBadgeClass(s.tier)}`}>{s.tier}</span>
                      <button
                        className="mt-2 w-fit px-2 py-1 text-[11px] bg-gray-100 hover:bg-white border border-gray-500 shadow active:translate-y-[1px]"
                        onClick={(e) => {
                          e.stopPropagation();
                          const safeX = Math.max(24, window.innerWidth - 680 - 96);
                          const safeY = 80;
                          openWindow(
                            `sponsor-${(s as any)._id ?? (s as any).id ?? (s as any).name}`,
                            `${s.name}.html`,
                            <SponsorWindow sponsor={s as any} />,
                            { x: safeX, y: safeY }
                          );
                        }}
                      >
                        Click me for details
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            </div>
            {/* Compact footer status strip */}
            <div className="mt-2 border-t border-gray-400 text-black text-[10px] px-2 py-1 flex items-center justify-between"
                 style={{background: "linear-gradient(to bottom, rgba(255,255,255,0.35), rgba(255,255,255,0.08)), #C0C0C0"}}>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-green-600 animate-blink" />
                <span>
                  {(sponsorTier === "All" ? sponsors : sponsors.filter(s => s.tier === sponsorTier)).length} sponsors
                </span>
              </div>
              <span>Tier: {sponsorTier}</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Windows */}
      {windows.map(w => (
        <Window98
          key={w.id}
          item={w}
          active={activeId === w.id}
          onClose={closeWindow}
          onMinimize={minimizeWindow}
          onFocus={setActiveId}
          onMaxChange={(id, max) => {
            setMaximizedIds(prev => {
              const next = new Set(prev);
              if (max) next.add(id); else next.delete(id);
              return next;
            });
          }}
          dark={w.id === "game"}
        />
      ))}

      {/* Error popups */}
      <div className="fixed right-2 bottom-12 space-y-2 z-50">
        {errors.map(e => (
          <ErrorPopup key={e.id} message={e.message} onClose={() => setErrors(prev => prev.filter(x => x.id !== e.id))} />
        ))}
      </div>

      {/* Taskbar */}
      <Taskbar98
        windows={windows.map(w => ({ id: w.id, title: w.title, active: activeId === w.id, minimized: w.minimized }))}
        onToggle={(id) => { setActiveId(id); minimizeWindow(id); }}
        onStart={() => setStartMenu(s => !s)}
        startOpen={startMenu}
        startAt={START_AT > 0 ? START_AT : undefined}
        menu={[
          { label: "CRT Settings.exe", onClick: () => openWindow("crt-settings", "CRT Settings.exe", <CRTSettings />) },
          { label: "About.exe", onClick: () => openWindow("about", "About.exe", aboutContent) },
          { label: "Schedule.exe", onClick: () => openWindow("schedule", "Schedule.exe", scheduleContent) },
          { label: "Prizes.exe", onClick: () => openWindow("prizes", "Prizes.exe", prizesContent) },
          { label: "Rules.txt", onClick: () => openWindow("rules", "Rules.txt", rulesContent) },
          { label: "Announcements.log", onClick: () => openWindow("ann", "Announcements.log", announcementsContent) },
          { label: "Sponsors.html", onClick: () => openWindow("sponsors", "Sponsors.html", sponsorsContent) },
          { label: "Register.exe", onClick: () => openWindow("register", "Register.exe", registerContent) },
          { label: "Recycle Bin", onClick: () => openWindow("recycle", "Recycle Bin", recycleContent) },
          { label: "Retro Runner.exe", onClick: () => openWindow("game", "Retro Runner.exe", gameContent) },
        ]}
      />
    </div>
  );
}
