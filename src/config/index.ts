export * from "./shows";

export const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p";

export const TMDB_IMAGE_SIZES = {
  poster: {
    small: "w185",
    medium: "w342",
    large: "w500",
    original: "original",
  },
  backdrop: {
    small: "w300",
    medium: "w780",
    large: "w1280",
    original: "original",
  },
  profile: {
    small: "w45",
    medium: "w185",
    large: "h632",
    original: "original",
  },
  still: {
    small: "w92",
    medium: "w185",
    large: "w300",
    original: "original",
  },
} as const;

export function getTmdbImageUrl(
  path: string | null,
  type: keyof typeof TMDB_IMAGE_SIZES = "poster",
  size: "small" | "medium" | "large" | "original" = "medium"
): string | null {
  if (!path) return null;
  return `${TMDB_IMAGE_BASE_URL}/${TMDB_IMAGE_SIZES[type][size]}${path}`;
}

export const REVALIDATION_TIMES = {
  showDetails: 60 * 60 * 24, // 24 hours
  episodeList: 60 * 60 * 6, // 6 hours
  ratings: 60 * 60, // 1 hour
  images: 60 * 60 * 24 * 7, // 7 days
  videos: 60 * 60 * 24, // 24 hours
} as const;
