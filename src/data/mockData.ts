import { makeMockCards } from "@/lib/utils";
import type {
  ContinueWatchingItem,
  TopTenItem,
} from "@/components/content-row";

const MOCK_CONTINUE_WATCHING: ContinueWatchingItem[] = [
  {
    ...makeMockCards(1, "cw")[0],
    progressPercent: 65,
    lastWatchedAt: new Date().toISOString(),
    episodeTitle: "S2:E5 — The Reckoning",
    remainingMinutes: 22,
  },
  {
    ...makeMockCards(1, "cw2")[0],
    id: "cw-2",
    title: "Ocean Beneath",
    progressPercent: 30,
    lastWatchedAt: new Date().toISOString(),
    episodeTitle: "S1:E3 — The Abyss",
    remainingMinutes: 38,
  },
  {
    ...makeMockCards(1, "cw3")[0],
    id: "cw-3",
    title: "Neon Ronin",
    contentType: "movie",
    progressPercent: 72,
    lastWatchedAt: new Date().toISOString(),
    remainingMinutes: 33,
  },
];

const MOCK_TOP_PICKS = makeMockCards(12, "picks");
const MOCK_TRENDING = makeMockCards(10, "trending");
const MOCK_NEW_RELEASES = makeMockCards(14, "new");

const MOCK_TOP_TEN: TopTenItem[] = Array.from({ length: 10 }, (_, i) => ({
  ...makeMockCards(1, `t10-${i}`)[0],
  id: `top10-${i + 1}`,
  title: `Top Ten Title ${i + 1}`,
  rank: i + 1,
}));

const MOCK_MY_LIST = makeMockCards(8, "mylist");
const MOCK_ACTION = makeMockCards(12, "action");
const MOCK_SCI_FI = makeMockCards(10, "scifi");
const MOCK_DOCUMENTARIES = makeMockCards(12, "docs");

export const MOCK_DATA = {
  MOCK_CONTINUE_WATCHING,
  MOCK_TOP_PICKS,
  MOCK_TRENDING,
  MOCK_NEW_RELEASES,
  MOCK_TOP_TEN,
  MOCK_MY_LIST,
  MOCK_ACTION,
  MOCK_SCI_FI,
  MOCK_DOCUMENTARIES,
};
