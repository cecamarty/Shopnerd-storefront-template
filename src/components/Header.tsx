import React from 'react';
import { branding } from '@/theme';
import { Button } from './Button';
import { MessageCircle, Instagram, Twitter } from 'lucide-react';
import Image from 'next/image';

export function Header() {
  const handleWhatsAppClick = () => {
    window.open(`https://wa.me/${branding.whatsappNumber}`, '_blank');
  };

  return (
    <header className="relative w-full overflow-hidden bg-white pb-8">
      {/* Cover Image */}
      <div className="h-48 w-full relative sm:h-64">
        <Image
          src={branding.coverImageUrl}
          alt="Store Cover"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="px-4 max-w-3xl mx-auto -mt-16 relative z-10 flex flex-col items-center text-center">
        {/* Logo */}
        <div className="w-32 h-32 rounded-full border-4 border-white overflow-hidden bg-gray-100 shadow-md">
          <Image
            src={branding.logoUrl}
            alt={branding.storeName}
            width={128}
            height={128}
            className="object-cover w-full h-full"
            priority
          />
        </div>

        {/* Store Info */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900">
          {branding.storeName}
        </h1>
        <p className="mt-2 text-gray-600 max-w-md">
          {branding.description}
        </p>

        {/* Contact Actions */}
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Button onClick={handleWhatsAppClick} className="gap-2 rounded-full">
            <MessageCircle className="w-4 h-4" />
            Contact us
          </Button>

          {branding.socialLinks.instagram && (
            <Button variant="secondary" size="icon" asChild className="rounded-full">
              <a href={branding.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram className="w-4 h-4" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
          )}

          {branding.socialLinks.twitter && (
            <Button variant="secondary" size="icon" asChild className="rounded-full">
              <a href={branding.socialLinks.twitter} target="_blank" rel="noopener noreferrer">
                <Twitter className="w-4 h-4" />
                <span className="sr-only">Twitter</span>
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
