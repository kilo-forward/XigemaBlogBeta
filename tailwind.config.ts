import type { Config } from "tailwindcss";

/**
 * 碧蓝航线官网皮肤 · 设计令牌（取样自 recon/acceptance-report.md §5）
 * 颜色统一引用 globals.css 的 CSS 变量，夜间模式只需切换变量值。
 */
const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "rgb(var(--ink) / <alpha-value>)",
        divider: "rgb(var(--divider) / <alpha-value>)",
        navy: {
          DEFAULT: "rgb(var(--navy) / <alpha-value>)",
          deep: "rgb(var(--navy-deep) / <alpha-value>)",
          title: "rgb(var(--navy-title) / <alpha-value>)",
          accent: "rgb(var(--navy-accent) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: [
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        card: "0 6px 24px rgba(47, 77, 138, 0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
