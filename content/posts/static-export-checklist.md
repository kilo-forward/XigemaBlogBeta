---
title: 把 Next.js 博客塞进 GitHub Pages
date: 2026-09-25
tag: 折腾
excerpt: 'output: export、basePath、trailingSlash、.nojekyll——四个开关按对顺序打开，构建产物就能直接躺进 gh-pages。'
---

GitHub Pages 是个静态文件服务器：不懂 SSR，不懂 clean URL，也不认识下划线开头的目录。想让 Next.js 的产物住进去，四个开关缺一不可。

## 四个开关

- `output: "export"` —— 构建产物从 .next 变成纯静态的 out/
- `basePath` + `assetPrefix` —— 项目页住在 /<repo>/ 子路径下，资源路径要拼前缀
- `trailingSlash` —— Pages 只认目录请求，站内链接统一带尾斜杠
- `.nojekyll` —— 别让 Jekyll 把 _next 目录当成特殊文件忽略掉

## 最后的交付动作

```yaml
# .github/workflows/deploy.yml（节选）
- run: npm run build
  env:
    NEXT_PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
- uses: actions/upload-pages-artifact@v3
  with:
    path: out
```

推上 main，Actions 跑完，整站就躺在 username.github.io/<repo>/ 上了。
