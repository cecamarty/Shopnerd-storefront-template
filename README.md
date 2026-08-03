# Premium Mobile-First Storefront

A single-scroll, app-like storefront built with Next.js (App Router), Tailwind CSS, and Framer Motion.

This prototype is designed to provide a calm, premium, and effortless shopping experience optimized for customers arriving from social media links. It heavily utilizes overlays (bottom sheets) to prevent page navigation and preserve context.

## Key Features
- **Single-Scroll UX:** Everything happens on one page. No traditional routing.
- **App-Like Overlays:** Product details and the shopping cart open in fluid, drag-to-dismiss bottom sheets.
- **Scroll-Linked Interactions:** Collapsing header, smoothly pinning search bar, and a smart floating cart.
- **Mock Data Architecture:** Built to easily migrate to a real backend (see `docs/MIGRATION.md`).
- **WhatsApp Checkout:** Generates a pre-filled order message as a mock checkout flow.

## Documentation
Please refer to the `docs/` directory for detailed information on the architecture and integration plans:
- `docs/ARCHITECTURE.md` - Overview of the codebase structure and data flow.
- `docs/DESIGN_DECISIONS.md` - Context on why specific technical and UX choices were made.
- `docs/MIGRATION.md` - A guide for migrating this prototype into a production platform.

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result. Best viewed on a mobile viewport.
