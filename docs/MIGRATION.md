# ShopNerd Migration Guide

This guide explains how this standalone Next.js storefront prototype will be migrated into the ShopNerd ecosystem to become the default storefront template.

## Architecture Overview

The storefront is intentionally designed as a "dumb" UI layer that reads entirely from mock data and theme configuration files.

### Current Responsibilities
- **`src/app`**: Contains the Next.js App Router setup. The main entry (`page.tsx`) handles component composition and local UI state (search, category selection).
- **`src/components`**: Highly decoupled React components. They contain no hardcoded business logic.
- **`src/data`**: The mock database. Simulates external API responses for products, categories, and store information.
- **`src/theme`**: The design system configuration. Simulates a theme JSON object fetched from a dashboard.
- **`src/store`**: Client-side state management (Zustand) for the shopping cart.

### Data Flow
Currently, components import directly from `src/data` and `src/theme`. In ShopNerd, these imports will be replaced by API calls or React Server Components fetching from the ShopNerd database.

## Mapping

Here is how the current static files map to future ShopNerd entities:

### Data Files

| Current Mock File | Future ShopNerd Entity | Description |
| :--- | :--- | :--- |
| `src/data/products.ts` | `tenant.products` | The product catalog for the merchant. Must include variants, inventory levels, and pricing. |
| `src/data/categories.ts` | `tenant.collections` | Collections or tags used to group products. |
| `src/data/store.ts` | `tenant.settings` | Basic store info: name, description, contact email, and WhatsApp number. |
| `src/theme/branding.ts` | `theme.branding` | Logo and cover image URLs. |
| `src/theme/colors.ts` | `theme.colors` | Primary/secondary hex codes. |
| `src/theme/typography.ts` | `theme.typography` | Font selections. |
| `src/theme/settings.ts` | `theme.settings` | Base currency and UI preferences (border radius, shadows). |

### Components

All components are fully reusable and replaceable.

*   **`Header`**: Needs to connect to `tenant.settings` and `theme.branding`.
*   **`ProductGrid` / `ProductCard`**: Receives an array of `Product` objects.
*   **`ProductSheet` / `CartSheet`**: Currently handles state via Zustand and WhatsApp checkout. The checkout action is the main replacement point.

## Integration Plan

To integrate this template into ShopNerd:

1.  **Move Components**: Copy the `src/components`, `src/store`, and `src/types` directories into the ShopNerd monorepo or template package.
2.  **Connect Theme Contract**: Replace the static imports of `src/theme/*` with a Theme Provider or Server Component that injects the merchant's ShopNerd theme settings into the CSS variables / Tailwind config.
3.  **Connect Store API**: Replace `src/data/products.ts` and `categories.ts` with Next.js data fetching methods (e.g., GraphQL or REST queries to the ShopNerd backend).
4.  **Connect Search**: The current client-side filter (`filteredProducts` in `page.tsx`) should be moved to server-side search if the catalog exceeds ~100 items.
5.  **Connect Cart & Checkout**: Replace the WhatsApp redirect in `CartSheet.tsx` with a mutation to the ShopNerd Checkout API, redirecting the user to the hosted ShopNerd checkout URL.

## What Should Remain Unchanged

To preserve the intended premium, app-like identity of this template, **do not change**:
*   The single-page scrolling architecture. Do not introduce pagination or separate category pages.
*   The overlay paradigm (Bottom Sheets on mobile). Do not navigate away for product details or the cart.
*   The generous spacing and clean typography hierarchy.
*   The interactive, swipe-to-dismiss feel of the overlays.

## Future Extension Points

When extending this template, follow the existing design patterns (add to overlays or the main scroll, do not add new pages):
*   **Variants**: Add variant selectors inside `ProductSheet.tsx`.
*   **Reviews**: Add a reviews section at the bottom of the `ProductSheet.tsx` scroll area.
*   **Coupons**: Add an input field inside `CartSheet.tsx` before the checkout button.
*   **Product Badges**: Extend the `Badge` component usage in `ProductCard.tsx` (e.g., "Bestseller", "New").
