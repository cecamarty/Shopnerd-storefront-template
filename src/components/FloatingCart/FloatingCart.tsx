import React, { useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { Icons } from '../ui/Icons';
import { AnimatePresence, motion, useScroll, useMotionValueEvent } from 'framer-motion';

export function FloatingCart() {
  const { totalItems, setCartOpen } = useCartStore();
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() || 0;
    // Hide when scrolling down, show when scrolling up
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else if (latest < previous) {
      setIsHidden(false);
    }
  });

  // Calculate if it should be completely unmounted (no items)
  const shouldRender = totalItems > 0;

  return (
    <AnimatePresence>
      {shouldRender && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: isHidden ? 100 : 0, opacity: isHidden ? 0 : 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 20 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button
            onClick={() => setCartOpen(true)}
            className="relative flex items-center justify-center w-14 h-14 bg-gray-900 text-white rounded-full shadow-lg hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
          >
            <Icons.cart className="w-6 h-6" />
            <motion.div
              key={totalItems}
              initial={{ scale: 0.5, y: 10 }}
              animate={{ scale: 1, y: 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 15 }}
              className="absolute -top-1 -right-1 flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-red-500 text-white text-xs font-bold rounded-full border-2 border-white"
            >
              {totalItems}
            </motion.div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
