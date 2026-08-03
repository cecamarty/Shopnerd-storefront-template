# Design Decisions

This document outlines *why* certain technical and UX decisions were made during the development of this storefront prototype.

## 1. Single-Scroll Architecture (No Pages)

**Decision:** We built the entire shopping experience on a single route (`/`) using overlays (bottom sheets/drawers) for deep links (products, cart) instead of navigating to new pages (`/product/[id]`).

**Why:**
- **Context Preservation:** On mobile, navigating away from a feed (like a product grid) often breaks the user's mental model and forces a reload. By using overlays, the user never loses their scroll position. Closing the product sheet returns them *exactly* where they were.
- **App-Like Feel:** This mimics the interaction model of native mobile apps (like Instagram or TikTok), which is critical since the primary traffic source is expected to be social media deep links.

## 2. React Context over Redux/Zustand

**Decision:** Used standard React Context (`StoreContext` and `ScrollContext`) instead of a third-party state management library.

**Why:**
- **Simplicity & Dependency Minimization:** For the scope of a single-scroll storefront, Context + `useState` is sufficient. It avoids adding unnecessary bundle size.
- **Portability:** Keeping the state management native to React makes the codebase easier to drop into existing larger projects (like the future ShopNerd monorepo) without forcing a specific external state paradigm.

## 3. Dedicated `src/data` and `src/theme` Directories

**Decision:** Abstracting all branding, settings, and mock products into standalone files rather than hardcoding them into components.

**Why:**
- **Future-Proofing for Multi-Tenant:** This storefront is designed to eventually become a template in a larger platform (ShopNerd). By strictly enforcing that components cannot own their data, transitioning from `import { products } from '@/data'` to `const products = await fetchTenantProducts()` requires zero component refactoring.

## 4. Scroll Context for Animations

**Decision:** Creating a global `ScrollContext` using Framer Motion's `useScroll` instead of local event listeners in every component.

**Why:**
- **Performance:** Attaching multiple native scroll event listeners can cause jank. Framer Motion handles this efficiently.
- **Decoupling:** The `Header`, `SearchBar`, and `FloatingCart` all need to react to scroll (parallax, pinning, and hiding/showing, respectively). A unified context ensures they are perfectly synchronized and allows components to easily access scroll direction without recalculating it independently.

## 5. Overlay Component Implementation

**Decision:** Building a custom `Overlay.tsx` with Framer Motion rather than using a standard UI library modal (like Radix Dialog).

**Why:**
- **Gesture Control:** Radix Dialog is excellent for accessibility, but building a true "bottom sheet" that supports fluid swipe-to-dismiss physics requires deep integration with gesture libraries. Framer Motion provides the necessary `drag` and `dragElastic` properties to create a premium, spring-based interaction that feels native to iOS/Android.

## 6. WhatsApp Mock Checkout

**Decision:** Generating a WhatsApp URL instead of a fake checkout form.

**Why:**
- **Realism for Small Merchants:** Many micro-merchants globally actually use WhatsApp to finalize orders. It proves the cart logic works end-to-end and provides a tangible output without building a complex Stripe integration for a prototype.
