import { test, expect } from "@playwright/test";

test.describe("Home Page", () => {
  test("should load the home page", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/Moving Pictures/i);
  });

  test("should display the main content", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("main")).toBeVisible();
  });

  test("should display the show title", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Speed and Love")).toBeVisible();
  });

  test("should display ratings section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Ratings & Reviews")).toBeVisible();
  });

  test("should display cast section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Meet the Cast")).toBeVisible();
  });

  test("should display episode guide section", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByText("Episode Guide")).toBeVisible();
  });

  test("should display footer with TMDB attribution", async ({ page }) => {
    await page.goto("/");
    await expect(
      page.getByText("This product uses the TMDB API")
    ).toBeVisible();
  });

  test("should have a Watch Trailer button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /Watch Trailer/i })).toBeVisible();
  });

  test("should have an Add to Watchlist button", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("button", { name: /Add to Watchlist/i })).toBeVisible();
  });
});
