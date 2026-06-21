# C&C Flora — 项目需求与实施文档

> **版本**：v0.1 Draft  
> **日期**：2026-06-15  
> **门店**：悉尼，澳大利亚  
> **文档用途**：商业项目立项、范围界定、分期交付、开发排期  
> **Design Read**：高端花艺品牌的沉浸式线上艺术馆，面向悉尼高净值/礼品客群，深色画廊 + 编辑式排版 + Q 版导览，技术栈偏现代前端而非传统电商目录。

---

## 1. 项目定位

### 1.1 一句话定义

C&C Flora 不是「卖花的网店」，而是**线上艺术馆式的高端花艺品牌站**——顾客像在画廊里漫步，被引导进入不同展厅，最终完成收藏、下单与配送。

### 1.2 品牌体验关键词

| 维度 | 要求 |
|------|------|
| 视觉基调 | 炭灰/近黑背景，花材是唯一光源 |
| 排版 | 杂志编辑式：大标题、大留白、1–3 张精修大片叙事 |
| 开场 | 15–30 秒慢镜头氛围片 + 品牌金句旁白 |
| 导览 | Cynthia & Caca Q 版形象在大堂接待，对话框 + 展厅入口 |
| 产品呈现 | 博物馆/珠宝橱窗/亚克力罩陈列，非商品网格 |
| 情绪 | 平静自信、奢侈品心理预期 |

### 1.3 参考素材索引（`src/examples/`）

| 文件 | 参考意图 |
|------|----------|
| ref_0 | Grandiflora 暗调首屏 + 手写 Logo + 极简导航 |
| ref_1 | 编辑式 Collection 入口拼贴（Spring / La Vie En Rose 等） |
| ref_2 | Vasette 深色画廊空间 + 聚光灯 + Scroll 引导 |
| ref_3 | 白盒画廊 + 亚克力罩花材陈列（空间逻辑参考） |
| ref_4 | 黑底四列编辑式产品叙事 + 价格 |
| ref_5 | Grandiflora 三列分类入口（Mixed Bunch / Single Species 等） |
| ref_6 | Cynthia & Caca Q 版（米色职业装，持花/礼盒）— **推荐正式导览员** |
| ref_7 | 黑白 Lolita Q 版备选风格 |
| ref_8 | 法式复古珠宝橱窗（分层台座 + 柔光 + 窗外框景） |
| ref_9 | ROSEONLY 亚克力罩 + 大理石底座 + 聚光灯（抱抱桶/塔箱参考） |

花材实拍素材：`src/flowers/`（12 张，供 Demo 与后期 CMS 占位）。

---

## 2. 目标用户与业务场景

### 2.1 核心用户

- 悉尼本地高消费礼品购买者（生日、纪念日、求婚、开业）
- 追求仪式感与视觉呈现的企业/活动客户
- 华人社区 + 本地 English-speaking 客群（需双语）

### 2.2 核心转化路径

```
氛围片/花材预告 → 大堂导览 → 选择展厅 → 浏览藏品 → 查看详情/收藏 → 加购 → 结账 → 悉尼配送
```

### 2.3 澳洲本地化要求

- 货币 AUD，价格含 GST 展示策略需与客户确认
- 配送：悉尼 Metro / Greater Sydney 分区、当日/预约送达
- 支付：Stripe（卡、Apple Pay、Google Pay）或 Shopify Payments
- 隐私：Australian Privacy Act；Cookie 同意
- 联系：澳洲手机号、ABN（如有）、悉尼时区 AEST/AEDT

---

## 3. 信息架构与页面清单

### 3.1 站点地图

```
/                          电影感开场（可 Skip）
/lobby                     大堂 · Q 版导览
/halls                     展厅总览（可选，或由 Lobby 直达各厅）
/halls/huaxinfeng          花信风 · 藏品馆
/halls/zhuta               筑塔序 · 高定厅
/halls/bucket-bouquet      抱抱桶 & 花束陈列馆
/halls/[slug]/[pieceId]    单品藏馆页（玻璃罩详情）
/about                     关于我们 · 品牌故事
/account                   账户中心
/account/collection        收藏档案（Wishlist / 我的藏品）
/account/orders            订单历史
/account/profile           客户信息与地址簿
/cart                      购物车
/checkout                  结账
/delivery                  悉尼配送说明
/contact                   联系 / 定制咨询
/legal/privacy             隐私政策
/legal/terms               条款
```

