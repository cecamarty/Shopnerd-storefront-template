import React from 'react';
import Image from 'next/image';
import { storeInfo } from '../../data/store';
import { theme } from '../../data/theme';
import { Icons } from '../Icons/Icons';
import { Button } from '../Buttons/Button';

export function Header() {
  return (
    <header className="relative flex flex-col bg-white">
      {/* Cover Image */}
      <div className="relative h-48 w-full md:h-64 overflow-hidden">
        <Image
          src={theme.branding.coverImageUrl}
          alt="Store Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Profile Info Section */}
      <div className="relative px-4 pb-6 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full">
        {/* Logo */}
        <div className="relative -mt-12 mb-4">
          <div className="relative h-24 w-24 rounded-full border-4 border-white bg-white shadow-sm overflow-hidden">
            <Image
              src={theme.branding.logoUrl}
              alt={storeInfo.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

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
