'use client';

import React from 'react';
import { ShoppingBag } from 'lucide-react';
import { useStore } from '@/store';
import { motion, AnimatePresence } from 'framer-motion';

export function FloatingCart() {
  const { cart, setIsCartOpen } = useStore();

  const itemCount = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <AnimatePresence>
      {itemCount > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 50, scale: 0.9 }}
          className="fixed bottom-6 right-6 z-40 sm:bottom-10 sm:right-10"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="group relative flex items-center justify-center p-4 bg-black text-white rounded-full shadow-2xl hover:bg-black/90 transition-transform active:scale-95"
          >
            <ShoppingBag className="w-6 h-6" />

            {/* Badge */}
            <motion.div
              key={itemCount}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-[11px] font-bold text-white border-2 border-white shadow-sm"
            >
              {itemCount}
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
