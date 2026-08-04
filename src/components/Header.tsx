'use client';

import React from 'react';
import Image from 'next/image';
import { storeData } from '../data/store';
import { Icons } from './Icons';
import { Button } from './Button';

export function Header() {
  const handleWhatsApp = () => {
    window.open(`https://wa.me/${storeData.contact.whatsapp.replace(/\D/g, '')}`, '_blank');
  };

  const handleCall = () => {
    window.open(`tel:${storeData.contact.phone.replace(/\D/g, '')}`, '_self');
  };

  return (
    <header className="relative pb-6">
      <div className="relative h-48 w-full md:h-64 lg:h-80 overflow-hidden">
        <Image
          src={storeData.coverImage}
          alt={`${storeData.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-16 flex flex-col items-center sm:-mt-20 sm:flex-row sm:items-end sm:space-x-5">
          <div className="relative h-32 w-32 shrink-0 sm:h-40 sm:w-40">
            <Image
              src={storeData.logo}
              alt={`${storeData.name} logo`}
              fill
              className="rounded-full border-4 border-white bg-white object-cover shadow-md"
            />
          </div>

          <div className="mt-4 flex flex-1 flex-col items-center sm:mt-0 sm:items-start sm:pb-2">
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">{storeData.name}</h1>
              <span className="flex h-2.5 w-2.5 rounded-full bg-green-500 shadow-sm" title={storeData.status.message} />
            </div>
            <p className="mt-1 text-sm font-medium text-gray-500">{storeData.cuisine}</p>
            <p className="mt-2 text-center text-sm text-gray-600 sm:text-left max-w-lg">{storeData.description}</p>

            <div className="mt-4 flex flex-wrap justify-center gap-2 sm:justify-start">
              <Button size="sm" className="rounded-full shadow-sm" onClick={handleWhatsApp}>
                <Icons.whatsapp className="mr-2 h-4 w-4" />
                WhatsApp
              </Button>
              <Button size="sm" variant="secondary" className="rounded-full" onClick={handleCall}>
                <Icons.phone className="mr-2 h-4 w-4" />
                Call
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}