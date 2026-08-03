"use client";

import React, { useRef, useEffect } from 'react';
import { categories } from '@/data/categories';
import { useUIStore } from '@/store/useUIStore';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export const CategoryChips = () => {
  const { selectedCategoryId, setSelectedCategoryId } = useUIStore();
  const scrollRef = useRef<HTMLDivElement>(null);

  // Optional: auto-scroll to selected category if it was selected from elsewhere
  useEffect(() => {
    if (scrollRef.current) {
      const selectedBtn = scrollRef.current.querySelector(`[data-active="true"]`) as HTMLButtonElement;
      if (selectedBtn) {
        const containerLeft = scrollRef.current.getBoundingClientRect().left;
        const btnLeft = selectedBtn.getBoundingClientRect().left;
        const offset = btnLeft - containerLeft - 16; // 16px padding
        scrollRef.current.scrollTo({ left: scrollRef.current.scrollLeft + offset, behavior: 'smooth' });
      }
    }
  }, [selectedCategoryId]);

  return (
    <div className="w-full border-b border-gray-100/50 pb-2">
      <div
        ref={scrollRef}
        className="w-full overflow-x-auto scrollbar-hide py-2 px-4 flex gap-2 min-w-max snap-x snap-mandatory"
      >
        {categories.map((category) => {
          const isActive = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              data-active={isActive}
              onClick={() => setSelectedCategoryId(category.id)}
              className={cn(
                "relative px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap snap-start shrink-0",
                isActive
                  ? "text-white"
                  : "bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-100 shadow-sm"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeCategory"
                  className="absolute inset-0 bg-black rounded-full"
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
              <span className="relative z-10">{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
