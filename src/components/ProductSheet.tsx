'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useStore } from '@/store';
import { Sheet } from './Sheet';
import { Button } from './Button';
import { Badge } from './Badge';
import { Price } from './Price';
import { Minus, Plus, ShoppingBag } from 'lucide-react';

export function ProductSheet() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  // Reset state when product changes
  React.useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setActiveImage(0);
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleClose = () => setSelectedProduct(null);

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    handleClose();
  };

  return (
    <Sheet isOpen={!!selectedProduct} onClose={handleClose} side="bottom">
      <div className="flex flex-col h-full bg-white pb-safe">
        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-4 sm:px-6 pt-2 pb-24">
          {/* Image Gallery */}
          <div className="relative aspect-square w-full sm:w-2/3 mx-auto overflow-hidden rounded-2xl bg-gray-100 mb-6">
            <Image
              src={selectedProduct.images[activeImage] || selectedProduct.imageUrl}
              alt={selectedProduct.name}
              fill
              className="object-cover"
              priority
            />
            {selectedProduct.images.length > 1 && (
              <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
                {selectedProduct.images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(idx)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      idx === activeImage ? 'bg-black w-4' : 'bg-black/30'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 max-w-lg mx-auto">
            {/* Title & Badges */}
            <div>
              <div className="flex gap-2 mb-2">
                {selectedProduct.isSale && <Badge variant="destructive" className="bg-red-500">Sale</Badge>}
                {!selectedProduct.inStock && <Badge variant="secondary">Out of Stock</Badge>}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 tracking-tight">{selectedProduct.name}</h2>
              <Price amount={selectedProduct.price} originalAmount={selectedProduct.originalPrice} className="text-xl mt-1" />
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">
              {selectedProduct.description}
            </p>
          </div>
        </div>

        {/* Sticky Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 sm:px-6 z-20">
          <div className="max-w-lg mx-auto flex items-center gap-4">
            {/* Quantity Selector */}
            <div className="flex items-center rounded-full border border-gray-200 p-1 bg-gray-50">
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1 || !selectedProduct.inStock}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-medium">{quantity}</span>
              <button
                className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-200 transition-colors disabled:opacity-50"
                onClick={() => setQuantity(quantity + 1)}
                disabled={!selectedProduct.inStock}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Add to Cart Button */}
            <Button
              className="flex-1 rounded-full h-12 text-base gap-2"
              onClick={handleAddToCart}
              disabled={!selectedProduct.inStock}
            >
              <ShoppingBag className="w-5 h-5" />
              {selectedProduct.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
      </div>
    </Sheet>
  );
}
