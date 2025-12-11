"use client";

import { motion } from "framer-motion";
import { Mic, Brain, Smile, Dice5, Smartphone, Lock } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const features = [
  {
    icon: Mic,
    title: "Voice AI",
    description:
      "Natural voice recognition powered by ElevenLabs. Just talk to PartyBot like a friend.",
    color: "from-purple-500 to-purple-600",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Brain,
    title: "Smart Agent",
    description:
      "Intelligent responses powered by Gemini 2.5 Flash for fair gameplay and clever hints.",
    color: "from-pink-500 to-pink-600",
    bgColor: "bg-pink-500/10",
  },
  {
    icon: Smile,
    title: "Animated Avatar",
    description:
      "Real-time lip-sync and 6 emotion states create genuine personality.",
    color: "from-yellow-500 to-yellow-600",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Dice5,
    title: "Classic Game",
    description:
      'The universally loved "Who Am I?" game with an unlimited character database.',
    color: "from-green-500 to-green-600",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Smartphone,
    title: "Mobile Ready",
    description:
      "Control game settings from your phone. Works seamlessly across all devices.",
    color: "from-blue-500 to-blue-600",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Lock,
    title: "Privacy First",
    description:
      "Secure local processing where possible. No persistent audio storage.",
    color: "from-orange-500 to-orange-600",
    bgColor: "bg-orange-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function Features() {
  return (
    <section id="features" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="text-white">Powered by </span>
            <span className="text-gradient">Advanced AI</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            PartyBot combines cutting-edge voice AI with expressive animation to
            create the ultimate party experience.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={itemVariants}>
              <Card
                variant="glass"
                hover="lift"
                padding="lg"
                className="h-full"
              >
                <div
                  className={cn(
                    "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                    feature.bgColor
                  )}
                >
                  <feature.icon
                    className={cn(
                      "w-6 h-6 bg-gradient-to-r bg-clip-text",
                      feature.color
                    )}
                    style={{
                      stroke: `url(#${feature.title.replace(/\s/g, "")})`,
                    }}
                  />
                  {/* SVG gradient definition */}
                  <svg width="0" height="0" className="absolute">
                    <defs>
                      <linearGradient
                        id={feature.title.replace(/\s/g, "")}
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop
                          offset="0%"
                          stopColor={feature.color.includes("purple") ? "#a855f7" : 
                                    feature.color.includes("pink") ? "#ec4899" :
                                    feature.color.includes("yellow") ? "#eab308" :
                                    feature.color.includes("green") ? "#22c55e" :
                                    feature.color.includes("blue") ? "#3b82f6" :
                                    "#f97316"}
                        />
                        <stop
                          offset="100%"
                          stopColor={feature.color.includes("purple") ? "#9333ea" : 
                                    feature.color.includes("pink") ? "#db2777" :
                                    feature.color.includes("yellow") ? "#ca8a04" :
                                    feature.color.includes("green") ? "#16a34a" :
                                    feature.color.includes("blue") ? "#2563eb" :
                                    "#ea580c"}
                        />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-400">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

