"use client";

import Link from "next/link";
import { Twitter, Instagram, Github } from "lucide-react";
import { cn } from "@/lib/utils";

const socialLinks = [
  { href: "https://twitter.com/partybot", icon: Twitter, label: "Twitter" },
  { href: "https://instagram.com/partybot", icon: Instagram, label: "Instagram" },
  { href: "https://github.com/partybot", icon: Github, label: "GitHub" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={cn(
        "border-t border-white/10",
        "bg-black/40 backdrop-blur-xl",
        "py-8 px-4"
      )}
    >
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <p className="text-sm text-gray-400">
          © {currentYear} PartyBot. All rights reserved.
        </p>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => (
            <Link
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition-colors"
              aria-label={social.label}
            >
              <social.icon className="w-5 h-5" />
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

