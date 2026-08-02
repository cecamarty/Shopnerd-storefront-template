"use client";

import React, { useMemo } from "react";
import { products } from "@/data/products";
import { useStore } from "@/store/StoreContext";
import { ProductCard } from "./ProductCard";
import { EmptyState } from "./EmptyState";
import { PackageX } from "lucide-react";

export function ProductGrid() {
  const { searchQuery, selectedCategory } = useStore();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === "all" || product.categoryId === selectedCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [searchQuery, selectedCategory]);

  if (filteredProducts.length === 0) {
    return (
      <div className="px-6 py-12">
        <EmptyState
          icon={<PackageX className="h-8 w-8 text-zinc-400" />}
          title="No products found"
          description="Try adjusting your search or category filters."
        />
      </div>
    );
  }

  return (
    <div className="px-6 py-6">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
