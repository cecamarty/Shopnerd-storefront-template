"use client";

import React, { useMemo } from 'react';
import { products } from '@/data/products';
import { useUIStore } from '@/store/useUIStore';
import { ProductCard } from './ProductCard';
import { EmptyState } from './ui/EmptyState';
import { PackageX, SearchX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const ProductGrid = () => {
  const { searchQuery, selectedCategoryId } = useUIStore();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategoryId === 'all' || product.categoryId === selectedCategoryId;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategoryId]);

  if (filteredProducts.length === 0) {
    if (searchQuery) {
      return (
        <EmptyState
          icon={SearchX}
          title="No results found"
          description={`We couldn't find anything for "${searchQuery}". Try a different search term.`}
          className="mt-12"
        />
      );
    }
    return (
      <EmptyState
        icon={PackageX}
        title="No products"
        description="There are no products in this category right now. Check back later."
        className="mt-12"
      />
    );
  }

  return (
    <div className="px-4 py-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8">
        <AnimatePresence>
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
};
