export interface SkeletonProps {
  className?: string;
  variant?: "text" | "circular" | "rectangular";
}

export function Skeleton({ className = "", variant = "text" }: SkeletonProps) {
  const variantStyles = {
    text: "h-4 rounded",
    circular: "rounded-full",
    rectangular: "rounded-lg",
  };

  return (
    <div
      className={`
        animate-pulse bg-[var(--surface-elevated)]
        ${variantStyles[variant]}
        ${className}
      `}
    />
  );
}

export function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div
      className={`rounded-2xl bg-[var(--surface-primary)] border border-[var(--border-subtle)] p-4 ${className}`}
    >
      <Skeleton variant="rectangular" className="w-full aspect-[2/3] mb-4" />
      <Skeleton className="w-3/4 mb-2" />
      <Skeleton className="w-1/2" />
    </div>
  );
}

export function SkeletonEpisode({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex gap-4 p-4 rounded-xl bg-[var(--surface-primary)] ${className}`}
    >
      <Skeleton variant="rectangular" className="w-40 h-24 shrink-0" />
      <div className="flex-1">
        <Skeleton className="w-1/3 mb-2" />
        <Skeleton className="w-full mb-1" />
        <Skeleton className="w-2/3" />
      </div>
    </div>
  );
}

export function SkeletonCastCard({ className = "" }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-2 ${className}`}>
      <Skeleton variant="circular" className="w-24 h-24" />
      <Skeleton className="w-20" />
      <Skeleton className="w-16" />
    </div>
  );
}
