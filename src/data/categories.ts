export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'new', name: 'New Arrivals' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'home', name: 'Home Objects' },
  { id: 'sale', name: 'Sale' },
];
