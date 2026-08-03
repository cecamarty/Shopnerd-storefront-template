'use client';

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { storeInfo } from '../../data/store';
import { theme } from '../../data/theme';
import { Icons } from '../ui/Icons';
import { Button } from '../ui/Button';

export function Header() {
  const { scrollY } = useScroll();

  // Animations based on scroll position
  const coverHeight = useTransform(scrollY, [0, 150], [256, 120]);
  const coverOpacity = useTransform(scrollY, [0, 150], [1, 0.4]);

  const logoScale = useTransform(scrollY, [0, 150], [1, 0.6]);
  const logoY = useTransform(scrollY, [0, 150], [0, -20]);

  return (
    <header className="relative flex flex-col bg-white">
      {/* Cover Image */}
      <motion.div
        style={{ height: coverHeight, opacity: coverOpacity }}
        className="relative w-full overflow-hidden origin-top"
      >
        <Image
          src={theme.branding.coverImageUrl}
          alt="Store Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </motion.div>

      {/* Profile Info Section */}
      <div className="relative px-4 pb-6 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Logo */}
        <motion.div
          style={{ scale: logoScale, y: logoY }}
          className="relative -mt-12 mb-4 origin-left z-10"
        >
          <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
            <Image
              src={theme.branding.logoUrl}
              alt={storeInfo.name}
              fill
              className="object-cover"
            />
          </div>
        </motion.div>

        {/* Store Details */}
        <div className="flex flex-col gap-1 mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{storeInfo.name}</h1>
          <p className="text-gray-500">{storeInfo.description}</p>
        </div>

        {/* Actions / Socials */}
        <div className="flex flex-wrap items-center gap-3">
          <Button
            className="rounded-full bg-green-600 hover:bg-green-700 text-white shadow-sm"
            onClick={() => window.open(`https://wa.me/${storeInfo.whatsappNumber}`, '_blank')}
          >
            <Icons.whatsapp className="w-4 h-4 mr-2" />
            Contact us
          </Button>

          {storeInfo.socialLinks.instagram && (
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href={storeInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Icons.external className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
