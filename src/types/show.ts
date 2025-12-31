export interface Show {
  id: number;
  tmdbId: number;
  mdlSlug?: string;
  name: string;
  originalName: string;
  tagline?: string;
  overview: string;
  posterPath: string | null;
  backdropPath: string | null;
  firstAirDate: string;
  lastAirDate: string | null;
  status: string;
  numberOfEpisodes: number;
  numberOfSeasons: number;
  episodeRunTime: number[];
  genres: Genre[];
  networks: Network[];
  productionCountries: Country[];
  spokenLanguages: Language[];
  ratings: ShowRatings;
  trailer?: Video;
}

export interface ShowRatings {
  tmdb: Rating | null;
  mdl: Rating | null;
  imdb: Rating | null;
}

export interface Rating {
  score: number;
  maxScore: number;
  voteCount: number;
  source: string;
}

export interface Genre {
  id: number;
  name: string;
}

export interface Network {
  id: number;
  name: string;
  logoPath: string | null;
  originCountry: string;
}

export interface Country {
  iso31661: string;
  name: string;
}

export interface Language {
  iso6391: string;
  name: string;
  englishName: string;
}

export interface CastMember {
  id: number;
  name: string;
  originalName: string;
  character: string;
  profilePath: string | null;
  order: number;
  knownForDepartment: string;
}

export interface CrewMember {
  id: number;
  name: string;
  originalName: string;
  job: string;
  department: string;
  profilePath: string | null;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episodeNumber: number;
  seasonNumber: number;
  airDate: string | null;
  runtime: number | null;
  stillPath: string | null;
  voteAverage: number;
  voteCount: number;
}

export interface Season {
  id: number;
  name: string;
  overview: string;
  seasonNumber: number;
  episodeCount: number;
  airDate: string | null;
  posterPath: string | null;
  episodes?: Episode[];
}

export interface Video {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
  official: boolean;
  publishedAt: string;
}

export interface Image {
  filePath: string;
  aspectRatio: number;
  width: number;
  height: number;
  voteAverage: number;
  voteCount: number;
}

export interface ShowImages {
  backdrops: Image[];
  posters: Image[];
  logos: Image[];
}

export interface UserShowPreference {
  id: string;
  userId: string;
  showId: number;
  liked: boolean;
  watched: boolean;
  watchedEpisodes: number[];
  createdAt: Date;
  updatedAt: Date;
}
