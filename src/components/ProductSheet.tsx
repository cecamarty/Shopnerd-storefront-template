'use client';

import React, { useState, useEffect } from 'react';
import { Drawer } from 'vaul';
import { useStore } from '../store';
import { ImageGallery } from './ImageGallery';
import { Price } from './Price';
import { Button } from './Button';
import { QuantitySelector } from './QuantitySelector';
import { Icons } from './Icons';
import { ProductChoice } from '../data/types';

export function ProductSheet() {
  const { selectedProduct, setSelectedProduct, addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [notes, setNotes] = useState('');
  const [selectedOptions, setSelectedOptions] = useState<Record<string, ProductChoice>>({});

  // Reset state when product changes
  useEffect(() => {
    if (selectedProduct) {
      setQuantity(1);
      setNotes('');
      setSelectedOptions({});

      // Auto-select first choice for required options
      if (selectedProduct.options) {
        const initialOptions: Record<string, ProductChoice> = {};
        selectedProduct.options.forEach(opt => {
          if (opt.required && opt.choices.length > 0) {
            initialOptions[opt.id] = opt.choices[0];
          }
        });
        setSelectedOptions(initialOptions);
      }
    }
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    // Validate required options
    if (selectedProduct.options) {
      const missingRequired = selectedProduct.options.find(opt => opt.required && !selectedOptions[opt.id]);
      if (missingRequired) {
        alert(`Please select a ${missingRequired.name}`);
        return;
      }
    }

    addToCart(selectedProduct, quantity, notes, selectedOptions);
    setSelectedProduct(null);
  };

  const images = selectedProduct.gallery || [selectedProduct.image];

  let currentPrice = selectedProduct.price;
  Object.values(selectedOptions).forEach(choice => {
    if (choice.price) currentPrice += choice.price;
  });

  return (
    <Drawer.Root open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" />
        <Drawer.Content className="fixed bottom-0 left-0 right-0 z-50 mt-24 flex h-[90vh] flex-col rounded-t-[2rem] bg-white lg:bottom-auto lg:left-1/2 lg:right-auto lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:h-auto lg:max-h-[85vh] lg:w-full lg:max-w-md lg:rounded-3xl shadow-2xl">
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 rounded-t-[2rem] lg:rounded-3xl scrollbar-hide">
            <div className="mx-auto mb-4 h-1.5 w-12 shrink-0 rounded-full bg-gray-300 lg:hidden" />

            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute right-4 top-4 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-black/10 text-white backdrop-blur-md lg:bg-gray-100 lg:text-gray-900 lg:hover:bg-gray-200"
            >
              <Icons.close className="h-4 w-4" />
            </button>

            <ImageGallery images={images} alt={selectedProduct.name} className="mb-6" />

            <div className="mb-6">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-2xl font-bold text-gray-900">{selectedProduct.name}</h2>
                <Price amount={selectedProduct.price} originalAmount={selectedProduct.originalPrice} className="mt-1" />
              </div>
              <p className="mt-2 text-gray-600 leading-relaxed">{selectedProduct.description}</p>
            </div>

            {selectedProduct.ingredients && selectedProduct.ingredients.length > 0 && (
              <div className="mb-6">
                <h3 className="mb-2 font-semibold text-gray-900">Ingredients</h3>
                <p className="text-sm text-gray-600">{selectedProduct.ingredients.join(', ')}</p>
              </div>
            )}

            {selectedProduct.options && selectedProduct.options.map((option) => (
              <div key={option.id} className="mb-6">
                <div className="mb-3 flex items-baseline justify-between">
                  <h3 className="font-semibold text-gray-900">{option.name}</h3>
                  {option.required && <span className="text-xs font-medium text-red-500">Required</span>}
                </div>
                <div className="space-y-2">
                  {option.choices.map((choice) => (
                    <label
                      key={choice.id}
                      className={`flex cursor-pointer items-center justify-between rounded-xl border p-3 transition-colors ${
                        selectedOptions[option.id]?.id === choice.id ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name={option.id}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                          checked={selectedOptions[option.id]?.id === choice.id}
                          onChange={() => setSelectedOptions(prev => ({ ...prev, [option.id]: choice }))}
                        />
                        <span className="text-sm font-medium text-gray-900">{choice.name}</span>
                      </div>
                      {choice.price ? (
                        <span className="text-sm text-gray-500">+${choice.price.toFixed(2)}</span>
                      ) : null}
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="mb-8">
              <h3 className="mb-3 font-semibold text-gray-900">Special Instructions</h3>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any special requests? (e.g. no onions, extra sauce)"
                className="w-full rounded-xl border-gray-200 bg-gray-50 p-3 text-sm focus:border-gray-900 focus:ring-gray-900"
                rows={3}
              />
            </div>
          </div>

          <div className="border-t border-gray-100 bg-white p-4 sm:p-6 rounded-b-[2rem] lg:rounded-b-3xl">
            <div className="flex items-center gap-4">
              <QuantitySelector
                quantity={quantity}
                onDecrease={() => setQuantity(Math.max(1, quantity - 1))}
                onIncrease={() => setQuantity(quantity + 1)}
              />
              <Button onClick={handleAddToCart} size="lg" className="flex-1 rounded-xl">
                Add to Cart • ${(currentPrice * quantity).toFixed(2)}
              </Button>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}