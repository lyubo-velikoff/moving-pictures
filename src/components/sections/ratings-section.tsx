"use client";

import { FadeInSection, AnimatedCounter } from "@/components/features";
import { Rating } from "@/components/ui";
import type { ShowRatings } from "@/types";

interface RatingsSectionProps {
  ratings: ShowRatings;
}

export function RatingsSection({ ratings }: RatingsSectionProps) {
  const ratingsList = [
    { name: "MyDramaList", rating: ratings.mdl, color: "#8B5CF6" },
    { name: "IMDb", rating: ratings.imdb, color: "#F5C518" },
    { name: "TMDB", rating: ratings.tmdb, color: "#01D277" },
  ].filter((r) => r.rating !== null);

  return (
    <section className="py-24 bg-[var(--surface-primary)]">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeInSection>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">
            Ratings & Reviews
          </h2>
          <p className="text-[var(--text-muted)] text-center mb-12 max-w-2xl mx-auto">
            See what viewers are saying about Speed and Love across different platforms
          </p>
        </FadeInSection>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          {ratingsList.map((item, index) => (
            <FadeInSection key={item.name} delay={index * 0.1}>
              <div className="glass rounded-2xl p-8 text-center">
                <h3 className="text-lg font-medium text-[var(--text-secondary)] mb-4">
                  {item.name}
                </h3>
                <div className="flex items-baseline justify-center gap-2 mb-4">
                  <span className="text-5xl font-bold gradient-text">
                    <AnimatedCounter
                      value={item.rating!.score}
                      decimals={1}
                      duration={1.5}
                      delay={0.3 + index * 0.1}
                    />
                  </span>
                  <span className="text-xl text-[var(--text-muted)]">
                    / {item.rating!.maxScore}
                  </span>
                </div>
                <Rating
                  score={item.rating!.score}
                  maxScore={item.rating!.maxScore}
                  showValue={false}
                  size="md"
                />
                <p className="text-sm text-[var(--text-muted)] mt-4">
                  {item.rating!.voteCount.toLocaleString()} votes
                </p>
              </div>
            </FadeInSection>
          ))}
        </div>
      </div>
    </section>
  );
}
