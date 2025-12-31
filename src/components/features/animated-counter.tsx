"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "framer-motion";

export interface AnimatedCounterProps {
  value: number;
  duration?: number;
  delay?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  className?: string;
  once?: boolean;
}

export function AnimatedCounter({
  value,
  duration = 2,
  delay = 0,
  decimals = 0,
  prefix = "",
  suffix = "",
  className = "",
  once = true,
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });
  const [hasAnimated, setHasAnimated] = useState(false);

  const spring = useSpring(0, {
    duration: duration * 1000,
    bounce: 0,
  });

  const display = useTransform(spring, (current) => {
    return `${prefix}${current.toFixed(decimals)}${suffix}`;
  });

  useEffect(() => {
    if (isInView && !hasAnimated) {
      const timer = setTimeout(() => {
        spring.set(value);
        setHasAnimated(true);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, value, spring, delay, hasAnimated]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

export interface AnimatedPercentageProps {
  value: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
  label?: string;
  className?: string;
}

const sizeStyles = {
  sm: { container: "w-16 h-16", text: "text-sm", stroke: 4 },
  md: { container: "w-24 h-24", text: "text-lg", stroke: 5 },
  lg: { container: "w-32 h-32", text: "text-2xl", stroke: 6 },
};

export function AnimatedPercentage({
  value,
  size = "md",
  showLabel = true,
  label,
  className = "",
}: AnimatedPercentageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const styles = sizeStyles[size];
  const radius = 45;
  const circumference = 2 * Math.PI * radius;

  const spring = useSpring(0, {
    duration: 1500,
    bounce: 0,
  });

  const strokeDashoffset = useTransform(spring, (current) => {
    return circumference - (current / 100) * circumference;
  });

  useEffect(() => {
    if (isInView) {
      spring.set(Math.min(value, 100));
    }
  }, [isInView, value, spring]);

  return (
    <div ref={ref} className={`flex flex-col items-center gap-2 ${className}`}>
      <div className={`relative ${styles.container}`}>
        <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
          {/* Background circle */}
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--surface-elevated)"
            strokeWidth={styles.stroke}
          />
          {/* Animated progress circle */}
          <motion.circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth={styles.stroke}
            strokeLinecap="round"
            strokeDasharray={circumference}
            style={{ strokeDashoffset }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="var(--accent-primary)" />
              <stop offset="100%" stopColor="var(--accent-secondary)" />
            </linearGradient>
          </defs>
        </svg>
        {/* Center text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <AnimatedCounter
            value={value}
            suffix="%"
            className={`font-bold ${styles.text}`}
          />
        </div>
      </div>
      {showLabel && label && (
        <span className="text-[var(--text-muted)] text-sm">{label}</span>
      )}
    </div>
  );
}
