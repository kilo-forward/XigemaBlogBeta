/** 天空背景：CSS 渐变 + 羽化云朵 + 巨型水印真文字 + 海鸥
 *  variant="section"：整屏区块内（absolute，随区块裁切）
 *  variant="page"：常规滚动页（fixed，整页固定） */
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
        src="/skin/cloud-tl.png"
        alt=""
        className="absolute -left-10 -top-6 w-[36vw] max-w-[700px] opacity-90"
      />
      <img
        src="/skin/cloud-tr.png"
        alt=""
        className="absolute -right-8 -top-10 w-[38vw] max-w-[750px] opacity-90"
      />
      <img
        src="/skin/cloud-mid.png"
        alt=""
        className="absolute left-[26vw] top-[4vh] w-[46vw] max-w-[900px] opacity-70"
      />
      {showSeagull && (
        <img
          src="/skin/seagull.png"
          alt=""
          className="absolute right-[4vw] top-[10vh] w-[10vw] max-w-[190px] opacity-80"
        />
      )}
      <div className="watermark absolute bottom-[2vh] left-1/2 -translate-x-1/2 text-[16vw] md:text-[13vw]">
        {watermark}
      </div>
    </div>
  );
}
