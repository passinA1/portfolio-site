# Portfolio Site

这是叶泽鸿作品集的静态网站目录。它不只是一个可直接部署到 GitHub Pages 的站点，也是一套已经整理过的「多项目案例页骨架」。

当前站点的目标有两个：

1. 作为在线作品集，对外展示首页和项目案例页。
2. 作为后续项目迁移模板，方便把新的案例内容快速接入同一套结构、排版和视觉规范。

---

## 1. 项目定位

这个站点目前采用「首页聚合 + 子页深挖」的结构：

- 首页负责展示个人信息、项目入口和整体作品气质。
- 项目子页负责讲清楚单个案例的背景、问题、推导、方案和结果。

当前已经完成骨架重构的案例页是：

- `digimi.html`
  - 项目名：`Digimi 建造系统的多端迁移与交互重构`
  - 主题：沙盒游戏 / 建造系统 / 多端迁移
  - 核心叙事：`发现问题 -> 分析问题 -> 解决问题 -> 验证成效`

这套案例页骨架后续可以复用到其他项目，只需要更换：

- 页面标题与描述
- 主题皮肤色
- 模块文案
- 项目图片与动图素材

---

## 2. 当前目录结构

```text
portfolio-site/
  index.html                  # 首页
  digimi.html                 # Digimi 案例页（已接入通用 case-page 骨架）
  mobile-build-prototype.html # 独立原型展示页
  digimi.rtf                  # Digimi 原始文本素材
  css/
    styles.css                # 全站样式：首页样式 + 通用案例页骨架 + 主题变量
  js/
    script.js                 # 首页项目卡片数据与跳转逻辑
  assets/
    portfolio.pdf             # PDF 作品集
    images/                   # 首页封面、通用图片
    mockups/                  # 案例页主视觉、界面图、GIF、玩家作品图
    pdf-pages/                # PDF 拆页图片
  docs/
    PROJECT_HANDOFF.md
    portfolio-text.txt
    project-cover-brief.md
  README.md
```

---

## 3. 页面结构概览

### 首页

相关文件：

- `index.html`
- `css/styles.css`
- `js/script.js`

职责：

- 展示个人品牌信息
- 展示项目卡片入口
- 跳转到案例页

### 案例页

当前标准案例页是 `digimi.html`，已经切换到统一的 `case-*` 架构。

职责：

- 清楚说明项目背景
- 聚焦单一问题线索
- 用结构化叙事展示设计推导
- 用图片承担主要视觉重心
- 用有限的指标或反馈做结果收束

---

## 4. 设计框架

### 4.1 内容框架

当前案例页统一使用高扫描率、低认知负荷的叙事模型：

1. `Hero`
   - 项目名称
   - 一句话项目摘要
   - 角色 / 平台 / 时间
   - 主视觉大图
2. `Process Rail`
   - 用流程条先告诉读者整篇会讲什么
3. `发现问题`
   - 用对比图说明原始状态和问题状态
4. `Phase 01`
   - 第一阶段方案
   - 聚焦第一层核心矛盾
5. `Phase 02`
   - 第二阶段迭代
   - 说明为什么需要继续往下做
6. `Impact`
   - 用谨慎口径写结果
   - 不夸大、不虚构
7. `玩家反馈 / 作品展示`
   - 用滚动轮播强化结果的真实感和氛围感

### 4.2 阅读动线

当前案例页的版式不是平均排布，而是刻意建立阅读主次：

- 左侧文字更少，更像提纲和推导
- 右侧图片更大，承担主要视觉重量
- 用 `4:6` 非对称网格建立轻微失衡感
- 用留白而不是堆卡片来制造高级感

目标不是把信息塞满，而是控制面试官的视线流向：

`先看标题 -> 再看图 -> 再读解释 -> 最后看结果`

---

## 5. 设计规范

### 5.1 设计原则

全站案例页目前遵循以下规则：

- 清晰大于术语
- 图片大于文字
- 留白大于装饰
- 结构统一，项目换肤
- 结论前置，说明跟上
- 内容节奏先松后紧再收束

### 5.2 文案规范

案例页文案尽量遵循：

