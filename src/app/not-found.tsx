import Link from "next/link";
import SkyBackdrop from "@/components/SkyBackdrop";

/** 404 页：output: export 会生成 404.html，GitHub Pages 自动使用 */
export default function NotFound() {
  return (
    <main className="relative min-h-screen">
      <SkyBackdrop watermark="404" showSeagull={false} variant="page" />
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <p className="text-sm tracking-[0.5em] text-navy-deep/70">
          ROUTE NOT FOUND
        </p>
        <h1 className="section-title-zh mt-4 text-5xl md:text-6xl">这段航路不存在</h1>
        <p className="mt-6 max-w-md text-sm leading-7 text-ink/70">
          你要找的页面可能被海风吹走了。可以从下面两个港口重新出发。
        </p>
        <div className="mt-10 flex items-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-[#2f4d8a] shadow-card transition hover:-translate-y-0.5"
          >
            回到首页
          </Link>
          <Link
            href="/posts"
            className="rounded-full bg-white/55 px-7 py-2.5 text-sm font-semibold text-[#2f4d8a] transition hover:-translate-y-0.5 hover:bg-white/80"
          >
            浏览文章
          </Link>
        </div>
      </div>
    </main>
  );
}
