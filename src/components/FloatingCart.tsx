"use client";

import React, { useEffect, useState } from 'react';
import { useCartStore } from '@/store/useCartStore';
import { useUIStore } from '@/store/useUIStore';
import { ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';

interface FloatingCartProps {
  scrollY?: number;
}

export const FloatingCart = ({ scrollY = 0 }: FloatingCartProps) => {
  const { items } = useCartStore();
  const { openCart, isCartOpen } = useUIStore();
  // Derive visibility strictly during render without cascading state updates
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('up');
  const controls = useAnimation();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  const [prevItemCount, setPrevItemCount] = useState(itemCount);

  // We still need to trigger the animation
  useEffect(() => {
    if (itemCount > prevItemCount) {
      controls.start({
        scale: [1, 1.15, 0.9, 1.05, 1],
        transition: { duration: 0.5, type: "spring", stiffness: 400, damping: 10 }
      });
    }
  }, [itemCount, prevItemCount, controls]);

  // Update previous counts and scroll metrics independently
  if (itemCount !== prevItemCount) {
    setPrevItemCount(itemCount);
  }

  if (scrollY !== lastScrollY) {
    setScrollDirection(scrollY > lastScrollY ? 'down' : 'up');
    setLastScrollY(scrollY);
  }

  // Derive final visibility from current state
  // Show if: we just added an item, OR we are scrolling up, OR we are near the top
  const isVisible = (itemCount > prevItemCount) || (scrollDirection === 'up') || (scrollY < 100);

  // Don't show floating cart if the cart sheet is already open
  const shouldShow = itemCount > 0 && isVisible && !isCartOpen;

  return (
    <AnimatePresence>
      {shouldShow && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none"
        >
          <motion.button
            animate={controls}
            onClick={openCart}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.95 }}
            className="pointer-events-auto flex items-center gap-3 rounded-full bg-black/90 backdrop-blur-md px-6 py-4 text-white shadow-xl hover:bg-black transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <motion.span
                initial={false}
                animate={{ scale: [1, 1.2, 1] }}
                key={itemCount} // re-animate on count change
                className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-white text-[10px] font-bold text-black"
              >
                {itemCount}
              </motion.span>
            </div>
            <span className="font-medium">View Cart</span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
