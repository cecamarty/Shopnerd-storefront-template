import { Product } from './types';

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Avocado Toast',
    description: 'Smashed avocado on sourdough with cherry tomatoes and microgreens.',
    price: 12.50,
    image: 'https://images.unsplash.com/photo-1541519227354-08fa5d50c44d?q=80&w=800&auto=format&fit=crop',
    categoryId: 'breakfast',
    badges: ['Popular', 'Vegan'],
    prepTime: '10 min',
    ingredients: ['Sourdough bread', 'Avocado', 'Cherry tomatoes', 'Microgreens', 'Olive oil', 'Sea salt'],
  },
  {
    id: 'p2',
    name: 'Butter Croissant',
    description: 'Flaky, buttery, and freshly baked daily.',
    price: 4.00,
    image: 'https://images.unsplash.com/photo-1549903072-7e6e0ef6c986?q=80&w=800&auto=format&fit=crop',
    categoryId: 'pastries',
    badges: ['Popular'],
    prepTime: '5 min',
  },
  {
    id: 'p3',
    name: 'Cappuccino',
    description: 'Rich espresso with steamed milk and a deep layer of foam.',
    price: 4.50,
    originalPrice: 5.00,
    image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?q=80&w=800&auto=format&fit=crop',
    categoryId: 'coffee',
    prepTime: '5 min',
    options: [
      {
        id: 'milk',
        name: 'Milk Choice',
        required: true,
        choices: [
          { id: 'whole', name: 'Whole Milk' },
          { id: 'oat', name: 'Oat Milk', price: 0.50 },
          { id: 'almond', name: 'Almond Milk', price: 0.50 },
        ]
      }
    ]
  },
  {
    id: 'p4',
    name: 'Turkey Club Sandwich',
    description: 'Roast turkey, bacon, lettuce, tomato, and mayo on toasted sourdough.',
    price: 14.00,
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?q=80&w=800&auto=format&fit=crop',
    categoryId: 'sandwiches',
    prepTime: '15 min',
  },
  {
    id: 'p5',
    name: 'Chocolate Lava Cake',
    description: 'Warm chocolate cake with a gooey molten center.',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?q=80&w=800&auto=format&fit=crop',
    categoryId: 'desserts',
    badges: ['New'],
    prepTime: '20 min',
  },
  {
    id: 'p6',
    name: 'Iced Latte',
    description: 'Chilled espresso and milk over ice.',
    price: 5.00,
    image: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=800&auto=format&fit=crop',
    categoryId: 'coffee',
    prepTime: '5 min',
  }
];