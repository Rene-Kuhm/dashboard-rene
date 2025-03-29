import type { Metadata } from "next";
import { Noto_Sans_Display, Inter } from "next/font/google";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
} from '@clerk/nextjs'

import "./globals.css";

const noto = Noto_Sans_Display({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Dashboard professional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider> 
    <html lang="en">
        <body className={`${noto.variable} ${inter.className} antialiased`}>
          <header className="">
            <SignedOut>
            </SignedOut>
            <SignedIn>
            </SignedIn>
          </header>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
