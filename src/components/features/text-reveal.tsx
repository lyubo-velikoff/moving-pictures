"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  duration?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function TextReveal({
  text,
  className = "",
  delay = 0,
  duration = 0.8,
  once = true,
  as: Component = "h1",
}: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const words = text.split(" ");

  return (
    <Component ref={ref as never} className={`overflow-hidden ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : { y: "100%" }}
            transition={{
              duration,
              delay: delay + i * 0.05,
              ease: [0.25, 0.4, 0.25, 1],
            }}
          >
            {word}
          </motion.span>
          {i < words.length - 1 && " "}
        </span>
      ))}
    </Component>
  );
}

export interface CharacterRevealProps {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  once?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export function CharacterReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  once = true,
  as: Component = "h1",
}: CharacterRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  const characters = text.split("");

  return (
    <Component ref={ref as never} className={className}>
      {characters.map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ opacity: 0, y: 20 }}
          animate={
            isInView
              ? { opacity: 1, y: 0 }
              : { opacity: 0, y: 20 }
          }
          transition={{
            duration: 0.4,
            delay: delay + i * stagger,
            ease: [0.25, 0.4, 0.25, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </Component>
  );
}

export interface GradientTextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  once?: boolean;
}

export function GradientTextReveal({
  text,
  className = "",
  delay = 0,
  once = true,
}: GradientTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-100px" });

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <motion.h1
        className="gradient-text"
        initial={{ y: "100%", opacity: 0 }}
        animate={
          isInView
            ? { y: 0, opacity: 1 }
            : { y: "100%", opacity: 0 }
        }
        transition={{
          duration: 0.8,
          delay,
          ease: [0.25, 0.4, 0.25, 1],
        }}
      >
        {text}
      </motion.h1>
    </div>
  );
}
