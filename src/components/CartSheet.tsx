"use client";

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { useCartStore } from '@/store/useCartStore';
import { store } from '@/data/store';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from './ui/Button';
import { Price } from './ui/Price';
import { QuantitySelector } from './ui/QuantitySelector';
import { EmptyState } from './ui/EmptyState';

export const CartSheet = () => {
  const { isCartOpen, closeCart } = useUIStore();
  const { items, removeItem, updateQuantity } = useCartStore();

  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);

  // Mock shipping and discount logic for demonstration
  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    if (items.length === 0) return;

    let message = `Hello ${store.storeName}! I'd like to place an order:\n\n`;

    items.forEach(item => {
      const variantStr = Object.entries(item.selectedVariants)
        .map(([key, val]) => `${key}: ${val}`)
        .join(', ');

      message += `- ${item.quantity}x ${item.product.name} ${variantStr ? `(${variantStr})` : ''} - $${item.product.price * item.quantity}\n`;
    });

    message += `\nSubtotal: $${subtotal}\nShipping: $${shipping}\n*Total: $${total}*`;

    const whatsappUrl = `https://wa.me/${store.contact.whatsapp}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');

    // Optional: clear cart after checkout
    // clearCart();
    // closeCart();
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white rounded-t-3xl h-[85vh] md:h-[90vh] md:w-[500px] md:left-1/2 md:-translate-x-1/2 overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 shrink-0">
              <h2 className="text-xl font-semibold text-gray-900">Your Cart</h2>
              <button
                onClick={closeCart}
                className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4 scrollbar-hide">
              {items.length === 0 ? (
                <EmptyState
                  icon={ShoppingBag}
                  title="Your cart is empty"
                  description="Looks like you haven't added anything to your cart yet."
                  className="h-full"
                />
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4">
                      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-gray-100">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start">
                            <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.product.name}</h3>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 p-1"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                          <div className="mt-1 flex flex-wrap gap-1 text-xs text-gray-500">
                            {Object.entries(item.selectedVariants).map(([key, val]) => (
                              <span key={key} className="bg-gray-100 px-2 py-0.5 rounded-full">
                                {val}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Price amount={item.product.price} />
                          <QuantitySelector
                            quantity={item.quantity}
                            onIncrease={() => updateQuantity(item.id, item.quantity + 1)}
                            onDecrease={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 scale-90 origin-right" // Make it slightly smaller in cart
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Checkout Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50 p-6 shrink-0 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
                <div className="space-y-3 mb-6 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping {subtotal > 100 && '(Free over $100)'}</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-semibold text-gray-900 text-lg pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  className="w-full h-14 text-lg font-semibold"
                  onClick={handleCheckout}
                >
                  Checkout via WhatsApp
                </Button>
                <p className="text-center text-xs text-gray-500 mt-4">
                  You&apos;ll be redirected to WhatsApp to complete your order.
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
