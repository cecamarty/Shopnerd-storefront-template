"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Product } from "@/data/products";
import { Price } from "./Price";
import { Badge } from "./Badge";
import { useStore } from "@/store/StoreContext";

export function ProductCard({ product }: { product: Product }) {
  const { setSelectedProduct } = useStore();

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } }
  };

  return (
    <motion.div
      variants={itemVariants}
      onClick={() => setSelectedProduct(product)}
      className="group cursor-pointer flex flex-col gap-3 rounded-2xl bg-white p-2.5 shadow-sm border border-zinc-100/60 transition-all duration-300 hover:shadow-md hover:border-zinc-200/80 active:scale-[0.98]"
      role="button"
      tabIndex={0}
      aria-label={`View details for ${product.name}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          setSelectedProduct(product);
        }
      }}
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-zinc-100 isolate">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, 33vw"
        />

        {/* Subtle inner shadow for image depth */}
        <div className="absolute inset-0 ring-1 ring-inset ring-black/5 rounded-xl pointer-events-none" />

        <div className="absolute top-2 left-2 flex flex-col gap-1.5 z-10">
          {product.isNew && <Badge>New</Badge>}
          {product.isSale && <Badge variant="destructive">Sale</Badge>}
        </div>

        {!product.inStock && (
          <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] flex items-center justify-center z-20">
             <Badge variant="secondary" className="bg-white/90 text-zinc-900 border border-zinc-200 shadow-sm">
                Out of Stock
             </Badge>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-1 px-1.5 pb-1.5">
        <h3 className="text-sm font-medium text-zinc-900 line-clamp-1 leading-tight group-hover:text-black transition-colors">
          {product.name}
        </h3>
        <Price price={product.price} originalPrice={product.originalPrice} />
      </div>
    </motion.div>
  );
}
