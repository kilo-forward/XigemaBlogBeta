"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { FullPageContext } from "./FullPageContext";

/** 源站 fullPage.js 手感的缓动与切换锁 */
const EASING = "transform 700ms cubic-bezier(0.645, 0.045, 0.355, 1)";
const ANIM_MS = 750;

/**
 * 整屏切换引擎（自 blhx-replica 移植，与源站 fullPage.js 行为一致）：
 * - wheel/触摸/键盘 → 上/下信号；动画期间同步锁丢弃新信号
 * - translate3d 平移；hash（#p-1..#p-n）双向同步（区块不放真实 id，避免原生锚点滚动）
 * - 挂载期间锁定 body 滚动，卸载恢复
 */
export function FullPage({ children }: { children: ReactNode[] }) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [active, setActiveState] = useState(0);
  const activeRef = useRef(0);
  const animating = useRef(false);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const count = Array.isArray(children) ? children.length : 1;

  const moveTo = useCallback(
    (target: number) => {
      const t = Math.max(0, Math.min(count - 1, Math.round(target)));
      if (animating.current || t === activeRef.current) return;
      animating.current = true;
      window.setTimeout(() => {
        animating.current = false;
      }, ANIM_MS);
      activeRef.current = t;
      setActiveState(t);
      const hash = t === 0 ? "" : `#p-${t}`;
      try {
        history.replaceState(
          null,
          "",
          hash ? hash : location.pathname + location.search
        );
        // replaceState 不触发 hashchange；派发合成事件让导航栏同步激活态
        window.dispatchEvent(new Event("hashchange"));
      } catch {
        /* noop */
      }
    },
    [count]
  );

  const step = useCallback(
    (dir: number) => {
      moveTo(activeRef.current + dir);
    },
    [moveTo]
  );

  // 初始 hash 定位（关闭原生锚点滚动 + 滚动恢复）+ 锁定 body 滚动
  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);
    document.body.classList.add("fp-lock");
    const h = location.hash;
    const m = h.match(/^#p-(\d+)$/);
    if (m) moveTo(parseInt(m[1], 10));
    return () => {
      document.body.classList.remove("fp-lock");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // hash 变化驱动整屏切换（其他页面点「关于」等锚点链接时生效）
  useEffect(() => {
    const onHash = () => {
      const m = location.hash.match(/^#p-(\d+)$/);
      if (m) moveTo(parseInt(m[1], 10));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, [moveTo]);

  useEffect(() => {
    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      e.preventDefault();
      step(e.deltaY > 0 ? 1 : -1);
    };
    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, [step]);

  useEffect(() => {
    const onStart = (e: TouchEvent) => {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    const onEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      const dy = touchStart.current.y - e.changedTouches[0].clientY;
      const dx = touchStart.current.x - e.changedTouches[0].clientX;
      touchStart.current = null;
      if (Math.abs(dy) > 50 && Math.abs(dy) > Math.abs(dx)) step(dy > 0 ? 1 : -1);
    };
    window.addEventListener("touchstart", onStart, { passive: true });
    window.addEventListener("touchend", onEnd, { passive: true });
    return () => {
      window.removeEventListener("touchstart", onStart);
      window.removeEventListener("touchend", onEnd);
    };
  }, [step]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (["ArrowDown", "PageDown", " "].includes(e.key)) {
        e.preventDefault();
        step(1);
      } else if (["ArrowUp", "PageUp"].includes(e.key)) {
        e.preventDefault();
        step(-1);
      } else if (e.key === "Home") moveTo(0);
      else if (e.key === "End") moveTo(count - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [step, moveTo, count]);

  return (
    <FullPageContext.Provider value={{ active, moveTo }}>
      <div
        ref={wrapperRef}
        className="fp-wrapper"
        style={{
          transform: `translate3d(0, ${-active * 100}vh, 0)`,
          transition: EASING,
        }}
      >
        {children}
      </div>
    </FullPageContext.Provider>
  );
}
