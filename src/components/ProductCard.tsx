"use client";

import React from 'react';
import { Product } from '@/data/products';
import { Price, Badge } from '@/components/ui';
import { useUIStore } from '@/store/useUIStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const { openProduct } = useUIStore();

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => openProduct(product.id)}
      className="group relative flex flex-col text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-black rounded-2xl"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100 mb-3">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
          <div className="absolute top-3 left-3">
            <Badge variant={product.badge === 'Sale' ? 'sale' : 'new'}>{product.badge}</Badge>
          </div>
        )}
        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 flex items-center justify-center backdrop-blur-[2px]">
            <Badge variant="default" className="bg-white/90 shadow-sm border border-gray-100">Out of Stock</Badge>
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-gray-900 mb-1 truncate">{product.name}</h3>
      <Price amount={product.price} originalAmount={product.originalPrice} />
    </motion.button>
  );
};
