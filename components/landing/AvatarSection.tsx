"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Monitor, Play, Square } from "lucide-react";
import { useLipsync, type EmotionType, EMOTION_TYPES } from "memoji-talking";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

interface AvatarSectionProps {
  scrollAnimationProgress?: number;
  onEmotionChange?: (emotion: EmotionType) => void;
  onActiveChange?: (isActive: boolean) => void;
  onVisemeChange?: (viseme: string) => void;
}

type AudioSource = "mic" | "system";

const emotions: { type: EmotionType; emoji: string; label: string }[] = [
  { type: "neutral", emoji: "😐", label: "Neutral" },
  { type: "happy", emoji: "😊", label: "Happy" },
  { type: "excited", emoji: "🤩", label: "Excited" },
  { type: "sad", emoji: "😢", label: "Sad" },
  { type: "surprised", emoji: "😮", label: "Surprised" },
  { type: "thinking", emoji: "🤔", label: "Thinking" },
];

export function AvatarSection({
  onEmotionChange,
  onActiveChange,
  onVisemeChange,
}: AvatarSectionProps) {
  const [emotion, setEmotion] = useState<EmotionType>("neutral");
  const [hasInteracted, setHasInteracted] = useState(false);
  const [audioSource, setAudioSource] = useState<AudioSource>("mic");

  const {
    viseme,
    isActive,
    audioLevel,
    startLipsync,
    stopLipsync,
    systemAudioSupport,
  } = useLipsync({ sensitivity: 0.5 });

  // Notify parent of changes
  useEffect(() => {
    onEmotionChange?.(emotion);
  }, [emotion, onEmotionChange]);

  useEffect(() => {
    onActiveChange?.(isActive);
  }, [isActive, onActiveChange]);

  useEffect(() => {
    onVisemeChange?.(viseme);
  }, [viseme, onVisemeChange]);

  // Auto-cycle emotions when not interacted
  useEffect(() => {
    if (hasInteracted) return;

    const emotionList = Object.values(EMOTION_TYPES);
    let index = 0;

    const interval = setInterval(() => {
      index = (index + 1) % emotionList.length;
      setEmotion(emotionList[index]);
    }, 2000);

    return () => clearInterval(interval);
  }, [hasInteracted]);

  const handleEmotionClick = useCallback((newEmotion: EmotionType) => {
    setHasInteracted(true);
    setEmotion(newEmotion);
  }, []);

  const handleToggleAudio = useCallback(async () => {
    setHasInteracted(true);
    if (isActive) {
      stopLipsync();
    } else {
      await startLipsync(audioSource);
    }
  }, [isActive, audioSource, startLipsync, stopLipsync]);

  const handleSourceChange = useCallback((source: AudioSource) => {
    setAudioSource(source);
    if (isActive) {
      stopLipsync();
    }
  }, [isActive, stopLipsync]);

  // Calculate audio level bars
  const audioLevelBars = Array.from({ length: 5 }, (_, i) => {
    const threshold = (i + 1) * 0.2;
    return audioLevel >= threshold;
  });

  return (
    <section
      id="avatar-section"
      className="relative min-h-screen flex items-center py-20"
    >
      <div className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Avatar Side */}
          <div className="relative flex items-center justify-center">
            {/* Placeholder for AnimatedMemoji */}
            <div
              id="avatar-memoji-placeholder"
              className="relative w-[200px] h-[200px] rounded-full"
            >
              {/* Decorative rotating ring */}
              <motion.div
                className="absolute inset-[-20px] rounded-full border-2 border-dashed border-primary-500/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Outer glow ring */}
              <motion.div
                className="absolute inset-[-10px] rounded-full bg-gradient-to-r from-primary-500/20 to-accent-500/20 blur-xl"
                animate={{
                  opacity: isActive ? [0.4, 0.8, 0.4] : 0.3,
                  scale: isActive ? [1, 1.1, 1] : 1,
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            </div>

            {/* Audio Level Indicator */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex items-end gap-1 h-8">
              {audioLevelBars.map((active, i) => (
                <motion.div
                  key={i}
                  className={cn(
                    "w-2 rounded-full transition-colors",
                    active ? "bg-primary-500" : "bg-white/20"
                  )}
                  animate={{
                    height: active ? `${(i + 1) * 6 + 8}px` : "8px",
                  }}
                  transition={{ duration: 0.1 }}
                />
              ))}
            </div>
          </div>

          {/* Controls Side */}
          <div className="space-y-8">
            {/* Live Demo Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-green-500/10 border border-green-500/30">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              <span className="text-sm text-green-400 font-medium">
                Live Demo
              </span>
            </div>

            {/* Heading */}
            <div>
              <h2 className="text-4xl sm:text-5xl font-bold">
                <span className="text-white">Meet Your</span>
                <br />
                <span className="text-gradient">Game Host</span>
              </h2>
              <p className="mt-4 text-gray-400 text-lg">
                Try our expressive avatar with real-time lip-sync and emotion
                controls. Enable your microphone to see it in action!
              </p>
            </div>

            {/* Audio Source Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => handleSourceChange("mic")}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  audioSource === "mic"
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                )}
              >
                <Mic className="w-4 h-4" />
                <span className="text-sm">Mic</span>
              </button>
              <button
                onClick={() => handleSourceChange("system")}
                disabled={!systemAudioSupport.supported}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  audioSource === "system"
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/50"
                    : "text-gray-400 hover:text-white hover:bg-white/5",
                  !systemAudioSupport.supported && "opacity-50 cursor-not-allowed"
                )}
              >
                <Monitor className="w-4 h-4" />
                <span className="text-sm">System</span>
              </button>
            </div>

            {/* Start/Stop Button */}
            <Button
              onClick={handleToggleAudio}
              variant={isActive ? "secondary" : "primary"}
              size="lg"
              className={cn(
                isActive && "border-red-500 text-red-400 hover:bg-red-500/10"
              )}
            >
              {isActive ? (
                <>
                  <Square className="w-5 h-5 mr-2" />
                  Stop Listening
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start Listening
                </>
              )}
            </Button>

            {/* Emotion Selector */}
            <div className="space-y-3">
              <p className="text-sm text-gray-500 font-medium">Emotions</p>
              <div className="flex flex-wrap gap-2">
                {emotions.map((e) => (
                  <button
                    key={e.type}
                    onClick={() => handleEmotionClick(e.type)}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 rounded-lg transition-all",
                      emotion === e.type
                        ? "bg-white/10 border border-white/20 scale-105"
                        : "bg-white/5 border border-transparent hover:bg-white/10"
                    )}
                  >
                    <span className="text-xl">{e.emoji}</span>
                    <span className="text-sm text-gray-300">{e.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Feature Stats */}
            <div className="flex gap-4">
              <Card variant="glass" padding="md" className="flex-1 text-center">
                <p className="text-2xl font-bold text-gradient">60 FPS</p>
                <p className="text-sm text-gray-500">Fluid Animation</p>
              </Card>
              <Card variant="glass" padding="md" className="flex-1 text-center">
                <p className="text-2xl font-bold text-gradient">&lt;50ms</p>
                <p className="text-sm text-gray-500">Response Time</p>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
