"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface HeaderProps {
  showMemojiPlaceholder?: boolean;
}

const navLinks = [
  { href: "/elevenlabs-robotics", label: "ElevenLabs x Robotics", gradient: true },
  { href: "/robotics-sdk", label: "Robotics SDK", gradient: true },
  { href: "#features", label: "Features" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "#gallery", label: "Gallery" },
  { href: "/pricing", label: "Pricing" },
];

export function Header({ showMemojiPlaceholder = true }: HeaderProps) {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50",
        "w-[calc(100%-2rem)] max-w-7xl",
        "bg-black/20 backdrop-blur-md",
        "border border-white/10 rounded-2xl",
        "px-4 py-3"
      )}
    >
      <div className="flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          {showMemojiPlaceholder ? (
            <div
              id="header-memoji-placeholder"
              className="w-9 h-9 rounded-full bg-gradient-to-br from-primary-500/30 to-accent-500/30"
            />
          ) : (
            <span className="text-2xl">🎉</span>
          )}
          <span className="font-bold text-lg text-white hidden sm:block">
            PartyBot
          </span>
        </Link>

        {/* Navigation */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                link.gradient
                  ? "text-gradient"
                  : "text-gray-400 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="text-sm text-gray-400 hover:text-white transition-colors hidden sm:block"
          >
            Sign In
          </Link>
          <Link href="/pricing">
            <Button size="sm">Get PartyBot</Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}

