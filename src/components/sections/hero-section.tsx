"use client";

import { motion } from "framer-motion";
import { ParallaxHero } from "@/components/features";
import { Button, Badge } from "@/components/ui";
import type { Show } from "@/types";

interface HeroSectionProps {
  show: Show;
  onWatchTrailer?: () => void;
}

export function HeroSection({ show, onWatchTrailer }: HeroSectionProps) {
  const year = new Date(show.firstAirDate).getFullYear();
  const rating = show.ratings.mdl?.score || show.ratings.tmdb?.score || 0;

  return (
    <ParallaxHero backdropPath={show.backdropPath}>
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl">
          {/* Genres */}
          <motion.div
            className="flex flex-wrap gap-2 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            {show.genres.map((genre) => (
              <Badge key={genre.id} variant="outline" size="md">
                {genre.name}
              </Badge>
            ))}
          </motion.div>

          {/* Title */}
          <motion.div
            className="mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="gradient-text">{show.name}</span>
            </h1>
            <p className="text-xl md:text-2xl text-[var(--text-muted)] mt-2">
              {show.originalName}
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex flex-wrap items-center gap-4 md:gap-6 mb-8 text-[var(--text-secondary)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-[var(--accent-secondary)]"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              <span className="font-semibold">{rating.toFixed(1)}</span>
            </div>
            <span className="text-[var(--border-default)]">|</span>
            <span>{year}</span>
            <span className="text-[var(--border-default)]">|</span>
            <span>{show.numberOfEpisodes} Episodes</span>
            <span className="text-[var(--border-default)]">|</span>
            <span>{show.episodeRunTime[0]} min</span>
          </motion.div>

          {/* Overview */}
          <motion.p
            className="text-lg text-[var(--text-secondary)] mb-8 line-clamp-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {show.overview}
          </motion.p>

          {/* CTAs */}
          <motion.div
            className="flex flex-wrap gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
          >
            <Button size="lg" onClick={onWatchTrailer}>
              <svg
                className="w-5 h-5 mr-2"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                  clipRule="evenodd"
                />
              </svg>
              Watch Trailer
            </Button>
            <Button size="lg" variant="outline">
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              Add to Watchlist
            </Button>
          </motion.div>

          {/* Network */}
          <motion.div
            className="mt-8 flex items-center gap-3 text-sm text-[var(--text-muted)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <span>Available on</span>
            {show.networks.map((network) => (
              <Badge key={network.id} variant="default">
                {network.name}
              </Badge>
            ))}
          </motion.div>
        </div>
      </div>
    </ParallaxHero>
  );
}
