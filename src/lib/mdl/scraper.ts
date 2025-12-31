import type { MDLRating, ScrapedData } from "./types";

const MDL_BASE_URL = "https://mydramalist.com";
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000; // 24 hours

// Simple in-memory cache for MDL data
const cache = new Map<string, { data: ScrapedData; timestamp: number }>();

export async function getMDLRating(mdlSlug: string): Promise<MDLRating | null> {
  const cacheKey = `rating:${mdlSlug}`;
  const cached = cache.get(cacheKey);

  if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
    return cached.data.rating;
  }

  try {
    const rating = await scrapeRating(mdlSlug);
    cache.set(cacheKey, {
      data: { rating, lastUpdated: new Date() },
      timestamp: Date.now(),
    });
    return rating;
  } catch (error) {
    console.error(`Failed to scrape MDL rating for ${mdlSlug}:`, error);
    // Return cached data if available, even if expired
    if (cached) {
      return cached.data.rating;
    }
    return null;
  }
}

async function scrapeRating(mdlSlug: string): Promise<MDLRating | null> {
  const url = `${MDL_BASE_URL}/${mdlSlug}`;

  const response = await fetch(url, {
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.5",
    },
    next: { revalidate: 3600 }, // Revalidate every hour on server
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch MDL page: ${response.status}`);
  }

  const html = await response.text();
  return parseRatingFromHtml(html);
}

function parseRatingFromHtml(html: string): MDLRating | null {
  // Extract rating score - look for the main rating display
  // MDL typically displays rating as "8.5" in a specific pattern
  const ratingMatch = html.match(
    /<div[^>]*class="[^"]*hfs[^"]*"[^>]*>(\d+\.?\d*)<\/div>/
  );

  // Alternative pattern for rating
  const altRatingMatch = html.match(
    /class="score"[^>]*>(\d+\.?\d*)<\/span>/
  );

  // Look for vote count
  const voteMatch = html.match(
    /(\d[\d,]*)\s*(?:users?|votes?|ratings?)/i
  );

  // Look for ranking
  const rankMatch = html.match(/#(\d+)/);

  let score: number | null = null;

  if (ratingMatch) {
    score = parseFloat(ratingMatch[1]);
  } else if (altRatingMatch) {
    score = parseFloat(altRatingMatch[1]);
  }

  // Try another common pattern for MDL rating
  if (score === null) {
    const genericRatingMatch = html.match(
      /(?:rating|score)[^>]*>[\s\n]*(\d+\.?\d*)[\s\n]*</i
    );
    if (genericRatingMatch) {
      score = parseFloat(genericRatingMatch[1]);
    }
  }

  if (score === null || isNaN(score)) {
    // Fallback: look for any decimal number that looks like a rating (1.0-10.0)
    const anyRatingMatch = html.match(
      /<[^>]*>(\d\.\d)<\/[^>]*>/
    );
    if (anyRatingMatch) {
      const potentialScore = parseFloat(anyRatingMatch[1]);
      if (potentialScore >= 1 && potentialScore <= 10) {
        score = potentialScore;
      }
    }
  }

  if (score === null) {
    return null;
  }

  let voteCount = 0;
  if (voteMatch) {
    voteCount = parseInt(voteMatch[1].replace(/,/g, ""), 10);
  }

  let rank: number | undefined;
  if (rankMatch) {
    rank = parseInt(rankMatch[1], 10);
  }

  return {
    score,
    maxScore: 10,
    voteCount,
    rank,
    source: "mydramalist",
  };
}

export function clearCache(): void {
  cache.clear();
}

export function getCacheStats(): { size: number; keys: string[] } {
  return {
    size: cache.size,
    keys: Array.from(cache.keys()),
  };
}
