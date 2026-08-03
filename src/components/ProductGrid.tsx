'use client';

import React, { useMemo } from 'react';
import { products } from '@/data/products';
import { useStore } from '@/store';
import { ProductCard } from './ProductCard';
import { AnimatePresence } from 'framer-motion';

export function ProductGrid() {
  const { searchQuery, activeCategory } = useStore();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, activeCategory]);

  if (filteredProducts.length === 0) {
    return null; // Empty state is handled in page.tsx
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-3 gap-y-6 sm:gap-x-6 sm:gap-y-10">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
