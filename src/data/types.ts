export interface Category {
  id: string;
  name: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  gallery?: string[];
  categoryId: string;
  badges?: ('Popular' | 'New' | 'Spicy' | 'Vegan' | 'Gluten-Free')[];
  prepTime?: string;
  ingredients?: string[];
  options?: ProductOption[];
}

export interface ProductOption {
  id: string;
  name: string;
  choices: ProductChoice[];
  required?: boolean;
}

export interface ProductChoice {
  id: string;
  name: string;
  price?: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  notes?: string;
  selectedOptions?: Record<string, ProductChoice>;
}