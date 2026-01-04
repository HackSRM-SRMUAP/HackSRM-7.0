"use client";
import { useEffect, useState } from "react";

interface Props {
  phrases: string[];
  typingSpeed?: number; // ms per char
  deletingSpeed?: number; // ms per char
  pauseTime?: number; // ms between phrases
}

export default function TerminalTyping({
  phrases,
  typingSpeed = 60,
  deletingSpeed = 35,
  pauseTime = 900,
}: Props) {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = phrases[index % phrases.length];
    if (!current) return;
    const isDone = text === current;

    const timeout = setTimeout(() => {
      if (!deleting) {
        if (!isDone) {
          setText(current.slice(0, text.length + 1));
        } else {
          // finished typing, pause then start deleting
          setTimeout(() => setDeleting(true), pauseTime);
        }
      } else {
        if (text.length > 0) {
          setText(current.slice(0, text.length - 1));
        } else {
          setDeleting(false);
          setIndex((i) => (i + 1) % phrases.length);
        }
      }
    }, deleting ? deletingSpeed : typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, deleting, index, phrases, typingSpeed, deletingSpeed, pauseTime]);

  return (
    <span className="inline-flex items-center">
      <span className="glow-text">{text}</span>
      <span className="ml-1 inline-block w-3 h-5 bg-[#33ff00] animate-blink" />
    </span>
  );
}
