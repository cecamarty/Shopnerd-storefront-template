import React from 'react';
import { storeData } from '../data/store';
import { cn } from '../lib/utils';

interface PriceProps {
  amount: number;
  originalAmount?: number;
  className?: string;
}

export function Price({ amount, originalAmount, className }: PriceProps) {
  const format = (value: number) => {
    return `${storeData.currency.symbol}${value.toFixed(2)}`;
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-semibold text-gray-900">{format(amount)}</span>
      {originalAmount && (
        <span className="text-sm text-gray-400 line-through">
          {format(originalAmount)}
        </span>
      )}
    </div>
  );
}