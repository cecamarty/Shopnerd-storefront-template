import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../../data/products';
import { useCartStore } from '../../store/cartStore';
import { ImageGallery } from '../ImageGallery/ImageGallery';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { Price } from '../Price/Price';
import { Button } from '../Buttons/Button';
import { Badge } from '../Badge/Badge';
import { Icons } from '../Icons/Icons';

interface ProductSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductSheet({ product, isOpen, onClose }: ProductSheetProps) {
  const { addItem } = useCartStore();
  const [quantity, setQuantity] = useState(1);

  // Reset quantity when new product opens
  useEffect(() => {
    if (isOpen) {
      setQuantity(1);
    }
  }, [isOpen, product]);

  // Prevent background scrolling when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && product && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white rounded-t-3xl shadow-2xl md:inset-x-auto md:right-0 md:top-0 md:bottom-0 md:w-[480px] md:rounded-l-3xl md:rounded-tr-none max-h-[90vh] md:max-h-screen"
          >
            {/* Mobile handle */}
            <div className="flex w-full items-center justify-center pt-3 pb-2 md:hidden">
              <div className="h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            <div className="flex items-center justify-between px-4 pb-2 md:pt-6 md:px-6">
              <h2 className="text-lg font-semibold text-gray-900 sr-only">Product Details</h2>
              <button
                onClick={onClose}
                className="ml-auto rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Icons.close className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto">
              <ImageGallery images={product.images} />

              <div className="p-4 md:p-6 flex flex-col gap-6">
                <div>
                  <div className="flex justify-between items-start gap-4 mb-2">
                    <h1 className="text-2xl font-bold text-gray-900">{product.name}</h1>
                    <div className="flex-shrink-0">
                      <Price amount={product.price} originalAmount={product.originalPrice} className="text-xl" />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {product.isSale && <Badge variant="destructive">Sale</Badge>}
                    {product.inStock ? (
                      <Badge variant="secondary" className="bg-green-100 text-green-800">In Stock</Badge>
                    ) : (
                      <Badge variant="secondary">Out of Stock</Badge>
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-sm font-medium text-gray-900">Description</h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {product.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Bottom Sticky Action Bar */}
            <div className="p-4 border-t border-gray-100 bg-white md:p-6 shrink-0">
              <div className="flex items-center gap-4">
                <QuantitySelector
                  quantity={quantity}
                  onIncrease={() => setQuantity(q => q + 1)}
                  onDecrease={() => setQuantity(q => Math.max(1, q - 1))}
                />
                <Button
                  className="flex-1 h-12 text-base rounded-xl"
                  disabled={!product.inStock}
                  onClick={handleAddToCart}
                >
                  {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
