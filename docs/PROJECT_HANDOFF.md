# 作品集网页项目交接文档

## 1. 项目定位

这是一个基于纯静态前端实现的个人作品集网站，用于展示 **叶泽鸿** 的 UX / HCI 项目。

当前重点仍然是先把 **首页体验** 打磨到稳定、清晰、适合作品展示的状态，而不是优先扩展复杂站点功能。

首页当前的目标是：

- 明确传达个人设计定位
- 用较克制的中文 UX 作品集视觉风格呈现内容
- 以 2 列瀑布流展示 4 个代表项目
- 让项目卡片以视觉封面为主、文字为辅
- 逐步补齐和替换更合适的项目封面图
- 在已有基础上，逐步补充少量案例页，而不是一次性做完整多页站点

## 2. 当前真实状态

项目目前已经不是最早那版“只有首页、没有任何案例页”的状态。

当前实际情况：

- 已有一个可运行的首页
- 首页入口为 `portfolio-site/index.html`
- 首页核心样式文件为 `portfolio-site/css/styles.css`
- 首页项目数据和交互由 `portfolio-site/js/script.js` 驱动
- 已有 2 个单独案例页：`portfolio-site/digimi.html` 和 `portfolio-site/digistudio.html`
- 首页中已有 2 个项目会真正跳转，其余项目仍显示 toast 占位

当前首页实际结构：

- Header
- 居中的 Hero 首屏
- `WORK` 项目区
- Footer
- Toast

注意：

- 早期文档里提到的首页 `ABOUT` 区，当前首页代码里 **已经不存在**
- 早期文档里提到的“暂不开发 case study 页面”也已经过期，因为 `digimi.html` 和 `digistudio.html` 都已上线

## 3. 当前目录结构

当前应以这个目录为准：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site`

重要文件如下：

```text
/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site
├── index.html
├── digistudio.html
├── digimi.html
├── css
│   └── styles.css
├── js
│   └── script.js
├── assets
│   ├── portfolio.pdf
│   ├── images
│   ├── mockups
│   └── pdf-pages
├── docs
│   ├── PROJECT_HANDOFF.md
│   ├── HOMEPAGE_HANDOFF.md
│   ├── INTERFACE_DESIGN_GUIDELINES.md
│   ├── DIGISTUDIO_COPY_REWRITE.md
│   ├── project-cover-brief.md
│   └── portfolio-text.txt
├── README.md
└── mobile-build-prototype.html
```

说明：

- 这已经不是早期那种 `index.html / styles.css / script.js` 都放在根目录的结构
- 现在首页资源路径采用 `./css/styles.css` 和 `./js/script.js`
- 作品资料文本和交接文档都集中在 `docs/`

## 4. 核心文件说明

### 4.1 `index.html`

路径：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/index.html`

作用：

- 首页结构入口
- 定义导航、hero、项目区、footer、toast

当前结构：

- Header
  - 品牌名 `叶泽鸿`
  - `项目`
  - `简历`
  - `alan-yzh@foxmail.com`
- Hero section
  - `你好！我是叶泽鸿。`
  - 一句主标题
  - 一段个人说明
  - `查看项目`
  - `打开简历`
- Work section
  - 标题文案
  - 项目容器 `#projectGrid`
- Footer
- Toast

当前不存在：

- 首页 `ABOUT` section
- 首页右侧附加介绍面板
- 首页 capability keywords 区块

### 4.2 `css/styles.css`

