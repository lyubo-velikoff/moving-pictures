import type {
  Show,
  CastMember,
  CrewMember,
  Credits,
  Episode,
  Season,
  Video,
  Image,
  ShowImages,
  Genre,
  Network,
  Country,
  Language,
} from "@/types";
import type {
  TMDBShowResponse,
  TMDBCreditsResponse,
  TMDBSeasonDetailResponse,
  TMDBVideosResponse,
  TMDBImagesResponse,
  TMDBCastMember,
  TMDBCrewMember,
  TMDBEpisode,
  TMDBSeason,
  TMDBVideo,
  TMDBImage,
} from "./types";

export function transformShow(tmdb: TMDBShowResponse): Omit<Show, "ratings"> {
  return {
    id: tmdb.id,
    tmdbId: tmdb.id,
    name: tmdb.name,
    originalName: tmdb.original_name,
    tagline: tmdb.tagline || undefined,
    overview: tmdb.overview,
    posterPath: tmdb.poster_path,
    backdropPath: tmdb.backdrop_path,
    firstAirDate: tmdb.first_air_date,
    lastAirDate: tmdb.last_air_date,
    status: tmdb.status,
    numberOfEpisodes: tmdb.number_of_episodes,
    numberOfSeasons: tmdb.number_of_seasons,
    episodeRunTime: tmdb.episode_run_time,
    genres: tmdb.genres.map(transformGenre),
    networks: tmdb.networks.map(transformNetwork),
    productionCountries: tmdb.production_countries.map(transformCountry),
    spokenLanguages: tmdb.spoken_languages.map(transformLanguage),
  };
}

function transformGenre(genre: { id: number; name: string }): Genre {
  return {
    id: genre.id,
    name: genre.name,
  };
}

function transformNetwork(network: {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}): Network {
  return {
    id: network.id,
    name: network.name,
    logoPath: network.logo_path,
    originCountry: network.origin_country,
  };
}

function transformCountry(country: {
  iso_3166_1: string;
  name: string;
}): Country {
  return {
    iso31661: country.iso_3166_1,
    name: country.name,
  };
}

function transformLanguage(language: {
  iso_639_1: string;
  name: string;
  english_name: string;
}): Language {
  return {
    iso6391: language.iso_639_1,
    name: language.name,
    englishName: language.english_name,
  };
}

export function transformCredits(tmdb: TMDBCreditsResponse): Credits {
  return {
    cast: tmdb.cast.map(transformCastMember),
    crew: tmdb.crew.map(transformCrewMember),
  };
}

function transformCastMember(member: TMDBCastMember): CastMember {
  return {
    id: member.id,
    name: member.name,
    originalName: member.original_name,
    character: member.character,
    profilePath: member.profile_path,
    order: member.order,
    knownForDepartment: member.known_for_department,
  };
}

function transformCrewMember(member: TMDBCrewMember): CrewMember {
  return {
    id: member.id,
    name: member.name,
    originalName: member.original_name,
    job: member.job,
    department: member.department,
    profilePath: member.profile_path,
  };
}

export function transformSeason(tmdb: TMDBSeasonDetailResponse): Season {
  return {
    id: tmdb.id,
    name: tmdb.name,
    overview: tmdb.overview,
    seasonNumber: tmdb.season_number,
    episodeCount: tmdb.episodes.length,
    airDate: tmdb.air_date,
    posterPath: tmdb.poster_path,
    episodes: tmdb.episodes.map(transformEpisode),
  };
}

export function transformSeasonSummary(tmdb: TMDBSeason): Omit<Season, "episodes"> {
  return {
    id: tmdb.id,
    name: tmdb.name,
    overview: tmdb.overview,
    seasonNumber: tmdb.season_number,
    episodeCount: tmdb.episode_count,
    airDate: tmdb.air_date,
    posterPath: tmdb.poster_path,
  };
}

function transformEpisode(episode: TMDBEpisode): Episode {
  return {
    id: episode.id,
    name: episode.name,
    overview: episode.overview,
    episodeNumber: episode.episode_number,
    seasonNumber: episode.season_number,
    airDate: episode.air_date,
    runtime: episode.runtime,
    stillPath: episode.still_path,
    voteAverage: episode.vote_average,
    voteCount: episode.vote_count,
  };
}

export function transformVideos(tmdb: TMDBVideosResponse): Video[] {
  return tmdb.results.map(transformVideo);
}

function transformVideo(video: TMDBVideo): Video {
  return {
    id: video.id,
    key: video.key,
    name: video.name,
    site: video.site,
    type: video.type,
    official: video.official,
    publishedAt: video.published_at,
  };
}

export function transformImages(tmdb: TMDBImagesResponse): ShowImages {
  return {
    backdrops: tmdb.backdrops.map(transformImage),
    posters: tmdb.posters.map(transformImage),
    logos: tmdb.logos.map(transformImage),
  };
}

function transformImage(image: TMDBImage): Image {
  return {
    filePath: image.file_path,
    aspectRatio: image.aspect_ratio,
    width: image.width,
    height: image.height,
    voteAverage: image.vote_average,
    voteCount: image.vote_count,
  };
}

export function getTrailerFromVideos(videos: Video[]): Video | undefined {
  // Prioritize official trailers, then teasers, then any video
  const trailer = videos.find(
    (v) => v.type === "Trailer" && v.official && v.site === "YouTube"
  );
  if (trailer) return trailer;

  const teaser = videos.find(
    (v) => v.type === "Teaser" && v.official && v.site === "YouTube"
  );
  if (teaser) return teaser;

  return videos.find((v) => v.site === "YouTube");
}
