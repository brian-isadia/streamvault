import { useRef, useEffect, useState, memo } from "react";
import { Image } from "@unpic/react";
import type { HeroBillboardProps } from "./types";

export const HeroBillboard = memo(function HeroBillboard({
  item,
  isActive,
  isMuted,
  showVideo,
  onVideoEnded,
  onVideoCanPlay,
  priority = false,
}: HeroBillboardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(true);

  const shouldPlayVideo =
    isActive && showVideo && item.trailerUrl && !videoError;

  // ── Video playback control ──────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldPlayVideo) {
      video.currentTime = 0;
      video.play().catch(() => {
        setVideoError(true);
      });
    } else {
      video.pause();
      video.currentTime = 0;
    }
  }, [shouldPlayVideo]);

  // ── Mute control ────────────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (video) video.muted = isMuted;
  }, [isMuted]);

  // ── Reset on slide change ───────────────────────
  useEffect(() => {
    if (!isActive) {
      setVideoLoaded(false);
      setVideoError(false);
    }
  }, [isActive]);

  const handleCanPlay = () => {
    setVideoLoaded(true);
    onVideoCanPlay();
  };

  const showVideoLayer = shouldPlayVideo && videoLoaded;

  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* ── Background Image ── */}
      <div
        className={`
          absolute inset-0 transition-transform duration-20000 ease-linear
          ${isActive && !showVideoLayer ? "scale-[1.05]" : "scale-100"}
        `}
      >
        <img
          key={item.backdropUrl}
          src={item.backdropUrl}
          alt=""
          className="w-full object-cover object-top h-full opacity-100"
          onError={(e) => {
            console.error("Image failed to load:", item.backdropUrl, e);
          }}
        />
      </div>

      {/* ── Background Video ── */}
      {item.trailerUrl && !videoError && (
        <video
          ref={videoRef}
          src={item.trailerUrl}
          muted={isMuted}
          playsInline
          preload="none"
          onCanPlay={handleCanPlay}
          onEnded={onVideoEnded}
          onError={() => setVideoError(true)}
          className={`
            absolute inset-0 w-full h-full object-cover
            transition-opacity duration-slow ease-standard
            ${showVideoLayer ? "opacity-100" : "opacity-0"}
          `}
        />
      )}

      {/* ── Gradient: Bottom ── */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-[70%]
          bg-linear-to-t from-background via-background/60 to-transparent
        "
      />

      {/* ── Gradient: Left (Desktop) ── */}
      <div
        className="
          absolute inset-y-0 left-0 w-[50%]
          bg-linear-to-r from-background/80 via-background/40 to-transparent
          hidden lg:block
        "
      />

      {/* ── Gradient: Top (Navbar fade) ── */}
      <div
        className="
          absolute inset-x-0 top-0 h-32
          bg-linear-to-b from-background/70 to-transparent
        "
      />

      {/* ── Vignette overlay ── */}
      <div className="absolute inset-0 gradient-vignette opacity-30" />
    </div>
  );
});
