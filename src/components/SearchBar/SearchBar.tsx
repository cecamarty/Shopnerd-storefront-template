import React from 'react';
import { Icons } from '../Icons/Icons';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SearchBar({ value, onChange, placeholder = "Search products..." }: SearchBarProps) {
  return (
    <div className="relative w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <Icons.search className="h-5 w-5 text-gray-400 group-focus-within:text-gray-900 transition-colors" />
        </div>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-2xl leading-5 bg-gray-50 placeholder-gray-400 focus:outline-none focus:bg-white focus:ring-2 focus:ring-gray-900 focus:border-transparent sm:text-sm transition-all"
          placeholder={placeholder}
        />
        {value && (
          <button
            onClick={() => onChange('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
          >
            <Icons.close className="h-4 w-4" />
          </button>
        )}
      </div>
    </div>
  );
}
