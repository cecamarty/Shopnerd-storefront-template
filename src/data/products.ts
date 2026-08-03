import { Product } from '../types';

export const mockProducts: Product[] = [
  {
    id: "p1",
    name: "Minimalist Ceramic Mug",
    description: "A beautifully crafted ceramic mug perfect for your morning coffee or tea. Features a smooth, matte finish.",
    price: 24.00,
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=2070&auto=format&fit=crop"],
    categoryId: "c1",
    inStock: true,
  },
  {
    id: "p2",
    name: "Linen Throw Blanket",
    description: "Soft, breathable linen throw blanket. Adds a touch of elegance to any living space.",
    price: 85.00,
    originalPrice: 100.00,
    images: ["https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?q=80&w=1974&auto=format&fit=crop"],
    categoryId: "c2",
    inStock: true,
    isSale: true,
  },
  {
    id: "p3",
    name: "Concrete Desk Planter",
    description: "Modern concrete planter designed for small succulents or cacti. Ideal for your workspace.",
    price: 32.00,
    images: ["https://images.unsplash.com/photo-1485955900006-10f4d324d411?q=80&w=2072&auto=format&fit=crop"],
    categoryId: "c2",
    inStock: false,
  },
  {
    id: "p4",
    name: "Leather Notebook Cover",
    description: "Premium full-grain leather notebook cover. Ages beautifully over time.",
    price: 65.00,
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1974&auto=format&fit=crop"],
    categoryId: "c3",
    inStock: true,
  }
];
