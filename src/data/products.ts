export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  categoryId: string;
  images: string[];
  inStock: boolean;
  isNew?: boolean;
  isSale?: boolean;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "Minimalist Ceramic Mug",
    description: "A beautifully crafted ceramic mug, perfect for your morning coffee. Features a matte finish and an ergonomic handle.",
    price: 24,
    categoryId: "home",
    images: ["https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?q=80&w=600&auto=format&fit=crop"],
    inStock: true,
    isNew: true,
  },
  {
    id: "p2",
    name: "Organic Cotton T-Shirt",
    description: "Premium organic cotton t-shirt with a relaxed fit. Breathable and incredibly soft.",
    price: 35,
    originalPrice: 45,
    categoryId: "apparel",
    images: ["https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=600&auto=format&fit=crop"],
    inStock: true,
    isSale: true,
  },
  {
    id: "p3",
    name: "Leather Notebook",
    description: "Handcrafted leather-bound notebook with premium acid-free paper. Lay-flat design.",
    price: 45,
    categoryId: "accessories",
    images: ["https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=600&auto=format&fit=crop"],
    inStock: true,
  },
  {
    id: "p4",
    name: "Wireless Earbuds",
    description: "High-fidelity wireless earbuds with active noise cancellation and 24-hour battery life.",
    price: 129,
    originalPrice: 149,
    categoryId: "tech",
    images: ["https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?q=80&w=600&auto=format&fit=crop"],
    inStock: true,
    isSale: true,
  },
  {
    id: "p5",
    name: "Aromatherapy Diffuser",
    description: "Ultrasonic essential oil diffuser with ambient LED lighting and quiet operation.",
    price: 55,
    categoryId: "home",
    images: ["https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=600&auto=format&fit=crop"],
    inStock: false,
  },
  {
    id: "p6",
    name: "Canvas Tote Bag",
    description: "Durable canvas tote bag with reinforced handles and an interior pocket. Perfect for everyday use.",
    price: 28,
    categoryId: "accessories",
    images: ["https://images.unsplash.com/photo-1597484661643-2f5fef640df1?q=80&w=600&auto=format&fit=crop"],
    inStock: true,
  }
];
