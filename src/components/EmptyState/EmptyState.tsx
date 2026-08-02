import React from 'react';
import { Icons } from '../Icons/Icons';

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
}

export function EmptyState({ title, description, icon }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in duration-300">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 mb-4 text-gray-400">
        {icon || <Icons.search className="h-10 w-10" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 text-sm text-gray-500 max-w-sm">{description}</p>
    </div>
  );
}
