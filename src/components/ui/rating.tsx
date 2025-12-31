"use client";

import { motion } from "framer-motion";

export interface RatingProps {
  score: number;
  maxScore?: number;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  source?: string;
  voteCount?: number;
  className?: string;
}

const sizeStyles = {
  sm: {
    container: "h-1.5",
    text: "text-sm",
    valueText: "text-lg",
  },
  md: {
    container: "h-2",
    text: "text-base",
    valueText: "text-2xl",
  },
  lg: {
    container: "h-3",
    text: "text-lg",
    valueText: "text-4xl",
  },
};

export function Rating({
  score,
  maxScore = 10,
  showValue = true,
  size = "md",
  source,
  voteCount,
  className = "",
}: RatingProps) {
  const percentage = (score / maxScore) * 100;
  const styles = sizeStyles[size];

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      {showValue && (
        <div className="flex items-baseline gap-2">
          <span className={`font-bold ${styles.valueText} gradient-text`}>
            {score.toFixed(1)}
          </span>
          <span className={`text-[var(--text-muted)] ${styles.text}`}>
            / {maxScore}
          </span>
        </div>
      )}

      <div
        className={`w-full bg-[var(--surface-secondary)] rounded-full overflow-hidden ${styles.container}`}
      >
        <motion.div
          className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>

      {(source || voteCount !== undefined) && (
        <div className="flex items-center gap-2 text-[var(--text-muted)] text-xs">
          {source && <span className="capitalize">{source}</span>}
          {voteCount !== undefined && (
            <>
              <span>•</span>
              <span>{voteCount.toLocaleString()} votes</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export interface StarRatingProps {
  score: number;
  maxScore?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const starSizeStyles = {
  sm: "w-4 h-4",
  md: "w-5 h-5",
  lg: "w-6 h-6",
};

export function StarRating({
  score,
  maxScore = 10,
  size = "md",
  className = "",
}: StarRatingProps) {
  const stars = 5;
  const filledStars = (score / maxScore) * stars;

  return (
    <div className={`flex items-center gap-1 ${className}`}>
      {Array.from({ length: stars }).map((_, i) => {
        const fillPercentage = Math.min(Math.max(filledStars - i, 0), 1) * 100;

        return (
          <div key={i} className="relative">
            {/* Empty star */}
            <svg
              className={`${starSizeStyles[size]} text-[var(--surface-elevated)]`}
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            {/* Filled star with clip */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fillPercentage}%` }}
            >
              <svg
                className={`${starSizeStyles[size]} text-[var(--accent-secondary)]`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        );
      })}
    </div>
  );
}
