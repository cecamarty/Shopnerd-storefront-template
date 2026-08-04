'use client';

import React, { useMemo } from 'react';
import { useStore } from '../store';
import { products } from '../data/products';
import { ProductCard } from './ProductCard';
import { EmptyState } from './EmptyState';
import { Icons } from './Icons';

export function ProductGrid() {
  const { activeCategory, searchQuery } = useStore();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = activeCategory === 'all' || product.categoryId === activeCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  if (filteredProducts.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <EmptyState
          icon={Icons.search}
          title="No dishes found"
          description="We couldn't find anything matching your search. Try adjusting your filters."
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-6 pb-24">
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}