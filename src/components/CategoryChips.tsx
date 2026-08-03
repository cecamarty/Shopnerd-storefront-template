"use client";

import React from "react";
import { categories } from "@/data/categories";
import { useStore } from "@/store/StoreContext";
import { cn } from "@/lib/utils";

export function CategoryChips() {
  const { selectedCategory, setSelectedCategory } = useStore();

  return (
    <div className="w-full overflow-x-auto pb-4 pt-6 px-6 no-scrollbar">
      <div className="flex gap-3 min-w-max">
        {categories.map((category) => {
          const isSelected = selectedCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={cn(
                "px-5 py-2 rounded-full text-sm font-medium transition-all shadow-sm",
                isSelected
                  ? "bg-zinc-900 text-white"
                  : "bg-white text-zinc-600 border border-zinc-200 hover:bg-zinc-50"
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
