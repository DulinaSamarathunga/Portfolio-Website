"use client";

import { useEffect } from "react";

const MAX_TILT = 6; // degrees

// Page-wide progressive enhancements, attached once via event delegation:
// - `.reveal`     fades in when scrolled into view
// - `.spotlight`  gets --mx/--my (pointer position) for a cursor-following glow
// - `.tilt`       gets --rx/--ry for a subtle 3D tilt
// - `.hero-section` gets --hx/--hy so its background glow follows the cursor
export default function ClientEffects() {
  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Reveal on scroll
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    root.classList.add("reveal-ready");

    // Pointer effects: only for mouse/trackpad users
    if (!window.matchMedia("(pointer: fine)").matches) {
      return () => observer.disconnect();
    }

    let frame = 0;
    let lastTilt = null;

    const resetTilt = (el) => {
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onPointerMove = (e) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const target = e.target instanceof Element ? e.target : null;

        const spot = target?.closest(".spotlight");
        if (spot) {
          const rect = spot.getBoundingClientRect();
          spot.style.setProperty("--mx", `${e.clientX - rect.left}px`);
          spot.style.setProperty("--my", `${e.clientY - rect.top}px`);
        }

        const hero = target?.closest(".hero-section");
        if (hero) {
          const rect = hero.getBoundingClientRect();
          hero.style.setProperty("--hx", `${e.clientX - rect.left}px`);
          hero.style.setProperty("--hy", `${e.clientY - rect.top}px`);
        }

        if (reducedMotion) return;
        const tilt = target?.closest(".tilt");
        if (lastTilt && lastTilt !== tilt) resetTilt(lastTilt);
        if (tilt) {
          const rect = tilt.getBoundingClientRect();
          const px = (e.clientX - rect.left) / rect.width - 0.5;
          const py = (e.clientY - rect.top) / rect.height - 0.5;
          tilt.style.setProperty("--rx", `${(-py * MAX_TILT).toFixed(2)}deg`);
          tilt.style.setProperty("--ry", `${(px * MAX_TILT).toFixed(2)}deg`);
        }
        lastTilt = tilt;
      });
    };

    const onPointerLeave = () => {
      if (lastTilt) resetTilt(lastTilt);
      lastTilt = null;
    };

    document.addEventListener("pointermove", onPointerMove, { passive: true });
    document.documentElement.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      document.removeEventListener("pointermove", onPointerMove);
      document.documentElement.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return null;
}
