# C&C Flora — 展馆 Demo 制作与实现方案

> **版本**：v0.1 Draft  
> **日期**：2026-06-15  
> **目标**：在不使用 3D 建模/WebGL 全景的前提下，做出**无缝、沉浸、博物馆式**的展厅浏览体验，供客户 Phase 0 确认方向。  
> **关联文档**：`docs/PROJECT.md`

---

## 1. Demo 要证明什么

向客户证明三件事：

1. **感觉像走进画廊**，不是滑商品列表  
2. **换一件藏品 / 换一个厅**时有连续的空间感，不是硬跳转  
3. **玻璃罩 / 橱窗 / 亚克力罩** 的陈列气质成立（ref_3、ref_8、ref_9）

Demo **不需要**证明：支付、账户、CMS、真实视频成片。

---

## 2. 核心思路：2.5D 预渲染场景 + 状态机转场

### 2.1 为什么不用 3D

| 3D 方案 | 问题 |
|---------|------|
| Three.js 全建模 | 周期长、资产贵、花店 SKU 变动频繁 |
| 360° 全景 | 交互僵硬，难做「聚焦单品」 |
| WebGL _shop | 过度工程，客户要的是**摄影级**而非游戏级 |

### 2.2 推荐方案：**「分层静态景 + 动态焦点」**

把每个「视图」想象成**一张精心拍摄的展厅照片**，网页负责：

- 多层 PNG/JPG **视差**（背景墙、地面、罩子、产品、前景暗角）
- **CSS 聚光灯**（radial-gradient + mix-blend-mode）让花材「发光」
- **状态机** 驱动「同厅换藏品 / 跨厅换场景」的过渡动画
- **博物馆说明牌** UI 固定于画面下方，内容切换时文字交叉淡入

这在业内常叫 **2.5D Scrollytelling / Cinematic Product Stage**，Apple 产品页、Awwwards 花艺站（Vasette、Grandiflora）同属一路。

---

## 3. 体验架构（用户动线）

```
[Intro 可 Skip]
      ↓
[Lobby 大堂]
  Cynthia & Caca 对话
  ┌─────────────────────────────────────┐
  │ 花信风·藏品馆 │ 筑塔序·高定厅 │ 抱抱桶&花束馆 │
  └─────────────────────────────────────┘
      ↓ 选厅（带 0.8s 暗场过渡）
[Hall 展厅] — 单屏只展示 1 件藏品（克制留白）
  ← → 切换同厅藏品（slide + 视差）
  [说明牌：名称 / 简介 / 价格 / 收入藏品馆]
  [换厅] 回 Lobby 或侧栏快速切换
      ↓ 点击藏品
[Piece Detail 可选] — Demo 可与大屏合并，点击说明牌展开长文
```

---

## 4. 视觉分层规范（单个 Vitrine 视图）

每个藏品场景拆成 **4–6 层**（PS/Figma 预合成，或 AI 辅助出图后人工修）：

```
z-index 6  UI：说明牌、导航点、换厅按钮
z-index 5  前景 vignette（暗角 PNG，soft-light）
z-index 4  玻璃罩高光（透明 PNG，固定不动）
z-index 3  产品层（透明底 PNG — 花束/塔箱/抱抱桶）★ 切换主层
z-index 2  底座/大理石台（可随品类换图）
z-index 1  墙面 + 地面环境（同厅共用 1 张，换厅才换）
z-index 0  纯炭灰 fallback + CSS 聚光灯
```

### 4.1 聚光灯 CSS（花是唯一光源）

```css
.vitrine-stage {
  background: var(--bg-charcoal);
  position: relative;
  overflow: hidden;
}

.vitrine-stage::after {
  content: '';
  position: absolute;
  inset: 0;
  background: radial-gradient(
    ellipse 45% 55% at 50% 42%,
    rgba(255, 248, 240, 0.14) 0%,
    rgba(0, 0, 0, 0) 55%,
    rgba(0, 0, 0, 0.75) 100%
  );
  pointer-events: none;
}
```

产品层下方再加一层 **contact shadow**（椭圆 blur），参考 ref_4 地面反光。

### 4.2 玻璃罩效果（无 3D）

- 罩体：透明 PNG，边缘高光 + 顶部弧形反光
- `backdrop-filter: blur(0.5px)` 仅用于 UI 小区域，罩体本身用贴图
- 鼠标微视差：罩子位移 2px、产品 5px、背景 8px（`mousemove` 节流）

---

## 5. 三种陈列模板（对应三个厅）

### 5.1 花信风 · 藏品馆 — `glass-dome`

