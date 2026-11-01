import Link from "next/link";
import { siteConfig, siteUrl } from "@/config/site";

/** 滚动页页脚：栏目速览 + 版权信息 */
export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative z-10 pb-12 pt-6 text-center text-xs leading-6 text-ink/50">
      <div className="flex items-center justify-center gap-5">
        <Link href="/posts" className="transition-colors hover:text-navy-accent">
          文章
        </Link>
        <Link href="/archive" className="transition-colors hover:text-navy-accent">
          归档
        </Link>
        <Link href="/tags" className="transition-colors hover:text-navy-accent">
          标签
        </Link>
        <a
          href={siteUrl("/rss.xml")}
          className="transition-colors hover:text-navy-accent"
        >
          RSS
        </a>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noreferrer"
          className="transition-colors hover:text-navy-accent"
        >
          GitHub
        </a>
      </div>
      <p className="mt-3">
        © {year > siteConfig.since ? `${siteConfig.since}–${year}` : year}{" "}
        {siteConfig.name} · 皮肤复刻自碧蓝航线官网 · Powered by Next.js
      </p>
    </footer>
  );
}