### 3.2 页面说明

#### P0 — 首期 Demo / MVP 必做

| 页面 | 目的 | 关键模块 |
|------|------|----------|
| **开场 `/`** | 建立奢侈品预期 | 全屏视频/降级静图、Skip、品牌金句、音量控制 |
| **大堂 `/lobby`** | 导览分流 | Cynthia & Caca、对话气泡、3 个展厅 CTA、环境音可选 |
| **展厅 `/halls/*`** | 核心体验 | 2.5D 画廊漫游、玻璃罩/橱窗陈列、博物馆说明牌、厅间无缝切换 |
| **藏品详情** | 转化 | 大图、花名、简介、规格、价格、加购、收藏 |
| **关于我们** | 信任 | 品牌故事、悉尼工作室、定制流程 |

#### P1 — 正式版

| 页面 | 目的 |
|------|------|
| 账户 / 登录注册 | Email + Magic Link 或 Google；后期可加 Apple |
| 收藏档案 | 跨设备同步 Wishlist；可按「展厅」分类 |
| 购物车 & 结账 | Stripe Checkout；配送日期/时段选择 |
| 订单 & 地址簿 | 复购、发票 |
| 配送说明 | 邮编校验、运费规则、不可配送提示 |

#### P2 — 增强

| 功能 | 说明 |
|------|------|
| 定制咨询表单 | 高定厅专属，上传参考图 |
| 企业订购 | 批量、发票抬头 |
| 多语言 | EN 为主，ZH 可选 |
| CMS 后台 | 非开发同学可上新藏品、改文案 |
| 邮件通知 | 订单确认、配送提醒 |

---

## 4. 功能需求详述

### 4.1 展示与导览

| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| F-01 | 电影感开场 | 15–30s WebM/MP4，自动播放（muted），Scroll/Skip 进入 Lobby | P0 |
| F-02 | Q 版导览员 | ref_6 双人立绘 + 打字机/淡入对话；点击选项进入展厅 | P0 |
| F-03 | 展厅系统 | 三个固定展厅 + 可扩展 slug | P0 |
| F-04 | 玻璃罩陈列 | 单品聚焦：罩体、底座、聚光灯、说明牌 | P0 |
| F-05 | 厅内切换 | 同厅内左右/键盘切换藏品，无明显页面刷新 | P0 |
| F-06 | 跨厅切换 | Lobby 或侧栏「换厅」带过渡动画 | P0 |
| F-07 | 编辑式列表页 | 黑底 + 大留白 + 1–3 hero（Collection 入口，ref_1/5） | P1 |

### 4.2 客户信息与收藏档案

| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| F-10 | 账户注册/登录 | Supabase Auth 或 NextAuth + 邮箱 | P1 |
| F-11 | 客户资料 | 姓名、电话、默认地址、配送备注 | P1 |
| F-12 | 收藏档案 | 点击「收入藏品馆」加入；`/account/collection` 网格/列表 | P1 |
| F-13 | 收藏同步 | 登录后云端；未登录 localStorage 临时收藏 | P1 |
| F-14 | 浏览历史 | 可选：最近看过的 6 件藏品 | P2 |

**「收藏档案」产品定义**：不是 Pinterest 式杂乱收藏，而是**「我的藏品馆」**——视觉延续画廊说明牌，每件带展厅来源、加入日期、是否仍可购。

### 4.3 购买与履约

| ID | 功能 | 描述 | 优先级 |
|----|------|------|--------|
| F-20 | 加购 | 详情页 CTA；购物车角标 | P1 |
| F-21 | 购物车 | 行项目、数量、删除、小计 | P1 |
| F-22 | 结账 | Stripe；配送日期、悉尼地址、贺卡留言 | P1 |
| F-23 | 库存/可订状态 | 季节限定、Preorder、Sold Out 状态 | P1 |
| F-24 | 订单邮件 | 客户 + 店内通知 | P1 |

### 4.4 非功能需求

| 类别 | 标准 |
|------|------|
| 性能 | LCP < 2.5s（4G）；视频 lazy；图片 AVIF/WebP + srcset |
| 无障碍 | WCAG 2.2 AA；视频有 captions；键盘可完成导览 |
| SEO | 各厅/藏品 SSR 元数据；Open Graph 用精修图 |
| 响应式 | Mobile 优先：大堂竖屏、展厅改为纵向滑廊 |
| 浏览器 | 近 2 版 Chrome/Safari/Firefox/Edge |