**参考**：ref_3 亚克力罩 + 博物馆说明牌  

| 元素 | 说明 |
|------|------|
| 环境 | 深色墙 + 浅灰地面，单侧壁灯 |
| 罩型 | 方形/五面亚克力，略透视 |
| 产品 | 单束稀有花材，竖构图 |
| 说明牌 | 居中偏下，细线边框，类似博物馆 |

**切换动画**：产品层 crossfade + 轻微 scale(0.96→1)，说明牌文字 stagger 淡入。

### 5.2 筑塔序 · 高定厅 — `window-display`

**参考**：ref_8 法式橱窗多层台座  

| 元素 | 说明 |
|------|------|
| 环境 | 暗青绿柱 + 窗框分格（可简化） |
| 台座 | 2–3 级白色 plinth 高低差 |
| 产品 | 塔箱/大型架构花，占画面 60% |
| 光感 | 暖色 chandelier glow（gradient overlay） |

**切换动画**：**horizontal slide** — 像沿橱窗横向看下一个陈列；背景视差反向移动 8%。

### 5.3 抱抱桶 & 花束馆 — `acrylic-pedestal`

**参考**：ref_9 ROSEONLY 亚克力盒 + 大理石底座  

| 元素 | 说明 |
|------|------|
| 环境 | 中性大理石地面 + 顶部圆形射灯 |
| 罩型 | 全透明盒或半罩 |
| 产品 | 抱抱桶、花束、礼盒 |
| 品牌块 | 底座黑色铭牌（可刻 C&C Flora） |

**切换动画**：**vertical reveal** — 下一件从下方轻推入画，旧件略 blur 退出。

---

## 6. 无缝切换：四种转场模式

Demo 实现时统一用一个 `TransitionOrchestrator`，按场景选模式：

### Mode A — `crossfade-parallax`（同厅换藏品，默认）

```
时长：600–800ms
ease：cubic-bezier(0.22, 1, 0.36, 1)

旧产品：opacity 1→0, scale 1→0.98, y 0→-12px
新产品：opacity 0→1, scale 1.02→1, y 12→0
背景：   translateX 旧←3px 新→3px
说明牌： 旧文案 blur+fade out，新文案 delay 200ms fade in
```

**用户感受**：像在同一展厅里换看Adjacent 展柜，而非刷新页面。

### Mode B — `dolly-zoom`（同厅换品类差异大的藏品）

```
时长：900ms
产品：scale 1→1.08→1（轻推镜头）
暗角：opacity 临时加深再恢复
```

适合塔箱 ↔ 小花束这类尺度变化。

### Mode C — `curtain-wipe`（跨厅）

```
时长：1000–1200ms
全屏 charcoal overlay 从右向左 wipe（或中心 expand）
overlay 背后预加载下一厅背景
overlay 退出后新厅产品 fade in
可选：0.3s 环境音 crossfade
```

**用户感受**：像穿过一道门进入另一个房间。

### Mode D — `lobby-return`（回大堂）

```
时长：800ms
画面整体 zoom out + blur
Lobby 背景淡入，Q 版 scale 0.9→1
```

### 6.1 View Transitions API（增强，可选）

Next.js 15 + `@view-transition` 可在支持浏览器做原生页面转场；Demo 建议 **厅内用 GSAP，跨路由用 View Transition + fallback wipe**。

```tsx
// app/template.tsx
'use client';
export default function Template({ children }) {
  return <div className="hall-view-root">{children}</div>;
}
```

---

## 7. Lobby 大堂 Demo 实现

### 7.1 布局

```
┌────────────────────────────────────────┐
│  暗场背景（轻微 grain）                  │
│                                        │
│     [Cynthia PNG]  [Caca PNG]          │
│          ╭──────────────────╮          │
│          │ 欢迎来到 C&C Flora │          │
│          │ 你想先看哪个展厅？  │          │
│          ╰──────────────────╯          │
│                                        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐  │
│  │ 花信风   │ │ 筑塔序   │ │ 抱抱桶   │  │
│  │ 藏品馆   │ │ 高定厅   │ │ 花束馆   │  │
│  └─────────┘ └─────────┘ └─────────┘  │
└────────────────────────────────────────┘
```

### 7.2 Q 版动效（勿过卡通）

- 入场：opacity + translateY(20px)，stagger 200ms
- **Idle**：CSS `animation: breathe 4s ease-in-out infinite`（scale 1→1.01）
- 对话：打字机 30ms/字 或整句 fade（移动端用 fade）
- 点击展厅：对应 Q 版轻微 nod（rotate 2deg spring）

