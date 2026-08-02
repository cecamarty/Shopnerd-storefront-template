import React from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryChips } from "@/components/CategoryChips";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSheet } from "@/components/ProductSheet";
import { CartSheet } from "@/components/CartSheet";
import { FloatingCart } from "@/components/FloatingCart";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50 pb-32">
      <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-sm relative overflow-hidden">
        <Header />

        <div className="sticky top-0 z-20 bg-white/80 backdrop-blur-xl border-b border-zinc-100/50 pb-2">
          <SearchBar />
          <CategoryChips />
        </div>

        <ProductGrid />

        <ProductSheet />
        <CartSheet />
        <FloatingCart />
      </div>
    </main>
  );
}
