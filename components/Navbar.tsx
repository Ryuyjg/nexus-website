'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from './MagneticButton';
import { ThemeToggle } from './ThemeToggle';
import { Sparkles } from 'lucide-react';

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 20) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-3'
          : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between gap-4 rounded-full border border-border/70 bg-background/80 px-4 py-3 shadow-[0_20px_50px_rgba(20,18,15,0.08)] backdrop-blur-xl">
          <Link href="/" className="flex items-center gap-3 font-semibold text-base sm:text-lg tracking-tight text-primary">
            <div className="w-9 h-9 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold shadow-lg shadow-accent/20">
              N
            </div>
            <span className="hidden sm:inline">Nexa Workspace</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-secondary">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="hidden xl:flex items-center gap-2 rounded-full bg-surface px-3 py-1 text-xs font-medium text-secondary">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Open 8:00 AM - 8:00 PM
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link href="/contact" className="hidden lg:block text-sm font-medium text-secondary hover:text-primary transition-colors">
              Member Login
            </Link>
            <MagneticButton href="/contact" className="text-sm px-5 py-2.5">
              Book Visit
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
