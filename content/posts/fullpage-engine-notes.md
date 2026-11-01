---
title: 手写一个 100 行的 fullPage 引擎
date: 2026-10-24
tag: 前端
featured: true
excerpt: jQuery fullPage.js 三万行，但它的核心行为——整屏吸附、缓动、锁——百来行就能写对。记录一下踩过的四个坑。
---

整屏站点的引擎要处理的只有四件事：把滚轮、触摸、键盘统一成上下信号，在动画期间丢弃新信号，用 transform 平移容器，和浏览器原生行为（锚点滚动、惯性、滚动恢复）划清界限。

```ts
const EASING = "transform 700ms cubic-bezier(0.645, 0.045, 0.355, 1)";
const ANIM_MS = 750;

function moveTo(target: number) {
  if (animating.current) return; // 动画期间丢弃新信号
  animating.current = true;
  setTimeout(() => (animating.current = false), ANIM_MS);
  setActive(Math.max(0, Math.min(count - 1, target)));
}
```

## 坑一：动画锁的时机

把动画中标记写进 setState 的 updater 里是异步的，连续滚轮会全部穿透。锁必须是同步的 ref。

## 坑二：原生锚点滚动

给区块加上和 hash 同名的真实 id，浏览器会自己滚一次，叠加 translate 就是双重偏移。方案：区块不要真实 id，hash 只做状态恢复。

## 坑三：末屏对齐

auto-height 的末屏要对齐视口底部而不是顶部，translate 取 min(累计偏移, 总高减视口高)。

剩下的就是缓动曲线的手感了：cubic-bezier(0.645, 0.045, 0.355, 1) 加 700ms 是被验证过千万次的组合。
