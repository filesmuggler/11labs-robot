"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

interface ScrollProgressProps {
  threshold?: number;
  onSnapTriggered?: (direction: "up" | "down") => void;
}

export function ScrollProgress({
  threshold = 0.35,
  onSnapTriggered,
}: ScrollProgressProps) {
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState<"up" | "down">("down");
  const [currentSection, setCurrentSection] = useState(0);
  const isSnappingRef = useRef(false);
  const lastScrollRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const scrollDelta = scrollY - lastScrollRef.current;
      lastScrollRef.current = scrollY;

      // Determine current section based on scroll position
      const inSecondSection = scrollY > viewportHeight * 0.5;

      // Update scroll direction
      if (scrollDelta > 0) {
        setDirection("down");
      } else if (scrollDelta < 0) {
        setDirection("up");
      }

      // Calculate progress based on which section we're in and direction
      let scrollProgress = 0;

      if (!inSecondSection) {
        // In hero section, scrolling down
        setCurrentSection(0);
        scrollProgress = Math.min(1, scrollY / (viewportHeight * 0.4));
      } else {
        // In avatar section, calculate progress for scrolling up
        setCurrentSection(1);
        const distanceFromTop = scrollY - viewportHeight;
        const scrollUpProgress = Math.max(0, -distanceFromTop / (viewportHeight * 0.3));
        scrollProgress = scrollUpProgress;
      }

      setProgress(scrollProgress);

      // Snap DOWN: when in hero section and scrolled past threshold
      if (!inSecondSection && scrollProgress >= threshold && !isSnappingRef.current && direction === "down") {
        isSnappingRef.current = true;
        onSnapTriggered?.("down");

        // Smooth scroll to avatar section
        window.scrollTo({
          top: viewportHeight,
          behavior: "smooth",
        });

        setTimeout(() => {
          isSnappingRef.current = false;
        }, 800);
      }

      // Snap UP: when at top of avatar section and scrolling up past threshold
      if (inSecondSection && scrollY < viewportHeight * 1.15 && scrollY > viewportHeight * 0.5) {
        const upProgress = 1 - (scrollY - viewportHeight * 0.5) / (viewportHeight * 0.65);
        setProgress(Math.max(0, Math.min(1, upProgress)));

        if (upProgress >= threshold && !isSnappingRef.current && direction === "up") {
          isSnappingRef.current = true;
          onSnapTriggered?.("up");

          // Smooth scroll to hero section
          window.scrollTo({
            top: 0,
            behavior: "smooth",
          });

          setTimeout(() => {
            isSnappingRef.current = false;
          }, 800);
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold, direction, onSnapTriggered]);

  // Show scroll indicator - always visible in hero section, conditional in avatar section
  const showProgressBar =
    currentSection === 0 ||
    (currentSection === 1 && typeof window !== "undefined" && window.scrollY < window.innerHeight * 1.3);

  return (
    <AnimatePresence>
      {showProgressBar && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center gap-2"
        >
          {/* Only show mouse indicator, label, and progress bar in hero section */}
          <AnimatePresence>
            {currentSection === 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center gap-2"
              >
                {/* Mouse scroll indicator */}
                <div className="flex flex-col items-center gap-1">
                  <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center pt-2">
                    <motion.div
                      className="w-1.5 h-2.5 bg-white/60 rounded-full"
                      animate={{ y: [0, 6, 0] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    />
                  </div>
                  <motion.svg
                    width="12"
                    height="8"
                    viewBox="0 0 12 8"
                    className="text-white/40"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <path
                      d="M1 1L6 6L11 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      fill="none"
                    />
                  </motion.svg>
                </div>

                {/* Label */}
                <motion.span
                  className="text-xs text-white/60 font-medium"
                  animate={{ opacity: progress > 0.05 ? 1 : 0.5 }}
                >
                  {progress < threshold ? "Scroll down" : "Release to navigate"}
                </motion.span>

                {/* Progress bar container */}
                <div className="relative w-48 h-1.5 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
                  {/* Progress fill */}
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full"
                    animate={{ width: `${progress * 100}%` }}
                    style={{
                      background:
                        progress >= threshold
                          ? "linear-gradient(90deg, #a855f7, #ec4899, #f97316)"
                          : "linear-gradient(90deg, #a855f7, #ec4899)",
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />

                  {/* Threshold marker */}
                  <div
                    className="absolute top-0 bottom-0 w-0.5 bg-white/30"
                    style={{ left: `${threshold * 100}%` }}
                  />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section indicator dots - always visible */}
          <div className="flex gap-2 mt-1">
            <motion.div
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: currentSection === 0 ? "#a855f7" : "rgba(255,255,255,0.3)",
              }}
            />
            <motion.div
              className="w-2 h-2 rounded-full transition-colors duration-300"
              style={{
                backgroundColor: currentSection === 1 ? "#a855f7" : "rgba(255,255,255,0.3)",
              }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

