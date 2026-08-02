import React, { useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCartStore } from '../../store/cartStore';
import { storeInfo } from '../../data/store';
import { settings } from '../../theme/settings';
import { QuantitySelector } from '../QuantitySelector/QuantitySelector';
import { Price } from '../Price/Price';
import { Button } from '../Buttons/Button';
import { Icons } from '../Icons/Icons';
import { EmptyState } from '../EmptyState/EmptyState';

export function CartSheet() {
  const { items, isCartOpen, setCartOpen, updateQuantity, removeItem, totalPrice } = useCartStore();

  // Prevent background scrolling when open
  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartOpen]);

  const generateWhatsAppMessage = () => {
    let message = `Hello ${storeInfo.name}! I would like to place an order:\n\n`;

    items.forEach((item, index) => {
      message += `${index + 1}. ${item.product.name} (x${item.quantity}) - ${settings.currencySymbol}${item.product.price * item.quantity}\n`;
    });

    message += `\nTotal: ${settings.currencySymbol}${totalPrice}\n\n`;
    message += `Please let me know the payment and delivery details.`;

    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${storeInfo.whatsappNumber}?text=${encodedMessage}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
          />

          {/* Sheet */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-50 flex flex-col bg-white rounded-t-3xl shadow-2xl md:inset-x-auto md:right-0 md:top-0 md:bottom-0 md:w-[480px] md:rounded-l-3xl md:rounded-tr-none max-h-[90vh] md:max-h-screen"
          >
            {/* Mobile handle */}
            <div className="flex w-full items-center justify-center pt-3 pb-2 md:hidden">
              <div className="h-1.5 w-12 rounded-full bg-gray-300" />
            </div>

            <div className="flex items-center justify-between px-4 pb-4 border-b border-gray-100 md:pt-6 md:px-6">
              <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Icons.cart className="h-5 w-5" />
                Your Cart
              </h2>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-900 transition-colors"
              >
                <Icons.close className="h-5 w-5" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 md:p-6">
              {items.length === 0 ? (
                <div className="h-full flex items-center justify-center">
                  <EmptyState
                    title="Your cart is empty"
                    description="Looks like you haven't added anything yet."
                    icon={<Icons.cart className="h-8 w-8" />}
                  />
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                        <Image
                          src={item.product.images[0]}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-1">
                        <div className="flex justify-between items-start gap-2">
                          <h3 className="font-medium text-gray-900 line-clamp-2 text-sm">{item.product.name}</h3>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                          >
                            <Icons.close className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between mt-2">
                          <Price amount={item.product.price} />
                          <QuantitySelector
                            quantity={item.quantity}
                            onIncrease={() => updateQuantity(item.product.id, item.quantity + 1)}
                            onDecrease={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="h-8"
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
              <div className="p-4 md:p-6 border-t border-gray-100 bg-gray-50/50 shrink-0">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Subtotal</span>
                    <Price amount={totalPrice} />
                  </div>
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                  <div className="flex justify-between font-bold text-gray-900 text-lg pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <Price amount={totalPrice} />
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-base rounded-xl bg-green-600 hover:bg-green-700 text-white shadow-sm"
                  onClick={generateWhatsAppMessage}
                >
                  <Icons.whatsapp className="mr-2 h-5 w-5" />
                  Checkout via WhatsApp
                </Button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
