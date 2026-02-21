import { memo, useMemo } from "react";
//import { Link } from "@tanstack/react-router";
import { Play, Info, Film, Tv } from "lucide-react";
import type { HeroContentProps } from "./types";

export const HeroContent = memo(function HeroContent({
  item,
  isActive,
  onPlay,
  onMoreInfo,
}: HeroContentProps) {
  // ── Metadata line ───────────────────────────────
  const metaItems = useMemo(() => {
    const parts: string[] = [];

    if (item.releaseYear) parts.push(String(item.releaseYear));

    if (item.contentType === "movie" && item.runtimeMinutes) {
      const hours = Math.floor(item.runtimeMinutes / 60);
      const mins = item.runtimeMinutes % 60;
      parts.push(hours > 0 ? `${hours}h ${mins}m` : `${mins}m`);
    }

    if (item.contentType === "series" && item.seasonCount) {
      parts.push(
        item.seasonCount === 1
          ? `${item.episodeCount} Episodes`
          : `${item.seasonCount} Seasons`,
      );
    }

    return parts;
  }, [item]);

  const contentTypeLabel =
    item.contentType === "series"
      ? "Series"
      : item.contentType === "documentary"
        ? "Documentary"
        : item.contentType === "special"
          ? "Special"
          : "Film";

  const ContentTypeIcon =
    item.contentType === "series" || item.contentType === "documentary"
      ? Tv
      : Film;

  return (
    <div
      className={`
        relative z-10 flex flex-col justify-end
        h-full px-(--row-padding-x) pb-[12%] sm:pb-[10%] lg:pb-[8%]
        max-w-3xl
        transition-all duration-700 ease-enter
        ${isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
    >
      {/* ── Badges Row ── */}
      <div className="flex flex-wrap items-center gap-2 mb-3">
        {item.isOriginal && (
          <span className="badge badge-original">
            <svg
              viewBox="0 0 24 24"
              className="w-3.5 h-3.5 fill-current"
              aria-hidden="true"
            >
              <path d="M12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2Z" />
            </svg>
            StreamVault Original
          </span>
        )}

        {item.isNew && <span className="badge badge-new">New</span>}

        {item.isTopTen && item.topTenRank && (
          <span className="badge badge-top10">
            #{item.topTenRank} in Top 10
          </span>
        )}
      </div>

      {/* ── Title ── */}
      {item.logoUrl ? (
        <div className="mb-4 max-w-[min(28rem,80vw)]">
          <img
            src={item.logoUrl}
            alt={item.title}
            className="
              w-full h-auto max-h-32 sm:max-h-40 lg:max-h-48
              object-contain object-left
              drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]
            "
            loading="lazy"
          />
        </div>
      ) : (
        <h2
          className="
            text-h2 sm:text-h1 lg:text-display-sm xl:text-display
            font-extrabold tracking-tighter text-balance
            mb-3 max-w-2xl
            drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]
          "
        >
          {item.title}
        </h2>
      )}

      {/* ── Meta Row ── */}
      <div
        className="
          flex flex-wrap items-center gap-x-3 gap-y-1.5 mb-3
          text-body-sm sm:text-body text-foreground-secondary
        "
      >
        {/* Match Score */}
        {item.matchScore && item.matchScore > 0 && (
          <span
            className={`
              font-bold
              ${
                item.matchScore >= 75
                  ? "match-score-high"
                  : item.matchScore >= 50
                    ? "match-score-medium"
                    : "match-score-low"
              }
            `}
          >
            {item.matchScore}% Match
          </span>
        )}

        {/* Maturity Rating */}
        <span
          className="
            px-1.5 py-0.5 border border-foreground-muted/50
            text-caption font-medium tracking-wide
          "
        >
          {item.maturityRating}
        </span>

        {/* Meta items (year, runtime, seasons) */}
        {metaItems.map((meta, i) => (
          <span key={i} className="flex items-center gap-1">
            {i === 0 && metaItems.length > 1 && (
              <span className="text-foreground-faint" aria-hidden="true">
                •
              </span>
            )}
            {meta}
          </span>
        ))}

        {/* Content type */}
        <span className="flex items-center gap-1 text-foreground-muted">
          <ContentTypeIcon className="w-3.5 h-3.5" aria-hidden="true" />
          {contentTypeLabel}
        </span>
      </div>

      {/* ── Genres ── */}
      {item.genres.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 mb-4">
          {item.genres.slice(0, 4).map((genre, i) => (
            <span key={genre} className="flex items-center gap-1.5">
              {i > 0 && (
                <span
                  className="w-1 h-1 rounded-full bg-foreground-muted"
                  aria-hidden="true"
                />
              )}
              <span className="text-body-sm text-foreground-secondary">
                {genre}
              </span>
            </span>
          ))}
        </div>
      )}

      {/* ── Synopsis ── */}
      <p
        className="
          text-body-sm sm:text-body text-foreground-secondary
          line-clamp-2 sm:line-clamp-3 max-w-xl
          mb-6
          drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]
        "
      >
        {item.synopsis}
      </p>

      {/* ── Action Buttons ── */}
      <div className="flex flex-wrap items-center gap-3">
        <button
          onClick={onPlay}
          className="btn btn-play group"
          aria-label={`Play ${item.title}`}
        >
          <Play
            className="
              w-5 h-5 sm:w-6 sm:h-6 fill-current
              transition-transform duration-fast ease-standard
              group-hover:scale-110
            "
            aria-hidden="true"
          />
          <span>Play</span>
        </button>

        <button
          onClick={onMoreInfo}
          className="btn btn-secondary group"
          aria-label={`More info about ${item.title}`}
        >
          <Info
            className="
              w-5 h-5 sm:w-6 sm:h-6
              transition-transform duration-fast ease-standard
              group-hover:scale-110
            "
            aria-hidden="true"
          />
          <span className="hidden sm:inline">More Info</span>
          <span className="sm:hidden">Info</span>
        </button>
      </div>
    </div>
  );
});
