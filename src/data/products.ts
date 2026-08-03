export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  imageUrl: string;
  images: string[];
  categoryId: string;
  isSale?: boolean;
  inStock: boolean;
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Minimalist Watch',
    description: 'A sleek, minimalist timepiece perfect for any occasion. Features a matte black dial and premium leather strap.',
    price: 129.99,
    originalPrice: 159.99,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=600&fit=crop&q=80',
      'https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600&h=600&fit=crop&q=80'
    ],
    categoryId: 'accessories',
    isSale: true,
    inStock: true,
  },
  {
    id: 'p2',
    name: 'Organic Cotton Tee',
    description: 'Ultra-soft, breathable organic cotton t-shirt. Designed for everyday comfort and durability.',
    price: 35.00,
    imageUrl: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=600&fit=crop&q=80'
    ],
    categoryId: 'apparel',
    inStock: true,
  },
  {
    id: 'p3',
    name: 'Ceramic Coffee Mug',
    description: 'Handcrafted ceramic mug with a smooth matte finish. Holds 12oz of your favorite beverage.',
    price: 24.00,
    imageUrl: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=600&h=600&fit=crop&q=80'
    ],
    categoryId: 'home',
    inStock: true,
  },
  {
    id: 'p4',
    name: 'Wireless Noise-Canceling Earbuds',
    description: 'Premium wireless earbuds with active noise cancellation and up to 24 hours of battery life.',
    price: 199.99,
    originalPrice: 249.99,
    imageUrl: 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=600&h=600&fit=crop&q=80'
    ],
    categoryId: 'tech',
    isSale: true,
    inStock: false,
  },
  {
    id: 'p5',
    name: 'Leather Weekend Bag',
    description: 'Spacious weekend duffel made from full-grain leather. Features solid brass hardware and an adjustable shoulder strap.',
    price: 285.00,
    imageUrl: 'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1547949003-9792a18a2601?w=600&h=600&fit=crop&q=80'
    ],
    categoryId: 'accessories',
    inStock: true,
  },
  {
    id: 'p6',
    name: 'Linen Throw Pillow',
    description: 'Woven from 100% pure linen, this textured throw pillow adds a touch of relaxed elegance to any room.',
    price: 45.00,
    imageUrl: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=600&h=600&fit=crop&q=80',
    images: [
      'https://images.unsplash.com/photo-1584100936595-c0654b55a2e6?w=600&h=600&fit=crop&q=80'
    ],
    categoryId: 'home',
    inStock: true,
  }
];
