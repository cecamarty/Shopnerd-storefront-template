'use client';

import React, { useState, useMemo } from 'react';
import { Header } from '../components/Header/Header';
import { SearchBar } from '../components/SearchBar/SearchBar';
import { CategoryChips } from '../components/CategoryChips/CategoryChips';
import { ProductGrid } from '../components/ProductGrid/ProductGrid';
import { ProductCard } from '../components/ProductCard/ProductCard';
import { ProductSheet } from '../components/ProductSheet/ProductSheet';
import { CartSheet } from '../components/CartSheet/CartSheet';
import { FloatingCart } from '../components/FloatingCart/FloatingCart';
import { EmptyState } from '../components/EmptyState/EmptyState';
import { mockProducts, Product } from '../data/products';
import { mockCategories } from '../data/categories';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isProductSheetOpen, setIsProductSheetOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.categoryId === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsProductSheetOpen(true);
  };

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <Header />

      <div className="sticky top-0 z-20 bg-gray-50/80 backdrop-blur-md pt-4 pb-2 border-b border-gray-100 shadow-sm">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <CategoryChips
          categories={mockCategories}
          selectedCategoryId={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      </div>

      {filteredProducts.length > 0 ? (
        <ProductGrid>
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={handleProductClick}
            />
          ))}
        </ProductGrid>
      ) : (
        <div className="mt-12">
          <EmptyState
            title="No products found"
            description="We couldn't find anything matching your search or category filter. Try adjusting them."
          />
        </div>
      )}

      {/* Overlays */}
      <ProductSheet
        product={selectedProduct}
        isOpen={isProductSheetOpen}
        onClose={() => setIsProductSheetOpen(false)}
      />
      <CartSheet />
      <FloatingCart />
    </main>
  );
}