- 用大白话描述现象
- 用克制的专业词汇说明设计意图
- 删除口水话和过渡废话
- 采用 `粗体引导字 + 核心结论` 的结构

建议写法：

- `问题很直接：...`
- `测试后发现：...`
- `继续迭代：...`
- `验证口径：...`
- `反馈信号：...`

不建议写法：

- 过多黑话
- 没有场景感的抽象术语
- 把普通交互动作包装成复杂工程概念

### 5.3 视觉规范

案例页的视觉标准目前是：

- 背景保持干净，避免厚重卡片堆叠
- 用极淡的边线和色块分层
- 大图尽量成为章节主角
- 标题比早期版本更克制，不做过度放大
- 正文宽度受控，避免一行太长
- 模块上下间距拉开，保证呼吸感

---

## 6. 样式系统与设计令牌

所有全局令牌定义在 `css/styles.css` 顶部。

### 间距比例尺

```css
--space-xs: 0.5rem;
--space-sm: 1rem;
--space-md: 2rem;
--space-lg: 4rem;
--space-xl: 6.5rem;
```

### 字体层级

```css
--font-h1: 2.75rem;
--font-h2: 1.85rem;
--font-h3: 1.25rem;
--font-body: 1rem;
--line-height-body: 1.65;
```

### 主题皮肤

案例页采用「骨架统一，主题换肤」的方式。

当前预留了两套主题接口：

```css
.theme-digimi {
  --theme-accent: #ff7a00;
  --theme-accent-rgb: 255, 122, 0;
  --theme-bg-light: #fffcf9;
}

.theme-neighbor {
  --theme-accent: #007aff;
  --theme-accent-rgb: 0, 122, 255;
  --theme-bg-light: #f5f9ff;
}
```

后续新增项目时，优先新增 `theme-*`，不要直接为单个项目写一整套私有布局类。

---

## 7. 通用骨架类

当前案例页通用骨架已经集中在 `styles.css` 尾部的 `Unified case-page architecture` 区域。

### 核心布局类

- `.case-page`
  - 案例页 body 根类
- `.case-nav`
  - 顶部导航
- `.case-main`
  - 页面主内容容器
- `.case-hero`
  - 首屏图文骨架
- `.case-section-grid`
  - 通用 `4:6` 非对称图文网格
- `.case-impact`
  - 结果区

### 通用内容类

- `.case-copy`
  - 左栏文字容器
- `.case-copy--hero`
  - Hero 文案区域
- `.case-eyebrow`
  - 项目序号 / 标签
- `.case-meta-list`
  - 角色、平台、时间等元信息
- `.case-h3-bullet`
  - 带品牌色竖线的小标题
- `.case-note-block`
  - Phase 内的小推导块

### 通用视觉类

- `.visual-anchor-card`
  - 章节右侧主视觉容器
- `.visual-anchor-card--hero`
  - Hero 图专用覆写
- `.case-image-pair`
  - 问题对比图双列
- `.case-image-card`
  - 单张对比图
- `.case-state-flow`
  - Phase 01 状态流
- `.case-proof-list`
  - Phase 02 要点列表

### 通用结果类

- `.metric-grid`
  - 指标区排列
- `.metric-card`
  - 单个指标块
- `.metric-number`
  - 大数字

### 通用附加模块

- `.case-process`
  - 叙事流程条
- `.case-gallery-marquee`
  - 玩家作品轮播容器
- `.case-gallery-track`
  - 轮播轨道

---

## 8. Digimi 案例页内容结构

`digimi.html` 当前按照下面的方式组织内容：

### Hero

- 项目名：`Digimi 建造系统的多端迁移与交互重构`
- 一句话摘要：强调建造系统从 PC 到移动端的迁移
- 元信息：角色 / 平台 / 时间
- 主视觉：`finalVision-mockup.png`

### Process Rail

- 发现问题
- 分析问题
- 解决问题
- 验证成效

### 发现问题

- 图 1：PC 原始建造界面
- 图 2：直接缩到手机后的问题
- 说明点：
  - 屏幕挤压
  - 看不清落点
  - 缺少取消与撤销的安全感

