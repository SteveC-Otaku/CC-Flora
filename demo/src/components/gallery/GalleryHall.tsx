"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { hallMeta, pieces } from "@/data/hall-huaxinfeng";
import { useMounted } from "@/hooks/useMounted";
import { useSwipeNavigation } from "@/hooks/useSwipeNavigation";
import { CorridorBay } from "./CorridorBay";
import { GalleryBooth } from "./GalleryBooth";
import { HallNavigation } from "./HallNavigation";

function preloadImage(src: string) {
  const img = new Image();
  img.src = src;
}

export function GalleryHall() {
  const mounted = useMounted();
  const [index, setIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);

  const panTo = useCallback((targetIndex: number, immediate = false) => {
    const track = trackRef.current;
    const viewport = viewportRef.current;
    if (!track || !viewport) return;

    const station = track.children[targetIndex] as HTMLElement | undefined;
    const step = station?.offsetWidth ?? viewport.offsetWidth;
    const x = -targetIndex * step;

    gsap.killTweensOf(track);

    if (immediate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      gsap.set(track, { x });
      return;
    }

    setIsTransitioning(true);
    gsap.to(track, {
      x,
      duration: 1.05,
      ease: "power3.inOut",
      onComplete: () => setIsTransitioning(false),
    });
  }, []);

  const goTo = useCallback(
    (nextIndex: number) => {
      if (!mounted || isTransitioning) return;
      const normalized = (nextIndex + pieces.length) % pieces.length;
      if (normalized === index) return;
      setIndex(normalized);
    },
    [index, isTransitioning, mounted],
  );

  const onPrev = useCallback(() => goTo(index - 1), [goTo, index]);
  const onNext = useCallback(() => goTo(index + 1), [goTo, index]);
  const swipe = useSwipeNavigation(onPrev, onNext);

  useEffect(() => {
    pieces.forEach((p) => preloadImage(p.image));
  }, []);

  useEffect(() => {
    if (!mounted) return;
    panTo(index);
  }, [index, mounted, panTo]);

  useEffect(() => {
    if (!mounted) return;
    const onResize = () => panTo(index, true);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [index, mounted, panTo]);

  useEffect(() => {
    if (!mounted) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [mounted, onPrev, onNext]);

  useEffect(() => {
    if (!mounted) return;
    const ctx = gsap.context(() => {
      gsap.from(".hall-header", { opacity: 0, y: -12, duration: 0.9, ease: "power3.out" });
      gsap.from(".gallery-viewport", { opacity: 0, duration: 1.1, ease: "power2.out", delay: 0.15 });
    }, stageRef);
    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <div className="min-h-dvh bg-[var(--bg-charcoal)]" aria-hidden />;
  }

  return (
    <div
      ref={stageRef}
      className="gallery-hall relative flex min-h-dvh flex-col overflow-hidden bg-[var(--bg-charcoal)]"
      onTouchStart={swipe.onTouchStart}
      onTouchEnd={swipe.onTouchEnd}
    >
      <header className="hall-header relative z-30 flex shrink-0 items-start justify-between px-6 pt-8 md:px-10 md:pt-10">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted-soft)]">
            C&amp;C Flora · Sydney
          </p>
          <h1 className="mt-2 font-display text-lg font-light tracking-[0.12em] text-[var(--text-primary)] md:text-xl">
            {hallMeta.titleZh}
          </h1>
          <p className="mt-1 font-body text-xs italic text-[var(--muted)]">{hallMeta.subtitle}</p>
        </div>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-soft)]">
          Gallery Demo
        </p>
      </header>

      <div
        ref={viewportRef}
        className="gallery-viewport relative z-10 min-h-[min(720px,68vh)] flex-1 overflow-hidden"
        style={{ "--station-count": pieces.length } as React.CSSProperties}
      >
        <div ref={trackRef} className="gallery-track will-change-transform">
          {pieces.map((piece, i) => (
            <div key={piece.id} className="gallery-station">
              <CorridorBay isFirst={i === 0} />
              <GalleryBooth piece={piece} index={i} total={pieces.length} />
            </div>
          ))}
        </div>
      </div>

      <HallNavigation
        total={pieces.length}
        current={index}
        onSelect={goTo}
        onPrev={onPrev}
        onNext={onNext}
        isTransitioning={isTransitioning}
      />
    </div>
  );
}
