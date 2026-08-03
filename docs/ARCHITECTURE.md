# System Architecture

This document describes the high-level architecture of the standalone storefront prototype.

## Tech Stack
*   **Framework**: Next.js 14 (App Router)
*   **Language**: TypeScript
*   **Styling**: Tailwind CSS
*   **Animations**: Framer Motion
*   **State Management**: Zustand
*   **Icons**: Lucide React

## Directory Structure

*   `src/app/`: Next.js App Router configuration. `page.tsx` acts as the Controller, composing views and managing local filter state.
*   `src/components/`: Pure React components. Grouped by domain (`Header`, `ProductSheet`) or UI primitive (`ui/Button`).
*   `src/data/`: Mock database. Simulates API responses.
*   `src/theme/`: Design token configuration.
*   `src/store/`: Global client state (Cart).
*   `src/types/`: Shared TypeScript interfaces representing the domain model.

## Rendering Strategy
Currently, the application is heavily client-side rendered (`use client` in `page.tsx`) due to the interactive nature of the filtering and overlays.
In a production ShopNerd environment, the initial shell and product data should be Server-Side Rendered (SSR) or statically generated (SSG/ISR), passing initial data to the client components.

## State Management
*   **Local UI State**: Managed via `useState` in `page.tsx` (search query, selected category, which product sheet is open).
*   **Global UI/Data State**: Managed via `Zustand` in `cartStore.ts` (cart items, cart open/close state, quantities).

## Checkout Flow
This prototype implements a "Mock" checkout via WhatsApp. It generates a pre-filled message URL. This is an architectural stub intended to be replaced by a real payment gateway redirect.
