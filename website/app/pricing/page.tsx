"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Camera,
  Bot,
  Sparkles,
  Check,
  Minus,
  Gamepad2,
  Headphones,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";

const freePlan = {
  icon: Camera,
  name: "Free",
  description: "Perfect for trying out PartyBot",
  price: "$0",
  period: "forever",
  ctaText: "Start Free",
  ctaLink: "/sign-up?plan=free",
  featured: false,
  features: [
    { name: "Avatar-only mode", included: true },
    { name: "Camera-based interaction", included: true },
    { name: '"Who Am I?" game', included: true },
    { name: "Basic voice recognition", included: true },
    { name: "Up to 5 players", included: true },
    { name: "Community support", included: true },
    { name: "Physical robot", included: false },
    { name: "Premium games", included: false },
    { name: "Priority support", included: false },
  ],
};

const partyBotPlan = {
  icon: Bot,
  name: "PartyBot",
  description: "The complete party experience",
  price: "$499",
  period: "one-time",
  ctaText: "Get PartyBot",
  ctaLink: "/pricing/checkout",
  featured: true,
  badge: "Most Popular",
  features: [
    { name: "Physical PartyBot robot", included: true },
    { name: "Avatar on robot screen", included: true },
    { name: '"Who Am I?" + more games coming', included: true },
    { name: "Advanced AI voice recognition", included: true },
    { name: "Unlimited players", included: true },
    { name: "Premium games access", included: true },
    { name: "Free software updates forever", included: true },
    { name: "Priority email support", included: true },
    { name: "1-year hardware warranty", included: true },
  ],
};

const includedFeatures = [
  {
    icon: Bot,
    title: "Physical Robot",
    description: "Tabletop robot with built-in display, speakers, and microphone array",
  },
  {
    icon: Gamepad2,
    title: "Party Games",
    description: '"Who Am I?" and more games coming with free updates',
  },
  {
    icon: Headphones,
    title: "Premium Support",
    description: "Priority email support for any questions or issues",
  },
  {
    icon: Shield,
    title: "Lifetime Updates",
    description: "Free software updates forever, no subscription required",
  },
];

function FeatureCheck({ included }: { included: boolean }) {
  if (included) {
    return (
      <div className="flex-shrink-0 w-5 h-5 rounded-full bg-primary-500/20 flex items-center justify-center">
        <Check className="w-3 h-3 text-primary-400" />
      </div>
    );
  }
  return (
    <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gray-700/50 flex items-center justify-center">
      <Minus className="w-3 h-3 text-gray-500" />
    </div>
  );
}

function PricingCard({
  plan,
}: {
  plan: typeof freePlan | typeof partyBotPlan;
}) {
  const Icon = plan.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: plan.featured ? 0.1 : 0 }}
      className="relative"
    >
      {/* Gradient border for featured plan */}
      {plan.featured && (
        <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary-500 via-accent-500 to-primary-500 opacity-70" />
      )}

      <Card
        variant={plan.featured ? "elevated" : "glass"}
        padding="none"
        className={cn(
          "relative h-full flex flex-col",
          plan.featured && "bg-gradient-to-b from-gray-900 to-gray-950"
        )}
      >
        {/* Badge */}
        {plan.featured && "badge" in plan && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-primary-600 to-accent-500 text-white text-sm font-medium">
              <Sparkles className="w-3.5 h-3.5" />
              {plan.badge}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-8 flex flex-col h-full">
          {/* Header */}
          <div className="mb-6">
            <div
              className={cn(
                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                plan.featured ? "bg-primary-500/20" : "bg-white/10"
              )}
            >
              <Icon
                className={cn(
                  "w-6 h-6",
                  plan.featured ? "text-primary-400" : "text-gray-400"
                )}
              />
            </div>
            <h3 className="text-2xl font-bold text-white">{plan.name}</h3>
            <p className="text-gray-400 mt-1">{plan.description}</p>
          </div>

          {/* Price */}
          <div className="mb-6">
            <span className="text-4xl sm:text-5xl font-bold text-white">
              {plan.price}
            </span>
            <span className="text-gray-400 ml-2">/ {plan.period}</span>
          </div>

          {/* CTA */}
          <Link href={plan.ctaLink} className="mb-6">
            <Button
              variant={plan.featured ? "primary" : "secondary"}
              size="lg"
              className="w-full"
            >
              {plan.ctaText}
            </Button>
          </Link>

          {/* Features */}
          <div className="flex-1">
            <p className="text-sm text-gray-500 font-medium mb-4">
              {plan.featured ? "Everything included:" : "What's included:"}
            </p>
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature.name} className="flex items-start gap-3">
                  <FeatureCheck included={feature.included} />
                  <span
                    className={cn(
                      "text-sm",
                      feature.included ? "text-gray-300" : "text-gray-500"
                    )}
                  >
                    {feature.name}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-gray-950">
      {/* Simple Header */}
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
      <section className="pt-32 pb-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Choose Your</span>
            <br />
            <span className="text-gradient">Party Experience</span>
          </h1>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Try the free avatar version on any device, or get the complete
            PartyBot robot for the ultimate party experience.
          </p>
        </motion.div>
      </section>

      {/* Pricing Plans */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            <PricingCard plan={freePlan} />
            <PricingCard plan={partyBotPlan} />
          </div>
        </div>
      </section>

      {/* What's Included Section */}
      <section className="pb-24 px-4">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              What&apos;s Included with{" "}
              <span className="text-gradient">PartyBot</span>
            </h2>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {includedFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card variant="glass" padding="lg" className="h-full text-center">
                  <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="w-6 h-6 text-primary-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="pb-24 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <Card variant="glass" padding="xl">
            <h2 className="text-2xl font-bold text-white mb-4">
              Questions?
            </h2>
            <p className="text-gray-400 mb-6">
              Have questions about PartyBot or need help choosing the right plan
              for your needs?
            </p>
            <a href="mailto:hello@partybot.ai">
              <Button variant="secondary" size="lg">
                Contact Us
              </Button>
            </a>
          </Card>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="border-t border-white/10 py-8 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} PartyBot. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

