export interface MDLRating {
  score: number;
  maxScore: number;
  voteCount: number;
  rank?: number;
  source: "mydramalist";
}

export interface MDLShowInfo {
  title: string;
  originalTitle?: string;
  rating: MDLRating | null;
  url: string;
}

export interface ScrapedData {
  rating: MDLRating | null;
  lastUpdated: Date;
}
