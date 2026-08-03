"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { storeInfo } from "@/data/store";
import { branding } from "@/theme/branding";
import { Instagram, Twitter, MessageCircle } from "lucide-react";
import { Button } from "./Button";

export function Header() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Create a scroll context specific to this header for parallax/collapse effects
  const { scrollY } = useScroll();

  // Animations mapped to scroll progress (0px to 200px)
  const coverHeight = useTransform(scrollY, [0, 150], [192, 0]); // 192px is h-48
  const coverOpacity = useTransform(scrollY, [0, 150], [1, 0]);

  const logoScale = useTransform(scrollY, [0, 150], [1, 0.6]);
  const logoY = useTransform(scrollY, [0, 150], [0, -40]);

  const contentY = useTransform(scrollY, [0, 150], [0, -30]);
  const contentOpacity = useTransform(scrollY, [50, 150], [1, 0]);

  return (
    <header ref={containerRef} className="flex flex-col bg-white rounded-b-[2rem] shadow-sm relative z-10" aria-label="Store Header">
      <motion.div
        style={{ height: coverHeight, opacity: coverOpacity }}
        className="relative w-full bg-zinc-100 overflow-hidden transform-gpu"
      >
        <Image
          src={branding.coverImageUrl}
          alt={`${storeInfo.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      <motion.div
        style={{ y: contentY }}
        className="px-6 -mt-12 relative flex flex-col items-center text-center pb-6"
      >
        <motion.div
          style={{ scale: logoScale, y: logoY, transformOrigin: "bottom center" }}
          className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm relative transform-gpu"
        >
           <Image
            src={branding.logoUrl}
            alt={`${storeInfo.name} logo`}
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div style={{ opacity: contentOpacity }} className="flex flex-col items-center">
          <h1 className="mt-4 text-2xl font-semibold tracking-tight text-zinc-900">
            {storeInfo.name}
          </h1>
          <p className="mt-2 text-sm text-zinc-500 max-w-sm">
            {storeInfo.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <Button variant="default" className="rounded-full shadow-md gap-2" asChild>
              <a href={`https://wa.me/${storeInfo.whatsappNumber.replace(/[^0-9]/g, "")}`} target="_blank" rel="noreferrer">
                <MessageCircle className="h-4 w-4" />
                Message us
              </a>
            </Button>

            {storeInfo.socials.instagram && (
              <Button variant="outline" size="icon" className="rounded-full" asChild aria-label="Instagram">
                <a href={storeInfo.socials.instagram} target="_blank" rel="noreferrer">
                  <Instagram className="h-4 w-4 text-zinc-700" />
                </a>
              </Button>
            )}

            {storeInfo.socials.twitter && (
              <Button variant="outline" size="icon" className="rounded-full" asChild aria-label="Twitter">
                 <a href={storeInfo.socials.twitter} target="_blank" rel="noreferrer">
                  <Twitter className="h-4 w-4 text-zinc-700" />
                </a>
              </Button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </header>
  );
}
