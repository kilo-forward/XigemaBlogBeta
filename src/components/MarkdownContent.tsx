import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { ReactNode } from "react";
import { headingId } from "@/data/post-types";
import { withBase } from "@/config/site";

/** 取出 React 子节点里的纯文本（标题锚点用） */
function extractText(children: ReactNode): string {
  if (children == null || typeof children === "boolean") return "";
  if (typeof children === "string" || typeof children === "number")
    return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (typeof children === "object" && "props" in children)
    return extractText((children as { props: { children?: ReactNode } }).props.children);
  return "";
}

/**
 * 文章正文渲染：Markdown → 套用碧蓝皮肤样式的 React 元素。
 * 服务端组件，构建时渲染成静态 HTML。
 */
export default function MarkdownContent({ md }: { md: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (p) => (
          <h2 className="mt-10 flex items-center gap-3 text-xl font-bold text-navy-title first:mt-0">
            <span className="inline-block h-5 w-1.5 rounded-full bg-navy-accent" />
            {p.children}
          </h2>
        ),
        h2: (p) => (
          <h2
            id={headingId(extractText(p.children))}
            className="mt-10 flex scroll-mt-28 items-center gap-3 text-xl font-bold text-navy-title first:mt-0"
          >
            <span className="inline-block h-5 w-1.5 rounded-full bg-navy-accent" />
            {p.children}
          </h2>
        ),
        h3: (p) => (
          <h3 className="mt-8 text-lg font-bold text-navy-title">{p.children}</h3>
        ),
        p: (p) => <p className="mt-5 text-[15px] leading-8 text-ink/85">{p.children}</p>,
        blockquote: (p) => (
          <blockquote className="my-8 rounded-r-lg border-l-4 border-navy-accent/60 bg-navy-accent/5 px-6 py-4 text-sm leading-7 text-navy-deep">
            {p.children}
          </blockquote>
        ),
        ul: (p) => (
          <ul className="mt-5 list-outside list-disc space-y-2.5 pl-6 marker:text-navy-accent/70">
            {p.children}
          </ul>
        ),
        ol: (p) => (
          <ol className="mt-5 list-outside list-decimal space-y-2.5 pl-6 marker:text-navy-accent/70">
            {p.children}
          </ol>
        ),
        li: (p) => <li className="text-[15px] leading-7 text-ink/85">{p.children}</li>,
        a: (p) => (
          <a
            href={p.href}
            className="text-navy-accent underline-offset-4 hover:underline"
            target={p.href?.startsWith("http") ? "_blank" : undefined}
            rel={p.href?.startsWith("http") ? "noreferrer" : undefined}
          >
            {p.children}
          </a>
        ),
        hr: () => <hr className="dashed-divider my-8 border-t" />,
        // 正文里的图片走 public/，自动补部署子路径
        img: (p) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={p.src?.startsWith("/") ? withBase(p.src) : p.src}
            alt={p.alt ?? ""}
            className="mt-6 rounded-xl shadow-card"
          />
        ),
        table: (p) => (
          <div className="mt-6 overflow-x-auto rounded-xl shadow-card">
            <table className="w-full border-collapse bg-[rgb(var(--card-bg))] text-sm">
              {p.children}
            </table>
          </div>
        ),
        th: (p) => (
          <th className="dashed-divider bg-navy-accent/5 px-4 py-2.5 text-left font-semibold text-navy-title">
            {p.children}
          </th>
        ),
        td: (p) => (
          <td className="dashed-divider px-4 py-2.5 text-ink/80">{p.children}</td>
        ),
        pre: (p) => {
          // 从 <pre><code class="language-xxx"> 里取语言标注
          const child = Array.isArray(p.children) ? p.children[0] : p.children;
          const cls =
            typeof child === "object" && child !== null && "props" in child
              ? ((child as { props?: { className?: string } }).props?.className ?? "")
              : "";
          const lang = /language-(\w+)/.exec(cls)?.[1];
          return (
            <div className="md-code relative mt-6 overflow-x-auto rounded-xl bg-[#0f1e38] p-5 pt-6 text-[13px] leading-6 text-slate-100 shadow-card">
              {lang && (
                <span className="absolute right-3 top-2 text-[10px] uppercase tracking-widest text-slate-400">
                  {lang}
                </span>
              )}
              <pre className="whitespace-pre font-mono">{p.children}</pre>
            </div>
          );
        },
        code: (p) => {
          // 围栏代码块（pre 内）不带胶囊底色；行内 code 才加
          const cls = /language-/.test(p.className ?? "")
            ? "md-code-inner font-mono"
            : "md-inline-code font-mono";
          return <code className={cls}>{p.children}</code>;
        },
      }}
    >
      {md}
    </ReactMarkdown>
  );
}
