// Raw TMDB API response types

export interface TMDBShowResponse {
  id: number;
  name: string;
  original_name: string;
  tagline: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  last_air_date: string | null;
  status: string;
  number_of_episodes: number;
  number_of_seasons: number;
  episode_run_time: number[];
  genres: TMDBGenre[];
  networks: TMDBNetwork[];
  production_countries: TMDBCountry[];
  spoken_languages: TMDBLanguage[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  homepage: string;
  in_production: boolean;
  type: string;
  seasons: TMDBSeason[];
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBNetwork {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface TMDBCountry {
  iso_3166_1: string;
  name: string;
}

export interface TMDBLanguage {
  iso_639_1: string;
  name: string;
  english_name: string;
}

export interface TMDBCreditsResponse {
  id: number;
  cast: TMDBCastMember[];
  crew: TMDBCrewMember[];
}

export interface TMDBCastMember {
  id: number;
  name: string;
  original_name: string;
  character: string;
  profile_path: string | null;
  order: number;
  known_for_department: string;
  adult: boolean;
  gender: number;
  popularity: number;
  credit_id: string;
}

export interface TMDBCrewMember {
  id: number;
  name: string;
  original_name: string;
  job: string;
  department: string;
  profile_path: string | null;
  adult: boolean;
  gender: number;
  popularity: number;
  credit_id: string;
}

export interface TMDBSeason {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  episode_count: number;
  air_date: string | null;
  poster_path: string | null;
  vote_average: number;
}

export interface TMDBSeasonDetailResponse {
  id: number;
  name: string;
  overview: string;
  season_number: number;
  air_date: string | null;
  poster_path: string | null;
  episodes: TMDBEpisode[];
}

export interface TMDBEpisode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string | null;
  runtime: number | null;
  still_path: string | null;
  vote_average: number;
  vote_count: number;
  production_code: string;
  show_id: number;
}

export interface TMDBVideosResponse {
  id: number;
  results: TMDBVideo[];
}

export interface TMDBVideo {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  published_at: string;
  iso_639_1: string;
  iso_3166_1: string;
  size: number;
}

export interface TMDBImagesResponse {
  id: number;
  backdrops: TMDBImage[];
  posters: TMDBImage[];
  logos: TMDBImage[];
}

export interface TMDBImage {
  file_path: string;
  aspect_ratio: number;
  width: number;
  height: number;
  vote_average: number;
  vote_count: number;
  iso_639_1: string | null;
}

export interface TMDBExternalIdsResponse {
  id: number;
  imdb_id: string | null;
  tvdb_id: number | null;
  wikidata_id: string | null;
  facebook_id: string | null;
  instagram_id: string | null;
  twitter_id: string | null;
}

export interface TMDBError {
  status_code: number;
  status_message: string;
  success: boolean;
}
