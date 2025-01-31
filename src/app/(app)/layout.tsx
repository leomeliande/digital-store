import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import TrpcProvider from "@/components/Providers";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumo",
  description: "Ilumine sua criatividade.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="pt-br" className="h-full">
      <body className={cn("relative h-full antialiased", geistSans.className)}>
        <main className="relative flex min-h-screen flex-col">
          <TrpcProvider>
            <Navbar />
            <div className="flex-1 flex-grow">{children}</div>
          </TrpcProvider>
        </main>

        <Toaster position="top-center" richColors />
      </body>
    </html>
  );
}
