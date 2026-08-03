import React from 'react';
import { store } from '@/data/store';
import { FaInstagram as Instagram, FaTwitter as Twitter } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12 px-6 mt-12">
      <div className="flex flex-col items-center text-center gap-6">
        {/* Contact Info */}
        <div className="space-y-2">
          <h3 className="font-semibold text-gray-900">{store.storeName}</h3>
          <p className="text-sm text-gray-500 max-w-xs mx-auto">
            {store.shortDescription}
          </p>
          <a
            href={`mailto:${store.contact.email}`}
            className="text-sm text-gray-500 hover:text-black transition-colors block mt-2"
          >
            {store.contact.email}
          </a>
        </div>

        {/* Social Links */}
        <div className="flex gap-4">
          <a
            href={`https://instagram.com/${store.social.instagram}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <a
            href={`https://twitter.com/${store.social.twitter}`}
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-gray-900 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
        </div>

        {/* Copyright & Branding */}
        <div className="pt-6 border-t border-gray-100 w-full max-w-sm flex flex-col items-center gap-2">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} {store.storeName}. All rights reserved.
          </p>
          <p className="text-xs text-gray-400 flex items-center gap-1">
            Powered by <span className="font-medium text-gray-900">ShopNerd</span>
          </p>
        </div>
      </div>
    </footer>
  );
};
