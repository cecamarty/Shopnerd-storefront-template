import { create } from 'zustand';
import { Product } from '../data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setCartOpen: (isOpen: boolean) => void;
  totalItems: number;
  totalPrice: number;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  isCartOpen: false,
  setCartOpen: (isOpen) => set({ isCartOpen: isOpen }),
  addItem: (product, quantity = 1) => set((state) => {
    const existingItemIndex = state.items.findIndex(item => item.product.id === product.id);
    let newItems;
    if (existingItemIndex > -1) {
      newItems = [...state.items];
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems = [...state.items, { product, quantity }];
    }
    return {
      items: newItems,
      totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    };
  }),
  removeItem: (productId) => set((state) => {
    const newItems = state.items.filter(item => item.product.id !== productId);
    return {
      items: newItems,
      totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    };
  }),
  updateQuantity: (productId, quantity) => set((state) => {
    if (quantity <= 0) {
      return state; // Handle removal via removeItem
    }
    const newItems = state.items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    return {
      items: newItems,
      totalItems: newItems.reduce((acc, item) => acc + item.quantity, 0),
      totalPrice: newItems.reduce((acc, item) => acc + (item.product.price * item.quantity), 0)
    };
  }),
  clearCart: () => set({ items: [], totalItems: 0, totalPrice: 0 }),
  totalItems: 0,
  totalPrice: 0,
}));
