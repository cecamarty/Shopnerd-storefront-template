"use client";

import React from 'react';
import { categories } from '@/data/categories';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';

export const CategoryChips = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useUIStore();

  return (
    <div className="w-full overflow-x-auto scrollbar-hide py-3 px-4 bg-white/80 backdrop-blur-md sticky top-[68px] z-20">
      <div className="flex gap-2 min-w-max">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategoryId(category.id)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap",
              selectedCategoryId === category.id
                ? "bg-black text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};
