import type { Metadata } from "next";
import { ReactNode } from "react";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Providers from "@/components/Providers";
import { Toaster } from "sonner";
import Footer from "@/components/Footer";
import GoToTop from "@/components/GoToTop";
import Header from "@/components/Header";

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
        <Providers>
          <Header />

          <main className="relative flex min-h-screen flex-col">
            <div className="flex-1 grow">{children}</div>
            <GoToTop />
          </main>

          <Footer />

          <Toaster position="top-center" richColors />
        </Providers>
      </body>
    </html>
  );
}
