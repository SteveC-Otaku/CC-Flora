"use client";

type Props = {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
  isTransitioning: boolean;
};

export function HallNavigation({
  total,
  current,
  onSelect,
  onPrev,
  onNext,
  isTransitioning,
}: Props) {
  return (
    <>
      <button
        type="button"
        aria-label="Previous specimen"
        disabled={isTransitioning}
        onClick={onPrev}
        className="nav-arrow nav-arrow-left"
      >
        <span aria-hidden>←</span>
      </button>
      <button
        type="button"
        aria-label="Next specimen"
        disabled={isTransitioning}
        onClick={onNext}
        className="nav-arrow nav-arrow-right"
      >
        <span aria-hidden>→</span>
      </button>

      <div className="progress-dots" role="tablist" aria-label="Gallery specimens">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            type="button"
            role="tab"
            aria-selected={i === current}
            aria-label={`Specimen ${i + 1}`}
            disabled={isTransitioning}
            onClick={() => onSelect(i)}
            className={`progress-dot ${i === current ? "is-active" : ""}`}
          />
        ))}
      </div>

      <p className="nav-hint font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--muted-soft)]">
        Pan · ← → · swipe
      </p>
    </>
  );
}
