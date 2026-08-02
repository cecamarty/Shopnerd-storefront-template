"use client";

import React from 'react';
import { store } from '@/data/store';
import { MessageCircle } from 'lucide-react';
import { FaInstagram as Instagram, FaTwitter as Twitter } from 'react-icons/fa';
import { Button } from './ui/Button';

export const Header = () => {
  return (
    <header className="relative flex flex-col items-center pt-8 pb-12 px-4 text-center">
      <div
        className="absolute inset-0 z-0 h-48 w-full object-cover opacity-20 mask-image:linear-gradient(to_bottom,black,transparent)"
        style={{
          backgroundImage: `url(${store.coverImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
          maskImage: 'linear-gradient(to bottom, black, transparent)'
        }}
      />
      <div className="relative z-10 flex flex-col items-center">
        <img
          src={store.logo}
          alt={store.storeName}
          className="h-20 w-20 rounded-full border-4 border-white shadow-sm mb-4 object-cover"
        />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 mb-2">{store.storeName}</h1>
        <p className="text-gray-500 max-w-md mb-6">{store.shortDescription}</p>

        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2 rounded-full" onClick={() => window.open(`https://wa.me/${store.contact.whatsapp}`, '_blank')}>
            <MessageCircle className="h-4 w-4" />
            Contact Us
          </Button>
          <div className="flex gap-2 ml-2">
            <a href={`https://instagram.com/${store.social.instagram}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href={`https://twitter.com/${store.social.twitter}`} target="_blank" rel="noreferrer" className="p-2 text-gray-400 hover:text-gray-900 transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
