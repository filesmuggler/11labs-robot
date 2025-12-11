"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg" | "xl";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: cn(
    "bg-gradient-to-r from-primary-600 to-accent-500",
    "text-white font-semibold",
    "shadow-lg shadow-primary-500/25",
    "hover:shadow-xl hover:shadow-primary-500/40",
    "transition-shadow duration-300"
  ),
  secondary: cn(
    "border-2 border-primary-500/50",
    "text-primary-400",
    "hover:bg-primary-500/10 hover:border-primary-500",
    "transition-colors duration-300"
  ),
  ghost: cn(
    "text-gray-300",
    "hover:text-white hover:bg-white/10",
    "transition-colors duration-300"
  ),
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "h-8 px-4 text-xs",
  md: "h-10 px-6 text-sm",
  lg: "h-12 px-8 text-base",
  xl: "h-14 px-10 text-lg",
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: 0.95 }}
        className={cn(
          "inline-flex items-center justify-center",
          "rounded-full",
          "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-950",
          "disabled:opacity-50 disabled:pointer-events-none",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export { Button, type ButtonProps, type ButtonVariant, type ButtonSize };

