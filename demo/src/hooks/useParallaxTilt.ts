"use client";

import { useCallback, useRef } from "react";

type ParallaxRefs = {
  bg: React.RefObject<HTMLDivElement | null>;
  glass: React.RefObject<HTMLDivElement | null>;
  product: React.RefObject<HTMLDivElement | null>;
};

export function useParallaxTilt(refs: ParallaxRefs, disabled = false) {
  const frame = useRef<number | null>(null);

  const onMove = useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      if (disabled) return;
      const { clientX, clientY, currentTarget } = e;
      const rect = currentTarget.getBoundingClientRect();
      const x = (clientX - rect.left) / rect.width - 0.5;
      const y = (clientY - rect.top) / rect.height - 0.5;

      if (frame.current) cancelAnimationFrame(frame.current);
      frame.current = requestAnimationFrame(() => {
        if (refs.bg.current) {
          refs.bg.current.style.transform = `translate(${x * -14}px, ${y * -10}px) scale(1.04)`;
        }
        if (refs.glass.current) {
          refs.glass.current.style.transform = `translate(${x * 4}px, ${y * 3}px)`;
        }
        if (refs.product.current) {
          refs.product.current.style.transform = `translate(${x * 10}px, ${y * 8}px)`;
        }
      });
    },
    [disabled, refs.bg, refs.glass, refs.product],
  );

  const onLeave = useCallback(() => {
    if (refs.bg.current) refs.bg.current.style.transform = "";
    if (refs.glass.current) refs.glass.current.style.transform = "";
    if (refs.product.current) refs.product.current.style.transform = "";
  }, [refs.bg, refs.glass, refs.product]);

  return { onMove, onLeave };
}
