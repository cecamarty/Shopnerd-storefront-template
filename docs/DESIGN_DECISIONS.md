# Architecture Decision Record (ADR) & Design Decisions

## 1. Single-Page Overlay Architecture
**Decision**: We opted to build the entire shopping experience on a single scrollable page, using Bottom Sheets/Drawers for product details and the cart.
**Reasoning**: Users arriving from social platforms (TikTok, Instagram) have high bounce rates if they encounter friction. Traditional multi-page e-commerce requires loading new routes, breaking context, and losing scroll position. Overlays feel like a native app, keeping the user anchored to the main catalog.

## 2. Decoupled Data & Theme Directories
**Decision**: Hardcoded mock data and theme settings are strictly isolated in `src/data/` and `src/theme/`.
**Reasoning**: This prevents business logic from bleeding into UI components. It ensures that when the time comes to integrate with a real backend (e.g., ShopNerd), the migration is a matter of swapping data sources rather than rewriting component logic.

## 3. Zustand over React Context / Redux
**Decision**: We chose Zustand for global state management (UI toggles, Cart state).
**Reasoning**: Redux is too heavy for this use case. React Context can lead to unnecessary re-renders if not optimized carefully. Zustand provides a simple hook-based API that performs excellently and requires almost zero boilerplate.

## 4. Framer Motion for Animations
**Decision**: We integrated Framer Motion for layout changes, staggering, and modal physics.
**Reasoning**: To achieve the "premium, calm" aesthetic requested, standard CSS transitions are insufficient. Framer Motion provides physics-based spring animations and handles gesture interactions (like drag-to-dismiss `drag="y"`) out of the box, which is critical for the mobile-first feel.

## 5. WhatsApp Mock Checkout
**Decision**: The checkout button currently generates a pre-filled WhatsApp message.
**Reasoning**: This serves as an immediate, functional prototype for small merchants who handle orders manually, while the code structure explicitly isolates this function so it can be easily replaced by a Stripe/ShopNerd checkout flow later.
