import React from "react";
import Image from "next/image";
import { storeInfo } from "@/data/store";
import { branding } from "@/theme/branding";
import { Instagram, Twitter, MessageCircle } from "lucide-react";
import { Button } from "./Button";

export function Header() {
  return (
    <header className="flex flex-col bg-white rounded-b-[2rem] shadow-sm overflow-hidden pb-6">
      <div className="relative h-48 w-full bg-zinc-100">
        <Image
          src={branding.coverImageUrl}
          alt={`${storeInfo.name} cover`}
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/10" />
      </div>

      <div className="px-6 -mt-12 relative flex flex-col items-center text-center">
        <div className="h-24 w-24 rounded-full border-4 border-white overflow-hidden bg-white shadow-sm relative">
           <Image
            src={branding.logoUrl}
            alt={`${storeInfo.name} logo`}
            fill
            className="object-cover"
          />
        </div>

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
            <Button variant="outline" size="icon" className="rounded-full" asChild>
              <a href={storeInfo.socials.instagram} target="_blank" rel="noreferrer" aria-label="Instagram">
                <Instagram className="h-4 w-4 text-zinc-700" />
              </a>
            </Button>
          )}

          {storeInfo.socials.twitter && (
            <Button variant="outline" size="icon" className="rounded-full" asChild>
               <a href={storeInfo.socials.twitter} target="_blank" rel="noreferrer" aria-label="Twitter">
                <Twitter className="h-4 w-4 text-zinc-700" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}
