export interface ContentCardItem {
  id: string;
  title: string;
  slug: string;
  contentType: "movie" | "tv" | "documentary" | "kids" | "special";
  posterUrl: string; // 2:3 portrait
  backdropUrl: string; // 16:9 landscape
  logoUrl?: string;
  trailerPreviewUrl?: string; // short auto-play preview
  genres: string[];
  releaseYear: number;
  maturityRating?: string;
  matchScore?: number;
  runtimeMinutes?: number;
  seasonCount?: number;
  episodeCount?: number;
  isOriginal?: boolean;
  isNew?: boolean;
  href: string;
}

export interface ContinueWatchingItem extends ContentCardItem {
  progressPercent: number; // 0–100
  lastWatchedAt: string; // ISO date
  episodeTitle?: string; // "S2:E5 — The Reckoning"
  remainingMinutes?: number;
}

export interface TopTenItem extends ContentCardItem {
  rank: number; // 1–10
}

export type RowVariant =
  | "poster" // standard 2:3 cards
  | "backdrop" // 16:9 landscape cards
  | "continue-watching" // landscape + progress bar
  | "top-ten"; // big rank number + poster

export interface ContentRowProps {
  title: string;
  subtitle?: string;
  seeAllHref?: string;
  items: ContentCardItem[];
  variant?: RowVariant;
  className?: string;
}

export interface ContentCardProps {
  item: ContentCardItem;
  variant: RowVariant;
  index: number;
  isFirstVisible?: boolean;
  isLastVisible?: boolean;
}

export interface ContinueWatchingCardProps {
  item: ContinueWatchingItem;
  index: number;
}

export interface TopTenCardProps {
  item: TopTenItem;
  index: number;
}

export interface RowNavigationProps {
  canScrollLeft: boolean;
  canScrollRight: boolean;
  onScrollLeft: () => void;
  onScrollRight: () => void;
}
