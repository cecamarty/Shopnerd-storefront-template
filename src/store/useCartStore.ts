import { create } from 'zustand';
import { Product } from '../data/products';

export interface CartItem {
  id: string; // unique id for cart item (could be product.id + variants)
  product: Product;
  quantity: number;
  selectedVariants: Record<string, string>;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, quantity: number, selectedVariants: Record<string, string>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>((set) => ({
  items: [],
  addItem: (product, quantity, selectedVariants) => set((state) => {
    // Basic check for existing item (could be more robust based on variants)
    const existingItemIndex = state.items.findIndex(item =>
      item.product.id === product.id &&
      JSON.stringify(item.selectedVariants) === JSON.stringify(selectedVariants)
    );

    if (existingItemIndex >= 0) {
      const newItems = [...state.items];
      newItems[existingItemIndex].quantity += quantity;
      return { items: newItems };
    }

    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity,
      selectedVariants
    };

    return { items: [...state.items, newItem] };
  }),
  removeItem: (id) => set((state) => ({
    items: state.items.filter(item => item.id !== id)
  })),
  updateQuantity: (id, quantity) => set((state) => ({
    items: state.items.map(item =>
      item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
    )
  })),
  clearCart: () => set({ items: [] }),
}));
