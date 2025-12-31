import { describe, it, expect } from "vitest";
import {
  SHOWS,
  getShowBySlug,
  getShowByTmdbId,
  getFeaturedShow,
} from "./shows";

describe("shows config", () => {
  describe("SHOWS", () => {
    it("should have at least one show", () => {
      expect(SHOWS.length).toBeGreaterThan(0);
    });

    it("should have Speed and Love as the first show", () => {
      const speedAndLove = SHOWS[0];
      expect(speedAndLove.slug).toBe("speed-and-love");
      expect(speedAndLove.name).toBe("Speed and Love");
      expect(speedAndLove.tmdbId).toBe(279041);
    });

    it("all shows should have required fields", () => {
      SHOWS.forEach((show) => {
        expect(show.slug).toBeDefined();
        expect(show.tmdbId).toBeDefined();
        expect(show.name).toBeDefined();
        expect(typeof show.featured).toBe("boolean");
      });
    });
  });

  describe("getShowBySlug", () => {
    it("should find Speed and Love by slug", () => {
      const show = getShowBySlug("speed-and-love");
      expect(show).toBeDefined();
      expect(show?.name).toBe("Speed and Love");
    });

    it("should return undefined for non-existent slug", () => {
      const show = getShowBySlug("non-existent-show");
      expect(show).toBeUndefined();
    });
  });

  describe("getShowByTmdbId", () => {
    it("should find Speed and Love by TMDB ID", () => {
      const show = getShowByTmdbId(279041);
      expect(show).toBeDefined();
      expect(show?.name).toBe("Speed and Love");
    });

    it("should return undefined for non-existent TMDB ID", () => {
      const show = getShowByTmdbId(999999);
      expect(show).toBeUndefined();
    });
  });

  describe("getFeaturedShow", () => {
    it("should return a featured show", () => {
      const show = getFeaturedShow();
      expect(show).toBeDefined();
      expect(show?.featured).toBe(true);
    });

    it("should return Speed and Love as featured", () => {
      const show = getFeaturedShow();
      expect(show?.slug).toBe("speed-and-love");
    });
  });
});
