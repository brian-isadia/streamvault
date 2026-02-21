import { memo, useEffect, useRef } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Volume2,
  VolumeX,
} from "lucide-react";
import type { HeroControlsProps } from "./types";

export const HeroControls = memo(function HeroControls({
  total,
  current,
  onSelect,
  onPrevious,
  onNext,
  isPaused,
  onTogglePause,
  isMuted,
  onToggleMute,
  autoRotateInterval,
}: HeroControlsProps) {
  return (
    <div className="absolute bottom-0 inset-x-0 z-20" aria-hidden="true">
      <div
        className="
          flex items-center justify-between
          px-(--row-padding-x) pb-4 sm:pb-6
        "
      >
        {/* ── Left: Pagination Dots ── */}
        <div className="flex items-center gap-3">
          {/* Dots */}
          <div
            className="flex items-center gap-1.5"
            role="tablist"
            aria-label="Hero slides"
          >
            {Array.from({ length: total }).map((_, i) => (
              <button
                key={i}
                onClick={() => onSelect(i)}
                role="tab"
                aria-selected={i === current}
                aria-label={`Go to slide ${i + 1}`}
                className={`
                  relative h-0.5 rounded-pill transition-all duration-normal ease-standard
                  overflow-hidden
                  ${
                    i === current
                      ? "w-8 bg-foreground"
                      : "w-4 bg-foreground/30 hover:bg-foreground/50"
                  }
                `}
              >
                {/* Progress fill for active dot (synced with auto-rotate) */}
                {i === current && !isPaused && (
                  <ProgressFill
                    duration={autoRotateInterval}
                    isPaused={isPaused}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Right: Controls ── */}
        <div className="flex items-center gap-2">
          {/* Previous */}
          <button
            onClick={onPrevious}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Pause / Play auto-rotation */}
          <button
            onClick={onTogglePause}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9"
            aria-label={
              isPaused ? "Resume auto-rotation" : "Pause auto-rotation"
            }
          >
            {isPaused ? (
              <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            ) : (
              <Pause className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-current" />
            )}
          </button>

          {/* Next */}
          <button
            onClick={onNext}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9"
            aria-label="Next slide"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>

          {/* Divider */}
          <div className="divider-vertical h-5 mx-1 opacity-30" />

          {/* Mute / Unmute */}
          <button
            onClick={onToggleMute}
            className="btn-icon w-8 h-8 sm:w-9 sm:h-9"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" />
            ) : (
              <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />
            )}
          </button>

          {/* Maturity Rating (right edge) */}
          <div
            className="
              hidden sm:flex items-center
              px-2.5 py-1 ml-1
              border-l-2 border-foreground/40
              bg-surface/60
              text-caption font-medium tracking-wide
            "
          >
            {/* This gets populated by the active slide data passed from parent;
                showing a static placeholder approach here — parent can pass rating */}
          </div>
        </div>
      </div>
    </div>
  );
});

// ── Progress Fill (animated bar inside the active dot) ──

function ProgressFill({
  duration,
  isPaused,
}: {
  duration: number;
  isPaused: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Reset and restart the animation
    el.style.transition = "none";
    el.style.width = "0%";

    // Force reflow
    void el.offsetWidth;

    if (!isPaused) {
      el.style.transition = `width ${duration}ms linear`;
      el.style.width = "100%";
    }
  }, [duration, isPaused]);

  // Respect prefers-reduced-motion
  const motionQuery =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)")
      : null;

  if (motionQuery?.matches) return null;

  return (
    <div
      ref={ref}
      className="absolute inset-y-0 left-0 bg-brand rounded-pill"
    />
  );
}
