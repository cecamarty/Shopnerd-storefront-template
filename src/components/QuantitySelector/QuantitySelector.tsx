import React from 'react';
import { Icons } from '../ui/Icons';
import { cn } from '../ui/Button';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  min?: number;
  max?: number;
  className?: string;
}

export function QuantitySelector({ quantity, onIncrease, onDecrease, min = 1, max = 99, className }: QuantitySelectorProps) {
  return (
    <div className={cn("flex items-center border border-gray-200 rounded-lg bg-gray-50", className)}>
      <button
        onClick={onDecrease}
        disabled={quantity <= min}
        className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-50 transition-colors"
        aria-label="Decrease quantity"
      >
        <Icons.subtract className="h-4 w-4" />
      </button>
      <div className="flex h-10 w-8 items-center justify-center text-sm font-medium text-gray-900">
        {quantity}
      </div>
      <button
        onClick={onIncrease}
        disabled={quantity >= max}
        className="flex h-10 w-10 items-center justify-center text-gray-500 hover:text-gray-900 disabled:opacity-50 transition-colors"
        aria-label="Increase quantity"
      >
        <Icons.add className="h-4 w-4" />
      </button>
    </div>
  );
}
