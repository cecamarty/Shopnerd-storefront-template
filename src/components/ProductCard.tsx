'use client';

import React from 'react';
import Image from 'next/image';
import { Product } from '../data/types';
import { Price } from './Price';
import { Badge } from './Badge';
import { useStore } from '../store';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { setSelectedProduct } = useStore();

  return (
    <motion.button
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => setSelectedProduct(product)}
      className="group flex h-full w-full flex-col overflow-hidden rounded-2xl bg-white p-3 text-left shadow-sm ring-1 ring-inset ring-gray-100 transition-all hover:shadow-md"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        {product.badges && product.badges.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-col gap-1">
            {product.badges.map((badge) => (
              <Badge key={badge} variant={badge === 'Popular' ? 'default' : 'secondary'} className="shadow-sm">
                {badge}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-base font-semibold text-gray-900 line-clamp-1">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500 line-clamp-2 flex-1">{product.description}</p>

        <div className="mt-3 flex items-center justify-between">
          <Price amount={product.price} originalAmount={product.originalPrice} />
        </div>
      </div>
    </motion.button>
  );
}