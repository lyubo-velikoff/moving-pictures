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
  private apiKey: string;
  private isV4Token: boolean;

  constructor() {
    const token = process.env.TMDB_API_TOKEN;
    if (!token) {
      throw new Error("TMDB_API_TOKEN environment variable is not set");
    }
    this.apiKey = token;
    // v4 tokens are JWTs starting with "eyJ" and are 200+ chars
    // v3 keys are short alphanumeric strings (32 chars)
    this.isV4Token = token.startsWith("eyJ") && token.length > 100;
  }

  private async fetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
    // For v3 API keys, append as query parameter
    const separator = endpoint.includes("?") ? "&" : "?";
    const url = this.isV4Token
      ? `${TMDB_API_BASE_URL}${endpoint}`
      : `${TMDB_API_BASE_URL}${endpoint}${separator}api_key=${this.apiKey}`;

    const headers: HeadersInit = {
      "Content-Type": "application/json",
      ...options?.headers,
    };

    // Only add Bearer token for v4 tokens
    if (this.isV4Token) {
      (headers as Record<string, string>)["Authorization"] = `Bearer ${this.apiKey}`;
    }

    const response = await fetch(url, {
      ...options,
      headers,
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
