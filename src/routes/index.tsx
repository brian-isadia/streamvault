import { createFileRoute, Await } from "@tanstack/react-router";
import { Suspense } from "react";
import { HeroBanner } from "@/components/Hero";
import { createServerFn } from "@tanstack/react-start";
import { fetchHeroFilms } from "@/lib/tmdb";
import { MOCK_DATA } from "@/data/mockData";
import { ContentRow, ContentRowSkeleton } from "@/components/content-row";
import type { HeroItem } from "@/components/Hero";
import type { ContentCardItem } from "@/components/content-row/types";

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

interface LoaderData {
  heroFilms: HeroItem[];
  continueWatching: Promise<ContentCardItem[]>;
  topPicks: Promise<ContentCardItem[]>;
  trending: Promise<ContentCardItem[]>;
  newReleases: Promise<ContentCardItem[]>;
  topTen: Promise<ContentCardItem[]>;
  myList: Promise<ContentCardItem[]>;
  actionMovies: Promise<ContentCardItem[]>;
  sciFi: Promise<ContentCardItem[]>;
  documentaries: Promise<ContentCardItem[]>;
}

export const Route = createFileRoute("/")({
  component: App,
  loader: async (): Promise<LoaderData> => {
    const heroFilms = await fetchFilms();
    return {
      heroFilms,
      continueWatching: Promise.resolve(MOCK_CONTINUE_WATCHING),
      topPicks: Promise.resolve(MOCK_TOP_PICKS),
      trending: Promise.resolve(MOCK_TRENDING),
      newReleases: Promise.resolve(MOCK_NEW_RELEASES),
      topTen: Promise.resolve(MOCK_TOP_TEN),
      myList: Promise.resolve(MOCK_MY_LIST),
      actionMovies: Promise.resolve(MOCK_ACTION),
      sciFi: Promise.resolve(MOCK_SCI_FI),
      documentaries: Promise.resolve(MOCK_DOCUMENTARIES),
    };
  },
  pendingComponent: HomePageSkeleton,
});

function App() {
  const { heroFilms, continueWatching, topPicks, trending, newReleases, topTen, myList, actionMovies, sciFi, documentaries } = Route.useLoaderData() as LoaderData;

  return (
    <main className="min-h-screen bg-background pb-16">
      <HeroBanner items={heroFilms} autoRotateInterval={8000} />

      {/* ─── Content Rows ─── */}
      {/* Pull rows up to overlap the hero bottom */}
      <div className="relative z-10 -mt-6 space-y-2">
        {/* 1. Continue Watching */}
        <Suspense fallback={<ContentRowSkeleton variant="continue-watching" cardCount={5} />}>
          <Await promise={continueWatching}>
            {(items) => items.length > 0 && (
              <ContentRow
                title="Continue Watching"
                items={items}
                variant="continue-watching"
              />
            )}
          </Await>
        </Suspense>

        {/* 2. Top Picks For You */}
        <Suspense fallback={<ContentRowSkeleton variant="poster" cardCount={5} />}>
          <Await promise={topPicks}>
            {(items) => (
              <ContentRow
                title="Top Picks for You"
                subtitle="Based on your viewing history"
                items={items}
                variant="poster"
                seeAllHref="/browse/recommended"
              />
            )}
          </Await>
        </Suspense>

        {/* 3. Trending Now */}
        <Suspense fallback={<ContentRowSkeleton variant="backdrop" cardCount={5} />}>
          <Await promise={trending}>
            {(items) => (
              <ContentRow
                title="Trending Now"
                items={items}
                variant="backdrop"
                seeAllHref="/browse/trending"
              />
            )}
          </Await>
        </Suspense>

        {/* 4. New Releases */}
        <Suspense fallback={<ContentRowSkeleton variant="poster" cardCount={5} />}>
          <Await promise={newReleases}>
            {(items) => (
              <ContentRow
                title="New on StreamVault"
                items={items}
                variant="poster"
                seeAllHref="/browse/new"
              />
            )}
          </Await>
        </Suspense>

        {/* 5. Top 10 */}
        <Suspense fallback={<ContentRowSkeleton variant="top-ten" cardCount={5} />}>
          <Await promise={topTen}>
            {(items) => (
              <ContentRow
                title="Top 10 in the U.S. Today"
                items={items}
                variant="top-ten"
              />
            )}
          </Await>
        </Suspense>

        {/* 6. My List */}
        <Suspense fallback={<ContentRowSkeleton variant="poster" cardCount={5} />}>
          <Await promise={myList}>
            {(items) => items.length > 0 && (
              <ContentRow
                title="My List"
                items={items}
                variant="poster"
                seeAllHref="/my-list"
              />
            )}
          </Await>
        </Suspense>

        {/* 7+ Genre Rows */}
        <Suspense fallback={<ContentRowSkeleton variant="poster" cardCount={5} />}>
          <Await promise={actionMovies}>
            {(items) => (
              <ContentRow
                title="Action & Adventure"
                items={items}
                variant="poster"
                seeAllHref="/browse/genre/action"
              />
            )}
          </Await>
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton variant="backdrop" cardCount={5} />}>
          <Await promise={sciFi}>
            {(items) => (
              <ContentRow
                title="Sci-Fi & Fantasy"
                items={items}
                variant="backdrop"
                seeAllHref="/browse/genre/sci-fi"
              />
            )}
          </Await>
        </Suspense>

        <Suspense fallback={<ContentRowSkeleton variant="poster" cardCount={5} />}>
          <Await promise={documentaries}>
            {(items) => (
              <ContentRow
                title="Documentaries"
                items={items}
                variant="poster"
                seeAllHref="/browse/genre/documentary"
              />
            )}
          </Await>
        </Suspense>
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
