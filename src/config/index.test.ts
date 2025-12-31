import { describe, it, expect } from "vitest";
import { getTmdbImageUrl, TMDB_IMAGE_BASE_URL, TMDB_IMAGE_SIZES } from "./index";

describe("config", () => {
  describe("TMDB_IMAGE_BASE_URL", () => {
    it("should be the correct TMDB image URL", () => {
      expect(TMDB_IMAGE_BASE_URL).toBe("https://image.tmdb.org/t/p");
    });
  });

  describe("TMDB_IMAGE_SIZES", () => {
    it("should have poster sizes", () => {
      expect(TMDB_IMAGE_SIZES.poster).toBeDefined();
      expect(TMDB_IMAGE_SIZES.poster.small).toBe("w185");
      expect(TMDB_IMAGE_SIZES.poster.original).toBe("original");
    });

    it("should have backdrop sizes", () => {
      expect(TMDB_IMAGE_SIZES.backdrop).toBeDefined();
      expect(TMDB_IMAGE_SIZES.backdrop.large).toBe("w1280");
    });

    it("should have profile sizes", () => {
      expect(TMDB_IMAGE_SIZES.profile).toBeDefined();
      expect(TMDB_IMAGE_SIZES.profile.medium).toBe("w185");
    });

    it("should have still sizes", () => {
      expect(TMDB_IMAGE_SIZES.still).toBeDefined();
      expect(TMDB_IMAGE_SIZES.still.large).toBe("w300");
    });
  });

  describe("getTmdbImageUrl", () => {
    it("should return null for null path", () => {
      const url = getTmdbImageUrl(null);
      expect(url).toBeNull();
    });

    it("should return correct URL with default options", () => {
      const url = getTmdbImageUrl("/abc123.jpg");
      expect(url).toBe("https://image.tmdb.org/t/p/w342/abc123.jpg");
    });

    it("should return correct URL for backdrop", () => {
      const url = getTmdbImageUrl("/abc123.jpg", "backdrop", "large");
      expect(url).toBe("https://image.tmdb.org/t/p/w1280/abc123.jpg");
    });

    it("should return correct URL for profile", () => {
      const url = getTmdbImageUrl("/abc123.jpg", "profile", "medium");
      expect(url).toBe("https://image.tmdb.org/t/p/w185/abc123.jpg");
    });

    it("should return correct URL for original size", () => {
      const url = getTmdbImageUrl("/abc123.jpg", "poster", "original");
      expect(url).toBe("https://image.tmdb.org/t/p/original/abc123.jpg");
    });
  });
});
