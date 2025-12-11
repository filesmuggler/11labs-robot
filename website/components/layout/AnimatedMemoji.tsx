"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { TalkingFace, type EmotionType } from "memoji-talking";
import { cn } from "@/lib/utils";

interface AnimatedMemojiProps {
  viseme?: string;
  emotion?: EmotionType;
  isActive?: boolean;
  headerPlaceholderId?: string;
  targetPlaceholderId?: string;
  currentSection?: 0 | 1;
}

interface Position {
  x: number;
  y: number;
  width: number;
  height: number;
}

const HEADER_SIZE = 36;
const AVATAR_SIZE = 200;

export function AnimatedMemoji({
  viseme,
  emotion = "neutral",
  isActive = false,
  headerPlaceholderId = "header-memoji-placeholder",
  targetPlaceholderId = "avatar-placeholder",
  currentSection = 0,
}: AnimatedMemojiProps) {
  const [headerPosition, setHeaderPosition] = useState<Position | null>(null);
  const [targetPosition, setTargetPosition] = useState<Position | null>(null);

  const updatePositions = useCallback(() => {
    const headerEl = document.getElementById(headerPlaceholderId);
    const targetEl = document.getElementById(targetPlaceholderId);

    if (headerEl) {
      const rect = headerEl.getBoundingClientRect();
      setHeaderPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
    }

    if (targetEl) {
      const rect = targetEl.getBoundingClientRect();
      setTargetPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        width: rect.width,
        height: rect.height,
      });
    }
  }, [headerPlaceholderId, targetPlaceholderId]);

  useEffect(() => {
    updatePositions();
    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions);
    
    // Update positions on animation frames for smooth tracking
    const interval = setInterval(updatePositions, 100);
    
    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions);
      clearInterval(interval);
    };
  }, [updatePositions]);

  // Determine which position to use
  const isInHeader = currentSection === 0;
  const currentPos = isInHeader ? headerPosition : targetPosition;
  const scale = isInHeader ? HEADER_SIZE / AVATAR_SIZE : 1;

  if (!currentPos) return null;

  return (
    <motion.div
      className="fixed z-60 pointer-events-none"
      animate={{
        x: currentPos.x - AVATAR_SIZE / 2,
        y: currentPos.y - AVATAR_SIZE / 2,
        scale,
      }}
      transition={{
        type: "spring",
        stiffness: 70,
        damping: 15,
      }}
      style={{
        width: AVATAR_SIZE,
        height: AVATAR_SIZE,
      }}
    >
      {/* Glow ring - only visible when large */}
      <motion.div
        className={cn(
          "absolute inset-0 rounded-full",
          "bg-gradient-to-r from-primary-500/20 to-accent-500/20",
          "blur-xl"
        )}
        animate={{
          opacity: isInHeader ? 0 : isActive ? 0.8 : 0.4,
          scale: isActive ? 1.2 : 1,
        }}
        transition={{ duration: 0.3 }}
      />

      {/* Glass container */}
      <div
        className={cn(
          "relative w-full h-full rounded-full overflow-hidden",
          "bg-gradient-to-br from-gray-800/50 to-gray-900/50",
          "backdrop-blur-sm",
          "border border-white/10"
        )}
      >
        <TalkingFace
          viseme={viseme}
          emotion={emotion}
          isActive={isActive}
          size={AVATAR_SIZE}
        />
      </div>
    </motion.div>
  );
}

