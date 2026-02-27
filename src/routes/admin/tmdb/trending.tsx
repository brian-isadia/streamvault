import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/tmdb/trending")({
  component: TmdbTrending,
});

function TmdbTrending() {
  return (
    <div className="space-y-8">
      <div>
        <h2>Trending</h2>
      </div>
    </div>
  );
}
