import HomeFullPage from "@/components/HomeFullPage";
import { POSTS, featuredPosts, toMeta } from "@/data/posts";

/** 服务端加载精选文章，正文不进客户端 bundle */
export default function Home() {
  return (
    <HomeFullPage
      featured={featuredPosts(POSTS).map(toMeta)}
      total={POSTS.length}
    />
  );
}
