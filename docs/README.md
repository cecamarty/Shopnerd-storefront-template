# Standalone Minimalist Storefront

A mobile-first, single-scroll Next.js (App Router) storefront built with TypeScript, Tailwind CSS, and Framer Motion. This project is designed to be a premium, performant foundation for a small merchant, functioning more like a native app than a traditional website.

## Core Features
* **Single-Page Architecture**: No multi-page navigation. All interactions (product details, cart, search) happen dynamically on the current page via modals and overlays to preserve scroll position.
* **Mobile-First UX**: Components like Bottom Sheets with drag-to-dismiss functionality cater specifically to mobile users.
* **Component Modularity**: High reusability with a clear separation of UI elements, avoiding hardcoded data.
* **Mock Database Structure**: All business and theme data is stored in `src/data/` and `src/theme/`, preparing the application for a straightforward transition to a backend API (e.g., ShopNerd).

## Project Structure
* `src/components/`: Business logic components (Header, Grid, Overlays).
* `src/components/ui/`: Reusable, atomic UI components (Button, Badge, etc.).
* `src/data/`: Mock business data representing what would typically come from an API.
* `src/theme/`: Theme configuration (colors, branding).
* `src/store/`: Zustand stores for global state management (Cart, UI interactions).

See `MIGRATION.md` for integrating this into ShopNerd.
