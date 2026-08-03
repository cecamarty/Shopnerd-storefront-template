'use client';

import React from 'react';
import Image from 'next/image';
import { Heart } from 'lucide-react';
import { Product } from '@/data/products';
import { Price } from './Price';
import { Badge } from './Badge';
import { useStore } from '@/store';
import { motion } from 'framer-motion';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { setSelectedProduct } = useStore();
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.98 }}
      className="group cursor-pointer flex flex-col gap-3 rounded-2xl p-2 sm:p-3 hover:bg-gray-50 transition-colors"
      onClick={() => setSelectedProduct(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-gray-100">
        <Image
          src={isHovered && product.images.length > 1 ? product.images[1] : product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isSale && (
            <Badge variant="destructive" className="bg-red-500 shadow-sm">Sale</Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="bg-white/90 backdrop-blur-sm text-gray-700 shadow-sm">Out of Stock</Badge>
          )}
        </div>

        {/* Favorite Button */}
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-white/50 backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white/80"
          onClick={(e) => {
            e.stopPropagation();
            // Optional: Implement favorites logic
          }}
        >
          <Heart className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      <div className="flex flex-col gap-1 px-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{product.name}</h3>
        <Price amount={product.price} originalAmount={product.originalPrice} className="text-sm" />
      </div>
    </motion.div>
  );
}
