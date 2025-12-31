export interface StaticRating {
  score: number;
  maxScore: number;
  voteCount: number;
  rank?: number;
}

export interface ShowConfig {
  slug: string;
  tmdbId: number;
  mdlSlug: string;
  imdbId?: string;
  name: string;
  originalName: string;
  trailerUrl?: string;
  featured: boolean;
  // Static ratings (MDL is Cloudflare-protected, IMDb requires auth)
  // These are cached values that can be updated periodically
  staticRatings?: {
    mdl?: StaticRating;
    imdb?: StaticRating;
  };
}

export const SHOWS: ShowConfig[] = [
  {
    slug: "speed-and-love",
    tmdbId: 279041,
    mdlSlug: "760405-shuang-gui",
    imdbId: "tt36596644",
    name: "Speed and Love",
    originalName: "双轨",
    trailerUrl: "https://www.iq.com/short/speed-and-love-10btkbcvqb8",
    featured: true,
    // Static ratings from MDL and IMDb (as of Dec 2025)
    staticRatings: {
      mdl: {
        score: 8.5,
        maxScore: 10,
        voteCount: 7146,
        rank: 468,
      },
      imdb: {
        score: 8.2,
        maxScore: 10,
        voteCount: 892,
      },
    },
  },
];

export function getShowBySlug(slug: string): ShowConfig | undefined {
  return SHOWS.find((show) => show.slug === slug);
}

export function getShowByTmdbId(tmdbId: number): ShowConfig | undefined {
  return SHOWS.find((show) => show.tmdbId === tmdbId);
}

export function getFeaturedShow(): ShowConfig | undefined {
  return SHOWS.find((show) => show.featured);
}
