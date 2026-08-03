"use client";

import React, { useState } from "react";
import Image from "next/image";
import { useStore } from "@/store/StoreContext";
import { Overlay } from "./Overlay";
import { Price } from "./Price";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { X, Minus, Plus } from "lucide-react";

export function ProductSheet() {
  const { selectedProduct, setSelectedProduct, addToCart, setIsCartOpen } = useStore();
  const [quantity, setQuantity] = useState(1);

  const handleClose = () => {
    setSelectedProduct(null);
    setQuantity(1);
  };

  const handleAddToCart = () => {
    if (selectedProduct) {
      addToCart(selectedProduct, quantity);
      handleClose();
      setIsCartOpen(true);
    }
  };

  if (!selectedProduct) return null;

  return (
    <Overlay isOpen={!!selectedProduct} onClose={handleClose} position="bottom">
      <div className="relative pb-28 h-full flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-30 p-2.5 bg-white/90 backdrop-blur-md rounded-full shadow-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          aria-label="Close product details"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="relative aspect-square w-full bg-zinc-100 flex-shrink-0">
          <Image
            src={selectedProduct.images[0]}
            alt={selectedProduct.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        <div className="p-6 flex flex-col flex-1">
          <div className="flex gap-2 mb-4">
             {selectedProduct.isNew && <Badge>New Arrival</Badge>}
             {selectedProduct.isSale && <Badge variant="destructive">On Sale</Badge>}
          </div>

          <h2 className="text-2xl font-semibold text-zinc-900 mb-2 leading-tight">
            {selectedProduct.name}
          </h2>

          <Price
            price={selectedProduct.price}
            originalPrice={selectedProduct.originalPrice}
            className="text-lg mb-6"
          />

          <div className="prose prose-sm text-zinc-600 mb-8 flex-1 leading-relaxed">
            <p>{selectedProduct.description}</p>
          </div>
        </div>

        {/* Sticky bottom bar */}
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur-xl border-t border-zinc-100/80 flex gap-4 items-center pb-[max(1rem,env(safe-area-inset-bottom))]">
             <div className="flex items-center gap-3 bg-zinc-100/80 rounded-full px-2 h-14">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2.5 text-zinc-500 hover:text-zinc-900 disabled:opacity-50 transition-colors"
                disabled={quantity <= 1}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-5 text-center font-semibold text-zinc-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2.5 text-zinc-500 hover:text-zinc-900 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              className="flex-1 h-14 rounded-full text-base font-semibold shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] active:scale-[0.98] transition-transform"
              onClick={handleAddToCart}
              disabled={!selectedProduct.inStock}
            >
              {selectedProduct.inStock ? "Add to Cart" : "Out of Stock"}
            </Button>
          </div>
      </div>
    </Overlay>
  );
}
