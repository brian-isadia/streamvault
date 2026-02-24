import { memo, useState, useRef, useCallback } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { Play, Plus, ThumbsUp, ChevronDown } from "lucide-react";
import type { ContentCardProps } from "./types";

export const ContentCard = memo(function ContentCard({
  item,
  variant,
  index,
}: ContentCardProps) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const hoverTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const isPoster = variant === "poster";
  const isBackdrop = variant === "backdrop";

  // ── Delayed hover (prevent flicker) ─────────────
  const handleMouseEnter = useCallback(() => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(true);
    }, 400);
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    setIsHovered(false);

    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  // ── Play video preview on hover ─────────────────
  const handleVideoLoaded = useCallback(() => {
    if (isHovered && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isHovered]);

  const handlePlay = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigate({ to: `/watch/${item.id}` });
    },
    [item.id, navigate],
  );

  const handleMoreInfo = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigate({ to: item.href });
    },
    [item.href, navigate],
  );

  // ── Meta text ───────────────────────────────────
  const metaText = (() => {
    if (item.contentType === "movie" && item.runtimeMinutes) {
      const h = Math.floor(item.runtimeMinutes / 60);
      const m = item.runtimeMinutes % 60;
      return h > 0 ? `${h}h ${m}m` : `${m}m`;
    }
    if (item.contentType === "tv" && item.seasonCount) {
      return item.seasonCount === 1
        ? `${item.episodeCount} Episodes`
        : `${item.seasonCount} Seasons`;
    }
    return String(item.releaseYear);
  })();

  return (
    <div
      className={`
        content-card group relative shrink-0
        ${isPoster ? "w-(--row-card-width-sm) sm:w-(--row-card-width-md) lg:w-(--row-card-width-lg) xl:w-(--row-card-width-xl)" : ""}
        ${isBackdrop ? "w-64 sm:w-72 lg:w-80 xl:w-88" : ""}
      `}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Link
        to={item.href}
        className="block w-full"
        aria-label={`${item.title} (${item.releaseYear})`}
        draggable={false}
      >
        {/* ── Image ── */}
        <div
          className={`
            relative w-full overflow-hidden rounded-md
            ${isPoster ? "aspect-poster" : "aspect-backdrop"}
          `}
        >
          {/* Placeholder */}
          {!imageLoaded && <div className="absolute inset-0 skeleton" />}

          <img
            src={isPoster ? item.posterUrl : item.backdropUrl}
            alt={item.title}
            loading={index < 6 ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={index < 3 ? "high" : "auto"}
            draggable={false}
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-opacity duration-normal ease-standard
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* ── Hover Video Preview ── */}
          {isHovered && item.trailerPreviewUrl && (
            <video
              ref={videoRef}
              src={item.trailerPreviewUrl}
              muted
              playsInline
              preload="auto"
              onCanPlay={handleVideoLoaded}
              className="
                absolute inset-0 w-full h-full object-cover
                transition-opacity duration-normal ease-standard
              "
            />
          )}

          {/* ── Badges ── */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {item.isOriginal && (
              <span className="badge badge-original text-[10px]">SV</span>
            )}
            {item.isNew && (
              <span className="badge badge-new text-[10px]">New</span>
            )}
          </div>

          {/* ── Bottom gradient ── */}
          <div
            className="
              absolute inset-x-0 bottom-0 h-1/3
              bg-linear-to-t from-black/60 to-transparent
              opacity-0 group-hover:opacity-100
              transition-opacity duration-normal ease-standard
            "
          />
        </div>

        {/* ── Title (below card, visible always for poster variant) ── */}
        {isPoster && (
          <div className="mt-1.5 px-0.5">
            <p className="text-body-sm text-foreground-secondary line-clamp-1 group-hover:text-foreground transition-colors duration-fast">
              {item.title}
            </p>
          </div>
        )}
      </Link>

      {/* ── Expanded Hover Card (Desktop) ── */}
      {isHovered && (
        <div
          className="
            hidden lg:block
            absolute top-full left-1/2 -translate-x-1/2
            w-[calc(100%+2rem)] mt-0
            z-dropdown
            animate-scale-in
          "
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="
              bg-background-elevated rounded-b-lg
              shadow-elevation-3 border border-border/50 border-t-0
              p-3
            "
          >
            {/* ── Action Buttons ── */}
            <div className="flex items-center gap-2 mb-2.5">
              <button
                onClick={handlePlay}
                className="
                  w-8 h-8 rounded-full bg-foreground text-background
                  flex items-center justify-center
                  hover:bg-foreground/85
                  transition-colors duration-fast ease-standard
                "
                aria-label={`Play ${item.title}`}
              >
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </button>

              <button
                className="
                  w-8 h-8 rounded-full border border-foreground-muted/50
                  flex items-center justify-center
                  text-foreground hover:border-foreground
                  transition-colors duration-fast ease-standard
                "
                aria-label={`Add ${item.title} to My List`}
              >
                <Plus className="w-4 h-4" />
              </button>

              <button
                className="
                  w-8 h-8 rounded-full border border-foreground-muted/50
                  flex items-center justify-center
                  text-foreground hover:border-foreground
                  transition-colors duration-fast ease-standard
                "
                aria-label={`Rate ${item.title}`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>

              {/* Spacer */}
              <div className="flex-1" />

              <button
                onClick={handleMoreInfo}
                className="
                  w-8 h-8 rounded-full border border-foreground-muted/50
                  flex items-center justify-center
                  text-foreground hover:border-foreground
                  transition-colors duration-fast ease-standard
                "
                aria-label={`More info about ${item.title}`}
              >
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            {/* ── Meta Info ── */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-caption">
              {item.matchScore && item.matchScore > 0 && (
                <span
                  className={`font-bold ${
                    item.matchScore >= 75
                      ? "match-score-high"
                      : item.matchScore >= 50
                        ? "match-score-medium"
                        : "match-score-low"
                  }`}
                >
                  {item.matchScore}% Match
                </span>
              )}

              <span className="px-1 py-px border border-foreground-muted/40 text-[10px] font-medium">
                {item.maturityRating}
              </span>

              <span className="text-foreground-secondary">{metaText}</span>
            </div>

            {/* ── Genres ── */}
            {item.genres.length > 0 && (
              <div className="flex flex-wrap items-center gap-1 mt-2">
                {item.genres.slice(0, 3).map((genre, i) => (
                  <span key={genre} className="flex items-center gap-1">
                    {i > 0 && (
                      <span className="w-0.5 h-0.5 rounded-full bg-foreground-muted" />
                    )}
                    <span className="text-caption text-foreground-secondary">
                      {genre}
                    </span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
});
