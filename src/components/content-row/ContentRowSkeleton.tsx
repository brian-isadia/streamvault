import type { RowVariant } from "./types";

interface Props {
  variant?: RowVariant;
  cardCount?: number;
}

export function ContentRowSkeleton({
  variant = "poster",
  cardCount = 7,
}: Props) {
  const isPoster = variant === "poster";
  const isTopTen = variant === "top-ten";

  return (
    <div className="py-4" aria-busy="true" aria-label="Loading content row">
      {/* Title skeleton */}
      <div className="px-(--row-padding-x) mb-3">
        <div className="skeleton h-6 w-48 rounded-sm" />
      </div>

      {/* Cards skeleton */}
      <div className="flex gap-(--row-gap) px-(--row-padding-x) overflow-hidden">
        {Array.from({ length: cardCount }).map((_, i) => (
          <div
            key={i}
            className={`
              shrink-0
              ${isPoster ? "w-(--row-card-width-sm) sm:w-(--row-card-width-md) lg:w-(--row-card-width-lg)" : ""}
              ${!isPoster && !isTopTen ? "w-64 sm:w-72 lg:w-80" : ""}
              ${isTopTen ? "w-48 sm:w-56 lg:w-64" : ""}
            `}
          >
            <div
              className={`
                skeleton w-full rounded-md
                ${isPoster ? "aspect-poster" : ""}
                ${!isPoster && !isTopTen ? "aspect-backdrop" : ""}
                ${isTopTen ? "h-44 sm:h-52 lg:h-60" : ""}
              `}
            />
            {isPoster && (
              <div className="mt-1.5 px-0.5">
                <div className="skeleton h-4 w-[80%] rounded-sm" />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
