"use client";

import React from 'react';
import { store } from '@/data/store';
import { MessageCircle } from 'lucide-react';
import { FaInstagram as Instagram, FaTwitter as Twitter } from 'react-icons/fa';
import { Button } from '@/components/ui';
import { motion, useTransform, useScroll } from 'framer-motion';

interface HeaderProps {
  scrollY: number;
}

export const Header = ({ scrollY }: HeaderProps) => {
  // Use framer-motion scroll mapping for smoother animations instead of raw scrollY
  const { scrollY: fmScrollY } = useScroll();

  const coverOpacity = useTransform(fmScrollY, [0, 150], [0.2, 0]);
  const coverScale = useTransform(fmScrollY, [0, 150], [1, 1.05]);
  const logoScale = useTransform(fmScrollY, [0, 150], [1, 0.6]);
  const logoY = useTransform(fmScrollY, [0, 150], [0, 20]);

  // Transition name from large to a smaller, tighter layout as we scroll down
  const nameY = useTransform(fmScrollY, [0, 150], [0, 10]);
  const nameScale = useTransform(fmScrollY, [0, 150], [1, 0.85]);

  return (
    <header className="relative flex flex-col items-center pt-8 pb-8 px-4 text-center overflow-hidden min-h-[300px]">
      <motion.div
        className="absolute inset-0 z-0 h-full w-full object-cover"
        style={{
          backgroundImage: `url(${store.coverImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          opacity: coverOpacity,
          scale: coverScale,
          transformOrigin: 'top'
        }}
      />
      <div className="relative z-10 flex flex-col items-center w-full mt-4">
        <motion.div style={{ scale: logoScale, y: logoY }}>
          <img
            src={store.logo}
            alt={store.storeName}
            className="h-24 w-24 rounded-full border-4 border-white shadow-sm mb-4 object-cover"
          />
        </motion.div>

        <motion.h1
          className="text-3xl font-bold tracking-tight text-gray-900 mb-2"
          style={{ scale: nameScale, y: nameY, transformOrigin: 'top' }}
        >
          {store.storeName}
        </motion.h1>

        <motion.p
          className="text-gray-500 max-w-md mb-8 px-4"
          initial={{ opacity: 1 }}
          animate={{ opacity: scrollY > 50 ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          {store.shortDescription}
        </motion.p>

        <motion.div
          className="flex items-center gap-3"
          initial={{ opacity: 1, y: 0 }}
          animate={{ opacity: scrollY > 100 ? 0 : 1, y: scrollY > 100 ? -10 : 0, pointerEvents: scrollY > 100 ? 'none' : 'auto' }}
          transition={{ duration: 0.2 }}
        >
          <Button variant="outline" size="sm" className="gap-2 rounded-full shadow-sm" onClick={() => window.open(`https://wa.me/${store.contact.whatsapp}`, '_blank')}>
            <MessageCircle className="h-4 w-4" />
            Contact Us
          </Button>
          <div className="flex gap-2 ml-2">
            <a href={`https://instagram.com/${store.social.instagram}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm border border-gray-100">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={`https://twitter.com/${store.social.twitter}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-gray-900 transition-colors bg-white rounded-full shadow-sm border border-gray-100">
              <Twitter className="h-4 w-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </header>
  );
};