路径：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/css/styles.css`

作用：

- 控制首页与案例页的主要视觉和响应式布局
- 同时承载首页样式和 `digimi.html` 案例页样式

需要特别注意：

- 首页样式段已经清理过一轮
- 当前首页主要使用一套连续的 homepage 规则定义
- 案例页样式从 `Unified case-page architecture` 这一段开始
- 文件仍然同时承载首页和案例页样式，所以继续修改时要注意不要互相影响

当前首页的设计方向体现在样式上主要包括：

- 近白底背景
- 偏窄版心与更大的页面留白
- 居中 hero
- `WORK` 标题区与瀑布流共用同一套双列宽度逻辑
- 图上文下的项目卡片结构
- 默认无明显卡片底板，hover 时出现浅灰背景块
- 双列瀑布流项目布局
- 卡片图片与下方文字区宽度对齐

### 4.3 当前首页设计框架

当前首页的设计框架已经比较明确，可以按下面这套原则继续迭代：

- **版式框架**
  - 整体是偏窄版心，页面两侧留白较大
  - 首屏文案区宽度与下方内容区版心保持一致
  - `WORK` 标题区与瀑布流区域使用统一的双列宽度和列间距
  - 项目卡片整体尺寸偏克制，不做满屏铺开

- **视觉语言**
  - 背景保持纯白，不偏黄、不偏米，不再依赖大面积装饰
  - 字体层级清晰，但避免过大的标题尺度
  - 项目图像是信息主角，文字只承担说明和导航作用
  - 卡片圆角、灰底和阴影都控制在轻量范围内

- **交互与动效**
  - 首屏和导航使用轻微的淡入上移动效
  - `WORK` 标题、项目卡片和 footer 使用滚动进入 reveal
  - 卡片 hover 只做低幅度图片上浮、轻微放大和阴影增强
  - `查看更多` 提示跟随鼠标，但表现为悬浮文字而不是按钮
  - 整体避免炫技型动效，不做强视差、旋转或复杂持续动画

### 4.4 当前案例页设计规范

`digimi.html` 代表了当前案例页的主要设计方向，之后新增或调整案例页时，优先遵循下面这套规则：

- **首屏**
  - 首屏不需要卡片承托
  - 文字与主视觉直接排版展示
  - 主图可以保留圆角，但不要再额外包一层明显底板或描边卡片
  - 页面背景使用白色，不要偏黄

- **正文内容**
  - 只有文字内容的区块，不需要卡片
  - 只有图片，或者图片和说明文字一起展示的区块，才使用卡片
  - 卡片优先使用高级感的浅灰色底板
  - 默认优先无边框，不再优先使用描边 + 阴影的悬浮卡片语言
  - 正文背景也保持白色，不要使用偏黄底色

- **图片排列补充规则**
- 如果是一组大小图片做垂直排列，上方图片可以加一层很浅的描边
- 同组中下方图片不需要描边
- 这类差异只用来帮助层级，不应变成强装饰

### 4.5 当前界面规范文档

这轮迭代后，界面设计规范已经单独整理进：

- [INTERFACE_DESIGN_GUIDELINES.md](/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/docs/INTERFACE_DESIGN_GUIDELINES.md)

这份文档记录了当前已经落地并需要继续沿用的规则，包括：

- 全站视觉基调
- 排版和版心逻辑
- 色板、字号、间距和描边语言
- 首页项目区规则
- 案例页卡片使用边界
- `digistudio` 当前的页面结构、动效和编辑器皮肤化细节

如果后续继续改首页或案例页，建议先读这份文档，再改样式和页面结构。
### 4.6 `js/script.js`

路径：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/js/script.js`

作用：

- 定义首页 4 个项目的数据
- 渲染项目卡片
- 处理卡片点击后的跳转或 toast

当前项目数据为：

1. `DigiStudio UGC 对话流程编排工具`
2. `digimi 沙盒游戏建造系统的多端迁移与交互重构`
3. `使用 AI 辅助视觉设计与迭代的 3D 电影可视化项目`
4. `动态场景的 UI 可读性研究`

这和更早版本里的项目列表不同：

- 早期文档里的 `比邻星球多端体验优化` 当前 **不在首页项目列表中**
- 首页第二个项目已经变成 `digimi` 多端迁移案例，并且会跳转到 `digimi.html`

## 5. 当前首页项目状态

### 5.1 DigiStudio UGC 对话流程编排工具

状态：

- 首页展示中
- 使用定制封面图 `./assets/images/digimi-cover-web.png`
- 已接入单独案例页 `./digistudio.html`

说明：

- 这是偏低代码 / 节点编排 / 编辑器体验方向的项目
- 首页封面和文案已经比较完整
- 案例页已上线，内容聚焦复杂分支对话系统的可视化画布重构

### 5.2 digimi 沙盒游戏建造系统的多端迁移与交互重构

状态：

- 首页展示中
- 使用封面图 `./assets/images/digimi-main.png`
- 已接入单独案例页 `./digimi.html`

说明：

- 案例页已经具备完整的叙事结构、配图和指标区块

### 5.3 使用 AI 辅助视觉设计与迭代的 3D 电影可视化项目

状态：

