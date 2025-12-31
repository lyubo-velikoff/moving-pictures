import type {
  TMDBShowResponse,
  TMDBCreditsResponse,
  TMDBSeasonDetailResponse,
  TMDBVideosResponse,
  TMDBImagesResponse,
  TMDBExternalIdsResponse,
  TMDBError,
} from "./types";

const TMDB_API_BASE_URL = "https://api.themoviedb.org/3";

class TMDBClient {
  private apiToken: string;

  constructor() {
    const token = process.env.TMDB_API_TOKEN;
    if (!token) {
      throw new Error("TMDB_API_TOKEN environment variable is not set");
    }
    this.apiToken = token;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const url = `${TMDB_API_BASE_URL}${endpoint}`;

    const response = await fetch(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.apiToken}`,
        "Content-Type": "application/json",
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const error = (await response.json()) as TMDBError;
      throw new Error(
        `TMDB API Error: ${error.status_message} (${error.status_code})`
      );
    }

    return response.json() as Promise<T>;
  }

  async getShow(showId: number): Promise<TMDBShowResponse> {
    return this.fetch<TMDBShowResponse>(`/tv/${showId}`);
  }

  async getShowCredits(showId: number): Promise<TMDBCreditsResponse> {
    return this.fetch<TMDBCreditsResponse>(`/tv/${showId}/credits`);
  }

  async getShowAggregateCredits(showId: number): Promise<TMDBCreditsResponse> {
    return this.fetch<TMDBCreditsResponse>(`/tv/${showId}/aggregate_credits`);
  }

  async getSeason(
    showId: number,
    seasonNumber: number
  ): Promise<TMDBSeasonDetailResponse> {
    return this.fetch<TMDBSeasonDetailResponse>(
      `/tv/${showId}/season/${seasonNumber}`
    );
  }

  async getShowVideos(showId: number): Promise<TMDBVideosResponse> {
    return this.fetch<TMDBVideosResponse>(`/tv/${showId}/videos`);
  }

  async getShowImages(showId: number): Promise<TMDBImagesResponse> {
    return this.fetch<TMDBImagesResponse>(
      `/tv/${showId}/images?include_image_language=en,null`
    );
  }

  async getShowExternalIds(showId: number): Promise<TMDBExternalIdsResponse> {
    return this.fetch<TMDBExternalIdsResponse>(`/tv/${showId}/external_ids`);
  }

  async getAllEpisodes(
    showId: number,
    numberOfSeasons: number
  ): Promise<TMDBSeasonDetailResponse[]> {
    const seasons = await Promise.all(
      Array.from({ length: numberOfSeasons }, (_, i) =>
        this.getSeason(showId, i + 1)
      )
    );
    return seasons;
  }
}

// Singleton instance
let tmdbClient: TMDBClient | null = null;

export function getTMDBClient(): TMDBClient {
  if (!tmdbClient) {
    tmdbClient = new TMDBClient();
  }
  return tmdbClient;
}

export { TMDBClient };
