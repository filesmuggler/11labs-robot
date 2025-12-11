"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { useRef } from "react";
import {
  Waves,
  Mic,
  Brain,
  Volume2,
  Timer,
  Zap,
  ArrowRight,
  Sparkles,
  Bot,
  Cpu,
  Globe,
  Heart,
  Rocket,
  Eye,
  MessageCircle,
  CircuitBoard,
  Lightbulb,
  Target,
  Users,
  Infinity,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

// Manifesto statements - bold, concise, visionary
const manifestoStatements = [
  {
    statement: "Robots should talk, not just respond.",
    description: "True conversation means understanding context, emotion, and intent in real-time.",
  },
  {
    statement: "Latency is the enemy of connection.",
    description: "Sub-300ms response times make the difference between mechanical and magical.",
  },
  {
    statement: "Every robot deserves a soul.",
    description: "Personality isn't programmed. It's enabled through natural, emotional interaction.",
  },
  {
    statement: "The future of robotics is conversational.",
    description: "Physical capability is only half the equation. Voice completes it.",
  },
  {
    statement: "PartyBot is just the beginning.",
    description: "Today entertainment. Tomorrow healthcare, education, companionship, and beyond.",
  },
];

const visionPillars = [
  {
    icon: Timer,
    title: "Ultra-Low Latency",
    value: "<300ms",
    description: "End-to-end response time that enables natural conversation flow",
    gradient: "from-green-400 to-emerald-500",
  },
  {
    icon: Brain,
    title: "Contextual Intelligence",
    value: "∞ Context",
    description: "Deep understanding of conversation history and user intent",
    gradient: "from-purple-400 to-pink-500",
  },
  {
    icon: Heart,
    title: "Emotional Expression",
    value: "32+ Emotions",
    description: "Voice that conveys empathy, excitement, curiosity, and care",
    gradient: "from-pink-400 to-rose-500",
  },
  {
    icon: Globe,
    title: "Universal Accessibility",
    value: "32+ Languages",
    description: "Breaking language barriers with native-quality multilingual support",
    gradient: "from-blue-400 to-cyan-500",
  },
];

const futureApplications = [
  {
    icon: Users,
    title: "Entertainment",
    description: "Party hosts, game masters, and interactive experiences that bring joy",
    timeline: "Now",
    status: "active",
    highlight: true,
  },
  {
    icon: Bot,
    title: "Service & Hospitality",
    description: "Concierge, reception, and customer service that feels genuinely helpful",
    timeline: "2024",
    status: "emerging",
  },
  {
    icon: Lightbulb,
    title: "Education",
    description: "Patient tutors that adapt to every learning style and pace",
    timeline: "2025",
    status: "future",
  },
  {
    icon: Heart,
    title: "Companion Robots",
    description: "Emotional support and companionship for the elderly and those in need",
    timeline: "2026",
    status: "vision",
  },
  {
    icon: Cpu,
    title: "Healthcare Support",
    description: "Therapy assistants, medication reminders, and wellness companions",
    timeline: "2026",
    status: "vision",
  },
  {
    icon: Rocket,
    title: "Space & Exploration",
    description: "Autonomous companions for long-duration missions and remote operations",
    timeline: "2026+",
    status: "vision",
  },
];

const techStack = [
  { icon: Mic, label: "Speech Recognition", detail: "Real-time transcription" },
  { icon: Brain, label: "LLM Processing", detail: "GPT-4, Claude, Gemini" },
  { icon: Volume2, label: "Voice Synthesis", detail: "1000+ natural voices" },
  { icon: MessageCircle, label: "Turn Detection", detail: "Natural conversation flow" },
  { icon: Eye, label: "Visual Integration", detail: "Emotion-synced avatars" },
  { icon: CircuitBoard, label: "Hardware SDK", detail: "Any robot platform" },
];

export default function ElevenLabsRoboticsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.15], [0, -100]);

  return (
    <div ref={containerRef} className="min-h-screen bg-gray-950 overflow-x-hidden">
      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-lg text-white">
              ElevenLabs <span className="text-gradient">× Robotics</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← Back to PartyBot
            </Link>
            <a
              href="https://elevenlabs.io/conversational-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="sm" variant="secondary">
                Explore Platform
              </Button>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section - Full viewport with scroll indicator */}
      <motion.section
        style={{ opacity: heroOpacity, y: heroY }}
        className="relative min-h-screen flex items-center justify-center px-4 pt-20"
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-purple-500/10 rounded-full animate-[spin_60s_linear_infinite]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-pink-500/5 rounded-full animate-[spin_90s_linear_infinite_reverse]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
              <Waves className="w-4 h-4 text-primary-400 animate-pulse" />
              <span className="text-sm text-gray-300">
                The Vision for Conversational Robotics
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight">
              <span className="text-white">Where Voice</span>
              <br />
              <span className="text-gradient">Meets Machine</span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
              We're building a future where every robot can{" "}
              <span className="text-white font-medium">listen, understand, and speak</span> 
              {" "}with the warmth and intelligence of a true companion.
            </p>

            {/* Key stat */}
            <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-center">
                <p className="text-3xl font-bold text-gradient">&lt;300ms</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Response Time</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-gradient">Real-time</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Conversation</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div className="text-center">
                <p className="text-3xl font-bold text-gradient">Infinite</p>
                <p className="text-xs text-gray-500 uppercase tracking-wider">Possibilities</p>
              </div>
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <span className="text-xs text-gray-500 uppercase tracking-wider">Discover the Vision</span>
            <ChevronDown className="w-5 h-5 text-gray-500 animate-bounce" />
          </motion.div>
        </div>
      </motion.section>

      {/* Manifesto Section */}
      <section className="py-32 px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 mb-6">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span className="text-sm font-medium text-purple-300">Our Manifesto</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white">
              What We <span className="text-gradient">Believe</span>
            </h2>
          </motion.div>

          <div className="space-y-16">
            {manifestoStatements.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -40 : 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={cn(
                  "flex flex-col gap-4",
                  index % 2 === 0 ? "md:items-start md:text-left" : "md:items-end md:text-right"
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-sm font-mono text-primary-400">0{index + 1}</span>
                  <div className="w-12 h-px bg-gradient-to-r from-primary-500 to-accent-500" />
                </div>
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white max-w-2xl">
                  "{item.statement}"
                </h3>
                <p className="text-lg text-gray-400 max-w-xl">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* The Platform - Combined Pillars & Technology */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              The <span className="text-gradient">Platform</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              ElevenLabs AI Agents - powering the next generation of conversational robots
            </p>
          </motion.div>

          {/* Four Pillars */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {visionPillars.map((pillar, index) => (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" hover="lift" padding="lg" className="h-full text-center">
                  <div className={cn(
                    "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4",
                    "bg-gradient-to-br opacity-20",
                    pillar.gradient
                  )} />
                  <pillar.icon className={cn(
                    "w-8 h-8 mx-auto -mt-14 mb-6",
                    `text-${pillar.gradient.split(" ")[0].replace("from-", "")}`
                  )} style={{ 
                    color: pillar.gradient.includes("green") ? "#4ade80" :
                           pillar.gradient.includes("purple") ? "#c084fc" :
                           pillar.gradient.includes("pink") ? "#f472b6" :
                           "#38bdf8"
                  }} />
                  <p className="text-2xl font-bold text-gradient mb-2">{pillar.value}</p>
                  <h3 className="text-lg font-semibold text-white mb-2">{pillar.title}</h3>
                  <p className="text-sm text-gray-400">{pillar.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Technology Stack */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="glass" padding="md" className="text-center h-full">
                  <tech.icon className="w-8 h-8 mx-auto mb-3 text-primary-400" />
                  <p className="text-sm font-medium text-white mb-1">{tech.label}</p>
                  <p className="text-xs text-gray-500">{tech.detail}</p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Flow diagram */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 flex items-center justify-center gap-4 flex-wrap"
          >
            <span className="text-gray-400">Human Voice</span>
            <ArrowRight className="w-5 h-5 text-primary-400" />
            <span className="px-3 py-1 rounded bg-primary-500/20 text-primary-300 text-sm">Speech-to-Text</span>
            <ArrowRight className="w-5 h-5 text-primary-400" />
            <span className="px-3 py-1 rounded bg-purple-500/20 text-purple-300 text-sm">LLM</span>
            <ArrowRight className="w-5 h-5 text-primary-400" />
            <span className="px-3 py-1 rounded bg-accent-500/20 text-accent-300 text-sm">Text-to-Speech</span>
            <ArrowRight className="w-5 h-5 text-primary-400" />
            <span className="text-gray-400">Robot Response</span>
          </motion.div>
          
          <p className="text-center text-sm text-gray-500 mt-4">
            All in under 300ms, end-to-end
          </p>
        </div>
      </section>

      {/* Future Applications Timeline */}
      <section className="py-24 px-4 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              The <span className="text-gradient">Roadmap</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From entertainment to healthcare - conversational robotics will transform every industry
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {futureApplications.map((app, index) => (
              <motion.div
                key={app.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  variant="glass" 
                  hover="lift" 
                  padding="lg" 
                  className={cn(
                    "h-full relative overflow-hidden",
                    app.highlight && "border-primary-500/50 bg-primary-500/5"
                  )}
                >
                  {app.highlight && (
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 rounded-full bg-primary-500/20 text-xs font-medium text-primary-300">
                        PartyBot
                      </span>
                    </div>
                  )}
                  
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center",
                      app.status === "active" ? "bg-green-500/20" :
                      app.status === "emerging" ? "bg-yellow-500/20" :
                      app.status === "future" ? "bg-blue-500/20" :
                      "bg-purple-500/20"
                    )}>
                      <app.icon className={cn(
                        "w-6 h-6",
                        app.status === "active" ? "text-green-400" :
                        app.status === "emerging" ? "text-yellow-400" :
                        app.status === "future" ? "text-blue-400" :
                        "text-purple-400"
                      )} />
                    </div>
                    <span className={cn(
                      "text-xs font-mono px-2 py-1 rounded",
                      app.status === "active" ? "bg-green-500/20 text-green-400" :
                      app.status === "emerging" ? "bg-yellow-500/20 text-yellow-400" :
                      app.status === "future" ? "bg-blue-500/20 text-blue-400" :
                      "bg-purple-500/20 text-purple-400"
                    )}>
                      {app.timeline}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2">{app.title}</h3>
                  <p className="text-sm text-gray-400">{app.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Big Vision Statement */}
      <section className="py-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/5 to-primary-500/10" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/5 rounded-full blur-3xl" />
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative z-10 max-w-4xl mx-auto text-center"
        >
          <Infinity className="w-16 h-16 mx-auto mb-8 text-primary-400" />
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-8 leading-tight">
            We're not building <span className="text-gradient">talking robots</span>.
            <br />
            We're building <span className="text-gradient">companions</span>.
          </h2>
          
          <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-12">
            Machines that understand. That empathize. That make life a little 
            more joyful, a little less lonely, and infinitely more connected.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://elevenlabs.io/conversational-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="xl">
                <Zap className="w-5 h-5 mr-2" />
                Start Building
              </Button>
            </a>
            <Link href="/pricing">
              <Button variant="secondary" size="xl">
                Get PartyBot
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Call to Action */}
      <section className="py-24 px-4 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" padding="xl" className="h-full">
                <Target className="w-10 h-10 text-primary-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">For Builders</h3>
                <p className="text-gray-400 mb-6">
                  Access the ElevenLabs AI Agents Platform and start building 
                  voice-enabled robotics applications today.
                </p>
                <a
                  href="https://elevenlabs.io/docs/conversational-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="secondary" className="w-full">
                    Read the Docs
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </a>
              </Card>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card variant="glass" padding="xl" className="h-full border-primary-500/30">
                <Bot className="w-10 h-10 text-primary-400 mb-4" />
                <h3 className="text-2xl font-bold text-white mb-3">Experience It Now</h3>
                <p className="text-gray-400 mb-6">
                  Get PartyBot and experience the future of conversational 
                  robotics at your next event.
                </p>
                <Link href="/pricing">
                  <Button className="w-full">
                    Get PartyBot
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12 px-4 bg-gray-950">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <span className="text-2xl">🤖</span>
              <div>
                <p className="font-bold text-white">ElevenLabs × Robotics</p>
                <p className="text-sm text-gray-500">The future of conversational machines</p>
              </div>
            </div>
            
            <div className="flex items-center gap-6">
              <a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                ElevenLabs Platform
              </a>
              <a
                href="https://elevenlabs.io/docs"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                Documentation
              </a>
              <Link
                href="/"
                className="text-sm text-gray-400 hover:text-white transition-colors"
              >
                PartyBot Home
              </Link>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} PartyBot. Powered by{" "}
              <a
                href="https://elevenlabs.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-400 hover:text-primary-300"
              >
                ElevenLabs
              </a>
              {" "}AI Agents Platform.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
