import React from 'react';
import Image from 'next/image';
import { Product } from '../../data/products';
import { Price } from '../Price/Price';
import { Badge } from '../Badge/Badge';
import { cn } from '../Buttons/Button';

interface ProductCardProps {
  product: Product;
  onClick: (product: Product) => void;
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  return (
    <div
      className="group cursor-pointer flex flex-col gap-3"
      onClick={() => onClick(product)}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className={cn(
            "object-cover transition-transform duration-500 ease-in-out group-hover:scale-105",
            !product.inStock && "opacity-50 grayscale"
          )}
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {product.isSale && (
            <Badge variant="destructive" className="shadow-sm">Sale</Badge>
          )}
          {!product.inStock && (
            <Badge variant="secondary" className="shadow-sm bg-white/90 backdrop-blur-sm">Sold Out</Badge>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-1">
        <h3 className="text-sm font-medium text-gray-900 line-clamp-1 group-hover:underline decoration-1 underline-offset-4">
          {product.name}
        </h3>
        <Price amount={product.price} originalAmount={product.originalPrice} />
      </div>
    </div>
  );
}
