import React from 'react';
import { cn } from '@/lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'sale' | 'new';
}

export const Badge = ({ className, variant = 'default', children, ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        {
          'bg-gray-100 text-gray-800': variant === 'default',
          'bg-black text-white': variant === 'sale',
          'bg-blue-100 text-blue-800': variant === 'new',
        },
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