**资产**：优先 `ref_6.jpg` 抠透明底；`ref_7` 作备选。

### 7.3 对话文案（Demo 占位）

```
Cynthia：欢迎来到 C&C Flora。
Caca：这里是悉尼的线上花艺馆。你想先看哪个展厅？

按钮：
· 花信风 · 藏品馆 — 「季节与稀有花材」
· 筑塔序 · 高定厅 — 「塔箱与庆典架构」
· 抱抱桶 & 花束陈列馆 — 「日常仪式与礼盒」
· 关于我们
```

---

## 8. 厅内导航 UI

### 8.1 桌面端

- **左右箭头** / 键盘 ← →
- 底部 **进度点**（• • ○ • •）— 当前藏品
- 左上角 **厅名** 小字 + 面包屑 `Lobby / 花信风`
- 右上角 **换厅** icon

### 8.2 移动端

- **横向 swipe** 切换藏品（Hammer.js 或原生 touch）
- 纵向 scroll 仅用于详情展开，避免与 swipe 冲突
- 底部 fixed 说明牌，拇指可达

### 8.3 预加载

```typescript
const preloadAdjacent = (index: number, pieces: Piece[]) => {
  [index - 1, index + 1].forEach(i => {
    if (pieces[i]) {
      const img = new Image();
      img.src = pieces[i].heroImage;
    }
  });
};
```

---

## 9. 技术实现清单（Demo 工程）

### 9.1 脚手架

```bash
npx create-next-app@latest cc-flora-demo --ts --tailwind --app --src-dir
cd cc-flora-demo
npm i gsap @gsap/react framer-motion zustand clsx
```

目录建议：

```
src/
  app/
    page.tsx              # Intro
    lobby/page.tsx
    halls/[slug]/page.tsx
  components/
    gallery/
      VitrineStage.tsx    # 分层舞台
      MuseumPlacard.tsx
      HallTransition.tsx
    lobby/
      GuideCharacters.tsx
      DialogueBox.tsx
  data/
    halls.ts              # 静态 JSON
  hooks/
    useVitrineTransition.ts
    useParallaxTilt.ts
  styles/
    gallery.css
public/
  assets/
    halls/huaxinfeng/
    halls/zhuta/
    halls/bucket-bouquet/
    characters/cynthia-caca.png
```

### 9.2 核心组件伪代码

```tsx
// VitrineStage.tsx
export function VitrineStage({ piece, hall, onPrev, onNext }) {
  const layers = hall.template; // bg, pedestal, product, glass, vignette

  return (
    <div className="vitrine-stage" onMouseMove={handleParallax}>
      <Layer src={layers.background} depth={0.2} />
      <Layer src={layers.pedestal} depth={0.1} />
      <Layer src={piece.heroImage} depth={0.5} ref={productRef} />
      <Layer src={layers.glassHighlight} depth={0.15} />
      <Layer src={layers.vignette} depth={0} blend="soft-light" />
      <MuseumPlacard piece={piece} />
      <HallNav onPrev={onPrev} onNext={onNext} />
    </div>
  );
}
```

```tsx
// useVitrineTransition.ts — Mode A
export function useVitrineTransition(productRef) {
  const transitionTo = async (nextPiece) => {
    await gsap.to(productRef.current, {
      opacity: 0, y: -12, scale: 0.98, duration: 0.35,
    });
    // swap src
    await gsap.fromTo(productRef.current,
      { opacity: 0, y: 12, scale: 1.02 },
      { opacity: 1, y: 0, scale: 1, duration: 0.45, ease: 'power3.out' }
    );
  };
  return { transitionTo };
}
```

### 9.3 Demo 静态数据示例

```typescript
// data/halls.ts
export const halls = [
  {
    slug: 'huaxinfeng',
    title: '花信风 · 藏品馆',
    template: 'glass-dome',
    background: '/assets/halls/huaxinfeng/bg.jpg',
    glassHighlight: '/assets/halls/huaxinfeng/glass.png',
    pieces: [
      {
        id: 'hx-01',
        name: { en: 'Morning Mist Peony', zh: '晨雾牡丹' },
        tagline: 'Brief spring, held still.',
        description: '...',
        heroImage: '/assets/pieces/hx-01.png',
        priceAud: 280,
      },
      // 2–4 件即可 Demo
    ],
  },
  // zhuta, bucket-bouquet ...
];
```

**图片来源**：先用 `src/flowers/` 抠图叠到统一 vitrine 模板上；后期换精修。

---

