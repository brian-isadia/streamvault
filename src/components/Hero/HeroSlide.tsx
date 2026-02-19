import { memo, useCallback } from "react";
import { HeroBillboard } from "./HeroBillboard";
import { HeroContent } from "./HeroContent";
import type { HeroSlideProps } from "./types";

export const HeroSlide = memo(function HeroSlide({
  item,
  isActive,
  isPrevious,
  isMuted,
  showVideo,
  onToggleMute,
  onPlay,
  onMoreInfo,
  priority = false,
}: HeroSlideProps) {
  const handleVideoEnded = useCallback(() => {
    // Video ended — could trigger next slide or loop
  }, []);

  const handleVideoCanPlay = useCallback(() => {
    // Video ready to play
  }, []);

  return (
    <div
      className={`
        absolute inset-0
        transition-opacity duration-700 ease-standard
        ${isActive ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"}
      `}
      role="tabpanel"
      aria-hidden={!isActive}
      aria-roledescription="slide"
      aria-label={item.title}
    >
      {/* ── Background (Image + Video) ── */}
      <HeroBillboard
        item={item}
        isActive={isActive}
        isMuted={isMuted}
        showVideo={showVideo}
        onVideoEnded={handleVideoEnded}
        onVideoCanPlay={handleVideoCanPlay}
        priority={priority}
      />

      {/* ── Content Overlay ── */}
      <HeroContent
        item={item}
        isActive={isActive}
        onPlay={onPlay}
        onMoreInfo={onMoreInfo}
      />
    </div>
  );
});
