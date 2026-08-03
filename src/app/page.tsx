"use client";

import { useEffect, useState } from 'react';
import {
  Header,
  SearchArea,
  CategoryChips,
  ProductGrid,
  FloatingCart,
  ProductSheet,
  CartSheet,
  Footer
} from '@/components';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-sm relative overflow-hidden">
        {/* Core Storefront */}
        <Header scrollY={scrollY} />

        <div className={`sticky top-0 z-20 transition-shadow duration-300 bg-white/90 backdrop-blur-md ${scrollY > 200 ? 'shadow-sm' : ''}`}>
          <SearchArea />
          <CategoryChips />
        </div>

        <ProductGrid />

        {/* Footer */}
        <Footer />

        {/* Floating Elements & Overlays */}
        <FloatingCart scrollY={scrollY} />
        <ProductSheet />
        <CartSheet />
      </div>
    </main>
  );
}
