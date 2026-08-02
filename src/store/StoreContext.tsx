"use client";

import React, { createContext, useContext, useState, ReactNode, useCallback } from "react";
import { Product } from "@/data/products";

type CartItem = {
  product: Product;
  quantity: number;
};

type StoreContextType = {
  // Navigation & Filtering State
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;

  // Overlay State
  selectedProduct: Product | null;
  setSelectedProduct: (product: Product | null) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;

  // Cart State
  cartItems: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  cartTotalCount: number;
  cartTotalPrice: number;
  clearCart: () => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = useCallback((product: Product, quantity: number) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.product.id === product.id);
      if (existing) {
        return prev.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prev, { product, quantity }];
    });
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCartItems(prev => {
      if (quantity <= 0) return prev.filter(item => item.product.id !== productId);
      return prev.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      );
    });
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  const cartTotalCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const cartTotalPrice = cartItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);

  return (
    <StoreContext.Provider value={{
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedProduct,
      setSelectedProduct,
      isCartOpen,
      setIsCartOpen,
      cartItems,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      cartTotalCount,
      cartTotalPrice,
    }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useStore() {
  const context = useContext(StoreContext);
  if (context === undefined) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
}
