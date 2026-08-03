'use client';

import React, { useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { categories } from '@/data/categories';
import { useStore } from '@/store';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export function SearchBar() {
  const { searchQuery, setSearchQuery, activeCategory, setActiveCategory } = useStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Optional: Scroll to active category chip on load if needed
  useEffect(() => {
    if (scrollRef.current) {
      const activeElement = scrollRef.current.querySelector('[data-active="true"]');
      if (activeElement) {
        activeElement.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [activeCategory]);

  return (
    <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-100 pb-3 pt-3">
      <div className="max-w-3xl mx-auto px-4 space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-3 border-none rounded-2xl bg-gray-100 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-black sm:text-sm transition-shadow"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Category Chips */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 hide-scrollbar scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                data-active={isActive}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "relative whitespace-nowrap px-4 py-1.5 text-sm font-medium rounded-full transition-colors",
                  isActive ? "text-white" : "text-gray-600 bg-gray-100 hover:bg-gray-200"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 bg-black rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{category.name}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
