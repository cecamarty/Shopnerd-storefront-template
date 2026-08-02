"use client";

import React from 'react';
import { useUIStore } from '@/store/useUIStore';
import { Search } from 'lucide-react';

export const SearchArea = () => {
  const { searchQuery, setSearchQuery } = useUIStore();

  return (
    <div className="px-4 py-2 sticky top-0 z-20 bg-white/80 backdrop-blur-md">
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full rounded-full border-0 py-3 pl-10 pr-4 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6 bg-gray-50/50"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
    </div>
  );
};
