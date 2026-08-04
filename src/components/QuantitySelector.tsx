'use client';

import React from 'react';
import { Icons } from './Icons';
import { Button } from './Button';
import { cn } from '../lib/utils';

interface QuantitySelectorProps {
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function QuantitySelector({ quantity, onIncrease, onDecrease, className, size = 'md' }: QuantitySelectorProps) {
  return (
    <div className={cn("flex items-center rounded-full border border-gray-200 bg-white", className)}>
      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full hover:bg-gray-100", size === 'sm' ? "h-8 w-8" : "h-10 w-10")}
        onClick={onDecrease}
      >
        <Icons.remove className={cn(size === 'sm' ? "h-3 w-3" : "h-4 w-4")} />
      </Button>

      <span className={cn("font-medium text-center", size === 'sm' ? "w-6 text-sm" : "w-8 text-base")}>
        {quantity}
      </span>

      <Button
        variant="ghost"
        size="icon"
        className={cn("rounded-full hover:bg-gray-100", size === 'sm' ? "h-8 w-8" : "h-10 w-10")}
        onClick={onIncrease}
      >
        <Icons.add className={cn(size === 'sm' ? "h-3 w-3" : "h-4 w-4")} />
      </Button>
    </div>
  );
}