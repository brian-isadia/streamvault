import { createFileRoute } from "@tanstack/react-router";
import { HeroBanner, type HeroItem } from "@/components/Hero";

export const Route = createFileRoute("/")({ component: App });

const heroItems: HeroItem[] = [
  {
    id: "clx1a2b3c4d5",
    title: "The Last Frontier",
    logoUrl: "/images/titles/the-last-frontier-logo.png",
    synopsis:
      "In a world where humanity's last outpost teeters on the edge of extinction, one reluctant hero must journey across a ravaged landscape to ignite a beacon of hope — before time runs out.",
    backdropUrl: "/images/titles/the-last-frontier-backdrop.jpg",
    trailerUrl: "/videos/the-last-frontier-trailer.mp4",
    contentType: "movie",
    genres: ["Sci-Fi", "Thriller", "Adventure"],
    releaseYear: 2025,
    maturityRating: "PG-13",
    matchScore: 97,
    runtimeMinutes: 142,
    isOriginal: true,
    isNew: true,
    href: "/movie/the-last-frontier",
  },

  {
    id: "clx3i9j0k1l2",
    title: "Ocean Beneath",
    synopsis:
      "Dive into the planet's last unexplored wilderness. From bioluminescent abyss to coral kingdoms, witness nature's most extraordinary spectacle unfold in breathtaking detail.",
    backdropUrl: "/images/titles/ocean-beneath-backdrop.jpg",
    contentType: "documentary",
    genres: ["Documentary", "Nature", "Science"],
    releaseYear: 2025,
    maturityRating: "PG",
    matchScore: 88,
    seasonCount: 1,
    episodeCount: 8,
    isNew: true,
    href: "/series/ocean-beneath",
  },
  {
    id: "clx4m3n4o5p6",
    title: "Neon Ronin",
    synopsis:
      "In Neo-Tokyo 2087, a disgraced samurai turned cyber-mercenary takes on one last job that could either clear her name or plunge the city into chaos.",
    backdropUrl: "/images/titles/neon-ronin-backdrop.jpg",
    trailerUrl: "/videos/neon-ronin-trailer.mp4",
    contentType: "movie",
    genres: ["Action", "Sci-Fi", "Anime"],
    releaseYear: 2025,
    maturityRating: "R",
    matchScore: 91,
    runtimeMinutes: 118,
    isOriginal: true,
    isTopTen: true,
    topTenRank: 3,
    href: "/movie/neon-ronin",
  },
  {
    id: "clx5q7r8s9t0",
    title: "The Weight of Silence",
    synopsis:
      "When a small-town teacher vanishes without a trace, the lives of five strangers become entangled in a web of secrets that will change them forever.",
    backdropUrl: "/images/titles/weight-of-silence-backdrop.jpg",
    contentType: "series",
    genres: ["Drama", "Thriller", "Mystery"],
    releaseYear: 2024,
    maturityRating: "TV-14",
    matchScore: 85,
    seasonCount: 3,
    episodeCount: 24,
    href: "/series/the-weight-of-silence",
  },
];

function App() {
  return (
    <div className="min-h-screen bg-background">
      <HeroBanner items={heroItems} autoRotateInterval={8000} />
    </div>
  );
}
