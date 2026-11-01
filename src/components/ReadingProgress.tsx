"use client";

import { useEffect, useState } from "react";

/** 文章详情页顶部阅读进度条（挂在导航条下沿） */
export default function ReadingProgress() {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const total = el.scrollHeight - el.clientHeight;
      setPct(total > 0 ? Math.min(100, (el.scrollTop / total) * 100) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div aria-hidden className="fixed inset-x-0 top-[52px] z-40 h-[3px]">
      <div
        className="h-full bg-gradient-to-r from-navy-accent to-sky-300 transition-[width] duration-150"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
