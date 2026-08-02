import React from 'react';

interface ProductGridProps {
  children: React.ReactNode;
}

export function ProductGrid({ children }: ProductGridProps) {
  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 md:grid-cols-4 lg:gap-x-6">
        {children}
      </div>
    </div>
  );
}
