"use client";

type Props = {
  piece: {
    nameEn: string;
    nameZh: string;
    tagline: string;
    priceAud: number;
  };
  index: number;
  total: number;
};

export function PedestalPlaque({ piece, index, total }: Props) {
  return (
    <div className="pedestal-plaque">
      <p className="plaque-meta font-mono">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </p>
      <h2 className="plaque-title font-display">{piece.nameEn}</h2>
      <p className="plaque-subtitle font-body">{piece.nameZh}</p>
      <p className="plaque-tagline font-body">{piece.tagline}</p>
      <p className="plaque-price font-display">${piece.priceAud}</p>
    </div>
  );
}
