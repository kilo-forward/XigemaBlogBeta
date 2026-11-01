import type { Config } from "tailwindcss";

/** 碧蓝航线官网皮肤 · 设计令牌（取样自 recon/acceptance-report.md §5） */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#343435",
        divider: "#c9e6ff",
        navy: {
          DEFAULT: "#2c4a6e",
          deep: "#1e3a5f",
          title: "#2f4d8a",
          accent: "#4a90d9",
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
