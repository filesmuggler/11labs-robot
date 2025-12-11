"use client";

import { useState, useCallback } from "react";
import { Header } from "@/components/layout/Header";
import { AnimatedMemoji } from "@/components/layout/AnimatedMemoji";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { Hero } from "@/components/landing/Hero";
import { AvatarSection } from "@/components/landing/AvatarSection";
import { type EmotionType, EMOTION_TYPES } from "memoji-talking";

export default function Home() {
  const [emotion, setEmotion] = useState<EmotionType>(EMOTION_TYPES.neutral);
  const [isActive, setIsActive] = useState(false);
  const [viseme, setViseme] = useState<string>("");
  const [currentSection, setCurrentSection] = useState<0 | 1>(0);

  const handleSnapTriggered = useCallback(
    (direction: "up" | "down", targetSection: number) => {
      setCurrentSection(targetSection === 0 ? 0 : 1);
    },
    []
  );

  const handleEmotionChange = useCallback((newEmotion: EmotionType) => {
    setEmotion(newEmotion);
  }, []);

  const handleActiveChange = useCallback((active: boolean) => {
    setIsActive(active);
  }, []);

  const handleVisemeChange = useCallback((newViseme: string) => {
    setViseme(newViseme);
  }, []);

  return (
    <main>
      <Header showMemojiPlaceholder={true} />

      <AnimatedMemoji
        viseme={viseme}
        emotion={emotion}
        isActive={isActive}
        headerPlaceholderId="header-memoji-placeholder"
        targetPlaceholderId="avatar-memoji-placeholder"
        currentSection={currentSection}
      />

      <ScrollProgress threshold={0.4} onSnapTriggered={handleSnapTriggered} />

      <Hero />

      <AvatarSection
        onEmotionChange={handleEmotionChange}
        onActiveChange={handleActiveChange}
        onVisemeChange={handleVisemeChange}
      />
    </main>
  );
}
