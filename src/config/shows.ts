export interface ShowConfig {
  slug: string;
  tmdbId: number;
  mdlSlug: string;
  imdbId?: string;
  name: string;
  originalName: string;
  trailerUrl?: string;
  featured: boolean;
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
