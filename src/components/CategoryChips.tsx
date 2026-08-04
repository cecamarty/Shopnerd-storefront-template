'use client';

import React from 'react';
import { categories } from '../data/categories';
import { useStore } from '../store';
import { cn } from '../lib/utils';
import { motion } from 'framer-motion';

export function CategoryChips() {
  const { activeCategory, setActiveCategory } = useStore();

  return (
    <div className="bg-background pb-4 pt-2">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const isActive = activeCategory === category.id;
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cn(
                  "relative whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  isActive ? "text-white" : "bg-white text-gray-700 shadow-sm ring-1 ring-inset ring-gray-200 hover:bg-gray-50"
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeCategory"
                    className="absolute inset-0 rounded-full bg-gray-900"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
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