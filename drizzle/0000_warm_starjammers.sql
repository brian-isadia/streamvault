CREATE TYPE "public"."content_type" AS ENUM('movie', 'tv', 'kids', 'documentary', 'special');--> statement-breakpoint
CREATE TYPE "public"."media_type" AS ENUM('movie', 'tv');--> statement-breakpoint
CREATE TABLE "films" (
	"id" integer PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"logo_url" varchar,
	"synopsis" varchar NOT NULL,
	"backdrop_url" varchar NOT NULL,
	"poster_url" varchar NOT NULL,
	"trailer_url" varchar,
	"content_type" "content_type" NOT NULL,
	"media_type" "media_type" DEFAULT 'movie' NOT NULL,
	"genres" jsonb NOT NULL,
	"release_year" integer NOT NULL,
	"maturity_rating" varchar,
	"match_score" integer,
	"runtime_minutes" integer,
	"season_count" integer,
	"episode_count" integer,
	"is_original" boolean DEFAULT false,
	"is_new" boolean DEFAULT false,
	"is_top_ten" boolean DEFAULT false,
	"top_ten_rank" integer,
	"href" varchar NOT NULL,
	"slug" varchar NOT NULL,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "films_title_unique" UNIQUE("title")
);
