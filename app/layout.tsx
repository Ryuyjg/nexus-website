import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/LenisProvider";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });

export const metadata: Metadata = {
  title: "Nexa Workspace — Premium Environments",
  description: "Premium private offices and dedicated desks built for teams that demand excellence.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  );
}
