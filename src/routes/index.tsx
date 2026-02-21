import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner, type HeroItem } from "@/components/Hero";
import { createServerFn } from "@tanstack/react-start";
import { fetchHeroFilms } from "@/lib/tmdb";

const fetchFilms = createServerFn({
  method: "GET",
}).handler(() => {
  return fetchHeroFilms();
});

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => await fetchFilms(),
});

function App() {
  const heroFilms = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background">
      <HeroBanner items={heroFilms} autoRotateInterval={8000} />
    </div>
  );
}
