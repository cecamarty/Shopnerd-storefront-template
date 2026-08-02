export interface Category {
  id: string;
  name: string;
}

export const mockCategories: Category[] = [
  { id: "all", name: "All Products" },
  { id: "c1", name: "Kitchen" },
  { id: "c2", name: "Home Decor" },
  { id: "c3", name: "Accessories" },
];
