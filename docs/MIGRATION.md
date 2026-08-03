# MIGRATION.md: ShopNerd Integration Guide

This guide details how to integrate this standalone storefront into the ShopNerd ecosystem as the default theme template.

## Architecture Overview

Currently, this storefront operates entirely in isolation. It relies on mock data files to simulate a database and hardcoded theme configurations to simulate a merchant's dashboard settings. The architecture is intentionally decoupled so that the UI components act strictly as presentational and interactive layers, completely unaware of where the data originates.

### Current Responsibilities
- **`src/data/`**: Simulates the backend API (products, categories).
- **`src/theme/`**: Simulates the merchant's branding settings (colors, logo, store name).
- **`src/store/`**: Manages local client state (cart items, UI overlays).
- **`src/components/`**: Handles rendering and interaction based on injected state/props.

---

## Mapping

To connect this storefront to ShopNerd, you will replace the static files with dynamic data fetching or API calls.

### Data Mapping
- `data/products.ts` $\rightarrow$ Map to **ShopNerd Tenant Products API** (`GET /api/tenant/products`). Ensure the payload matches the expected `Product` and `ProductVariant` interfaces.
- `data/categories.ts` $\rightarrow$ Map to **ShopNerd Tenant Categories API**.
- `data/store.ts` $\rightarrow$ Map to **ShopNerd Tenant Settings API** (store hours, contact info, social links).

### Theme Mapping
- `theme/branding.ts`, `theme/colors.ts`, `theme/typography.ts`, `theme/settings.ts` $\rightarrow$ Map to **ShopNerd Theme Settings**. These should ideally be injected into the application via a global context, a server-rendered CSS variable block, or a tailored Tailwind configuration plugin generated at build/runtime.

---

## Component Integration & Replacements

The components are highly reusable. Most will remain visually unchanged, but their data sources and event handlers will need hooking up to the real backend.

| Component | Status | Integration Needed |
| :--- | :--- | :--- |
| **`Header.tsx`** | Reusable | Hydrate with dynamic `theme` and `store` context. |
| **`ProductGrid.tsx`** | Reusable | Replace static filtering with API-driven or hydration-driven product lists. |
| **`ProductSheet.tsx`** | Reusable | The "Add to Cart" function should call the ShopNerd Cart API. |
| **`CartSheet.tsx`** | Replaceable | Replace the mock WhatsApp checkout logic with the official ShopNerd Checkout flow/redirect. |
| **`SearchArea.tsx`** | Reusable | Connect to ShopNerd Search API (e.g., Algolia or backend search). |

---

## Integration Plan (Step-by-Step)

1. **Move Components**: Copy `src/components/` and `src/store/` into the ShopNerd frontend repository.
2. **Connect Theme Contract**: Create a provider or CSS variable generator in ShopNerd that outputs the expected theme values (colors, logo, fonts) to replace `src/theme/`.
3. **Connect Store API**: Update page-level data fetching (e.g., Next.js Server Components or `useEffect` hooks) to pull products and categories from ShopNerd's database, passing them down as props or pushing them into a global store.
4. **Connect Search**: Hook the `useUIStore.searchQuery` state up to a debounced API call to ShopNerd's search service.
5. **Connect Cart**: Update `useCartStore.ts` to sync with the ShopNerd backend cart (e.g., making a `POST /api/cart/add` call whenever `addItem` is triggered).
6. **Connect Checkout**: Swap the `handleCheckout` function in `CartSheet.tsx` to initialize a real payment gateway session and redirect the user.

---

## What Should Remain Unchanged

To preserve the premium, "Apple-like" identity of this storefront, the following elements should **not** be redesigned during integration:
- The single-page, overlay-driven architecture (avoid introducing standard page navigations for products/cart).
- The heavy reliance on whitespace, large typography, and rounded corners.
- The framer-motion physics (spring animations, drag-to-dismiss behavior).
- The sticky header behavior and scroll-driven scale animations.

---

## Future Extension Points

When extending this storefront in ShopNerd, maintain the minimal aesthetic by integrating features smoothly:
- **Reviews**: Add a small, collapsible accordion inside `ProductSheet.tsx`.
- **Product Badges**: The `Badge.tsx` component is already prepared to handle dynamic badges (Sale, New, Out of Stock, Best Seller).
- **Related Products**: Can be added at the bottom of the `ProductSheet.tsx` as a horizontal scrollable row.
