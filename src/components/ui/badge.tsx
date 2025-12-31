import type { ReactNode } from "react";

export interface BadgeProps {
  variant?: "default" | "accent" | "outline" | "success" | "warning";
  size?: "sm" | "md";
  children: ReactNode;
  className?: string;
}

const variantStyles = {
  default:
    "bg-[var(--surface-elevated)] text-[var(--text-secondary)]",
  accent:
    "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-white",
  outline:
    "bg-transparent border border-[var(--border-default)] text-[var(--text-secondary)]",
  success:
    "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30",
  warning:
    "bg-amber-500/20 text-amber-400 border border-amber-500/30",
};

const sizeStyles = {
  sm: "px-2 py-0.5 text-xs",
  md: "px-3 py-1 text-sm",
};

export function Badge({
  variant = "default",
  size = "sm",
  children,
  className = "",
}: BadgeProps) {
  return (
    <span
      className={`
        inline-flex items-center font-medium rounded-full
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
    >
      {children}
    </span>
  );
}
