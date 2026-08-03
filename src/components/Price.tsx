import React from 'react';
import { storeInfo } from '@/data/store';
import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number;
  originalAmount?: number;
  className?: string;
}

export function Price({ amount, originalAmount, className }: PriceProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: storeInfo.currency,
      minimumFractionDigits: price % 1 === 0 ? 0 : 2,
    }).format(price);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-medium">{formatPrice(amount)}</span>
      {originalAmount && originalAmount > amount && (
        <span className="text-sm text-gray-500 line-through">
          {formatPrice(originalAmount)}
        </span>
      )}
    </div>
  );
}
