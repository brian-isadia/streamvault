import { useCallback, useEffect, useRef, type KeyboardEvent } from "react";
import { useNavigate } from "@tanstack/react-router";
import { HeroSlide } from "./HeroSlide";
import { HeroControls } from "./HeroControls";
import { HeroSkeleton } from "./HeroSkeleton";
import { useHeroCarousel } from "./useHeroCarousel";
import type { HeroBannerProps } from "./types";

const DEFAULT_AUTO_ROTATE_INTERVAL = 8000; // 8 seconds

export function HeroBanner({
  items,
  autoRotateInterval = DEFAULT_AUTO_ROTATE_INTERVAL,
  className = "",
}: HeroBannerProps) {
  const navigate = useNavigate();
  const containerRef = useRef<HTMLDivElement>(null);

  const {
    currentIndex,
    previousIndex,
    goTo,
    goToNext,
    goToPrevious,
    isPaused,
    togglePause,
    pause,
    resume,
    isMuted,
    toggleMute,
    showVideo,
  } = useHeroCarousel({
    totalSlides: items.length,
    autoRotateInterval,
    enabled: items.length > 1,
  });

  const currentItem = items[currentIndex];

  // ── Navigation handlers ─────────────────────────
  const handlePlay = useCallback(() => {
    if (currentItem) {
      navigate({
        to: "/watch/$contentId",
        params: { contentId: currentItem.id },
      });
    }
  }, [currentItem, navigate]);

  const handleMoreInfo = useCallback(() => {
    if (currentItem) {
      navigate({ to: currentItem.href });
    }
  }, [currentItem, navigate]);

  // ── Keyboard navigation ─────────────────────────
  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          goToPrevious();
          break;
        case "ArrowRight":
          e.preventDefault();
          goToNext();
          break;
        case " ":
          e.preventDefault();
          togglePause();
          break;
        case "m":
        case "M":
          toggleMute();
          break;
      }
    },
    [goToPrevious, goToNext, togglePause, toggleMute],
  );

  // ── Pause on hover (desktop) ────────────────────
  const handleMouseEnter = useCallback(() => {
    pause();
  }, [pause]);

  const handleMouseLeave = useCallback(() => {
    resume();
  }, [resume]);

  // ── Pause when not visible ──────────────────────
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          resume();
        } else {
          pause();
        }
      },
      { threshold: 0.3 },
    );

    const el = containerRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [pause, resume]);

  // ── Touch / Swipe support ───────────────────────
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const isSwiping = useRef(false);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    isSwiping.current = true;
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isSwiping.current) return;
    touchEndX.current = e.touches[0].clientX;
  }, []);

  const handleTouchEnd = useCallback(() => {
    if (!isSwiping.current) return;
    isSwiping.current = false;

    const diff = touchStartX.current - touchEndX.current;
    const threshold = 50; // minimum px to count as swipe

    if (Math.abs(diff) < threshold) return;

    if (diff > 0) {
      goToNext(); // swipe left → next
    } else {
      goToPrevious(); // swipe right → prev
    }
  }, [goToNext, goToPrevious]);

  // ── Empty / Loading states ──────────────────────
  if (!items || items.length === 0) {
    return <HeroSkeleton />;
  }

  return (
    <section
      ref={containerRef}
      className={`
        relative w-full
        min-h-[56.25vw] max-h-[80vh]
        overflow-hidden
        bg-background
        ${className}
      `}
      role="region"
      aria-roledescription="carousel"
      aria-label="Featured content"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* ── Live region for screen readers ── */}
      <div aria-live="polite" className="sr-only">
        {`Now showing: ${currentItem.title}. Slide ${currentIndex + 1} of ${items.length}.`}
      </div>

      {/* ── Slides ── */}
      {items.map((item, index) => (
        <HeroSlide
          key={item.id}
          item={item}
          isActive={index === currentIndex}
          isPrevious={index === previousIndex}
          isMuted={isMuted}
          showVideo={showVideo && index === currentIndex}
          onToggleMute={toggleMute}
          onPlay={handlePlay}
          onMoreInfo={handleMoreInfo}
          priority={index === 0}
        />
      ))}

      {/* ── Controls (dots, arrows, mute) ── */}
      {items.length > 1 && (
        <HeroControls
          total={items.length}
          current={currentIndex}
          onSelect={goTo}
          onPrevious={goToPrevious}
          onNext={goToNext}
          isPaused={isPaused}
          onTogglePause={togglePause}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          autoRotateInterval={autoRotateInterval}
        />
      )}

      {/* ── Single item: mute button only ── */}
      {items.length === 1 && currentItem.trailerUrl && (
        <div className="absolute bottom-6 right-(--row-padding-x) z-20">
          <button
            onClick={toggleMute}
            className="btn-icon w-9 h-9"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? (
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <path d="M11 5L6 9H2v6h4l5 4V5z" />
                <line x1="23" y1="9" x2="17" y2="15" />
                <line x1="17" y1="9" x2="23" y2="15" />
              </svg>
            ) : (
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-none stroke-current stroke-2"
              >
                <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              </svg>
            )}
          </button>
        </div>
      )}
    </section>
  );
}
