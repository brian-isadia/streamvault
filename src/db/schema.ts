import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";
//import { relations } from "drizzle-orm";

// Helpers
const timestamps = {
  updated_at: t.timestamp().$onUpdateFn(() => new Date()),
  created_at: t.timestamp().defaultNow().notNull(),
};
export const userRoles = ["admin", "user"] as const;
export type UserRole = (typeof userRoles)[number];

// Enums
export const contentTypeEnum = pgEnum("content_type", [
  "movie",
  "tv",
  "kids",
  "documentary",
  "special",
]);
export const mediaTypeEnum = pgEnum("media_type", ["movie", "tv"]);
//export const userRoleEnum = pgEnum("user_roles", userRoles);

export const films = table("films", {
  id: t.integer("id").primaryKey(),
  title: t.varchar("title").notNull().unique(),
  logoUrl: t.varchar("logo_url"),
  synopsis: t.varchar("synopsis").notNull(),
  backdropUrl: t.varchar("backdrop_url").notNull(),
  posterUrl: t.varchar("poster_url").notNull(),
  trailerUrl: t.varchar("trailer_url"),
  contentType: contentTypeEnum("content_type").notNull(),
  mediaType: mediaTypeEnum("media_type").default("movie").notNull(),
  genres: t.jsonb("genres").notNull().$type<string[]>().notNull(),
  releaseYear: t.integer("release_year").notNull(),
  maturityRating: t.varchar("maturity_rating"),
  matchScore: t.integer("match_score"),
  runtimeMinutes: t.integer("runtime_minutes"),
  seasonCount: t.integer("season_count"),
  episodeCount: t.integer("episode_count"),
  isOriginal: t.boolean("is_original").default(false),
  isNew: t.boolean("is_new").default(false),
  isTopTen: t.boolean("is_top_ten").default(false),
  topTenRank: t.integer("top_ten_rank"),
  href: t.varchar("href").notNull(),
  slug: t.varchar("slug").notNull(),
  ...timestamps,
});

export type Film = typeof films.$inferSelect;
export type InsertFilm = typeof films.$inferInsert;