### Phase 01

目标：

- 解决拖拽时视野被 UI 挤占的问题

结构：

- 核心矛盾
- 界面怎么让路
- 操作怎么兜底
- 动图 + 状态流

### Phase 02

目标：

- 解决玩家仍需频繁打开大仓库的问题

结构：

- 测试后发现
- 继续迭代
- 常用 / 临时 / 低频 三层分流
- 金字塔架构图

### Impact

注意：

- 当前结果只应定义为内部可用性验证信号
- 不应写成强结论或统计显著结论

### 玩家反馈

- 用玩家作品轮播强化“连续搭建意愿提升”的感受证据

---

## 9. 响应式规则

案例页已具备基础响应式规则：

- 桌面端：
  - Hero 为 `4:6`
  - Section Grid 为 `4:6`
  - 流程条四列
  - 状态流三列
- 平板端：
  - 图文改为单列
  - 流程条变两列
  - 指标纵向堆叠
- 手机端：
  - 导航纵向堆叠
  - Meta / Process / Image Pair 都变成单列
  - Hero 主视觉收回到容器宽度以内

---

## 10. 新项目迁移方法

后续如果要新增一个新的案例页，建议直接复制 `digimi.html` 做模板，再按下面步骤迁移。

### 第一步：复制页面

复制：

- `digimi.html` -> `new-project.html`

### 第二步：更换主题

在 `body` 上替换：

```html
<body class="case-page theme-digimi">
```

如果是新项目，新增：

```css
.theme-yourproject {
  --theme-accent: ...;
  --theme-accent-rgb: ...;
  --theme-bg-light: ...;
}
```

然后改成：

```html
<body class="case-page theme-yourproject">
```

### 第三步：保留骨架，替换内容

保留这些结构不动：

- `case-nav`
- `case-hero`
- `case-process`
- `case-section-grid`
- `case-impact`

只替换：

- 标题
- 摘要
- 元信息
- 文案模块
- 图片路径
- 指标数字

### 第四步：素材替换

建议把新项目素材仍放在：

- `assets/mockups/`

命名尽量语义化，比如：

- `project-hero.png`
- `project-problem-before.png`
- `project-problem-after.png`
- `project-phase1.gif`
- `project-phase2-architecture.png`

### 第五步：接入首页

修改 `js/script.js` 中首页卡片数据：

- 标题
- 副标题
- 跳转链接

---

## 11. 开发与维护约束

### HTML 约束

- 优先复用 `case-*` 结构类
- 不要轻易回到 `digimi-*` 这种项目私有布局命名
- 页面内容尽量用语义化标签组织

### CSS 约束

- 优先改变量、通用骨架和主题皮肤
- 除非必要，不要为每个项目重新发明一套布局系统
- 同类模块优先抽象成通用类，再给项目做轻度覆写

### 文案约束

- 不夸大结果
- 不写空泛总结
- 多写“为什么做下一步”
- 保持阶段之间有因果关系

### 视觉约束

- 不堆很多卡片
- 不让标题、正文、图片挤在一起
- 不让大图缩成配角
- 不用太重的装饰去抢内容

---

## 12. 部署

这是纯静态站点，不需要安装依赖或构建命令。

### GitHub Pages 部署步骤

1. 将 `portfolio-site` 文件夹内容上传到 GitHub 仓库根目录。
2. 在仓库 `Settings -> Pages` 中选择 `Deploy from a branch`。
3. Branch 选择 `main`，Folder 选择 `/root`。
4. 发布后入口页面为 `index.html`。

---

## 13. 当前状态总结

目前这个项目已经完成的整合包括：

- 首页与 Digimi 案例页互相连通
- Digimi 项目名与内容范围统一
- 案例页切换到统一 `case-*` 骨架
- 主题皮肤与布局骨架分离
- README 从部署说明扩展为迁移手册

如果后续继续扩展项目子页，推荐的工作方式是：

1. 先复制 `digimi.html`
2. 再新增 `theme-*`
3. 保持 `case-*` 结构不变
4. 只换内容、图片和少量主题色

这样整个作品集会更稳定，也更容易长期维护。
