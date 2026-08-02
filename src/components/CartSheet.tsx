"use client";

import React from "react";
import Image from "next/image";
import { useStore } from "@/store/StoreContext";
import { storeInfo } from "@/data/store";
import { Overlay } from "./Overlay";
import { Button } from "./Button";
import { Price } from "./Price";
import { EmptyState } from "./EmptyState";
import { X, Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

export function CartSheet() {
  const { isCartOpen, setIsCartOpen, cartItems, updateQuantity, removeFromCart, cartTotalPrice } = useStore();

  const handleCheckout = () => {
    // Generate WhatsApp Message
    let message = `Hello ${storeInfo.name}! I would like to order:\n\n`;

    cartItems.forEach(item => {
      message += `- ${item.quantity}x ${item.product.name} (${storeInfo.currencySymbol}${item.product.price})\n`;
    });

    message += `\nTotal: ${storeInfo.currencySymbol}${cartTotalPrice.toFixed(2)}\n\n`;
    message += `Please let me know the next steps.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${storeInfo.whatsappNumber.replace(/[^0-9]/g, "")}?text=${encodedMessage}`;

    window.open(whatsappUrl, "_blank");
  };

  return (
    <Overlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} position="bottom">
      <div className="h-full flex flex-col bg-white">
        <div className="flex items-center justify-between p-6 border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur-md z-10">
          <h2 className="text-xl font-semibold text-zinc-900 flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Your Cart
          </h2>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-2 rounded-full hover:bg-zinc-100 transition-colors"
          >
            <X className="h-5 w-5 text-zinc-500" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex items-center justify-center">
              <EmptyState
                icon={<ShoppingBag className="h-8 w-8 text-zinc-400" />}
                title="Your cart is empty"
                description="Looks like you haven't added anything yet."
                action={
                  <Button variant="outline" onClick={() => setIsCartOpen(false)} className="mt-4 rounded-full">
                    Continue Shopping
                  </Button>
                }
              />
            </div>
          ) : (
            <div className="flex flex-col gap-6">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-2">
                      <h3 className="font-medium text-zinc-900 line-clamp-2">{item.product.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <Price price={item.product.price} className="mt-1 mb-auto text-sm" />

                    <div className="flex items-center gap-3 mt-3 w-fit bg-zinc-50 rounded-full px-1 border border-zinc-100">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900"
                      >
                        <Minus className="h-3 w-3" />
                      </button>
                      <span className="w-4 text-center text-sm font-medium text-zinc-900">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1.5 text-zinc-500 hover:text-zinc-900"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="border-t border-zinc-100 p-6 bg-white sticky bottom-0">
            <div className="space-y-3 mb-6">
               <div className="flex justify-between text-sm text-zinc-500">
                 <span>Subtotal</span>
                 <span>{storeInfo.currencySymbol}{cartTotalPrice.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-sm text-zinc-500">
                 <span>Shipping</span>
                 <span>Calculated at checkout</span>
               </div>
               <div className="flex justify-between text-base font-medium text-zinc-900 pt-3 border-t border-zinc-100">
                 <span>Total</span>
                 <span>{storeInfo.currencySymbol}{cartTotalPrice.toFixed(2)}</span>
               </div>
            </div>

            <Button className="w-full h-14 rounded-full text-lg shadow-lg shadow-zinc-200" onClick={handleCheckout}>
              Checkout via WhatsApp
            </Button>
          </div>
        )}
      </div>
    </Overlay>
  );
}
