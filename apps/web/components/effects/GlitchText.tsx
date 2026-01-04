"use client";
import clsx from "clsx";

interface Props {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className }: Props) {
  return (
    <span className={clsx("glitch", className)} data-text={text}>
      {text}
    </span>
  );
}
