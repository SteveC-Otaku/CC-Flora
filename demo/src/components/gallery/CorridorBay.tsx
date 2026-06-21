"use client";

type Props = {
  isFirst?: boolean;
};

export function CorridorBay({ isFirst }: Props) {
  return (
    <div className="corridor-bay" aria-hidden>
      <div className="room-ceiling" />
      <div className="room-spotlight" />
      {isFirst && <div className="room-curtain room-curtain-left" />}
      <div className="room-wall room-wall-back">
        <div className="wall-frame wall-frame-center" />
        <div className="wall-frame wall-frame-left" />
        <div className="wall-frame wall-frame-right" />
      </div>
      <div className="room-floor" />
      <div className="room-vignette" />
    </div>
  );
}
