"use client";

import React from "react";
import Image from "next/image";
import { Product } from "@/data/products";
import { Price } from "./Price";
import { Badge } from "./Badge";
import { useStore } from "@/store/StoreContext";

export function ProductCard({ product }: { product: Product }) {
  const { setSelectedProduct } = useStore();

  return (
    <div
      onClick={() => setSelectedProduct(product)}
      className="group cursor-pointer flex flex-col gap-3 rounded-2xl bg-white p-3 shadow-sm border border-zinc-100/50 transition-all hover:shadow-md active:scale-[0.98]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        <div className="absolute top-2 left-2 flex flex-col gap-1.5">
          {product.isNew && <Badge>New</Badge>}
          {product.isSale && <Badge variant="destructive">Sale</Badge>}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center">
             <Badge variant="secondary" className="bg-white/90 text-zinc-900 border border-zinc-200">
                Out of Stock
             </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1 pb-1">
        <h3 className="text-sm font-medium text-zinc-900 line-clamp-1">
          {product.name}
        </h3>
        <Price price={product.price} originalPrice={product.originalPrice} />
      </div>
    </div>
  );
}
