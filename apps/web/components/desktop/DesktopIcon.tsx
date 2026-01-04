"use client";
import clsx from "clsx";
import type { IconType } from "react-icons";
import { VT323 } from "next/font/google";
import PixelIcon from "@/components/desktop/PixelIcon";

const vt323 = VT323({ weight: "400", subsets: ["latin"] });

export default function DesktopIcon({ label, icon: Icon, pixelName, pixelColor, onOpen, clickToOpen }: { label: string; icon?: IconType; pixelName?: Parameters<typeof PixelIcon>[0]["name"]; pixelColor?: string; onOpen: () => void; clickToOpen?: boolean }) {
  return (
    <button
      className={clsx(
        "group w-24 h-24 m-2 flex flex-col items-center justify-center select-none",
        "text-black"
      )}
      onDoubleClick={onOpen}
      onClick={clickToOpen ? onOpen : undefined}
      aria-label={`${label} icon`}
    >
      <div className="w-10 h-10 flex items-center justify-center" style={{ imageRendering: "pixelated" }}>
        {pixelName ? (
          <PixelIcon name={pixelName} color={pixelColor ?? "#000080"} />
        ) : Icon ? (
          <Icon size={22} className={clsx("text-[#000080] pixelate-svg")} />
        ) : null}
      </div>
      {/*icon-label-glow*/}
         <div
           className={clsx(
             "mt-1 text-center px-1 text-white group-hover:[text-shadow:0_0_3px_#ffffff,0_0_10px_rgba(255,255,255,0.6)]",
             vt323.className
           )}
         >
           {label}
         </div>
    </button>
  );
}
