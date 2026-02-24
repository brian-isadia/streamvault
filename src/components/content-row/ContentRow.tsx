import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { ContentCard } from "./ContentCard";
import { ContinueWatchingCard } from "./ContinueWatchingCard";
import { TopTenCard } from "./TopTenCard";
import { RowNavigation } from "./RowNavigation";
import { ContentRowSkeleton } from "./ContentRowSkeleton";
import { useRowScroll } from "./useRowScroll";
import type {
  ContentRowProps,
  ContinueWatchingItem,
  TopTenItem,
} from "./types";

export function ContentRow({
  title,
  subtitle,
  seeAllHref,
  items,
  variant = "poster",
  className = "",
}: ContentRowProps) {
  const {
    scrollRef,
    canScrollLeft,
    canScrollRight,
    scrollLeft,
    scrollRight,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleMouseLeave,
    isDragging,
  } = useRowScroll();

  if (!items || items.length === 0) return null;

  return (
    <section
      className={`relative py-4 group/row ${className}`}
      aria-label={title}
    >
      {/* ── Row Header ── */}
      <div className="row-header">
        <div className="flex items-baseline gap-2">
          <h2 className="row-title">{title}</h2>

          {subtitle && (
            <span className="text-caption text-foreground-muted hidden sm:inline">
              {subtitle}
            </span>
          )}

          {seeAllHref && (
            <Link
              to={seeAllHref}
              className="
                row-see-all
                flex items-center gap-0.5
                opacity-0 group-hover/row:opacity-100
                transition-opacity duration-normal ease-standard
              "
            >
              <span>Explore All</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>
      </div>

      {/* ── Scrollable Row ── */}
      <div className="relative">
        {/* Navigation Arrows */}
        <RowNavigation
          canScrollLeft={canScrollLeft}
          canScrollRight={canScrollRight}
          onScrollLeft={scrollLeft}
          onScrollRight={scrollRight}
        />

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className={`
            content-row
            ${isDragging ? "drag-scroll cursor-grabbing" : "drag-scroll"}
          `}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          role="list"
        >
          {items.map((item, index) => {
            const key = item.id;

            if (variant === "continue-watching") {
              return (
                <div key={key} role="listitem">
                  <ContinueWatchingCard
                    item={item as ContinueWatchingItem}
                    index={index}
                  />
                </div>
              );
            }

            if (variant === "top-ten") {
              return (
                <div key={key} role="listitem">
                  <TopTenCard item={item as TopTenItem} index={index} />
                </div>
              );
            }

            return (
              <div key={key} role="listitem">
                <ContentCard item={item} variant={variant} index={index} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
