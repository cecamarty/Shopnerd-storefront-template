import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { storeInfo } from "../data/store";

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
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased text-gray-900 bg-gray-50`}>
        {children}
      </body>
    </html>
  );
}
