import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StoreProvider } from "@/store/StoreContext";
import { ScrollProvider } from "@/store/ScrollContext";
import { storeInfo } from "@/data/store";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: storeInfo.name,
  description: storeInfo.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ScrollProvider>
          <StoreProvider>
            {children}
          </StoreProvider>
        </ScrollProvider>
      </body>
    </html>
  );
}
