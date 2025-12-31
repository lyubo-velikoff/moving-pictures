import { getTMDBClient, transformShow, transformCredits, transformSeason, transformVideos, transformImages, getTrailerFromVideos } from "@/lib/tmdb";
import { getShowBySlug, getShowByTmdbId, SHOWS } from "@/config";
import type { Show, Credits, Season, Video, ShowImages, ShowRatings } from "@/types";

export async function getShow(slugOrId: string | number): Promise<Show | null> {
  const showConfig = typeof slugOrId === "string"
    ? getShowBySlug(slugOrId)
    : getShowByTmdbId(slugOrId);

  if (!showConfig) {
    return null;
  }

  try {
    const tmdb = getTMDBClient();
    const tmdbShow = await tmdb.getShow(showConfig.tmdbId);
    const show = transformShow(tmdbShow);

    // Build ratings from TMDB live data + static cached ratings for MDL/IMDb
    // (MDL is Cloudflare-protected, IMDb requires auth - so we use static values)
    const ratings: ShowRatings = {
      tmdb: {
        score: tmdbShow.vote_average,
        maxScore: 10,
        voteCount: tmdbShow.vote_count,
        source: "tmdb",
      },
      mdl: showConfig.staticRatings?.mdl ? {
        score: showConfig.staticRatings.mdl.score,
        maxScore: showConfig.staticRatings.mdl.maxScore,
        voteCount: showConfig.staticRatings.mdl.voteCount,
        source: "mydramalist",
      } : null,
      imdb: showConfig.staticRatings?.imdb ? {
        score: showConfig.staticRatings.imdb.score,
        maxScore: showConfig.staticRatings.imdb.maxScore,
        voteCount: showConfig.staticRatings.imdb.voteCount,
        source: "imdb",
      } : null,
    };

    return {
      ...show,
      mdlSlug: showConfig.mdlSlug,
      ratings,
    };
  } catch (error) {
    console.error(`Failed to fetch show ${slugOrId}:`, error);
    return null;
  }
}

export async function getShowCredits(slugOrId: string | number): Promise<Credits | null> {
  const showConfig = typeof slugOrId === "string"
    ? getShowBySlug(slugOrId)
    : getShowByTmdbId(slugOrId);

  if (!showConfig) {
    return null;
  }

  try {
    const tmdb = getTMDBClient();
    const credits = await tmdb.getShowCredits(showConfig.tmdbId);
    return transformCredits(credits);
  } catch (error) {
    console.error(`Failed to fetch credits for ${slugOrId}:`, error);
    return null;
  }
}

export async function getShowEpisodes(slugOrId: string | number): Promise<Season[] | null> {
  const showConfig = typeof slugOrId === "string"
    ? getShowBySlug(slugOrId)
    : getShowByTmdbId(slugOrId);

  if (!showConfig) {
    return null;
  }

  try {
    const tmdb = getTMDBClient();
    const showDetails = await tmdb.getShow(showConfig.tmdbId);
    const seasons = await tmdb.getAllEpisodes(showConfig.tmdbId, showDetails.number_of_seasons);
    return seasons.map(transformSeason);
  } catch (error) {
    console.error(`Failed to fetch episodes for ${slugOrId}:`, error);
    return null;
  }
}

export async function getShowVideos(slugOrId: string | number): Promise<Video[] | null> {
  const showConfig = typeof slugOrId === "string"
    ? getShowBySlug(slugOrId)
    : getShowByTmdbId(slugOrId);

  if (!showConfig) {
    return null;
  }

  try {
    const tmdb = getTMDBClient();
    const videos = await tmdb.getShowVideos(showConfig.tmdbId);
    return transformVideos(videos);
  } catch (error) {
    console.error(`Failed to fetch videos for ${slugOrId}:`, error);
    return null;
  }
}

export async function getShowTrailer(slugOrId: string | number): Promise<Video | null> {
  const videos = await getShowVideos(slugOrId);
  if (!videos) return null;
  return getTrailerFromVideos(videos) || null;
}

export async function getShowImages(slugOrId: string | number): Promise<ShowImages | null> {
  const showConfig = typeof slugOrId === "string"
    ? getShowBySlug(slugOrId)
    : getShowByTmdbId(slugOrId);

  if (!showConfig) {
    return null;
  }

  try {
    const tmdb = getTMDBClient();
    const images = await tmdb.getShowImages(showConfig.tmdbId);
    return transformImages(images);
  } catch (error) {
    console.error(`Failed to fetch images for ${slugOrId}:`, error);
    return null;
  }
}

export async function getAllShows(): Promise<Show[]> {
  const shows = await Promise.all(
    SHOWS.map(async (config) => {
      const show = await getShow(config.slug);
      return show;
    })
  );

  return shows.filter((show): show is Show => show !== null);
}

export async function getShowWithFullDetails(slugOrId: string | number): Promise<{
  show: Show;
  credits: Credits;
  seasons: Season[];
  videos: Video[];
  images: ShowImages;
} | null> {
  const showConfig = typeof slugOrId === "string"
    ? getShowBySlug(slugOrId)
    : getShowByTmdbId(slugOrId);

  if (!showConfig) {
    return null;
  }

  try {
    const [show, credits, seasons, videos, images] = await Promise.all([
      getShow(slugOrId),
      getShowCredits(slugOrId),
      getShowEpisodes(slugOrId),
      getShowVideos(slugOrId),
      getShowImages(slugOrId),
    ]);

    if (!show || !credits || !seasons || !videos || !images) {
      return null;
    }

    return { show, credits, seasons, videos, images };
  } catch (error) {
    console.error(`Failed to fetch full details for ${slugOrId}:`, error);
    return null;
  }
}
