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
      <div className="relative pb-24 h-full flex flex-col">
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md rounded-full shadow-sm text-zinc-500 hover:text-zinc-900"
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
          <div className="flex gap-2 mb-3">
             {selectedProduct.isNew && <Badge>New Arrival</Badge>}
             {selectedProduct.isSale && <Badge variant="destructive">On Sale</Badge>}
          </div>

          <h2 className="text-2xl font-semibold text-zinc-900 mb-2">
            {selectedProduct.name}
          </h2>

          <Price
            price={selectedProduct.price}
            originalPrice={selectedProduct.originalPrice}
            className="text-lg mb-6"
          />

          <div className="prose prose-sm text-zinc-500 mb-8 flex-1">
            <p>{selectedProduct.description}</p>
          </div>

        </div>

        <div className="absolute bottom-0 left-0 right-0 p-4 bg-white border-t border-zinc-100 flex gap-4 items-center">
             <div className="flex items-center gap-3 bg-zinc-100 rounded-full px-2 h-12">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 text-zinc-500 hover:text-zinc-900 disabled:opacity-50"
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-4 text-center font-medium text-zinc-900">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 text-zinc-500 hover:text-zinc-900"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <Button
              className="flex-1 h-12 rounded-full text-base"
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
