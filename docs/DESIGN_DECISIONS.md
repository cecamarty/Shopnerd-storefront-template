# Architecture Decision Record (ADR)

## 1. Single-Page Overlay Architecture
**Decision**: The storefront operates entirely on a single page without navigation routing. Product details and the cart open as bottom sheets/modals.
**Reason**: The target audience arrives via social media links (Instagram, TikTok). Traditional multi-page ecommerce feels slow and fragmented on mobile web. An app-like, single-scroll experience reduces friction, preserves context (the user never loses their spot in the feed), and feels more premium and intentional.

## 2. Separation of Data and Components
**Decision**: Hardcoded mock data and theme settings are strictly isolated in `src/data` and `src/theme`. Components receive data via props or import from these files.
**Reason**: To ensure this prototype can cleanly evolve into a reusable template for ShopNerd. By treating static files as a mock database today, swapping them out for real API calls tomorrow requires zero changes to the UI components.

## 3. Zustand for Cart State
**Decision**: We use Zustand instead of React Context or Redux for the shopping cart.
**Reason**: Zustand provides a simpler, less boilerplate-heavy API than Redux. Unlike React Context, it prevents unnecessary re-renders of the entire component tree when only a specific slice of the cart state changes (e.g., updating a quantity).

## 4. Framer Motion for Animations
**Decision**: Framer Motion is used for complex interactions (swipe-to-dismiss, shared layout animations).
**Reason**: While Tailwind can handle basic transitions, Framer Motion provides the necessary physics-based spring animations and drag gesture recognition required to achieve the "native app" feel requested in the design brief.

## 5. WhatsApp Checkout Stub
**Decision**: The checkout button generates a WhatsApp message instead of integrating a mock payment gateway.
**Reason**: WhatsApp ordering is a highly realistic use-case for small merchants (the target demographic) in many global markets. It serves as a functional, testable endpoint for the prototype without requiring backend mock services.
