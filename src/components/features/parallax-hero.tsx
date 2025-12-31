"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { getTmdbImageUrl } from "@/config";

export interface ParallaxHeroProps {
  backdropPath: string | null;
  children: ReactNode;
  className?: string;
}

export function ParallaxHero({
  backdropPath,
  children,
  className = "",
}: ParallaxHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Smoother animations with spring
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax effect for background
  const y = useTransform(smoothProgress, [0, 1], ["0%", "30%"]);
  const scale = useTransform(smoothProgress, [0, 1], [1, 1.1]);
  const opacity = useTransform(smoothProgress, [0, 0.8], [1, 0]);

  const imageSrc = backdropPath
    ? getTmdbImageUrl(backdropPath, "backdrop", "original")
    : null;

  return (
    <div
      ref={containerRef}
      className={`relative min-h-screen overflow-hidden ${className}`}
    >
      {/* Parallax Background */}
      <motion.div
        className="absolute inset-0 -z-10"
        style={{ y, scale }}
      >
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)]" />
        )}

        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/80 via-[var(--background)]/20 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content with fade out on scroll */}
      <motion.div
        className="relative z-10 min-h-screen flex items-center"
        style={{ opacity }}
      >
        {children}
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-[var(--text-muted)]"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-sm">Scroll to explore</span>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14M19 12l-7 7-7-7" />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
}
