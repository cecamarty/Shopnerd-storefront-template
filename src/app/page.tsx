import { Header } from '@/components/Header';
import { SearchArea } from '@/components/SearchArea';
import { CategoryChips } from '@/components/CategoryChips';
import { ProductGrid } from '@/components/ProductGrid';
import { FloatingCart } from '@/components/FloatingCart';
import { ProductSheet } from '@/components/ProductSheet';
import { CartSheet } from '@/components/CartSheet';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <div className="max-w-2xl mx-auto bg-white min-h-screen shadow-sm relative overflow-hidden">
        {/* Core Storefront */}
        <Header />

        <div className="sticky top-0 z-20">
          <SearchArea />
          <CategoryChips />
        </div>

        <ProductGrid />

        {/* Floating Elements & Overlays */}
        <FloatingCart />
        <ProductSheet />
        <CartSheet />
      </div>
    </main>
  );
}