- 首页展示中
- 当前仍使用 `./assets/pdf-pages/page-20.png`
- 点击为 toast，占位中

说明：

- 目前依然是直接从 PDF 页中取图
- 后续仍可以继续换成更适合首页的精炼封面

### 5.4 动态场景的 UI 可读性研究

状态：

- 首页展示中
- 当前仍使用 `./assets/pdf-pages/page-21.png`
- 点击为 toast，占位中

说明：

- 当前比例、裁切和文案已经能用于首页展示
- 后续如有更成熟封面版本，可以直接替换

## 6. 已不再准确的旧信息

以下内容是早期交接中出现过、但现在已不再准确的点：

- 首页包含 `ABOUT` 区
- 所有项目都只会触发 toast
- 暂时没有任何单独案例页
- 首页 4 个项目中包含 `比邻星球多端体验优化`
- 项目根目录仍是 2026-05-23 那个更早路径
- `styles.css` 和 `script.js` 仍位于项目根目录

如果新窗口继续接手，应该先按当前代码而不是按旧文档理解项目。

## 7. 作品资料和资源

### 7.1 PDF 作品集

路径：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/assets/portfolio.pdf`

作用：

- 当前网页项目最主要的原始资料来源

### 7.2 文本抽取

路径：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/docs/portfolio-text.txt`

作用：

- 用于检索项目时间、说明和案例文案

### 7.3 PDF 分页截图

目录：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/assets/pdf-pages/`

当前直接用于首页的页面：

- `page-20.png`
- `page-21.png`

### 7.4 项目封面图目录

目录：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/assets/images/`

当前首页涉及的关键图片包括：

- `digimi-cover-web.png`
- `digimi-main.png`
- `bilin-cover-web-v1.png`

说明：

- `bilin-cover-web-v1.png` 虽然仍在资源目录里，但当前首页没有使用它

### 7.5 案例页相关演示图

目录：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/assets/mockups/`

作用：

- 主要被 `digimi.html` 使用
- 包含最终效果 mockup、状态机 gif、结构图、PC / 移动端示意图等

## 8. 已上线案例页

### `digimi.html`

路径：

`/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/digimi.html`

当前状态：

- 已可访问
- 已有完整案例结构
- 视觉上与首页共享同一份 `styles.css`

## 9. 当前首页视觉方向

目前首页已经明显朝下面这个方向收敛：

- 更纯净的浅色背景
- 更窄的整体版心和更大的左右留白
- 居中的 hero 文案，并与下方内容区共用版心
- 更简洁的中文作品集语气
- 项目图在上、文字在下，图片与文字宽度对齐
- hover 才出现灰底卡片感
- hover 时伴随轻微图片上浮、阴影增强和悬浮文字提示
- 滚动进入动效偏轻，增强浏览节奏但不做花哨转场

用户对视觉的敏感点主要包括：

- 不要无谓的卡片边框
- 不要把文字压在图上
- 不要把字号做得过大
- 要有足够但不过度的留白节奏

## 10. 当前最值得继续处理的前端问题

如果继续改首页，当前最值得优先关注的是：

1. 继续微调首页的页边距、双列间距、hero 宽度和卡片整体紧凑感
2. 决定是否为其余 3 个项目逐步补案例页
3. 视需要替换 `page-20.png` 和 `page-21.png` 这类仍偏 PDF 截图感的封面
4. 如果继续扩展案例页，注意保持首页与案例页共用样式时的作用域清晰

## 11. 当前最适合的接手方式

建议继续接手时按这个顺序理解项目：

1. 先读 `index.html`
2. 再读 `js/script.js`，确认首页真实项目列表
3. 再读 `css/styles.css` 后半段的 homepage 规则
4. 最后再看 `digimi.html`

同时建议把这几个文档一起作为上下文：

- `docs/PROJECT_HANDOFF.md`
- `docs/HOMEPAGE_HANDOFF.md`
- `docs/project-cover-brief.md`

## 12. 预览方式

在项目根目录运行：

```bash
python3 -m http.server 8000
```

然后访问：

`http://127.0.0.1:8000/index.html`

## 13. 一句话总结

这是一个 **首页已成型、风格已基本收敛、并且已经开始从单页展示过渡到“首页 + 少量案例页”结构** 的静态作品集网站；当前最重要的不是重做架构，而是继续把首页视觉细节、样式整洁度和其余项目的展示完成度往前推。
