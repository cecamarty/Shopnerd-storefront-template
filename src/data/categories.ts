export interface Category {
  id: string;
  name: string;
}

export const categories: Category[] = [
  { id: 'all', name: 'All' },
  { id: 'apparel', name: 'Apparel' },
  { id: 'accessories', name: 'Accessories' },
  { id: 'home', name: 'Home' },
  { id: 'tech', name: 'Tech' },
];
