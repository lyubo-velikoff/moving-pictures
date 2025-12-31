import {
  HeroSection,
  RatingsSection,
  CastSection,
  EpisodesSection,
  Footer,
} from "@/components/sections";
import {
  getShow,
  getShowCredits,
  getShowEpisodes,
} from "@/lib/shows";
import { getFeaturedShow } from "@/config";

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const featuredShow = getFeaturedShow();

  if (!featuredShow) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">No featured show configured</p>
      </main>
    );
  }

  // Fetch all data in parallel
  const [show, credits, episodes] = await Promise.all([
    getShow(featuredShow.slug),
    getShowCredits(featuredShow.slug),
    getShowEpisodes(featuredShow.slug),
  ]);

  if (!show) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-text-secondary">Failed to load show data</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection show={show} />

      {/* Ratings Section */}
      <RatingsSection ratings={show.ratings} />

      {/* Cast Section */}
      {credits && <CastSection cast={credits.cast} />}

      {/* Episodes Section */}
      {episodes && episodes.length > 0 && <EpisodesSection seasons={episodes} />}

      {/* Footer */}
      <Footer />
    </main>
  );
}
