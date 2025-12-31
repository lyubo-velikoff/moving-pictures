import {
  HeroSection,
  RatingsSection,
  CastSection,
  EpisodesSection,
  Footer,
} from "@/components/sections";
import {
  MOCK_SHOW,
  MOCK_CREDITS,
  MOCK_SEASONS,
} from "@/lib/mock-data";

export default function Home() {
  // For now, using mock data
  // TODO: Replace with real data from API when TMDB token is configured
  const show = MOCK_SHOW;
  const credits = MOCK_CREDITS;
  const seasons = MOCK_SEASONS;

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <HeroSection show={show} />

      {/* Ratings Section */}
      <RatingsSection ratings={show.ratings} />

      {/* Cast Section */}
      <CastSection cast={credits.cast} />

      {/* Episodes Section */}
      <EpisodesSection seasons={seasons} />

      {/* Footer */}
      <Footer />
    </main>
  );
}
