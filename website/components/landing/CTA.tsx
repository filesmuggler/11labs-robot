"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export function CTA() {
  return (
    <section className="relative py-24 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary-500/10 via-accent-500/10 to-primary-500/10" />
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-transparent to-gray-950" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative max-w-4xl mx-auto text-center"
      >
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
          <span className="text-white">Ready to Transform</span>
          <br />
          <span className="text-gradient">Your Parties?</span>
        </h2>

        <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10">
          Join thousands of party hosts who have discovered the future of
          entertainment. Get started with PartyBot today.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
          <Link href="/pricing">
            <Button size="xl">Get Started Free</Button>
          </Link>
          <Link href="mailto:sales@partybot.ai">
            <Button variant="ghost" size="xl">
              Contact Sales
            </Button>
          </Link>
        </div>

        <p className="text-sm text-gray-500">
          No credit card required. Start with our free Avatar Mode.
        </p>
      </motion.div>
    </section>
  );
}

