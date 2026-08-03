# Architecture Overview

This document outlines the high-level architecture of the Standalone Storefront.

## Goal
To provide a fast, app-like, mobile-first shopping experience that operates entirely on a single page, minimizing friction and load times for users arriving from social media.

## Tech Stack
- **Framework**: Next.js (App Router) - For optimal performance, routing (even if single-page), and future server-side rendering capabilities.
- **Styling**: Tailwind CSS - For rapid, utility-first UI development and easy theme tokenization.
- **State Management**: Zustand - Chosen for its minimal boilerplate and ease of managing global UI state (overlays) and Cart state without complex Context providers.
- **Animations**: Framer Motion - Essential for the fluid, native-feeling spring animations and gesture interactions (like drag-to-dismiss on Bottom Sheets).
- **Icons**: Lucide React & React Icons - For clean, consistent iconography.

## Directory Structure

```text
src/
├── app/              # Next.js App Router entry points (page.tsx, layout.tsx)
├── components/       # Domain-specific UI components (Header, Overlays, Grids)
│   ├── ui/           # Atomic, highly reusable generic components (Buttons, Badges)
├── data/             # Mock database (products, categories) for decoupling business logic
├── lib/              # Utility functions (e.g., classname merging)
├── store/            # Zustand state definitions
├── theme/            # Design tokens and static branding configuration
```

## Data Flow
1. **Initial Load**: `page.tsx` renders the layout.
2. **Component Hydration**: Components pull static configuration from `src/theme/` and `src/data/`.
3. **User Interaction**: Interactions (like clicking a product) dispatch actions to the Zustand `useUIStore`.
4. **Overlay Rendering**: Changes in `useUIStore` trigger Framer Motion `AnimatePresence` blocks to render the `ProductSheet` or `CartSheet` over the existing DOM without a route change.
5. **Cart Actions**: Adding an item updates `useCartStore`, which automatically updates the `FloatingCart` badge.