---

## 5. 内容模型（数据结构设计）

### 5.1 核心实体

```typescript
// 展厅 Hall
{
  slug: 'huaxinfeng' | 'zhuta' | 'bucket-bouquet',
  title: { en: string, zh?: string },
  subtitle: string,
  ambiance: { bgImage, ambientAudio?, colorAccent },
  introCopy: string,
  pieces: Piece[]
}

// 藏品 Piece（可售 SKU 或展示型）
{
  id: string,
  hallSlug: string,
  name: { en, zh? },
  tagline: string,           // 一句话
  description: string,       // 博物馆式简介
  heroImage: string,         // 透明底或场景合成图
  vitrineType: 'glass-dome' | 'acrylic-box' | 'window' | 'pedestal',
  priceAud?: number,
  available: boolean,
  specs: { size, flowers[], careNotes? },
  seo: { title, description, ogImage }
}

// 用户收藏 CollectionItem
{
  userId, pieceId, hallSlug, savedAt, note?
}
```

### 5.2 三个展厅内容方向（与客户对齐）

| 展厅 | 产品类型 | 陈列隐喻 |
|------|----------|----------|
| **花信风 · 藏品馆** | 季节限定、稀有花材、单品种策展 | 博物馆玻璃罩 + 说明牌 |
| **筑塔序 · 高定厅** | 塔箱、层叠架构、开业/庆典大型作品 | 珠宝橱窗多层台座（ref_8） |
| **抱抱桶 & 花束陈列馆** | 抱抱桶、花束、礼盒 | 亚克力罩 + 大理石底座（ref_9） |

---

## 6. 技术方案

### 6.1 推荐栈（现代前端方案）

| 层 | 选型 | 理由 |
|----|------|------|
| 框架 | **Next.js 15 App Router** | SSR/SEO、路由、Image 优化；适合沉浸式单页感 |
| 样式 | **Tailwind CSS v4** + CSS Variables | 设计 token、暗色主题 |
| 动效 | **GSAP ScrollTrigger** + **Framer Motion** | 场景过渡、视差；Demo 阶段 GSAP 为主 |
| 状态 | Zustand（UI）+ TanStack Query（服务端） | 轻量 |
| 认证 | Supabase Auth 或 Clerk | 快速账户体系 |
| 数据库 | Supabase Postgres / PlanetScale | 用户、收藏、订单 |
| 支付 | **Stripe**（澳洲账户） | AUD、Apple Pay |
| CMS | **Sanity** 或 Payload | 非开发维护藏品文案与图片 |
| 托管 | Vercel（悉尼 edge 可配） | 与 Next 生态一致 |
| 分析 | Plausible / GA4 | 隐私友好可选 |

### 6.2 WordPress 方案（备选）

若客户强依赖 WP 生态：

- **Headless**：WP REST/GraphQL 作 CMS + Next.js 前端（体验不打折）
- **或** WooCommerce + 高度定制 Block Theme（沉浸式动效实现成本更高）

**建议**：沉浸式画廊体验优先 Next.js；WP 仅当客户已有运营习惯且接受 Headless。

### 6.3 第三方集成

- 地图/配送：Google Maps API + 邮编白名单
- 邮件：Resend / SendGrid
- 媒体：Cloudinary 或 Vercel Blob（大图 CDN）

---

## 7. 设计系统（DESIGN.md 前置摘要）

> 正式开发前应在项目根目录落地 `DESIGN.md`（从 awesome-design-md 选 luxury/editorial 类模板再定制）。

### 7.1 色彩

| Token | 值 | 用途 |
|-------|-----|------|
| `--bg-charcoal` | `#0a0a0b` ~ `#121214` | 主背景 |
| `--bg-elevated` | `#1a1a1e` | 卡片/说明牌 |
| `--text-primary` | `#f5f3ef` | 主文字（暖白） |
| `--text-muted` | `#8a8580` | 次要说明 |
| `--accent-gold` | `#c9a962` | 品牌点缀、CTA 描边 |
| `--spotlight` | radial-gradient | 花材底部聚光 |

