# ShopNerd Migration Guide

This guide outlines how to migrate this static prototype into the dynamic ShopNerd platform. The architecture was specifically designed to make this transition as seamless as possible.

## What Should Remain Unchanged

**Do not change the core UX paradigms.** The following elements define the storefront's identity and should remain visually unchanged:
- The single-page, single-scroll architecture.
- The use of Overlays (Bottom Sheets/Drawers) instead of routing to new pages for product details and the cart.
- The collapsing Header and pinning Search Bar behaviors.
- The Floating Cart interaction (hiding on scroll down, reappearing on scroll up).
- The minimalistic, premium visual aesthetic (generous whitespace, rounded corners, subtle shadows).

## Data Mapping Strategy

Currently, the app relies on the `src/data/` and `src/theme/` directories. To integrate with ShopNerd, these static imports will be replaced by API calls or server-side injected props.

### 1. `src/data/products.ts` & `src/data/categories.ts`
- **Current:** Static array of `Product` and `Category` objects.
- **Migration:** Replace with `tenant.products` and `tenant.categories` fetched from the ShopNerd inventory API.
- **Action:** Update the types in these files to match the exact schema of the ShopNerd backend.

### 2. `src/data/store.ts` & `src/theme/branding.ts`
- **Current:** Static objects containing store names, WhatsApp numbers, currency, and brand URLs.
- **Migration:** Map directly to `tenant.settings` and the "ShopNerd Theme Settings" returned by the platform.
- **Action:** These values should likely be fetched server-side in `app/page.tsx` and passed down via a new `TenantProvider` Context, replacing the static imports.

### 3. `src/theme/settings.ts`
- **Current:** Feature flags (e.g., `enableSearch`, `enableCategories`).
- **Migration:** Map to merchant toggle switches in the ShopNerd admin dashboard.

## Integration Plan (Step-by-Step)

1. **Move Components:** Copy the `src/components`, `src/lib`, and `src/store` directories into the ShopNerd frontend repository. They are built to be highly portable.
2. **Connect Theme Contract:** Create a utility to map the ShopNerd theme API response to the expected structure in `theme/branding.ts`. Update Tailwind configuration if dynamic color variables are needed.
3. **Connect Store API:** In the root `page.tsx`, implement data fetching to retrieve the tenant's products and categories.
4. **Hydrate State:** Pass the fetched products into a specialized version of `StoreContext` or map them directly to the `ProductGrid`.
5. **Connect Search & Filter:** The current search is strictly client-side filtering. If ShopNerd requires server-side search (for massive catalogs), update `StoreContext.tsx` to debounce the search query and trigger an API call instead of filtering the static array locally.
6. **Connect Checkout:** Replace the WhatsApp message generation in `CartSheet.tsx` with a mutation call to the ShopNerd Checkout API, or redirect to a hosted checkout session (e.g., Stripe Checkout).

## Future Extension Points

The architecture naturally supports adding features without breaking the core UX:
- **Product Badges:** Expand the `Badge` component logic in `ProductCard` to support dynamic badges (e.g., "Bestseller", "Low Stock") driven by the API.
- **Reviews & Ratings:** Can be safely added inside the `ProductSheet.tsx` below the description.
- **Related Products:** A horizontal scrolling list of `ProductCard` components can be appended to the bottom of `ProductSheet.tsx`.
- **Coupons:** Add a promo code input section inside `CartSheet.tsx` above the subtotal.
