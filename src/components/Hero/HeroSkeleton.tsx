export function HeroSkeleton() {
  return (
    <div
      className="
        relative w-full
        min-h-[56.25vw] max-h-[80vh]
        bg-background overflow-hidden
      "
      aria-busy="true"
      aria-label="Loading featured content"
    >
      {/* ── Background skeleton ── */}
      <div className="absolute inset-0 skeleton" />

      {/* ── Bottom gradient ── */}
      <div
        className="
          absolute inset-x-0 bottom-0 h-[70%]
          bg-linear-to-t from-background via-background/60 to-transparent
        "
      />

      {/* ── Content skeleton ── */}
      <div
        className="
          absolute bottom-[10%] left-0
          px-(--row-padding-x)
          flex flex-col gap-4
          max-w-2xl w-full
        "
      >
        {/* Badges */}
        <div className="flex gap-2">
          <div className="skeleton h-5 w-40 rounded-sm" />
          <div className="skeleton h-5 w-16 rounded-sm" />
        </div>

        {/* Title */}
        <div className="flex flex-col gap-2">
          <div className="skeleton h-12 w-[80%] rounded-md" />
          <div className="skeleton h-12 w-[50%] rounded-md" />
        </div>

        {/* Meta */}
        <div className="flex gap-3">
          <div className="skeleton h-4 w-20 rounded-sm" />
          <div className="skeleton h-4 w-12 rounded-sm" />
          <div className="skeleton h-4 w-24 rounded-sm" />
        </div>

        {/* Synopsis */}
        <div className="flex flex-col gap-2">
          <div className="skeleton h-4 w-full rounded-sm" />
          <div className="skeleton h-4 w-[90%] rounded-sm" />
          <div className="skeleton h-4 w-[60%] rounded-sm" />
        </div>

        {/* Buttons */}
        <div className="flex gap-3 mt-2">
          <div className="skeleton h-11 w-32 rounded-md" />
          <div className="skeleton h-11 w-36 rounded-md" />
        </div>
      </div>

      {/* ── Pagination dots skeleton ── */}
      <div className="absolute bottom-6 left-(--row-padding-x) flex gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className={`skeleton h-0.5 rounded-pill ${i === 0 ? "w-8" : "w-4"}`}
          />
        ))}
      </div>
    </div>
  );
}
