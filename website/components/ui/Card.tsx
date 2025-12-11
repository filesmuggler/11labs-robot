"use client";

import { forwardRef, type HTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type CardVariant = "elevated" | "glass" | "outline";
type CardHover = "lift" | "glow" | "none";
type CardPadding = "none" | "sm" | "md" | "lg" | "xl";

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: CardVariant;
  hover?: CardHover;
  padding?: CardPadding;
  children: ReactNode;
}

const variantStyles: Record<CardVariant, string> = {
  glass: "glass-card",
  elevated: cn(
    "bg-gray-900",
    "border border-gray-800",
    "shadow-xl"
  ),
  outline: cn(
    "bg-transparent",
    "border border-white/10"
  ),
};

const hoverStyles: Record<CardHover, string> = {
  lift: "hover:-translate-y-1 hover:shadow-2xl transition-all duration-300",
  glow: "hover:shadow-primary-500/20 hover:shadow-2xl transition-shadow duration-300",
  none: "",
};

const paddingStyles: Record<CardPadding, string> = {
  none: "p-0",
  sm: "p-3",
  md: "p-4",
  lg: "p-6",
  xl: "p-8",
};

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className,
      variant = "glass",
      hover = "none",
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    return (
      <motion.div
        ref={ref}
        className={cn(
          "rounded-2xl",
          variantStyles[variant],
          hoverStyles[hover],
          paddingStyles[padding],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export { Card, type CardProps, type CardVariant, type CardHover, type CardPadding };

