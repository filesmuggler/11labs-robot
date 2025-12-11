"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Waves,
  Mic,
  Brain,
  Volume2,
  Timer,
  MessageSquare,
  Languages,
  Bot,
  Building2,
  GraduationCap,
  HeartPulse,
  Home,
  Headphones,
  Check,
  Zap,
  ExternalLink,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const platformFeatures = [
  {
    icon: Mic,
    title: "Speech-to-Text Engine",
    description: "Accurate real-time transcription with support for multiple accents and speaking styles",
    gradient: "from-blue-500 to-cyan-500",
    bgColor: "bg-blue-500/10",
  },
  {
    icon: Brain,
    title: "LLM Integration",
    description: "Works seamlessly with GPT-4, Claude, Gemini, and custom models",
    gradient: "from-purple-500 to-pink-500",
    bgColor: "bg-purple-500/10",
  },
  {
    icon: Volume2,
    title: "Natural Text-to-Speech",
    description: "Industry-leading voice synthesis with emotional range and natural cadence",
    gradient: "from-orange-500 to-red-500",
    bgColor: "bg-orange-500/10",
  },
  {
    icon: Timer,
    title: "Ultra-Low Latency",
    description: "Sub-300ms end-to-end response times for natural conversations",
    gradient: "from-green-500 to-emerald-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: MessageSquare,
    title: "Turn-Taking Detection",
    description: "Intelligent interruption handling and natural conversation flow",
    gradient: "from-yellow-500 to-orange-500",
    bgColor: "bg-yellow-500/10",
  },
  {
    icon: Languages,
    title: "Multilingual Support",
    description: "32+ languages with native-quality pronunciation and localization",
    gradient: "from-pink-500 to-rose-500",
    bgColor: "bg-pink-500/10",
  },
];

const technicalSpecs = [
  { label: "Response Latency", value: "<300ms" },
  { label: "Languages Supported", value: "32+" },
  { label: "Voice Library", value: "1000+" },
  { label: "Audio Quality", value: "24kHz" },
  { label: "Uptime SLA", value: "99.9%" },
  { label: "SDK Support", value: "5+" },
];

const useCases = [
  {
    icon: Bot,
    title: "Interactive Party Robots",
    description: "Create engaging entertainment experiences with personality-driven AI companions",
    example: "PartyBot - AI game host for parties",
  },
  {
    icon: Building2,
    title: "Hospitality & Concierge",
    description: "Voice-enabled service robots for hotels, restaurants, and venues",
    example: "Hotel check-in assistants",
  },
  {
    icon: GraduationCap,
    title: "Educational Companions",
    description: "Interactive learning assistants that adapt to student needs",
    example: "Language tutoring robots",
  },
  {
    icon: HeartPulse,
    title: "Healthcare Assistants",
    description: "Supportive companions for elderly care and patient interaction",
    example: "Medication reminder robots",
  },
  {
    icon: Home,
    title: "Smart Home Integration",
    description: "Natural voice control for connected home devices and automation",
    example: "Smart home hub assistants",
  },
  {
    icon: Headphones,
    title: "Customer Service Kiosks",
    description: "Self-service terminals with human-like conversation capabilities",
    example: "Retail assistance stations",
  },
];

const integrationSteps = [
  {
    number: "01",
    title: "Create Your Agent",
    description: "Define your robot's personality, voice, and conversation style in the ElevenLabs dashboard",
  },
  {
    number: "02",
    title: "Configure Knowledge Base",
    description: "Upload documents, FAQs, and custom instructions to shape your agent's expertise",
  },
  {
    number: "03",
    title: "Integrate SDK",
    description: "Use the WebSocket API or native SDKs for Python, JavaScript, and more",
  },
  {
    number: "04",
    title: "Deploy & Scale",
    description: "Launch your voice-enabled robot with enterprise-grade reliability",
  },
];

const whyChooseBenefits = [
  "Industry-leading voice quality and naturalness",
  "Lowest latency for real-time conversations",
  "Extensive language and accent support",
  "Flexible LLM integration options",
  "Enterprise-grade security and compliance",
  "Dedicated support for robotics applications",
];

const codeExample = `from elevenlabs import ElevenLabs
from elevenlabs.conversational_ai import ConversationalAI

# Initialize the client
client = ElevenLabs(api_key="your-api-key")

# Create a conversational AI agent
agent = ConversationalAI(
    agent_id="your-agent-id",
    voice_id="partybot-voice",
)

# Start a conversation session
async def handle_audio(audio_stream):
    async for response in agent.converse(audio_stream):
        # Play the response audio
        robot.play_audio(response.audio)
        
        # Update avatar with emotion
        robot.set_emotion(response.emotion)

# Run the conversation loop
robot.start_listening(callback=handle_audio)`;

export default function ElevenLabsRoboticsPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🎉</span>
            <span className="font-bold text-lg text-white">PartyBot</span>
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-400 hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8">
            <Waves className="w-4 h-4 text-primary-400" />
            <span className="text-sm text-gray-300">
              Powered by ElevenLabs AI Agents Platform
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Give Your Robot a</span>
            <br />
            <span className="text-gradient">Natural Voice</span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
            Build incredible voice experiences for robotics applications using
            the same AI platform that powers PartyBot's conversational abilities.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://elevenlabs.io/conversational-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                Explore ElevenLabs Platform
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            </a>
            <Link href="/pricing">
              <Button variant="secondary" size="lg">
                Get PartyBot
              </Button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Platform Features */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Platform <span className="text-gradient">Features</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to build voice-enabled robots with natural,
              engaging conversations.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {platformFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" hover="lift" padding="lg" className="h-full">
                  <div
                    className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                      feature.bgColor
                    )}
                  >
                    <feature.icon
                      className={cn("w-6 h-6 bg-gradient-to-r bg-clip-text", feature.gradient)}
                      style={{ color: feature.gradient.includes("blue") ? "#3b82f6" : 
                               feature.gradient.includes("purple") ? "#a855f7" :
                               feature.gradient.includes("orange") ? "#f97316" :
                               feature.gradient.includes("green") ? "#22c55e" :
                               feature.gradient.includes("yellow") ? "#eab308" :
                               "#ec4899" }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specs */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Technical <span className="text-gradient">Specifications</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {technicalSpecs.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
              >
                <Card variant="glass" padding="md" className="text-center">
                  <p className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                    {spec.value}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">{spec.label}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Use <span className="text-gradient">Cases</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From entertainment to healthcare, voice-enabled robots are transforming
              industries.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((useCase, index) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card variant="glass" hover="lift" padding="lg" className="h-full">
                  <useCase.icon className="w-8 h-8 text-primary-400 mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4">{useCase.description}</p>
                  <div className="px-3 py-2 rounded-lg bg-gray-800/50 text-xs text-gray-300">
                    Example: {useCase.example}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Steps */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Integration <span className="text-gradient">Steps</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Get your robot talking in four simple steps.
            </p>
          </motion.div>

          <div className="space-y-8">
            {integrationSteps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex gap-6"
              >
                <div className="flex-shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-500/20 to-accent-500/20 border border-primary-500/30 flex items-center justify-center">
                    <span className="text-lg font-bold text-gradient">
                      {step.number}
                    </span>
                  </div>
                </div>
                <div className="pt-2">
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-400">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Simple <span className="text-gradient">Integration</span>
            </h2>
            <p className="text-gray-400 text-lg">
              Just a few lines of code to add voice capabilities to your robot.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card variant="elevated" padding="none" className="overflow-hidden">
              {/* Terminal Header */}
              <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/50 border-b border-white/10">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="ml-2 text-sm text-gray-400">robot_voice.py</span>
              </div>
              {/* Code */}
              <pre className="p-6 overflow-x-auto text-sm">
                <code className="text-gray-300 font-mono whitespace-pre">
                  {codeExample}
                </code>
              </pre>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Choose ElevenLabs */}
      <section className="py-20 px-4 bg-white/[0.02]">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Why Choose <span className="text-gradient">ElevenLabs</span>
              </h2>
              <ul className="space-y-4">
                {whyChooseBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-500/20 flex items-center justify-center mt-0.5">
                      <Check className="w-4 h-4 text-primary-400" />
                    </div>
                    <span className="text-gray-300">{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card
                variant="glass"
                padding="xl"
                className="text-center border-primary-500/30"
              >
                <div className="w-20 h-20 rounded-2xl bg-primary-500/20 flex items-center justify-center mx-auto mb-6">
                  <Bot className="w-10 h-10 text-primary-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  See It In Action
                </h3>
                <p className="text-gray-400 mb-6">
                  PartyBot demonstrates the full potential of ElevenLabs AI
                  Agents for entertainment robotics.
                </p>
                <Link href="/pricing">
                  <Button size="lg" className="w-full">
                    Try PartyBot Demo
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            <span className="text-white">Ready to Build</span>
            <br />
            <span className="text-gradient">Voice-Enabled Robots?</span>
          </h2>
          <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
            Start building with ElevenLabs AI Agents today and create amazing
            voice experiences for your robotics applications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://elevenlabs.io/docs"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg">
                <Zap className="w-4 h-4 mr-2" />
                Start Building Free
              </Button>
            </a>
            <a
              href="https://elevenlabs.io/docs/conversational-ai"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="secondary" size="lg">
                Read Documentation
              </Button>
            </a>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            PartyBot is powered by{" "}
            <a
              href="https://elevenlabs.io"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:text-primary-300"
            >
              ElevenLabs
            </a>{" "}
            AI Agents Platform
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © {new Date().getFullYear()} PartyBot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
