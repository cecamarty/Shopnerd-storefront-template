export interface ProductVariant {
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
  images: string[];
  categoryId: string;
  inStock: boolean;
  isFavorite?: boolean;
  badge?: string;
  variants?: {
    name: string;
    options: ProductVariant[];
  }[];
}

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Essential Cotton Tee',
    description: 'A perfectly weighted cotton t-shirt for everyday wear. Made from 100% organic cotton.',
    price: 35,
    originalPrice: 45,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80'
    ],
    categoryId: 'apparel',
    inStock: true,
    badge: 'Sale',
    variants: [
      {
        name: 'Size',
        options: [{ id: 's', name: 'S' }, { id: 'm', name: 'M' }, { id: 'l', name: 'L' }]
      }
    ]
  },
  {
    id: 'p2',
    name: 'Minimalist Watch',
    description: 'Clean lines and premium materials. Features a Japanese quartz movement.',
    price: 120,
    image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=800&q=80'],
    categoryId: 'accessories',
    inStock: true,
    badge: 'New'
  },
  {
    id: 'p3',
    name: 'Ceramic Pour-Over',
    description: 'Hand-crafted ceramic pour-over coffee dripper. Matte finish.',
    price: 45,
    image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=800&q=80'],
    categoryId: 'home',
    inStock: false
  },
  {
    id: 'p4',
    name: 'Leather Cardholder',
    description: 'Slim cardholder made from full-grain vegetable-tanned leather.',
    price: 55,
    image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1627123424574-724758594e93?w=800&q=80'],
    categoryId: 'accessories',
    inStock: true,
    variants: [
      {
        name: 'Color',
        options: [{ id: 'black', name: 'Black' }, { id: 'tan', name: 'Tan' }]
      }
    ]
  },
  {
    id: 'p5',
    name: 'Linen Throw Blanket',
    description: 'Lightweight and breathable. Perfect for any season.',
    price: 85,
    image: 'https://images.unsplash.com/photo-1580828369019-18132edafb93?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1580828369019-18132edafb93?w=800&q=80'],
    categoryId: 'home',
    inStock: true
  },
  {
    id: 'p6',
    name: 'Classic Sunglasses',
    description: 'Timeless silhouette with polarized lenses and UV protection.',
    price: 95,
    image: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=800&q=80'],
    categoryId: 'accessories',
    inStock: true
  }
];
