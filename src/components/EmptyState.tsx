import React from "react";

interface EmptyStateProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action?: React.ReactNode;
}

export function EmptyState({ icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 bg-zinc-50 rounded-3xl border border-zinc-100 border-dashed">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-100 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-zinc-900 mb-2">{title}</h3>
      <p className="text-sm text-zinc-500 max-w-sm mb-6">{description}</p>
      {action}
    </div>
  );
}
