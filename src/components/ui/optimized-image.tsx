"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { getTmdbImageUrl, type TMDB_IMAGE_SIZES } from "@/config";

export interface OptimizedImageProps extends Omit<ImageProps, "src"> {
  tmdbPath: string | null;
  imageType?: keyof typeof TMDB_IMAGE_SIZES;
  fallback?: string;
}

export function OptimizedImage({
  tmdbPath,
  imageType = "poster",
  fallback = "/placeholder.svg",
  alt,
  className = "",
  onLoad,
  ...props
}: OptimizedImageProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const src = hasError || !tmdbPath
    ? fallback
    : getTmdbImageUrl(tmdbPath, imageType, "large") || fallback;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blur placeholder */}
      {isLoading && (
        <div className="absolute inset-0 bg-[var(--surface-secondary)] animate-pulse" />
      )}

      <Image
        src={src}
        alt={alt}
        className={`
          object-cover transition-opacity duration-300
          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
        onLoad={(e) => {
          setIsLoading(false);
          onLoad?.(e);
        }}
        onError={() => {
          setHasError(true);
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}

export interface BackdropImageProps {
  tmdbPath: string | null;
  alt: string;
  priority?: boolean;
  className?: string;
  overlay?: boolean;
}

export function BackdropImage({
  tmdbPath,
  alt,
  priority = false,
  className = "",
  overlay = true,
}: BackdropImageProps) {
  const src = tmdbPath
    ? getTmdbImageUrl(tmdbPath, "backdrop", "original")
    : null;

  if (!src) {
    return (
      <div
        className={`bg-gradient-to-br from-[var(--surface-primary)] to-[var(--surface-secondary)] ${className}`}
      />
    );
  }

  return (
    <div className={`relative ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover"
        sizes="100vw"
      />
      {overlay && (
        <>
          {/* Bottom gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[var(--background)] via-transparent to-transparent" />
          {/* Left gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/80 via-transparent to-transparent" />
          {/* Overall darkening */}
          <div className="absolute inset-0 bg-black/30" />
        </>
      )}
    </div>
  );
}
