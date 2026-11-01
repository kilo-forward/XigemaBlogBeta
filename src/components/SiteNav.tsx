"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { label: "首页", href: "/", match: (p: string) => p === "/" },
  { label: "文章", href: "/posts", match: (p: string) => p.startsWith("/posts") },
  { label: "关于", href: "/#p-2", match: (p: string) => p === "/about" },
];

/** 固定顶栏：源站导航条质感（半透明深蓝条 + 白字 + 激活白药丸），真文字实现 */
export default function SiteNav() {
  const pathname = usePathname();
  const active = ITEMS.find((i) => i.match(pathname));

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 h-[52px]"
      style={{
        backgroundImage: "url(/skin/navbar.png)",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      <nav className="mx-auto flex h-full max-w-6xl items-center justify-between px-6">
        <Link
          href="/"
          className="text-lg font-bold tracking-widest text-white drop-shadow-[0_1px_2px_rgba(30,58,95,0.6)]"
        >
          MY BLOG
        </Link>
        <ul className="flex items-center gap-2">
          {ITEMS.map((item) => {
            const isActive = active?.href === item.href && item.href !== "/#p-2";
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={`block rounded-full px-4 py-1.5 text-sm transition-colors ${
                    isActive
                      ? "bg-white font-semibold text-navy-deep"
                      : "text-white/90 hover:bg-white/15 hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
