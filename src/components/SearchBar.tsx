"use client";

import React, { useRef, useEffect } from "react";
import { Search, X } from "lucide-react";
import { useStore } from "@/store/StoreContext";
import { useAppScroll } from "@/store/ScrollContext";
import { cn } from "@/lib/utils";

export function SearchBar() {
  const { searchQuery, setSearchQuery } = useStore();
  const { scrollY } = useAppScroll();

  // Add a dynamic shadow only when scrolled past a certain point
  const isPinned = scrollY > 150;

  return (
    <div className={cn(
        "relative w-full transition-all duration-300 z-20",
        isPinned ? "py-3 bg-white/90 backdrop-blur-xl border-b border-zinc-100 shadow-sm" : "pt-6 bg-transparent"
      )}
    >
      <div className="max-w-md mx-auto px-6 w-full">
        <div className="relative flex items-center w-full h-12 rounded-full bg-zinc-100 border border-zinc-200/80 px-4 focus-within:ring-2 focus-within:ring-zinc-900 focus-within:border-transparent transition-all shadow-sm">
          <Search className="h-5 w-5 text-zinc-400 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none px-3 text-sm text-zinc-900 placeholder:text-zinc-500 w-full"
            aria-label="Search products"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="p-1 rounded-full hover:bg-zinc-200 transition-colors"
              aria-label="Clear search"
            >
              <X className="h-4 w-4 text-zinc-500" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
