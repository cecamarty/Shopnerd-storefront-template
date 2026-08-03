import React from "react";
import { storeInfo } from "@/data/store";
import { Instagram, Twitter } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-50 border-t border-zinc-200/50 py-12 px-6 pb-[calc(3rem+env(safe-area-inset-bottom))]" aria-label="Store Footer">
      <div className="max-w-md mx-auto flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold text-zinc-900 mb-2">{storeInfo.name}</h2>
        <p className="text-sm text-zinc-500 mb-6">{storeInfo.description}</p>

        <div className="flex gap-4 mb-8">
          {storeInfo.socials.instagram && (
            <a
              href={storeInfo.socials.instagram}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
              aria-label="Follow us on Instagram"
            >
              <Instagram className="h-5 w-5" />
            </a>
          )}
          {storeInfo.socials.twitter && (
            <a
              href={storeInfo.socials.twitter}
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-full bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 transition-colors"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="h-5 w-5" />
            </a>
          )}
        </div>

        <div className="text-xs text-zinc-400 space-y-2">
          <p>&copy; {currentYear} {storeInfo.name}. All rights reserved.</p>
          <p>
            Powered by <a href="#" className="font-medium text-zinc-500 hover:text-zinc-900 underline underline-offset-2">ShopNerd</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
