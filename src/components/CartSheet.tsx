'use client';

import React from 'react';
import Image from 'next/image';
import { useStore } from '@/store';
import { Sheet } from './Sheet';
import { Button } from './Button';
import { Price } from './Price';
import { EmptyState } from './EmptyState';
import { storeInfo } from '@/data/store';
import { branding } from '@/theme';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';

export function CartSheet() {
  const { isCartOpen, setIsCartOpen, cart, updateQuantity, removeFromCart } = useStore();

  const subtotal = cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const shipping = subtotal >= storeInfo.freeShippingThreshold ? 0 : storeInfo.shippingCost;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    // Generate mock WhatsApp message
    const orderItems = cart.map(item =>
      `- ${item.quantity}x ${item.product.name} (${storeInfo.currencySymbol}${item.product.price})`
    ).join('%0A');

    const message = `Hello ${branding.storeName}! I'd like to place an order:%0A%0A${orderItems}%0A%0ATotal: ${storeInfo.currencySymbol}${total.toFixed(2)}`;

    window.open(`https://wa.me/${branding.whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <Sheet isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} side="right">
      <div className="flex flex-col h-full bg-white">
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Your Cart</h2>
          <span className="bg-gray-100 text-gray-800 text-xs font-semibold px-2.5 py-0.5 rounded-full">
            {cart.reduce((acc, item) => acc + item.quantity, 0)} items
          </span>
        </div>

        {cart.length === 0 ? (
          <EmptyState
            icon={ShoppingBag}
            title="Your cart is empty"
            description="Looks like you haven't added anything yet."
            action={<Button onClick={() => setIsCartOpen(false)}>Continue Shopping</Button>}
            className="flex-1"
          />
        ) : (
          <>
            <div className="flex-1 overflow-y-auto hide-scrollbar p-6 space-y-6">
              {cart.map((item) => (
                <div key={item.product.id} className="flex gap-4">
                  <div className="relative w-20 h-24 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                    <Image
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex flex-col flex-1">
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium text-sm text-gray-900 line-clamp-2 pr-4">{item.product.name}</h3>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-400 hover:text-red-500 transition-colors p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <Price amount={item.product.price} className="text-sm mb-auto" />

                    <div className="flex items-center mt-3 w-fit rounded-full border border-gray-200 bg-gray-50">
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button
                        className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 text-gray-600"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-100 p-6 bg-gray-50/50">
              <div className="space-y-3 text-sm text-gray-600 mb-6">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{storeInfo.currencySymbol}{subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? 'Free' : `${storeInfo.currencySymbol}${shipping.toFixed(2)}`}</span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-gray-500">
                    Add {storeInfo.currencySymbol}{(storeInfo.freeShippingThreshold - subtotal).toFixed(2)} more for free shipping
                  </p>
                )}
                <div className="flex justify-between font-bold text-lg text-gray-900 pt-3 border-t border-gray-200">
                  <span>Total</span>
                  <span>{storeInfo.currencySymbol}{total.toFixed(2)}</span>
                </div>
              </div>

              <Button
                className="w-full rounded-full h-12 text-base font-semibold"
                onClick={handleCheckout}
              >
                Checkout via WhatsApp
              </Button>
            </div>
          </>
        )}
      </div>
    </Sheet>
  );
}
