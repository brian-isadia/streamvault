import { convertYear, genreMap } from "./utils";

const baseUrl = `https://api.themoviedb.org/3`;
const imageBaseUrl = `https://image.tmdb.org/t/p`;
const TMDB_API_KEY = process.env.TMDB_API_KEY;

export function posterURL(posterPath: string | null) {
  return `${imageBaseUrl}/w342${posterPath}`;
}
export function smallPosterURL(posterPath: string | null) {
  return `${imageBaseUrl}/w185${posterPath}`;
}
export function backdropURL(backdropImage: string, imageWidth?: string) {
  let url: string = "";

  if (imageWidth) {
    url = `${imageBaseUrl}/${imageWidth}${backdropImage}`;
  } else {
    url = `${imageBaseUrl}/w1280${backdropImage}`;
  }
  return url;
}

export function logoURL(logoPath: string) {
  return `${imageBaseUrl}/w500${logoPath}`;
}

export const fetchDiscoverFilms = async (
  mediaType: "movie" | "tv" | "kids" | "documentary",
) => {
  let discoverUrl = "";
  if (mediaType === "movie") {
    discoverUrl = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&sort_by=popularity.desc&watch_region=US&vote_average.gte=6&with_origin_country=US&with_original_language=en&primary_release_date.gte=2025-12-01&vote_count.gte=400&without_genres=16%2C10763%2C10767&api_key=${TMDB_API_KEY}&page=1`;
  } else if (mediaType === "tv") {
    discoverUrl = `${baseUrl}/discover/tv?include_adult=false&include_video=false&language=en-US&watch_region=US&first_air_date.gte=2023-01-01&sort_by=popularity.desc&with_original_language=en&vote_count.gte=400&without_genres=16%2C10763%2C10767&api_key=${TMDB_API_KEY}&page=1`;
  } else if (mediaType === "kids") {
    discoverUrl = `${baseUrl}/discover/movie?include_adult=false&include_video=false&language=en-US&region=US&sort_by=popularity.desc&with_genres=16%2C10751&with_original_language=en&without_genres=10749%2C27%2C36%2C80%2C99%2C36%2C53%2C37&api_key=${TMDB_API_KEY}&page=1`;
  } else {
    //TODO: GET LINK URL FOR DOCUMENTARIES USING without_genres SEE KIDS ABOVE
    discoverUrl = "";
  }

  try {
    const response = await fetch(discoverUrl);
    if (!response.ok) {
      console.log("An error occured while trying to get tmdb films");
      return;
    }
    const { results } = await response.json();
    let data = results?.slice(0, 5);
    data = await Promise.all(
      data.map(
        async (film: {
          id: number;
          title?: string;
          name?: string;
          release_date?: string;
          poster_path?: string;
          backdrop_path: string;
          vote_average: number;
          overview: string;
          original_language?: string;
          genre_ids?: number[];
          first_air_date?: string;
        }) => {
          const extraData = await fetchExtraFilmData(mediaType, film.id);

          const convertedGenres = film.genre_ids
            ?.map((id: number) => genreMap.get(id))
            .filter(
              (name: string | undefined): name is string => name !== undefined,
            );

          return {
            id: film.id,
            title: film.title || film.name,
            backdropUrl: backdropURL(film.backdrop_path),
            synopsis: film.overview,
            genres: convertedGenres || [],
            releaseYear:
              typeof film.release_date === "string"
                ? convertYear(film.release_date)
                : typeof film.first_air_date === "string"
                  ? convertYear(film.first_air_date)
                  : 0,
            contentType: mediaType,
            runtimeMinutes: extraData?.runtime,
            seasonCount: extraData?.seasons,
            episodeCount: extraData?.episodes,
            logoUrl: extraData?.logoUrl,
          };
        },
      ),
    );
    return data;
  } catch (error) {
    console.log(error);
    return;
  }
};

const fetchExtraFilmData = async (
  mediaType: "movie" | "tv" | "kids" | "documentary",
  id: number,
) => {
  let runtime: string = "";
  let seasons: number = 0;
  let episodes: number = 0;
  let logos:
    | {
        aspect_ratio: number;
        iso_639_1: string;
        file_path: string;
        vote_average: number;
        width: number;
      }[]
    | null;
  const url = `${baseUrl}/${mediaType}/${id}?append_to_response=recommendations,videos,images,${mediaType === "tv" ? "aggregate_credits" : "credits"}&api_key=${TMDB_API_KEY}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.log("An error occurred while fetching film details");
      return;
    }
    const film = await response.json();
    logos = film.images.logos;
    const englishLogos = logos?.filter((logo) => logo.iso_639_1 === "en") ?? [];
    const suitableLogo = englishLogos
      .sort((a, b) => a.width - b.width)
      .find((logo) => logo.width <= 1000);
    const logoPath = suitableLogo?.file_path ?? englishLogos[0]?.file_path;
    const logoUrl = logoPath ? logoURL(logoPath) : undefined;
    if (mediaType === "tv") {
      seasons = parseInt(film.number_of_seasons);
      episodes = parseInt(film.number_of_episodes);
    } else {
      runtime = film.runtime;
    }
    return {
      logoUrl,
      runtime,
      seasons,
      episodes,
    };
  } catch (error) {
    console.error(
      `A server error occurred while fetching extra data, ${error}`,
    );
    return;
  }
};

// Hero Section Films
export const fetchHeroFilms = async () => {
  const [movies, series] = await Promise.all([
    fetchDiscoverFilms("movie"),
    fetchDiscoverFilms("tv"),
  ]);

  const heroFilms = [...movies, ...series];
  return heroFilms;
};
