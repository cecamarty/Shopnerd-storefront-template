'use client';

import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { Product, CartItem, ProductChoice } from '../data/types';

interface StoreContextType {
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity: number, notes?: string, selectedOptions?: Record<string, ProductChoice>) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  cartTotal: number;
  cartCount: number;

  // Search & Filter
  activeCategory: string;
  setActiveCategory: (categoryId: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Overlays
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = useCallback((product: Product, quantity: number, notes?: string, selectedOptions?: Record<string, ProductChoice>) => {
    setCart((prev) => {
      // In a real app, you'd check for existing items with exactly the same options/notes to merge them.
      // For simplicity, we just add a new item here with a unique ID based on timestamp.
      const newItemId = `${product.id}-${Date.now()}`;
      return [...prev, { id: newItemId, product, quantity, notes, selectedOptions }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          return { ...item, quantity: Math.max(0, quantity) };
        }
        return item;
      }).filter(item => item.quantity > 0)
    );
  }, []);

  const cartTotal = cart.reduce((total, item) => {
    let itemPrice = item.product.price;
    if (item.selectedOptions) {
      Object.values(item.selectedOptions).forEach(choice => {
        if (choice.price) itemPrice += choice.price;
      });
    }
    return total + itemPrice * item.quantity;
  }, 0);

  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <StoreContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartTotal,
        cartCount,
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery,
        selectedProduct,
        setSelectedProduct,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
}