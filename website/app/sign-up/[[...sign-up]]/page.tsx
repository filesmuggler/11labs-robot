"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";

const clerkAppearance = {
  baseTheme: undefined,
  variables: {
    colorPrimary: "#a855f7",
    colorBackground: "#111827",
    colorInputBackground: "#1f2937",
    colorInputText: "#ffffff",
    colorText: "#ffffff",
    colorTextSecondary: "#9ca3af",
    borderRadius: "0.75rem",
  },
  elements: {
    formButtonPrimary:
      "bg-gradient-to-r from-primary-600 to-accent-500 hover:shadow-lg hover:shadow-primary-500/40",
    card: "bg-gray-900 border border-gray-800",
    headerTitle: "text-white",
    headerSubtitle: "text-gray-400",
    socialButtonsBlockButton:
      "bg-gray-800 border-gray-700 text-white hover:bg-gray-700",
    formFieldLabel: "text-gray-300",
    formFieldInput: "bg-gray-800 border-gray-700 text-white",
    footerActionLink: "text-primary-400 hover:text-primary-300",
    identityPreviewText: "text-white",
    identityPreviewEditButton: "text-primary-400",
  },
};

export default function SignUpPage() {
  const [isClerkConfigured, setIsClerkConfigured] = useState<boolean | null>(null);
  const [ClerkSignUp, setClerkSignUp] = useState<React.ComponentType<any> | null>(null);

  useEffect(() => {
    const configured =
      typeof window !== "undefined" &&
      !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    
    setIsClerkConfigured(configured);

    if (configured) {
      import("@clerk/nextjs").then((mod) => {
        setClerkSignUp(() => mod.SignUp);
      });
    }
  }, []);

  // Loading state
  if (isClerkConfigured === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950">
        <div className="animate-pulse text-gray-400">Loading...</div>
      </div>
    );
  }

  // Clerk not configured - show placeholder
  if (!isClerkConfigured) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <Card variant="elevated" padding="xl" className="max-w-md w-full text-center">
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-2xl font-bold text-white mb-2">Sign Up</h1>
          <p className="text-gray-400 mb-6">
            Authentication is currently being set up for this application.
          </p>

          <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4 mb-6 text-left">
            <p className="text-yellow-400 text-sm font-medium mb-2">
              Setup Instructions:
            </p>
            <ol className="text-yellow-400/80 text-sm space-y-1 list-decimal list-inside">
              <li>Copy <code className="bg-yellow-500/20 px-1 rounded">.env.local.example</code> to <code className="bg-yellow-500/20 px-1 rounded">.env.local</code></li>
              <li>Get your Clerk API keys from the dashboard</li>
              <li>Add <code className="bg-yellow-500/20 px-1 rounded">NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY</code></li>
              <li>Add <code className="bg-yellow-500/20 px-1 rounded">CLERK_SECRET_KEY</code></li>
              <li>Restart the development server</li>
            </ol>
          </div>

          <a
            href="https://dashboard.clerk.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary-400 hover:text-primary-300 text-sm underline block mb-6"
          >
            Go to Clerk Dashboard →
          </a>

          <Link href="/">
            <Button variant="secondary" size="lg" className="w-full">
              Back to Home
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  // Clerk configured - render SignUp component
  if (ClerkSignUp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4">
        <ClerkSignUp
          appearance={clerkAppearance}
          routing="path"
          path="/sign-up"
          signInUrl="/sign-in"
          afterSignUpUrl="/pricing"
        />
      </div>
    );
  }

  // Loading Clerk component
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950">
      <div className="animate-pulse text-gray-400">Loading authentication...</div>
    </div>
  );
}

