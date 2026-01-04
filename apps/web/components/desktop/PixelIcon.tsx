"use client";
import clsx from "clsx";

type PixelIconName =
  | "game"
  | "settings"
  | "about"
  | "schedule"
  | "prizes"
  | "rules"
  | "ann"
  | "sponsors"
  | "register"
  | "recycle";

export default function PixelIcon({ name, color = "#000080" }: { name: PixelIconName; color?: string }) {
  const patterns: Record<PixelIconName, string[]> = {
    // 8x8 patterns; 1 = filled, 0 = empty
    game: [
      "00111100",
      "01111110",
      "11111111",
      "11011011",
      "11011011",
      "11100111",
      "01100110",
      "00111100",
    ],
    settings: [
      "00011000",
      "00111100",
      "00100100",
      "01100110",
      "01100110",
      "00100100",
      "00111100",
      "00011000",
    ],
    about: [
      "01111110",
      "11111111",
      "11000011",
      "11000011",
      "11000011",
      "11111111",
      "01111110",
      "00011000",
    ],
    schedule: [
      "00111100",
      "01111110",
      "11100111",
      "11000111",
      "11011111",
      "11100111",
      "01111110",
      "00111100",
    ],
    prizes: [
      "00111100",
      "01111110",
      "01111110",
      "00111100",
      "00011000",
      "00111100",
      "01100110",
      "11000011",
    ],
    rules: [
      "01111110",
      "11111111",
      "11000000",
      "11011110",
      "11011110",
      "11000000",
      "11111111",
      "01111110",
    ],
    ann: [
      "00001111",
      "00011111",
      "00111110",
      "01111100",
      "01111100",
      "00111110",
      "00011111",
      "00001111",
    ],
    sponsors: [
      "00111100",
      "01100110",
      "11011011",
      "11011011",
      "11011011",
      "11011011",
      "01100110",
      "00111100",
    ],
    register: [
      "00111110",
      "01111111",
      "11100011",
      "11100011",
      "11100011",
      "11100011",
      "01111111",
      "00111110",
    ],
    recycle: [
      "01111110",
      "11111111",
      "11000011",
      "11011011",
      "11011011",
      "11000011",
      "11111111",
      "01111110",
    ],
  };

  const rows = patterns[name] || patterns.game;

  return (
    <div
      className={clsx("grid")}
      style={{
        gridTemplateColumns: "repeat(8, 1fr)",
        width: 24,
        height: 24,
      }}
    >
      {rows.flatMap((row, y) =>
        row.split("").map((c, x) => (
          <div
            key={`${y}-${x}`}
            style={{
              backgroundColor: c === "1" ? color : "transparent",
              imageRendering: "pixelated",
            }}
          />
        ))
      )}
    </div>
  );
}