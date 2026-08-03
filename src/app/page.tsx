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
import { Footer } from '../components/Footer/Footer';
import { mockProducts } from '../data/products';
import { Product } from '../types';
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

  const [isScrolled, setIsScrolled] = useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      // Threshold where the sticky header engages
      setIsScrolled(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-gray-50 pb-24">
      <Header />

      <div
        className={`sticky top-0 z-20 pt-4 pb-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-md shadow-md border-b border-gray-200'
            : 'bg-transparent border-transparent'
        }`}
      >
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

      <Footer />
    </main>
  );
}
