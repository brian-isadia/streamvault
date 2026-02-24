import { memo, useState } from "react";
import { Link } from "@tanstack/react-router";
import type { TopTenItem } from "./types";

interface Props {
  item: TopTenItem;
  index: number;
}

export const TopTenCard = memo(function TopTenCard({ item, index }: Props) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <Link
      to={item.href}
      className="
        content-card group relative shrink-0
        flex items-end
        w-48 sm:w-56 lg:w-64
        h-44 sm:h-52 lg:h-60
      "
      aria-label={`#${item.rank} — ${item.title}`}
      draggable={false}
    >
      {/* ── Rank Number (left side) ── */}
      <div className="relative shrink-0 w-[45%] h-full flex items-end justify-center">
        <span
          className="
            font-extrabold leading-none text-foreground/10
            text-[8rem] sm:text-[10rem] lg:text-[12rem]
            select-none
          "
          style={{
            WebkitTextStroke: "2px rgba(255,255,255,0.2)",
            paintOrder: "stroke fill",
          }}
          aria-hidden="true"
        >
          {item.rank}
        </span>
      </div>

      {/* ── Poster (right side) ── */}
      <div className="relative shrink-0 w-[60%] h-full -ml-[5%]">
        <div className="relative w-full h-full overflow-hidden rounded-md">
          {!imageLoaded && <div className="absolute inset-0 skeleton" />}

          <img
            src={item.posterUrl}
            alt={item.title}
            loading={index < 5 ? "eager" : "lazy"}
            decoding="async"
            draggable={false}
            onLoad={() => setImageLoaded(true)}
            className={`
              w-full h-full object-cover
              transition-opacity duration-normal ease-standard
              ${imageLoaded ? "opacity-100" : "opacity-0"}
            `}
          />

          {/* ── Badges ── */}
          {item.isNew && (
            <span className="absolute top-2 left-2 badge badge-new text-[10px]">
              New
            </span>
          )}
        </div>
      </div>
    </Link>
  );
});
