"use client";

import React, { useMemo } from 'react';
import { products } from '@/data/products';
import { useUIStore } from '@/store/useUIStore';
import { ProductCard } from '@/components/ProductCard';
import { EmptyState } from '@/components/ui';
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
    <div className="px-4 py-6 grid grid-cols-1">
      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4 gap-y-8 col-span-full"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: { staggerChildren: 0.05 }
          }
        }}
      >
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              layout
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0 }
              }}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
