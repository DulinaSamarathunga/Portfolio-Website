"use client";

import { useLayoutEffect, useState } from "react";

// Positions a highlight pill under the element marked `data-indicator-active="true"`
// inside `containerRef`. The container must be `position: relative`.
export default function useSlidingIndicator(containerRef, activeKey) {
  const [style, setStyle] = useState({ opacity: 0 });

  useLayoutEffect(() => {
    const update = () => {
      const el = containerRef.current?.querySelector('[data-indicator-active="true"]');
      if (!el || el.offsetWidth === 0) {
        setStyle({ opacity: 0 });
        return;
      }
      setStyle({
        opacity: 1,
        width: el.offsetWidth,
        height: el.offsetHeight,
        transform: `translate(${el.offsetLeft}px, ${el.offsetTop}px)`,
      });
    };

    update();
    document.fonts?.ready.then(update);
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [containerRef, activeKey]);

  return style;
}
