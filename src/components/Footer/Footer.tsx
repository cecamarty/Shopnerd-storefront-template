import React from 'react';
import { storeInfo } from '../../data/store';
import { Icons } from '../ui/Icons';
import { Button } from '../ui/Button';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-white border-t border-gray-100 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center gap-6 text-center">

        {/* Socials & Contact */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-gray-900" asChild>
            <a href={`mailto:${storeInfo.contactEmail}`}>
              <Icons.info className="h-5 w-5" />
              <span className="sr-only">Email</span>
            </a>
          </Button>

          {storeInfo.socialLinks.instagram && (
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-gray-900" asChild>
              <a href={storeInfo.socialLinks.instagram} target="_blank" rel="noopener noreferrer">
                <Icons.external className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
            </Button>
          )}

          {storeInfo.socialLinks.tiktok && (
            <Button variant="ghost" size="icon" className="rounded-full text-gray-500 hover:text-gray-900" asChild>
              <a href={storeInfo.socialLinks.tiktok} target="_blank" rel="noopener noreferrer">
                <Icons.external className="h-5 w-5" />
                <span className="sr-only">TikTok</span>
              </a>
            </Button>
          )}
        </div>

        {/* Copyright */}
        <div className="flex flex-col gap-2">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} {storeInfo.name}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 font-medium tracking-wide">
            POWERED BY SHOPNERD
          </p>
        </div>
      </div>
    </footer>
  );
}
