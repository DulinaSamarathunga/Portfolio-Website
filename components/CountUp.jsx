"use client";

import { useEffect, useRef, useState } from "react";

const DURATION_MS = 1400;

// Animates a stat like "7+" from 0 up to its number once it scrolls into view.
// Server-renders the final value so it's correct without JavaScript.
export default function CountUp({ value }) {
  const match = /^(\d+)(.*)$/.exec(value);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const ref = useRef(null);
  const [current, setCurrent] = useState(target);

  useEffect(() => {
    if (target === null || target === 0) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const el = ref.current;
    let frame = 0;
    setCurrent(0);

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / DURATION_MS, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(eased * target));
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });

    observer.observe(el);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  if (target === null) return <span>{value}</span>;
  return (
    <span ref={ref}>
      {current}
      {suffix}
    </span>
  );
}
