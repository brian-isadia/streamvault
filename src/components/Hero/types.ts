export interface HeroItem {
  id: string;
  title: string;
  logoUrl?: string; // transparent PNG title treatment
  synopsis: string;
  backdropUrl: string;
  trailerUrl?: string; // mp4/webm for background video
  contentType: "movie" | "series" | "documentary" | "special";
  genres: string[];
  releaseYear: number;
  maturityRating: string; // "PG-13", "TV-MA", etc.
  matchScore?: number; // 0–100
  runtimeMinutes?: number; // movies
  seasonCount?: number; // series
  episodeCount?: number; // series
  isOriginal?: boolean;
  isNew?: boolean;
  isTopTen?: boolean;
  topTenRank?: number;
  href: string; // link to detail page
}

export interface HeroBannerProps {
  items: HeroItem[];
  autoRotateInterval?: number; // ms, default 8000
  className?: string;
}

export interface HeroSlideProps {
  item: HeroItem;
  isActive: boolean;
  isPrevious: boolean;
  isMuted: boolean;
  showVideo: boolean;
  onToggleMute: () => void;
  onPlay: () => void;
  onMoreInfo: () => void;
  priority?: boolean; // image loading priority
}

export interface HeroContentProps {
  item: HeroItem;
  isActive: boolean;
  onPlay: () => void;
  onMoreInfo: () => void;
}

export interface HeroBillboardProps {
  item: HeroItem;
  isActive: boolean;
  isMuted: boolean;
  showVideo: boolean;
  onVideoEnded: () => void;
  onVideoCanPlay: () => void;
  priority?: boolean;
}

export interface HeroControlsProps {
  total: number;
  current: number;
  onSelect: (index: number) => void;
  onPrevious: () => void;
  onNext: () => void;
  isPaused: boolean;
  onTogglePause: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  autoRotateInterval: number;
}
