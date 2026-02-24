import { memo } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { RowNavigationProps } from "./types";

export const RowNavigation = memo(function RowNavigation({
  canScrollLeft,
  canScrollRight,
  onScrollLeft,
  onScrollRight,
}: RowNavigationProps) {
  return (
    <>
      {/* ── Left Arrow ── */}
      <div
        className={`
          absolute left-0 top-0 bottom-0 z-10
          flex items-center
          transition-opacity duration-normal ease-standard
          ${canScrollLeft ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <button
          onClick={onScrollLeft}
          aria-label="Scroll left"
          tabIndex={canScrollLeft ? 0 : -1}
          className="
            h-full w-10 sm:w-12 lg:w-14
            flex items-center justify-center
            bg-linear-to-r from-background/80 to-transparent
            text-foreground/70 hover:text-foreground
            transition-colors duration-fast ease-standard
            group
          "
        >
          <ChevronLeft
            className="
              w-6 h-6 sm:w-8 sm:h-8
              transition-transform duration-fast ease-standard
              group-hover:scale-125
            "
          />
        </button>
      </div>

      {/* ── Right Arrow ── */}
      <div
        className={`
          absolute right-0 top-0 bottom-0 z-10
          flex items-center
          transition-opacity duration-normal ease-standard
          ${canScrollRight ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <button
          onClick={onScrollRight}
          aria-label="Scroll right"
          tabIndex={canScrollRight ? 0 : -1}
          className="
            h-full w-10 sm:w-12 lg:w-14
            flex items-center justify-center
            bg-linear-to-l from-background/80 to-transparent
            text-foreground/70 hover:text-foreground
            transition-colors duration-fast ease-standard
            group
          "
        >
          <ChevronRight
            className="
              w-6 h-6 sm:w-8 sm:h-8
              transition-transform duration-fast ease-standard
              group-hover:scale-125
            "
          />
        </button>
      </div>
    </>
  );
});
