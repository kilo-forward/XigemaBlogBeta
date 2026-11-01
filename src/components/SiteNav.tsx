"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";
import { siteConfig, withBase } from "@/config/site";

const ITEMS = [
  { label: "首页", href: "/" },
  { label: "文章", href: "/posts" },
  { label: "归档", href: "/archive" },
  { label: "标签", href: "/tags" },
  { label: "关于", href: "/#p-2" },
];

function isActive(
  href: string,
  pathname: string,
  hash: string
): boolean {
  if (href === "/") return pathname === "/" && hash !== "#p-2";
  if (href === "/#p-2") return pathname === "/" && hash === "#p-2";
  return pathname.startsWith(href);
}

/** 带 hash 的入口（关于 → 首页第 3 屏）走原生 <a> 整页加载：
 *  Next 软导航跨页跳 hash 会把 hash 丢掉；整页加载时 FullPage 挂载后读取 hash 正常落屏 */
function NavItem({
  item,
  active,
  variant,
  className,
  onNavigate,
}: {
  item: { label: string; href: string };
  active: boolean;
  /** bar：深蓝导航条上；panel：白/深色卡片面板里 */
  variant: "bar" | "panel";
  className: string;
  onNavigate?: () => void;
}) {
  const tone =
    variant === "bar"
      ? active
        ? "bg-white font-semibold text-[#2f4d8a]"
        : "text-white/90 hover:bg-white/15 hover:text-white"
      : active
        ? "bg-navy-accent/10 font-semibold text-navy-accent"
        : "text-ink/80 hover:bg-navy-accent/5 hover:text-navy-accent";
  const cls = `${className} ${tone}`;
  return item.href.includes("#") ? (
    <a href={withBase(item.href)} className={cls} onClick={onNavigate}>
      {item.label}
    </a>
  ) : (
    <Link href={item.href} className={cls} onClick={onNavigate}>
      {item.label}
    </Link>
  );
}

/** 固定顶栏：源站导航条质感（半透明深蓝条 + 白字 + 激活白药丸），真文字实现 */
export default function SiteNav() {
  const pathname = usePathname();
  const [hash, setHash] = useState("");
  const [open, setOpen] = useState(false);

  // 整屏引擎切换区块会同步 hash（replaceState 不触发事件，由引擎派发合成事件）
  useEffect(() => {
    const sync = () => setHash(window.location.hash);
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // 路由变化时收起移动端菜单
  useEffect(() => setOpen(false), [pathname]);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[52px] dark:brightness-90"
      style={{
        backgroundImage: `url(${withBase("/skin/navbar.png")})`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-4 md:px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-widest text-white drop-shadow-[0_1px_2px_rgba(30,58,95,0.6)]"
        >
          {siteConfig.name}
        </Link>

        {/* 桌面端菜单 */}
        <div className="hidden items-center gap-2 md:flex">
          <ul className="flex items-center gap-2">
            {ITEMS.map((item) => {
              const active = isActive(item.href, pathname, hash);
              return (
                <li key={item.label}>
                  <NavItem
                    item={item}
                    active={active}
                    variant="bar"
                    className="block rounded-full px-4 py-1.5 text-sm transition-colors"
                  />
                </li>
              );
            })}
          </ul>
          <ThemeToggle />
        </div>

        {/* 移动端：主题切换 + 汉堡菜单 */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label={open ? "关闭菜单" : "打开菜单"}
            className="flex h-8 w-8 items-center justify-center rounded-full text-white/90 transition-colors hover:bg-white/15 hover:text-white"
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {/* 移动端下拉面板 */}
      {open && (
        <div className="card absolute inset-x-3 top-[60px] z-50 p-2 md:hidden">
          <ul className="flex flex-col">
            {ITEMS.map((item) => {
              const active = isActive(item.href, pathname, hash);
              return (
                <li key={item.label}>
                  <NavItem
                    item={item}
                    active={active}
                    variant="panel"
                    onNavigate={() => setOpen(false)}
                    className="block rounded-lg px-4 py-2.5 text-sm transition-colors"
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </header>
  );
}
