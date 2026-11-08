"use client";

import { useEffect, useState } from "react";
import type { PostHeading } from "@/data/post-types";

/** 桌面端（xl+）粘性侧边目录：随滚动高亮当前小节 */
export default function TocSidebar({ headings }: { headings: PostHeading[] }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const els = headings
      .map((h) => document.getElementById(h.id))
      .filter((el): el is HTMLElement => el !== null);
    if (els.length === 0) return;

    const onScroll = () => {
      // 以视口上部 28% 处为"当前阅读线"，取最后一条越过该线的标题
      const mark = window.innerHeight * 0.28;
      let current = els[0].id;
      for (const el of els) {
        if (el.getBoundingClientRect().top <= mark) current = el.id;
      }
      setActiveId(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  return (
    <nav aria-label="文章目录">
      <p className="text-xs font-semibold tracking-[0.3em] text-navy-accent">
        CONTENTS
      </p>
      <ul className="mt-4 space-y-0.5 border-l-2 border-divider/70">
        {headings.map((h) => {
          const active = h.id === activeId;
          return (
            <li key={h.id}>
              <a
                href={`#${h.id}`}
                aria-current={active ? "true" : undefined}
                className={`-ml-[2px] block border-l-2 px-3 py-1.5 text-[13px] leading-6 transition-colors ${
                  active
                    ? "border-navy-accent font-medium text-navy-accent"
                    : "border-transparent text-ink/55 hover:text-navy-accent"
                }`}
              >
                {h.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
