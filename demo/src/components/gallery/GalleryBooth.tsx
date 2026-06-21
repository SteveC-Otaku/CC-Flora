"use client";

import { useState } from "react";
import type { Piece } from "@/data/hall-huaxinfeng";
import { PedestalPlaque } from "./PedestalPlaque";

type Props = {
  piece: Piece;
  index: number;
  total: number;
};

export function GalleryBooth({ piece, index, total }: Props) {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      className="booth-exhibit"
      style={{ "--accent": piece.accent } as React.CSSProperties}
      aria-label={piece.nameEn}
    >
      <div className="exhibit-stack">
        <div className="exhibit-case">
          <div className="case-inner">
            <div className="case-product">
              {!imgError ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={piece.image}
                  alt={piece.nameEn}
                  className="case-product-img"
                  draggable={false}
                  onError={() => setImgError(true)}
                />
              ) : (
                <div className="case-product-fallback" aria-hidden>
                  <span className="font-display text-sm tracking-widest text-[var(--muted)]">
                    Specimen
                  </span>
                </div>
              )}
            </div>
            <div className="case-glass">
              <div className="case-shine" />
              <div className="case-edge" />
            </div>
            <div className="case-glow" aria-hidden />
          </div>
        </div>

        <div className="exhibit-stand">
          <div className="pedestal-marble">
            <div className="pedestal-top" />
            <div className="pedestal-body">
              <PedestalPlaque piece={piece} index={index} total={total} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
