'use client';

import React from 'react';
import { useStore } from '../store';
import { Icons } from './Icons';
import { motion, AnimatePresence } from 'framer-motion';
import { storeData } from '../data/store';

export function FloatingCart() {
  const { cartCount, cartTotal, setIsCartOpen } = useStore();

  return (
    <AnimatePresence>
      {cartCount > 0 && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-0 right-0 z-40 mx-auto max-w-sm px-4"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex w-full items-center justify-between rounded-full bg-gray-900 px-6 py-4 text-white shadow-xl hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <Icons.cart className="h-5 w-5" />
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">
                  {cartCount}
                </span>
              </div>
              <span className="font-medium">View Order</span>
            </div>
            <span className="font-bold">{storeData.currency.symbol}{cartTotal.toFixed(2)}</span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}