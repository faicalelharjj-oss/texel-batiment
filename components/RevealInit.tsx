"use client";

import { useEffect } from "react";

export default function RevealInit() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) {
      document.querySelectorAll(".reveal").forEach((el) => el.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    const els = document.querySelectorAll(".reveal");
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
