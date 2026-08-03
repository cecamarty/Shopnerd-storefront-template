import React from "react";
import { Header } from "@/components/Header";
import { SearchBar } from "@/components/SearchBar";
import { CategoryChips } from "@/components/CategoryChips";
import { ProductGrid } from "@/components/ProductGrid";
import { ProductSheet } from "@/components/ProductSheet";
import { CartSheet } from "@/components/CartSheet";
import { FloatingCart } from "@/components/FloatingCart";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-zinc-50">
      <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-sm relative">
        <Header />

        <div className="sticky top-0 z-30">
          <SearchBar />
          <div className="bg-white/90 backdrop-blur-xl">
             <CategoryChips />
          </div>
        </div>

        <div className="pb-16">
          <ProductGrid />
        </div>

        <Footer />

        <ProductSheet />
        <CartSheet />
        <FloatingCart />
      </div>
    </main>
  );
}
