export type Category = {
  id: string;
  name: string;
};

export const categories: Category[] = [
  { id: "all", name: "All" },
  { id: "home", name: "Home" },
  { id: "apparel", name: "Apparel" },
  { id: "accessories", name: "Accessories" },
  { id: "tech", name: "Tech" },
];
