import { genres } from "@/data/genres";
import type { ContentCardItem } from "@/components/content-row";

export const convertMinutes = (runtimeInMinutes: number) => {
  const hours = Math.floor(runtimeInMinutes / 60);
  const minutes = runtimeInMinutes % 60;

  let runtime: string = "";

  if (hours === 1) {
    runtime = `${hours}hr ${minutes}mins`;
  } else if (hours > 1) {
    runtime = `${hours}hrs ${minutes}mins`;
  } else {
    runtime = `${minutes} mins`;
  }

  return runtime;
};

export const convertYear = (tmdbDate: string) => {
  let year: number = 0;

  if (typeof tmdbDate === "string") {
    year = parseInt(tmdbDate.split("-")[0]);
  }

  return year;
};

// Map for genre ID to name lookup
export const genreMap = new Map<number, string>();
genres.forEach((genre: any) => {
  genreMap.set(genre.id, genre.name);
});

export const makeMockCards = (
  count: number,
  prefix: string,
): ContentCardItem[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `${prefix}-${i + 1}`,
    title: `${prefix} Title ${i + 1}`,
    slug: `${prefix}-title-${i + 1}`,
    contentType: i % 3 === 0 ? ("tv" as const) : ("movie" as const),
    posterUrl: `/images/mock/poster-${(i % 10) + 1}.jpg`,
    backdropUrl: `/images/mock/backdrop-${(i % 10) + 1}.jpg`,
    genres: ["Action", "Drama", "Thriller"].slice(0, (i % 3) + 1),
    releaseYear: 2024 + (i % 2),
    maturityRating: i % 2 === 0 ? "PG-13" : "TV-MA",
    matchScore: 70 + Math.floor(Math.random() * 25),
    runtimeMinutes: i % 3 === 0 ? undefined : 90 + i * 5,
    seasonCount: i % 3 === 0 ? 1 + (i % 4) : undefined,
    episodeCount: i % 3 === 0 ? 8 + i : undefined,
    isOriginal: i % 5 === 0,
    isNew: i % 4 === 0,
    href: `/${i % 3 === 0 ? "tv" : "movie"}/${prefix}-title-${i + 1}`,
  }));
};

export const normalizeRating = (rating?: string) => {
  if (!rating) return "";

  return rating
    .replace("_", "-")
    .replace("PG13", "PG-13")
    .replace("TVMA", "TV-MA")
    .replace("TV14", "TV-14")
    .replace("TVPG", "TV-PG")
    .replace("TVG", "TV-G")
    .trim();
};

export const findCountryRating = (
  results: any[],
  preferredCountries = ["US", "GB"],
) => {
  for (const country of preferredCountries) {
    const match = results.find((r) => r.iso_3166_1 === country && r.rating);
    if (match) return match.rating;
  }

  return results.find((r) => r.rating)?.rating || "";
};
