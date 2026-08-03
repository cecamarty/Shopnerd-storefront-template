import React from "react";
import { cn } from "@/lib/utils";
import { storeInfo } from "@/data/store";

interface PriceProps extends React.HTMLAttributes<HTMLDivElement> {
  price: number;
  originalPrice?: number;
}

export function Price({ price, originalPrice, className, ...props }: PriceProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props}>
      <span className="font-semibold text-zinc-900">
        {storeInfo.currencySymbol}{price.toFixed(2)}
      </span>
      {originalPrice && (
        <span className="text-sm text-zinc-500 line-through">
          {storeInfo.currencySymbol}{originalPrice.toFixed(2)}
        </span>
      )}
    </div>
  );
}
