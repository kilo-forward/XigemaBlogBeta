/** 天空背景：CSS 渐变 + 羽化云朵 + 巨型水印真文字 + 海鸥
 *  variant="section"：整屏区块内（absolute，随区块裁切）
 *  variant="page"：常规滚动页（fixed，整页固定） */
import { withBase } from "@/config/site";

export default function SkyBackdrop({
  watermark,
  showSeagull = true,
  variant = "section",
}: {
  watermark: string;
  showSeagull?: boolean;
  variant?: "section" | "page";
}) {
  const mode = variant === "page" ? "fixed" : "absolute";
  return (
    <div aria-hidden className={`sky pointer-events-none ${mode} inset-0 overflow-hidden`}>
      <img
        src={withBase("/skin/cloud-tl.png")}
        alt=""
        className="absolute -left-10 -top-6 w-[36vw] max-w-[700px] opacity-90"
      />
      <img
        src={withBase("/skin/cloud-tr.png")}
        alt=""
        className="absolute -right-8 -top-10 w-[38vw] max-w-[750px] opacity-90"
      />
      <img
        src={withBase("/skin/cloud-mid.png")}
        alt=""
        className="absolute left-[26vw] top-[4vh] w-[46vw] max-w-[900px] opacity-70"
      />
      {showSeagull && (
        <svg
          aria-hidden
          viewBox="0 0 64 28"
          className="absolute right-[5vw] top-[11vh] w-[7vw] max-w-[120px] text-white/75 drop-shadow-[0_1px_1px_rgba(47,77,138,0.25)]"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          strokeLinecap="round"
        >
          <path d="M4 22 C13 7, 24 7, 32 20" />
          <path d="M32 20 C40 7, 51 7, 60 19" />
        </svg>
      )}
      <div className="watermark absolute bottom-[2vh] left-1/2 -translate-x-1/2 text-[16vw] md:text-[13vw]">
        {watermark}
      </div>
    </div>
  );
}
