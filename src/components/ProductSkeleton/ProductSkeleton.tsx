import React from 'react';
import { motion } from 'framer-motion';

export function ProductSkeleton() {
  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gray-200 animate-pulse" />
      <div className="flex flex-col gap-2">
        <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />
        <div className="h-4 w-1/4 rounded bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
