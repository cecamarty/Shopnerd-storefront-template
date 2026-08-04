import {
  Header,
  SearchBar,
  CategoryChips,
  ProductGrid,
  ProductSheet,
  CartSheet,
  FloatingCart
} from '@/components';

export default function Home() {
  return (
    <main className="min-h-screen relative pb-20 md:pb-0">
      <Header />
      <div className="sticky top-0 z-20">
        <SearchBar />
        <CategoryChips />
      </div>

      <ProductGrid />

      <ProductSheet />
      <CartSheet />
      <FloatingCart />
    </main>
  );
}