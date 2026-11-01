/** @type {import('next').NextConfig} */

/**
 * GitHub Pages 部署（output: "export" 产出纯静态 out/ 目录）：
 * - NEXT_PUBLIC_BASE_PATH：项目页设为 /<repo>，用户页（username.github.io）留空
 * - trailingSlash：GitHub Pages 只对目录请求返回 index.html，站内链接统一带尾斜杠
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig = {
  output: "export",
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
