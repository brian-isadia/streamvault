import { memo, useState, useCallback } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Play, X, Info } from "lucide-react";
import type { ContinueWatchingItem } from "./types";

interface Props {
  item: ContinueWatchingItem;
  index: number;
  onRemove?: (id: string) => void;
}

export const ContinueWatchingCard = memo(function ContinueWatchingCard({
  item,
  index,
  onRemove,
}: Props) {
  const navigate = useNavigate();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handlePlay = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      navigate({ to: `/watch/${item.id}` });
    },
    [item.id, navigate],
  );

  const handleRemove = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onRemove?.(item.id);
    },
    [item.id, onRemove],
  );

  const remainingText = item.remainingMinutes
    ? item.remainingMinutes < 60
      ? `${item.remainingMinutes}m remaining`
      : `${Math.floor(item.remainingMinutes / 60)}h ${item.remainingMinutes % 60}m remaining`
    : null;

  return (
    <div
      className="
        content-card group relative shrink-0
        w-64 sm:w-72 lg:w-80 xl:w-88
      "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={handlePlay}
        className="block w-full text-left"
        aria-label={`Continue watching ${item.title}${item.episodeTitle ? ` — ${item.episodeTitle}` : ""}`}
      >
        {/* ── Thumbnail ── */}
        <div className="relative w-full aspect-backdrop overflow-hidden rounded-md">
          {!imageLoaded && <div className="absolute inset-0 skeleton" />}

          <img
            src={item.backdropUrl}
            alt=""
            loading={index < 4 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-opacity duration-normal ease-standard
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* ── Hover Overlay ── */}
          <div
            className={`
              absolute inset-0 bg-black/40
              flex items-center justify-center
              transition-opacity duration-fast ease-standard
              ${isHovered ? "opacity-100" : "opacity-0"}
            `}
          >
            <div
              className="
                w-12 h-12 rounded-full bg-foreground/90 text-background
                flex items-center justify-center
                shadow-elevation-2
              "
            >
              <Play className="w-6 h-6 fill-current ml-0.5" />
            </div>
          </div>

          {/* ── Remove Button ── */}
          {isHovered && onRemove && (
            <button
              onClick={handleRemove}
              className="
                absolute top-2 right-2 z-10
                w-7 h-7 rounded-full bg-background/80
                flex items-center justify-center
                text-foreground-secondary hover:text-foreground
                transition-colors duration-fast ease-standard
              "
              aria-label={`Remove ${item.title} from Continue Watching`}
            >
              <X className="w-4 h-4" />
            </button>
          )}

          {/* ── Progress Bar ── */}
          <div className="absolute inset-x-0 bottom-0">
            <div className="progress-bar-track rounded-none h-0.75">
              <div
                className="progress-bar-fill rounded-none"
                style={{ width: `${item.progressPercent}%` }}
              />
            </div>
          </div>
        </div>

        {/* ── Info Below ── */}
        <div className="mt-2 px-0.5">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="text-body-sm text-foreground font-medium line-clamp-1">
                {item.title}
              </p>
              {item.episodeTitle && (
                <p className="text-caption text-foreground-muted line-clamp-1 mt-0.5">
                  {item.episodeTitle}
                </p>
              )}
            </div>

            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                navigate({ to: item.href });
              }}
              className="
                shrink-0 mt-0.5
                text-foreground-muted hover:text-foreground
                transition-colors duration-fast ease-standard
              "
              aria-label={`Info about ${item.title}`}
            >
              <Info className="w-4 h-4" />
            </button>
          </div>

          {remainingText && (
            <p className="text-caption text-foreground-faint mt-0.5">
              {remainingText}
            </p>
          )}
        </div>
      </button>
    </div>
  );
});
