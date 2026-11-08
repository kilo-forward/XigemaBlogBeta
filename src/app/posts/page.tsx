import type { Metadata } from "next";
import SkyBackdrop from "@/components/SkyBackdrop";
import PostList from "@/components/PostList";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import { POSTS, toMeta } from "@/data/posts";

export const metadata: Metadata = {
  title: "文章",
  description: "全部文章列表：前端笔记、方法论与生活随笔。支持搜索与标签筛选。",
};

export default function PostsPage() {
  return (
    <main id="main" className="relative min-h-screen">
      <SkyBackdrop watermark="ARTICLES" variant="page" />
      <div className="relative z-10 mx-auto max-w-4xl px-6 pb-10 pt-28">
        <header className="mb-12 text-center">
          <p className="section-title-en text-5xl">ARTICLES</p>
          <h1 className="section-title-zh mt-2 text-3xl">全部文章</h1>
        </header>

        <PostList posts={POSTS.map(toMeta)} />

        <Footer />
      </div>
      <BackToTop />
    </main>
  );
}
