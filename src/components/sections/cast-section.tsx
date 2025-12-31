"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { FadeInSection, StaggerChildren, StaggerItem } from "@/components/features";
import { Card } from "@/components/ui";
import type { CastMember } from "@/types";
import { getTmdbImageUrl } from "@/config";
import Image from "next/image";

interface CastSectionProps {
  cast: CastMember[];
}

export function CastSection({ cast }: CastSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="py-24">
      <div className="container mx-auto px-6 lg:px-12">
        <FadeInSection>
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-2">
                Meet the Cast
              </h2>
              <p className="text-[var(--text-muted)]">
                The talented actors bringing this story to life
              </p>
            </div>
            <div className="hidden md:flex gap-2">
              <button
                onClick={() => scroll("left")}
                className="p-3 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] transition-colors"
                aria-label="Scroll left"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() => scroll("right")}
                className="p-3 rounded-full bg-[var(--surface-secondary)] hover:bg-[var(--surface-elevated)] transition-colors"
                aria-label="Scroll right"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </div>
          </div>
        </FadeInSection>

        <div
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          <StaggerChildren className="flex gap-6">
            {cast.slice(0, 10).map((member) => (
              <StaggerItem key={member.id}>
                <CastCard member={member} />
              </StaggerItem>
            ))}
          </StaggerChildren>
        </div>
      </div>
    </section>
  );
}

function CastCard({ member }: { member: CastMember }) {
  const imageUrl = member.profilePath
    ? getTmdbImageUrl(member.profilePath, "profile", "medium")
    : null;

  return (
    <Card
      variant="default"
      hover
      className="flex-shrink-0 w-48 snap-start overflow-hidden group"
    >
      <div className="relative aspect-[2/3] bg-[var(--surface-secondary)] overflow-hidden">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={member.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="192px"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-16 h-16 text-[var(--text-muted)]"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
            </svg>
          </div>
        )}
        {/* Hover overlay */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[var(--text-primary)] truncate">
          {member.name}
        </h3>
        <p className="text-sm text-[var(--text-muted)] truncate">
          as {member.character}
        </p>
      </div>
    </Card>
  );
}
