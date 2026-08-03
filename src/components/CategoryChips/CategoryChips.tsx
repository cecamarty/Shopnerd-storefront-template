import React, { useRef, useEffect } from 'react';
import { Category } from '../../types';
import { cn } from '../ui/Button';

interface CategoryChipsProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
}

export function CategoryChips({ categories, selectedCategoryId, onSelectCategory }: CategoryChipsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Optional: Scroll selected chip into view (nice for mobile)
  useEffect(() => {
    if (scrollContainerRef.current) {
      const selectedEl = scrollContainerRef.current.querySelector('[aria-selected="true"]');
      if (selectedEl) {
        selectedEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  }, [selectedCategoryId]);

  return (
    <div className="w-full overflow-hidden bg-transparent z-10 pb-4 pt-2">
      <div
        ref={scrollContainerRef}
        className="flex overflow-x-auto hide-scrollbar px-4 sm:px-6 lg:px-8 gap-2 snap-x max-w-4xl mx-auto py-1"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {/* Helper style injected to hide scrollbar on webkit */}
        <style dangerouslySetInnerHTML={{__html: `
          .hide-scrollbar::-webkit-scrollbar { display: none; }
        `}} />

        {categories.map((category) => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id)}
              aria-pressed={isSelected}
              className={cn(
                "snap-start whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all",
                isSelected
                  ? "bg-gray-900 text-white shadow-sm"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
