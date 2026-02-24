import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner, type HeroItem } from "@/components/Hero";
import { createServerFn } from "@tanstack/react-start";
import { fetchHeroFilms } from "@/lib/tmdb";
import { MOCK_DATA } from "@/data/mockData";
import { ContentRow, ContentRowSkeleton } from "@/components/content-row";

const fetchFilms = createServerFn({
  method: "GET",
}).handler(() => {
  return fetchHeroFilms();
});

const {
  MOCK_CONTINUE_WATCHING,
  MOCK_TOP_PICKS,
  MOCK_TRENDING,
  MOCK_NEW_RELEASES,
  MOCK_TOP_TEN,
  MOCK_MY_LIST,
  MOCK_ACTION,
  MOCK_SCI_FI,
  MOCK_DOCUMENTARIES,
} = MOCK_DATA;

export const Route = createFileRoute("/")({
  component: App,
  loader: async () => {
    const heroFilms: HeroItem[] = await fetchFilms();
    //   const continueWatching = await fetchContinueWatching();
    //   const trending = await fetchTrending();
    return {
      heroFilms,
      continueWatching: MOCK_CONTINUE_WATCHING,
      topPicks: MOCK_TOP_PICKS,
      trending: MOCK_TRENDING,
      newReleases: MOCK_NEW_RELEASES,
      topTen: MOCK_TOP_TEN,
      myList: MOCK_MY_LIST,
      actionMovies: MOCK_ACTION,
      sciFi: MOCK_SCI_FI,
      documentaries: MOCK_DOCUMENTARIES,
    };
  },
  pendingComponent: HomePageSkeleton,
});

function App() {
  const {
    heroFilms,
    continueWatching,
    topPicks,
    trending,
    newReleases,
    topTen,
    myList,
    actionMovies,
    sciFi,
    documentaries,
  } = Route.useLoaderData();

  return (
    <main className="min-h-screen bg-background pb-16">
      <HeroBanner items={heroFilms} autoRotateInterval={8000} />

      {/* ─── Content Rows ─── */}
      {/* Pull rows up to overlap the hero bottom */}
      <div className="relative z-10 -mt-6 space-y-2">
        {/* 1. Continue Watching */}
        {continueWatching.length > 0 && (
          <ContentRow
            title="Continue Watching"
            items={continueWatching}
            variant="continue-watching"
          />
        )}

        {/* 2. Top Picks For You */}
        <ContentRow
          title="Top Picks for You"
          subtitle="Based on your viewing history"
          items={topPicks}
          variant="poster"
          seeAllHref="/browse/recommended"
        />

        {/* 3. Trending Now */}
        <ContentRow
          title="Trending Now"
          items={trending}
          variant="backdrop"
          seeAllHref="/browse/trending"
        />

        {/* 4. New Releases */}
        <ContentRow
          title="New on StreamVault"
          items={newReleases}
          variant="poster"
          seeAllHref="/browse/new"
        />

        {/* 5. Top 10 */}
        <ContentRow
          title="Top 10 in the U.S. Today"
          items={topTen}
          variant="top-ten"
        />

        {/* 6. My List */}
        {myList.length > 0 && (
          <ContentRow
            title="My List"
            items={myList}
            variant="poster"
            seeAllHref="/my-list"
          />
        )}

        {/* 7+ Genre Rows */}
        <ContentRow
          title="Action & Adventure"
          items={actionMovies}
          variant="poster"
          seeAllHref="/browse/genre/action"
        />

        <ContentRow
          title="Sci-Fi & Fantasy"
          items={sciFi}
          variant="backdrop"
          seeAllHref="/browse/genre/sci-fi"
        />

        <ContentRow
          title="Documentaries"
          items={documentaries}
          variant="poster"
          seeAllHref="/browse/genre/documentary"
        />
      </div>
    </main>
  );
}

// ------------- Loading State -----

function HomePageSkeleton() {
  return (
    <main className="min-h-screen bg-background pb-16">
      {/* Hero Skeleton — reuse from hero component */}
      <div className="relative w-full min-h-[85vh] md:min-h-[56.25vw] max-h-[85vh] md:max-h-[80vh] skeleton" />

      <div className="relative z-10 -mt-6 space-y-2">
        <ContentRowSkeleton variant="backdrop" cardCount={5} />
        <ContentRowSkeleton variant="poster" />
        <ContentRowSkeleton variant="backdrop" cardCount={5} />
        <ContentRowSkeleton variant="poster" />
        <ContentRowSkeleton variant="top-ten" cardCount={5} />
        <ContentRowSkeleton variant="poster" />
      </div>
    </main>
  );
}
