export type Piece = {
  id: string;
  nameEn: string;
  nameZh: string;
  tagline: string;
  description: string;
  priceAud: number;
  image: string;
  accent: string;
};

export const hallMeta = {
  slug: "huaxinfeng",
  titleEn: "Huaxinfeng Collection",
  titleZh: "花信风 · 藏品馆",
  subtitle: "Seasonal specimens, held in stillness.",
};

export const pieces: Piece[] = [
  {
    id: "hx-01",
    nameEn: "Morning Mist Peony",
    nameZh: "晨雾牡丹",
    tagline: "Brief spring, held still.",
    description:
      "Layered blush peonies gathered at first light. A single-edition spring specimen presented under museum glass — petals like porcelain, scent like rain on stone.",
    priceAud: 280,
    image: "/assets/pieces/piece-0.jpg",
    accent: "#e8c4c4",
  },
  {
    id: "hx-02",
    nameEn: "Velvet Ranunculus Study",
    nameZh: "丝绒花毛茛",
    tagline: "One species. Infinite depth.",
    description:
      "Forty-seven ranunculus stems in a single chromatic field. The collection celebrates texture over variety — each curl of petal catches the vitrine light.",
    priceAud: 320,
    image: "/assets/pieces/piece-1.jpg",
    accent: "#f4a896",
  },
  {
    id: "hx-03",
    nameEn: "Nocturne Rose Archive",
    nameZh: "夜曲玫瑰档案",
    tagline: "Dark room. Single bloom.",
    description:
      "Garden roses selected for their slow unfurl. Displayed as a solitary archive piece — the way a gallery might hold one manuscript under glass.",
    priceAud: 395,
    image: "/assets/pieces/piece-2.jpg",
    accent: "#c97888",
  },
  {
    id: "hx-04",
    nameEn: "Orchid Meridian",
    nameZh: "兰经线",
    tagline: "Vertical silence.",
    description:
      "Phalaenopsis arranged on a single meridian line. Negative space above and below — the composition breathes the way a curator leaves wall space around a painting.",
    priceAud: 450,
    image: "/assets/pieces/piece-3.jpg",
    accent: "#d4c4e8",
  },
  {
    id: "hx-05",
    nameEn: "Winter Anemone Fragment",
    nameZh: "冬银莲片段",
    tagline: "Off-season rarity.",
    description:
      "An off-season anemone pairing — white and ink. The final piece in this rotation, reserved for collectors who arrive when the gallery is nearly empty.",
    priceAud: 365,
    image: "/assets/pieces/piece-4.jpg",
    accent: "#f0ebe3",
  },
];
