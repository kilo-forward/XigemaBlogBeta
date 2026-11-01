export interface PostBlock {
  type: "h2" | "p" | "quote";
  text: string;
}

export interface Post {
  slug: string;
  title: string;
  date: string;
  tag: string;
  excerpt: string;
  featured?: boolean;
  content: PostBlock[];
}

/** 示例文章数据 —— 替换成你的真实内容（或接入 MDX/CMS）。注意：中文引号一律用弯引号，避免与字符串边界冲突 */
export const POSTS: Post[] = [
  {
    slug: "hello-blog",
    title: "把博客披上碧蓝的皮肤",
    date: "2026-11-01",
    tag: "折腾",
    featured: true,
    excerpt:
      "用一套整屏切换 + 天空云朵 + 白卡片的设计语言，把个人博客从白纸黑字改造成港区情报站的样子。",
    content: [
      { type: "p", text: "前段时间把碧蓝航线官网复刻了一遍，最大的收获不是代码，而是它那套视觉语言：从浅蓝渐入纯白的天空、半透明的深蓝导航条、巨大的半透明水印字，还有那种一切信息都装在白色圆角卡片里的秩序感。" },
      { type: "h2", text: "为什么博客适合这套皮" },
      { type: "p", text: "博客最难的不是写，而是让人愿意读。天空背景给了足够的呼吸感，白色卡片把每篇文章隔成一格一格的情报，虚线分隔线又比实线柔和得多。" },
      { type: "quote", text: "设计不是加东西，是把东西放到该在的层次里。" },
      { type: "h2", text: "做了什么" },
      { type: "p", text: "首页保留了整屏切换的仪式感：第一屏放标题，第二屏放精选文章，第三屏放关于我。文章列表和详情则老老实实用常规滚动——内容优先的地方，不要劫持滚轮。" },
      { type: "p", text: "接下来会把归档、标签云和夜间模式慢慢补上。" },
    ],
  },
  {
    slug: "fullpage-engine-notes",
    title: "手写一个 100 行的 fullPage 引擎",
    date: "2026-10-24",
    tag: "前端",
    featured: true,
    excerpt:
      "jQuery fullPage.js 三万行，但它的核心行为——整屏吸附、缓动、锁——百来行就能写对。记录一下踩过的四个坑。",
    content: [
      { type: "p", text: "整屏站点的引擎要处理的只有四件事：把滚轮、触摸、键盘统一成上下信号，在动画期间丢弃新信号，用 transform 平移容器，和浏览器原生行为（锚点滚动、惯性、滚动恢复）划清界限。" },
      { type: "h2", text: "坑一：动画锁的时机" },
      { type: "p", text: "把动画中标记写进 setState 的 updater 里是异步的，连续滚轮会全部穿透。锁必须是同步的 ref。" },
      { type: "h2", text: "坑二：原生锚点滚动" },
      { type: "p", text: "给区块加上和 hash 同名的真实 id，浏览器会自己滚一次，叠加 translate 就是双重偏移。方案：区块不要真实 id，hash 只做状态恢复。" },
      { type: "h2", text: "坑三：末屏对齐" },
      { type: "p", text: "auto-height 的末屏要对齐视口底部而不是顶部，translate 取 min(累计偏移, 总高减视口高)。" },
      { type: "p", text: "剩下的就是缓动曲线的手感了：cubic-bezier(0.645, 0.045, 0.355, 1) 加 700ms 是被验证过千万次的组合。" },
    ],
  },
  {
    slug: "rem-scaling-considered",
    title: "rem 等比缩放方案还值得用吗",
    date: "2026-10-18",
    tag: "前端",
    excerpt:
      "html.fontSize = 100 × min(max(宽,1200)/1920, max(高,630)/910)——活动页的白银公式，放到内容型站点为什么就失灵了。",
    content: [
      { type: "p", text: "这套公式把视口宽度线性映射到根字号，页面所有尺寸除以 100 写成 rem，整页随宽度等比缩放。营销页用它，一倍设计稿通吃所有屏幕。" },
      { type: "h2", text: "它成立的前提" },
      { type: "p", text: "内容的宽高比必须和设计稿一致、文字量固定、没有用户输入。满足这三点的页面（海报、落地页、展示页）用它是纯赚。" },
      { type: "h2", text: "博客为什么不能用" },
      { type: "p", text: "文章高度不可预知，用户会缩放字体，手机上 1200px 的下限钳制直接让内容溢出。结论：装饰区用它，内容区老老实实响应式。" },
    ],
  },
  {
    slug: "screenshot-to-spec",
    title: "把一个网站拆成规格书",
    date: "2026-10-09",
    tag: "方法论",
    featured: true,
    excerpt:
      "复刻碧蓝航线官网的完整方法论：SSR 数据、内联 CSS、运行时注入三层证据合围，41 项坐标交叉校验零误差。",
    content: [
      { type: "p", text: "像素级复刻最大的敌人是想当然。这次采用三层证据：SSR 源码里的组件树、编译后的内联 CSS、渲染后 DOM 的实时测量，任何一项单独看都会骗人。" },
      { type: "h2", text: "坐标对账" },
      { type: "p", text: "CSS 解析出的定位与 getBoundingClientRect 的实测互相校验，41 项全部对上才进入构建。后来证明这是最值的一步——背景图分配错了两次，都是靠打开图片看内容纠正的。" },
      { type: "quote", text: "规格书不是文档，是证据链。" },
    ],
  },
  {
    slug: "cloud-skin-css",
    title: "纯 CSS 复刻一片会呼吸的天空",
    date: "2026-09-30",
    tag: "前端",
    excerpt:
      "五段线性渐变 + 三朵羽化云 + 一只海鸥，不到 2KB 的皮肤资产怎么撑起整站的氛围。",
    content: [
      { type: "p", text: "源站的天空是一整张 1920×1018 的图。换肤时不想背这张图，就把纵向渐变采样成五段色标，云朵裁出来做 60px 边缘羽化，用透明 PNG 贴回渐变上——边界完全看不出来。" },
      { type: "h2", text: "羽化的意义" },
      { type: "p", text: "云朵图的背景和 CSS 渐变永远差几个色阶，硬边一定穿帮。羽化把贴合问题变成了过渡问题，容错率高一个数量级。" },
    ],
  },
  {
    slug: "reading-in-2026",
    title: "重新安排自己的信息食谱",
    date: "2026-09-21",
    tag: "随笔",
    excerpt:
      "把收藏夹当餐厅、把推送当正餐的日子过了一年，试着换回主动找、慢慢读的老办法。",
    content: [
      { type: "p", text: "算法推送最高效之处在于让你忘记，找这个动作本身也是学习的一部分。十月开始每周固定两小时读长文，读完后写三行摘要存进博客。" },
      { type: "p", text: "一个月下来，能明显感觉到知道的事情和能讲清楚的事情之间的差距在缩小。" },
    ],
  },
];

export function getPost(slug: string): Post | undefined {
  return POSTS.find((p) => p.slug === slug);
}

export function featuredPosts(): Post[] {
  return POSTS.filter((p) => p.featured);
}
