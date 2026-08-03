'use client';

import React from 'react';
import { Header } from '@/components/Header';
import { SearchBar } from '@/components/SearchBar';
import { ProductGrid } from '@/components/ProductGrid';
import { FloatingCart } from '@/components/FloatingCart';
import { ProductSheet } from '@/components/ProductSheet';
import { CartSheet } from '@/components/CartSheet';
import { EmptyState } from '@/components/EmptyState';
import { SearchX } from 'lucide-react';
import { useStore } from '@/store';
import { products } from '@/data/products';

export default function Home() {
  const { searchQuery, activeCategory } = useStore();

  const filteredProducts = React.useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  return (
    <main className="min-h-screen bg-white">
      <Header />

      <div className="sticky top-0 z-30">
        <SearchBar />
      </div>

      <div className="pb-32">
        {filteredProducts.length > 0 ? (
          <ProductGrid />
        ) : (
          <EmptyState
            icon={SearchX}
            title="No products found"
            description={
              searchQuery
                ? `We couldn't find anything matching "${searchQuery}". Try adjusting your search.`
                : "There are no products in this category yet."
            }
          />
        )}
      </div>

      <FloatingCart />

      <ProductSheet />
      <CartSheet />
    </main>
  );
}