## 10. 图片资产工作流（非 3D 的关键）

### 10.1 批量合成流程

1. **定 3 个 PSD/Figma 主模板**（每厅 1 个）
2. 产品图：统一拍摄/修图 — 透明底 PNG，2048px 长边
3. 脚本/手工：产品放入模板 → 导出 `heroImage`
4. 额外导出：仅产品透明层（用于切换动画）

### 10.2 临时 Demo 捷径

若客户尚未提供精修：

1. 用 `src/flowers/` 原图
2. Remove.bg 或 PS 抠图
3. 叠到深色渐变 + 椭圆 shadow
4. 加简单 glass PNG 边框

**质量够 Demo，不够上线** — 客户确认方向后再拍正式 vitrine 套图。

### 10.3 视频占位

Intro 无成片时：

- 用 3–5 张慢速 Ken Burns 静图轮播 + 深色 fade
- 或单 loop 5s 微动（花瓣/包装慢推）

---

## 11. 性能预算（Demo 也要流畅）

| 项 | 目标 |
|----|------|
| 单厅背景 | < 200KB WebP |
| 单产品 PNG | < 350KB |
| 同屏总图层 | ≤ 6 层 |
| 动画 | 仅 transform/opacity |
| 移动端 | 关闭 mouse 视差；保留 swipe |
| prefers-reduced-motion | 跳过 wipe，直接 cut |

---

## 12. Demo 交付物清单

| 交付物 | 说明 |
|--------|------|
| Preview URL | Vercel 部署 |
| 3 分钟录屏 | Lobby → 三厅切换 → 厅内换品 |
| 本方案 + PROJECT.md | 客户与开发对齐 |
| Figma 静态帧（可选） | 每厅 1 帧 + 说明牌组件 |

### Demo 范围边界（写进客户邮件）

- ✅ 沉浸式展厅、Q 版导览、博物馆说明牌、无缝切换  
- ✅ 假数据 3 厅 × 每厅 3 藏品  
- ❌ 登录、收藏持久化、支付、真实视频、CMS  
- ❌ 真 3D、VR、360 全景  

---

## 13. 从 Demo 到正式版的升级路径

| Demo 实现 | 正式版替换 |
|-----------|------------|
| `halls.ts` 静态 | Sanity CMS |
| localStorage 收藏按钮（disabled toast） | Supabase + 账户 |
| 「Consult」按钮 | Stripe Checkout |
| 占位图 | 摄影棚 vitrine 套图 |
| GSAP 手写转场 | 抽成 `TransitionOrchestrator` + 单元测试 |
| 单语言 | next-intl EN/ZH |

---

## 14. 备选增强（Demo 后可选）

按投入/收益排序：

1. **Scroll-driven 穿廊** — 同一厅内纵向 scroll，背景视差模拟向前走（GSAP ScrollTrigger pin）
2. **环境音** — 每厅 30s loop 环境音（极轻），换厅 crossfade
3. **自定义光标** — 桌面端小圆点 + 「View」hover
4. **WebGL 轻量** — 仅玻璃罩动态反光（OGL/Three 单 plane），**非必须**
5. **Lottie** — Q 版眨眼/挥手，谨慎使用

---

## 15. 实现排期（Demo 单人 8–10 工日）

| 天 | 任务 |
|----|------|
| D1 | 脚手架、DESIGN token、Intro/Lobby 静态 |
| D2 | Q 版对话 + 三厅路由 + Mode C 跨厅过渡 |
| D3 | VitrineStage 分层 + 聚光灯 + 说明牌 |
| D4 | Mode A/B 厅内切换 + 键盘/swipe |
| D5 | 三厅模板视觉 + 9 件占位数据 |
| D6 | 响应式 + reduced-motion |
| D7 | 性能、Safari 测、部署 Preview |
| D8 | 录屏、客户 walkthrough、收反馈 |

---

## 16. 验收标准（Demo Sign-off）

客户认为 Demo 成功，需满足：

- [ ] 进入站点 5 秒内理解「这是艺术馆不是淘宝」
- [ ] Lobby 导览清晰，3 个厅都可进入
- [ ] 至少 1 个厅内切换 **无明显白屏/硬跳**
- [ ] 玻璃罩/橱窗气质与 ref_8/ref_9 方向一致
- [ ] 手机端可 swipe 浏览
- [ ] 说明牌信息结构清晰（名 / 介 / 价）

---

*实现 Demo 时优先 **Mode A + Mode C** 两种转场；视觉统一暗底聚光；Q 版仅在大堂出现，展厅内保持克制，避免破坏高端感。*
