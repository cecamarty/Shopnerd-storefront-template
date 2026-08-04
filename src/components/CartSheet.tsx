'use client';

import React from 'react';
import Image from 'next/image';
import { Drawer } from 'vaul';
import { useStore } from '../store';
import { Button } from './Button';
import { QuantitySelector } from './QuantitySelector';
import { Icons } from './Icons';
import { EmptyState } from './EmptyState';
import { storeData } from '../data/store';

export function CartSheet() {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, cartTotal } = useStore();

  const handleCheckout = () => {
    const text = encodeURIComponent(
      `Hello ${storeData.name}! I would like to order:\n\n` +
      cart.map(item => {
        let details = `${item.quantity}x ${item.product.name}`;
        if (item.selectedOptions) {
          const opts = Object.values(item.selectedOptions).map(o => o.name).join(', ');
          if (opts) details += ` (${opts})`;
        }
        if (item.notes) details += `\n   Note: ${item.notes}`;
        return details;
      }).join('\n\n') +
      `\n\nTotal: $${cartTotal.toFixed(2)}`
    );

    window.open(`https://wa.me/${storeData.contact.whatsapp.replace(/\D/g, '')}?text=${text}`, '_blank');
  };

  return (
    <Drawer.Root open={isCartOpen} onOpenChange={setIsCartOpen} direction="right">
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 right-0 top-0 z-50 flex w-full max-w-md flex-col bg-white shadow-2xl">
          <div className="flex items-center justify-between border-b border-gray-100 p-4 sm:p-6">
            <h2 className="text-lg font-bold text-gray-900">Your Order</h2>
            <button
              onClick={() => setIsCartOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
            >
              <Icons.close className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6 scrollbar-hide">
            {cart.length === 0 ? (
              <div className="flex h-full flex-col items-center justify-center">
                <EmptyState
                  icon={Icons.cart}
                  title="Your cart is empty"
                  description="Looks like you haven't added any dishes to your cart yet."
                  action={
                    <Button onClick={() => setIsCartOpen(false)} className="mt-4 rounded-full">
                      Browse Menu
                    </Button>
                  }
                />
              </div>
            ) : (
              <div className="space-y-6">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <div>
                          <h3 className="font-semibold text-gray-900 line-clamp-1">{item.product.name}</h3>
                          {item.selectedOptions && Object.values(item.selectedOptions).length > 0 && (
                            <p className="text-xs text-gray-500 mt-0.5">
                              {Object.values(item.selectedOptions).map(o => o.name).join(', ')}
                            </p>
                          )}
                          {item.notes && (
                            <p className="text-xs text-gray-400 mt-0.5 italic line-clamp-1">&quot;{item.notes}&quot;</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500"
                        >
                          <Icons.close className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <QuantitySelector
                          quantity={item.quantity}
                          onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                          onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                          size="sm"
                        />
                        <span className="font-semibold text-gray-900">
                          ${(
                            (item.product.price +
                              Object.values(item.selectedOptions || {}).reduce((acc, opt) => acc + (opt.price || 0), 0)
                            ) * item.quantity
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cart.length > 0 && (
            <div className="border-t border-gray-100 bg-gray-50 p-4 sm:p-6">
              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span className="text-gray-400 italic">Calculated at checkout</span>
                </div>
                <div className="flex justify-between font-bold text-gray-900 pt-3 border-t border-gray-200">
                  <span>Estimated Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>

              <Button onClick={handleCheckout} size="lg" className="w-full rounded-xl bg-[#25D366] hover:bg-[#1ebd5a] text-white">
                <Icons.whatsapp className="mr-2 h-5 w-5" />
                Checkout via WhatsApp
              </Button>
            </div>
          )}
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}