### 7.2 字体建议

- **Display**：Cormorant Garamond / Playfair Display / 中文：思源宋体
- **UI / 说明牌**：DM Sans / 中文：思源黑体 Light
- **Logo**：手写体（参考 Grandiflora），需客户提供或定制字标

### 7.3 组件清单

- `CinematicIntro` — 视频开场
- `LobbyGuide` — Q 版 + 对话 + 展厅按钮
- `GalleryHall` — 展厅容器
- `Vitrine` — 玻璃罩/亚克力罩
- `MuseumPlacard` — 名称 + 简介 + 价格
- `HallNavigator` — 厅内指示器 / 换厅
- `CollectionArchive` — 收藏档案卡片
- `EditorialProductRow` — ref_4 式编辑列表（P1）

---

## 8. 分期交付计划

### Phase 0 — 展馆 Demo（当前目标，约 1–2 周）

- [ ] 单厅或三厅静态数据
- [ ] Lobby + 一个完整展厅可交互
- [ ] 2.5D 切换效果验证（见 `EXHIBITION-DEMO.md`）
- [ ] 使用 `src/flowers` 占位图
- [ ] 部署 Preview URL 给客户

**Demo 不含**：真实支付、账户、CMS

### Phase 1 — 体验完整版（约 3–4 周）

- [ ] 三厅全部上线 + 开场视频
- [ ] 关于我们、配送说明
- [ ] 响应式 + 基础 SEO
- [ ] 客户确认视觉后再接交易

### Phase 2 — 商业闭环（约 3–4 周）

- [ ] 账户、收藏档案、购物车、Stripe
- [ ] CMS 接入
- [ ] 订单邮件、店内通知

### Phase 3 —  polish（约 2 周）

- [ ] 性能/无障碍审计
- [ ] 英文文案润色
- [ ] Analytics、错误监控（Sentry）

---

## 9. 资产与内容依赖（客户需提供）

| 资产 | 规格 | 状态 |
|------|------|------|
| 品牌 Logo 矢量 | SVG | 待提供 |
| 开场氛围片 | 15–30s，4K 源，Web 压缩版 | 待拍摄/提供 |
| 各品类精修图 | 透明底 + 场景图各一套 | 部分有 `src/flowers` |
| 产品文案 | 中/英名称、简介、价格 | 待提供 |
| Q 版立绘 | ref_6 高清 PNG 透明底 | 需确认版权与正式版 |
| 品牌金句/旁白稿 | 开场与 Lobby 对话 | 待提供 |
| Stripe 澳洲账户 | — | 待开通 |
| 配送规则 | 邮编、时段、运费 | 待确认 |

---

## 10. 风险与决策点

| 风险 | 缓解 |
|------|------|
| 客户期望「真 3D 逛店」 | Demo 用 2.5D 预演，文档明确非 3D 方案边界 |
| 视频首屏影响 LCP | 首屏 poster + 延迟加载全片 |
| Q 版与高端调性平衡 | 用 ref_6 克制款；动画勿过于卡通 |
| 图片质量参差 | 统一后期：暗背景、聚光灯、同尺寸 vitrine 合成 |
| 双语维护成本 | Phase 1 英文为主，中文 Phase 2 |

**待客户确认**：

1. Q 版正式稿：ref_6 还是 ref_7 风格？
2. 首期是否必须含购物车，还是 Demo 仅「咨询/预订」按钮？
3. 是否已有域名、邮箱、Stripe？
4. 产品 SKU 数量级（10 / 50 / 100+）？

---

## 11. 成功指标（上线后）

- 平均 Session 时长 > 2min（沉浸指标）
- Lobby → 展厅点击率 > 60%
- 展厅 → 详情点击率 > 30%
- 移动端跳出率 < 55%
- 结账转化率（Phase 2 后）行业基准 1–3%

---

## 12. 文档维护

| 文档 | 路径 |
|------|------|
| 本文档 | `docs/PROJECT.md` |
| 展馆 Demo 技术方案 | `docs/EXHIBITION-DEMO.md` |
| 视觉规范（待建） | `DESIGN.md` |
| API / 数据（待建） | `docs/DATA.md` |

---

*本文档随客户反馈迭代；Phase 0 Demo 以「体验验证」为首要目标，避免过早绑定支付与后台复杂度。*
