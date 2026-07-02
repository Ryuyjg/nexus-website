import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LenisProvider } from "@/components/LenisProvider";

const display = Manrope({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Nexa Workspace | Warm Liquid Glass Design",
  description: "A premium coworking space with warm liquid-glass surfaces, soft neutrals, and calm focus.",
};

export const viewport = {
  themeColor: "#f5efe6",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${display.variable} font-sans bg-background text-primary`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <LenisProvider>
            {children}
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
