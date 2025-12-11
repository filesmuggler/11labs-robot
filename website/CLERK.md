# Clerk Authentication Setup

This project uses [Clerk](https://clerk.com) for authentication. The implementation is designed to work gracefully whether Clerk is configured or not.

## Overview

PartyBot uses Clerk for:
- User sign-up and sign-in
- Session management
- Protected routes (pricing, dashboard, etc.)

## Files Created/Modified

| File | Purpose |
|------|---------|
| `middleware.ts` | Route protection middleware |
| `app/layout.tsx` | ClerkProvider wrapper (conditional) |
| `app/sign-in/[[...sign-in]]/page.tsx` | Sign-in page with Clerk UI |
| `app/sign-up/[[...sign-up]]/page.tsx` | Sign-up page with Clerk UI |

## How to Enable Clerk

### 1. Create Environment File

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

### 2. Get Clerk API Keys

1. Go to [dashboard.clerk.com](https://dashboard.clerk.com)
2. Create a new application or select an existing one
3. Navigate to **API Keys** in the sidebar
4. Copy your keys

### 3. Add Keys to Environment

Edit `.env.local` and add your keys:

```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxx
CLERK_SECRET_KEY=sk_test_xxxxx
```

### 4. Restart Development Server

```bash
pnpm dev
```

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Yes | Clerk publishable key (starts with `pk_`) |
| `CLERK_SECRET_KEY` | Yes | Clerk secret key (starts with `sk_`) |

## Features

### Graceful Degradation

When Clerk is **not configured**:
- Middleware passes all requests through (no-op)
- Sign-in/sign-up pages show helpful setup instructions
- ClerkProvider is not rendered in the layout
- App remains fully functional for development

When Clerk **is configured**:
- Middleware protects non-public routes
- Sign-in/sign-up pages render Clerk's UI components
- ClerkProvider wraps the entire app
- Full authentication flow is available

### Protected Routes

The following routes are **public** (accessible without authentication):
- `/` - Home page
- `/pricing(.*)` - Pricing page
- `/sign-in(.*)` - Sign-in page
- `/sign-up(.*)` - Sign-up page
- `/api/webhooks(.*)` - Webhook endpoints

All other routes require authentication when Clerk is configured.

### Custom Styling

Clerk components use a custom dark theme that matches PartyBot's design:
- Dark background colors
- Purple primary accent
- Gradient buttons
- Rounded corners

## Troubleshooting

### "Authentication is currently being set up"

This message appears when Clerk keys are not configured. Follow the setup steps above.

### Middleware not working

Ensure your `middleware.ts` is in the project root (not in `src/`).

### Styles not applying

Make sure you're importing the Clerk CSS or using the `appearance` prop with custom styles.

## Learn More

- [Clerk Documentation](https://clerk.com/docs)
- [Next.js Integration](https://clerk.com/docs/quickstarts/nextjs)
- [Customization](https://clerk.com/docs/components/customization/overview)

