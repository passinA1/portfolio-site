# Homepage Handoff

## Current goal

The homepage is being refined toward a cleaner Chinese UX portfolio style with lighter visual weight and tighter rhythm.

The work is now mostly about **layout polish and consistency**, not structural rework.

## Current files

- `portfolio-site/index.html`
- `portfolio-site/digistudio.html`
- `portfolio-site/digimi.html`
- `portfolio-site/css/styles.css`
- `portfolio-site/js/script.js`

## What is true in the current implementation

### Hero

- top line is `你好！我是叶泽鸿。`
- hero content is centered
- hero has a main statement, one summary paragraph, and 2 CTA buttons
- hero text area now uses the same content width logic as the main page body
- the old extra side panel is gone
- the old capability keywords section is gone

### Work section

- the homepage has a work heading plus a short intro paragraph
- the work heading uses the same 2-column width logic as the masonry area below
- project cards are rendered into `#projectGrid`
- the grid is still masonry-style with 2 columns on desktop

### Project cards

- image is on top, text is below
- image width and text width are aligned
- default state has no visible gray backing card
- hover reveals a soft gray backing panel
- hover adds slight image lift, shadow increase, and a cursor-following `查看更多` floating label
- two cards currently navigate to real case pages
- the other cards still show a toast

## Current design framework

- keep the overall page narrow and centered rather than stretched wide
- keep left and right page margins generous
- keep the hero and the work section on the same visual width system
- keep project cards slightly compact, not oversized
- keep images as the dominant visual unit and text as supporting information
- keep the page background white, not warm yellow or cream
- keep motion subtle: fade-in, reveal-on-scroll, soft hover lift
- avoid fancy transitions, strong parallax, or highly decorative motion

## Current spec reference

The homepage no longer exists as an isolated visual system. It now shares a broader site-level rule set with the case pages.

Use this file for homepage-specific context, and use:

- [INTERFACE_DESIGN_GUIDELINES.md](/Users/yezehong/Documents/Codex/2026-05-31/files-mentioned-by-the-user-project/portfolio-site/docs/INTERFACE_DESIGN_GUIDELINES.md)

for the current approved design rules around:

- white background baseline
- width system
- image/text alignment
- card usage boundaries
- motion style
- color and border language

## Current case-page rule

This handoff mainly tracks the homepage, but the current visual language now also has a clear case-page rule:

- do not place the case-page hero inside a card
- do not use cards for text-only sections
- use cards only when a body section is presenting images, or images plus supporting text
- prefer soft light-gray panels over bordered or shadow-heavy cards
- keep the case-page background white rather than warm off-white
- if a vertical image stack mixes large and small images, the top image may use a very light outline and the lower image should stay outline-free

## Current project list on homepage

1. `DigiStudio UGC 对话流程编排工具`
2. `digimi 沙盒游戏建造系统的多端迁移与交互重构`
3. `使用 AI 辅助视觉设计与迭代的 3D 电影可视化项目`
4. `动态场景的 UI 可读性研究`

Important:

- older notes mentioning `比邻星球多端体验优化` are no longer aligned with the current homepage
- the first homepage card now links to `digistudio.html`
- the second homepage card now links to `digimi.html`

## Known code realities

- `styles.css` homepage rules have already been consolidated once
- homepage styles now read more directly from top to bottom
- `digimi.html` no longer contains the stale `#about` nav link
- homepage and case-page styles still live in the same stylesheet, so edits should stay scoped

## Visual feedback that still matters

These are still the right refinement directions when continuing homepage work:

1. Keep page margins generous, but make the content feel centered rather than sparse.
2. Keep the two masonry columns closer than the earlier wide-gap version.
3. Keep cards slightly compact so the page feels controlled, not stretched out.
4. Keep image width and text block width visually aligned.
5. Keep hero copy wide enough that the center column does not feel too narrow.
6. Keep hover feedback readable and tactile, but still calm and understated.

## Sensitivities

- unnecessary card borders
- oversized typography
- text overlaying images
- whitespace that feels either cramped or too empty

## Best next checks before editing

1. Read `index.html` to confirm the current structure.
2. Read `js/script.js` to confirm which cards navigate and which only toast.
3. Read the homepage section of `css/styles.css` before changing spacing or card behavior.
