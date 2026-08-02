import { create } from 'zustand';

interface UIState {
  isCartOpen: boolean;
  selectedProductId: string | null;
  searchQuery: string;
  selectedCategoryId: string;
  openCart: () => void;
  closeCart: () => void;
  openProduct: (id: string) => void;
  closeProduct: () => void;
  setSearchQuery: (query: string) => void;
  setSelectedCategoryId: (id: string) => void;
}

export const useUIStore = create<UIState>((set) => ({
  isCartOpen: false,
  selectedProductId: null,
  searchQuery: '',
  selectedCategoryId: 'all',
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  openProduct: (id) => set({ selectedProductId: id }),
  closeProduct: () => set({ selectedProductId: null }),
  setSearchQuery: (query) => set({ searchQuery: query }),
  setSelectedCategoryId: (id) => set({ selectedCategoryId: id }),
}));
