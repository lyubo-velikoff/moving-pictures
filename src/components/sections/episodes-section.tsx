"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FadeInSection } from "@/components/features";
import { Card, Badge } from "@/components/ui";
import type { Season, Episode } from "@/types";
import { getTmdbImageUrl } from "@/config";
import Image from "next/image";

interface EpisodesSectionProps {
  seasons: Season[];
}

export function EpisodesSection({ seasons }: EpisodesSectionProps) {
  const [expandedEpisode, setExpandedEpisode] = useState<number | null>(null);
  const [visibleCount, setVisibleCount] = useState(6);

  const allEpisodes = seasons.flatMap((s) => s.episodes || []);
  const visibleEpisodes = allEpisodes.slice(0, visibleCount);
  const hasMore = visibleCount < allEpisodes.length;

  return (
    <section className="py-24 bg-[var(--surface-primary)]">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeInSection>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Episode Guide
              </h2>
              <p className="text-[var(--text-muted)]">
                {allEpisodes.length} episodes across {seasons.length} season
                {seasons.length > 1 ? "s" : ""}
              </p>
            </div>
          </div>
        </FadeInSection>

        <div className="grid gap-4">
          {visibleEpisodes.map((episode, index) => (
            <FadeInSection key={episode.id} delay={index * 0.05}>
              <EpisodeCard
                episode={episode}
                isExpanded={expandedEpisode === episode.id}
                onToggle={() =>
                  setExpandedEpisode(
                    expandedEpisode === episode.id ? null : episode.id
                  )
                }
              />
            </FadeInSection>
          ))}
        </div>

        {hasMore && (
          <FadeInSection className="mt-8 text-center">
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="px-8 py-3 rounded-full border border-[var(--border-default)] text-[var(--text-secondary)] hover:bg-[var(--surface-secondary)] transition-colors"
            >
              Load More Episodes
            </button>
          </FadeInSection>
        )}
      </div>
    </section>
  );
}

interface EpisodeCardProps {
  episode: Episode;
  isExpanded: boolean;
  onToggle: () => void;
}

function EpisodeCard({ episode, isExpanded, onToggle }: EpisodeCardProps) {
  const imageUrl = episode.stillPath
    ? getTmdbImageUrl(episode.stillPath, "still", "medium")
    : null;

  const formattedDate = episode.airDate
    ? new Date(episode.airDate).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : null;

  return (
    <Card
      variant="default"
      className="overflow-hidden cursor-pointer"
      onClick={onToggle}
    >
      <div className="flex flex-col md:flex-row gap-4 p-4">
        {/* Thumbnail */}
        <div className="relative w-full md:w-48 h-32 md:h-28 flex-shrink-0 rounded-lg overflow-hidden bg-[var(--surface-secondary)]">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={episode.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 192px"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-4xl font-bold text-[var(--text-muted)]">
                {episode.episodeNumber}
              </span>
            </div>
          )}
          {/* Episode number badge */}
          <Badge
            variant="accent"
            className="absolute top-2 left-2"
          >
            EP {episode.episodeNumber}
          </Badge>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-lg text-[var(--text-primary)]">
                {episode.name}
              </h3>
              <div className="flex items-center gap-3 mt-1 text-sm text-[var(--text-muted)]">
                {formattedDate && <span>{formattedDate}</span>}
                {episode.runtime && (
                  <>
                    <span>•</span>
                    <span>{episode.runtime} min</span>
                  </>
                )}
                {episode.voteAverage > 0 && (
                  <>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4 text-[var(--accent-secondary)]"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      {episode.voteAverage.toFixed(1)}
                    </span>
                  </>
                )}
              </div>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex-shrink-0 p-2"
            >
              <svg
                className="w-5 h-5 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </motion.div>
          </div>

          {/* Expandable overview */}
          <AnimatePresence>
            {isExpanded && episode.overview && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <p className="mt-4 text-[var(--text-secondary)] leading-relaxed">
                  {episode.overview}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
