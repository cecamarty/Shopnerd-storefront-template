"use client";

import React, { useEffect, useState } from "react";
import { useStore } from "@/store/StoreContext";
import { useAppScroll } from "@/store/ScrollContext";
import { storeInfo } from "@/data/store";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";

export function FloatingCart() {
  const { cartTotalCount, cartTotalPrice, setIsCartOpen, isCartOpen } = useStore();
  const { scrollDirection } = useAppScroll();
  const [prevCount, setPrevCount] = useState(cartTotalCount);
  const controls = useAnimation();

  const isVisible = cartTotalCount > 0 && !isCartOpen && scrollDirection !== "down";

  useEffect(() => {
    if (cartTotalCount > prevCount) {
      controls.start({
        scale: [1, 1.15, 1],
        transition: { type: "spring", stiffness: 400, damping: 10 }
      });
    }
    setPrevCount(cartTotalCount);
  }, [cartTotalCount, prevCount, controls]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40" // Above other sticky elements but below modals
        >
          <motion.button
            animate={controls}
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-4 rounded-full shadow-2xl shadow-zinc-900/20 hover:scale-105 active:scale-95 transition-transform"
            aria-label={`View Cart with ${cartTotalCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-white text-zinc-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-sm">
                {cartTotalCount}
              </span>
            </div>
            <span className="font-medium text-sm">
              View Cart • {storeInfo.currencySymbol}{cartTotalPrice.toFixed(2)}
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
