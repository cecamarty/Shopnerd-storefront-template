import React from 'react';
import { settings } from '@/theme/settings';
import { cn } from '@/lib/utils';

interface PriceProps {
  amount: number;
  originalAmount?: number;
  className?: string;
}

export const Price = ({ amount, originalAmount, className }: PriceProps) => {
  const formattedPrice = new Intl.NumberFormat(settings.locale, {
    style: 'currency',
    currency: settings.currency,
  }).format(amount);

  const formattedOriginalPrice = originalAmount
    ? new Intl.NumberFormat(settings.locale, {
        style: 'currency',
        currency: settings.currency,
      }).format(originalAmount)
    : null;

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <span className="font-medium text-gray-900">{formattedPrice}</span>
      {formattedOriginalPrice && (
        <span className="text-sm text-gray-400 line-through">
          {formattedOriginalPrice}
        </span>
      )}
    </div>
  );
};
