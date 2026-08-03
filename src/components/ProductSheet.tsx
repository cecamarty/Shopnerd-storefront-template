"use client";

import React, { useState } from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';
import { products } from '@/data/products';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button, Price, Badge, QuantitySelector } from '@/components/ui';
import { cn } from '@/lib/utils';

export const ProductSheet = () => {
  const { selectedProductId, closeProduct } = useUIStore();
  const { addItem } = useCartStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});

  const product = products.find(p => p.id === selectedProductId);

  // Initialize state based on the current product
  const [prevProductId, setPrevProductId] = useState<string | null>(null);

  if (product && product.id !== prevProductId) {
    setPrevProductId(product.id);
    setCurrentImageIndex(0);
    setQuantity(1);

    const initialVariants: Record<string, string> = {};
    if (product.variants) {
      product.variants.forEach(v => {
        if (v.options.length > 0) {
          initialVariants[v.name] = v.options[0].id;
        }
      });
    }
    setSelectedVariants(initialVariants);
  }

  if (!product) return null;

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariants);
    closeProduct();
  };

  const nextImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product.images.length > 1) {
      setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  return (
    <AnimatePresence>
      {selectedProductId && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeProduct}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 400 }}
            drag="y"
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                closeProduct();
              }
            }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white rounded-t-3xl max-h-[90vh] md:max-h-[85vh] md:w-[500px] md:left-1/2 md:-translate-x-1/2 overflow-hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)] will-change-transform"
          >
            {/* Handle for drag */}
            <div className="flex justify-center p-3 shrink-0 cursor-grab active:cursor-grabbing touch-none">
              <div className="h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            <div className="flex justify-end px-4 absolute top-4 right-4 z-10">
              <button
                onClick={closeProduct}
                className="p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-gray-100 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 pb-24 scrollbar-hide">
              {/* Image Gallery */}
              <div className="relative aspect-square w-full bg-gray-100">
                <img
                  src={product.images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />

                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm hover:bg-white"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
                      {product.images.map((_, idx) => (
                        <div
                          key={idx}
                          className={cn(
                            "h-1.5 rounded-full transition-all duration-300",
                            idx === currentImageIndex ? "bg-black w-4" : "bg-black/30 w-1.5"
                          )}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Product Info */}
              <div className="p-6">
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{product.name}</h2>
                    <Price amount={product.price} originalAmount={product.originalPrice} className="text-lg" />
                  </div>
                  {product.badge && (
                    <Badge variant={product.badge === 'Sale' ? 'sale' : 'new'}>{product.badge}</Badge>
                  )}
                </div>

                <p className="text-gray-500 mb-8 leading-relaxed">
                  {product.description}
                </p>

                {/* Variants */}
                {product.variants?.map((variant) => (
                  <div key={variant.name} className="mb-6">
                    <h3 className="text-sm font-medium text-gray-900 mb-3">{variant.name}</h3>
                    <div className="flex flex-wrap gap-2">
                      {variant.options.map((option) => (
                        <button
                          key={option.id}
                          onClick={() => setSelectedVariants(prev => ({ ...prev, [variant.name]: option.id }))}
                          className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium border transition-colors focus:outline-none focus:ring-2 focus:ring-black",
                            selectedVariants[variant.name] === option.id
                              ? "border-black bg-black text-white"
                              : "border-gray-200 bg-white text-gray-900 hover:bg-gray-50"
                          )}
                        >
                          {option.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-md border-t border-gray-100 flex gap-4">
              <QuantitySelector
                quantity={quantity}
                onIncrease={() => setQuantity(q => q + 1)}
                onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
              />
              <Button
                className="flex-1"
                disabled={!product.inStock}
                onClick={handleAddToCart}
              >
                {product.inStock ? `Add to Cart • ${(product.price * quantity).toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` : 'Out of Stock'}
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
