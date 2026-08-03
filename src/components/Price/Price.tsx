import React from 'react';
import { settings } from '../../theme/settings';

interface PriceProps extends React.HTMLAttributes<HTMLSpanElement> {
  amount: number;
  originalAmount?: number;
}

export function Price({ amount, originalAmount, className, ...props }: PriceProps) {
  const format = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: settings.currency,
    }).format(value);
  };

  return (
    <div className={`flex items-center gap-2 ${className || ''}`} {...props}>
      <span className="font-semibold text-gray-900">{format(amount)}</span>
      {originalAmount && originalAmount > amount && (
        <span className="text-sm text-gray-500 line-through">
          {format(originalAmount)}
        </span>
      )}
    </div>
  );
}
