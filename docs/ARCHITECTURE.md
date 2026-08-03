# Architecture Overview

This document provides a high-level overview of the storefront's frontend architecture.

## Folders & Responsibilities

The codebase is organized to strictly separate concerns, making it easy to reason about and refactor.

- `src/app/`
  - **Responsibility:** Next.js App Router configuration and layout.
  - **Key Files:** `page.tsx` acts as the primary composition layer, bringing all sections together into a single-scroll experience. `layout.tsx` injects global providers.

- `src/components/`
  - **Responsibility:** Reusable, visually driven UI components.
  - **Structure:** Components are isolated. They are purely presentational or manage only local UI state. They rely entirely on `StoreContext` or `ScrollContext` for global application state.
  - **Barrels:** Uses an `index.ts` barrel file for cleaner imports.

- `src/store/`
  - **Responsibility:** Global state management via React Context.
  - **`StoreContext.tsx`:** Manages the cart state, selected product (for the bottom sheet), search query, and category filters.
  - **`ScrollContext.tsx`:** Tracks the user's scroll position and direction to enable complex, decoupled scroll-linked animations (like the floating cart disappearing on scroll-down).

- `src/data/`
  - **Responsibility:** The mock database.
  - **Purpose:** Components **must not** contain hardcoded product details. Everything flows from these files. This directory is designed to be completely replaced by real API calls in the future.

- `src/theme/`
  - **Responsibility:** Visual identity configuration.
  - **Purpose:** Stores colors, branding assets (logo, cover image), and global feature flags. Like `src/data/`, this is built to eventually be driven by a backend tenant configuration.

- `src/lib/`
  - **Responsibility:** Pure utility functions (e.g., `cn` for Tailwind class merging).

## Data Flow

1. **State:** Global state lives in Context.
2. **Read:** Components (like `ProductGrid` or `CartSheet`) read from `src/data` directly or read active state from `useStore()`.
3. **Write:** User interactions (like "Add to Cart") call action functions provided by `useStore()`, which updates the global state and triggers a re-render of subscribed components.

## Component Hierarchy

```
<Layout>
  <ScrollProvider>
    <StoreProvider>
      <Home>
        <Header />          // Reads scroll context for parallax
        <SearchBar />       // Pins to top based on scroll
        <CategoryChips />
        <ProductGrid>       // Reads active filters from store
          <ProductCard />
        </ProductGrid>
        <Footer />

        {/* Overlays exist at the root level to avoid z-index stacking issues */}
        <ProductSheet />    // Opens when a product is selected
        <CartSheet />       // Opens when cart is toggled
        <FloatingCart />    // Shows when items exist; responds to scroll direction
      </Home>
    </StoreProvider>
  </ScrollProvider>
</Layout>
```
