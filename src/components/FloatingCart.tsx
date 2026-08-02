"use client";

import React from "react";
import { useStore } from "@/store/StoreContext";
import { storeInfo } from "@/data/store";
import { ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function FloatingCart() {
  const { cartTotalCount, cartTotalPrice, setIsCartOpen, isCartOpen } = useStore();

  return (
    <AnimatePresence>
      {cartTotalCount > 0 && !isCartOpen && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30"
        >
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-3 bg-zinc-900 text-white px-6 py-4 rounded-full shadow-2xl shadow-zinc-900/20 hover:scale-105 active:scale-95 transition-transform"
          >
            <div className="relative">
              <ShoppingBag className="h-5 w-5" />
              <span className="absolute -top-2 -right-2 bg-white text-zinc-900 text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                {cartTotalCount}
              </span>
            </div>
            <span className="font-medium text-sm">
              View Cart • {storeInfo.currencySymbol}{cartTotalPrice.toFixed(2)}
            </span>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
