"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "ref"> {
  variant?: "default" | "glass" | "elevated";
  hover?: boolean;
  children: ReactNode;
}

const variantStyles = {
  default: "bg-[var(--surface-primary)] border border-[var(--border-subtle)]",
  glass: "glass",
  elevated:
    "bg-[var(--surface-elevated)] border border-[var(--border-subtle)] shadow-lg",
};

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    { variant = "default", hover = false, className = "", children, ...props },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={`
          rounded-2xl overflow-hidden
          ${variantStyles[variant]}
          ${hover ? "transition-transform duration-300" : ""}
          ${className}
        `}
        whileHover={hover ? { y: -4, scale: 1.02 } : undefined}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export interface CardHeaderProps {
  children: ReactNode;
  className?: string;
}

export function CardHeader({ children, className = "" }: CardHeaderProps) {
  return <div className={`p-6 pb-0 ${className}`}>{children}</div>;
}

export interface CardContentProps {
  children: ReactNode;
  className?: string;
}

export function CardContent({ children, className = "" }: CardContentProps) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export interface CardFooterProps {
  children: ReactNode;
  className?: string;
}

export function CardFooter({ children, className = "" }: CardFooterProps) {
  return (
    <div
      className={`p-6 pt-0 border-t border-[var(--border-subtle)] ${className}`}
    >
      {children}
    </div>
  );
}
