"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const steps = [
  {
    number: "01",
    title: "Pick a Character",
    description:
      "PartyBot secretly selects a mystery persona from thousands of famous figures — celebrities, historical icons, or fictional characters.",
  },
  {
    number: "02",
    title: "Ask Questions",
    description:
      'Players take turns asking Yes/No questions to narrow down the identity. "Am I fictional?" "Am I alive?" The AI answers with personality!',
  },
  {
    number: "03",
    title: "Guess Who!",
    description:
      "When you're confident, make your guess! PartyBot reveals the answer and celebrates the winner with style.",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">How It </span>
            <span className="text-gradient">Works</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Playing &quot;Who Am I?&quot; with PartyBot is simple and fun. Here&apos;s
            how a game session unfolds.
          </p>
        </div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="relative"
        >
          {/* Connector Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[calc(16.67%+3.5rem)] right-[calc(16.67%+3.5rem)] h-0.5 bg-gradient-to-r from-primary-500 via-accent-500 to-yellow-500 opacity-30" />

          <div className="grid md:grid-cols-3 gap-12 md:gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                variants={itemVariants}
                className="flex flex-col items-center text-center"
              >
                {/* Number Circle */}
                <div
                  className={cn(
                    "relative w-28 h-28 rounded-full",
                    "flex items-center justify-center",
                    "bg-gradient-to-br from-white/5 to-white/10",
                    "border border-white/10",
                    "mb-6"
                  )}
                >
                  <span className="text-5xl font-bold text-gradient">
                    {step.number}
                  </span>

                  {/* Glow effect */}
                  <div
                    className={cn(
                      "absolute inset-0 rounded-full blur-xl opacity-30",
                      index === 0 && "bg-primary-500",
                      index === 1 && "bg-accent-500",
                      index === 2 && "bg-yellow-500"
                    )}
                  />
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-gray-400 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

