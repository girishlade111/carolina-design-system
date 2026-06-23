"use client";

import * as React from "react";

/* Tracks which section is currently in view, for nav highlighting. */
export function useActiveSection(ids: string[]) {
  const [active, setActive] = React.useState(ids[0] ?? "");

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        rootMargin: "-45% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 1],
      }
    );

    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, [ids]);

  return active;
}
