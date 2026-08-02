"use client";

import React from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingCart = () => {
  const { items } = useCartStore();
  const { openCart } = useUIStore();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
        >
          <button
            onClick={openCart}
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/90 backdrop-blur-md px-6 py-4 text-white shadow-xl hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black">
                {itemCount}
              </span>
            </div>
            <span className="font-medium">View Cart</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
