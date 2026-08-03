import React from 'react';
import { Minus, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
}

export const QuantitySelector = ({ quantity, onIncrease, onDecrease, className }: QuantitySelectorProps) => {
  return (
    <div className={cn("flex items-center rounded-full border border-gray-200 bg-white", className)}>
      <button
        onClick={onDecrease}
        className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black rounded-l-full"
        aria-label="Decrease quantity"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center text-sm font-medium">{quantity}</span>
      <button
        onClick={onIncrease}
        className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-black rounded-r-full"
        aria-label="Increase quantity"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
};
