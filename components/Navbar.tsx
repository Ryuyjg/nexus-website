'use client';

import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import Link from 'next/link';
import { MagneticButton } from './MagneticButton';
import { ThemeToggle } from './ThemeToggle';
import { Menu, Sparkles, X } from 'lucide-react';

const logoSrc = '/nexa-mark-only.png';

export function Navbar() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

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
        isScrolled ? 'py-3' : 'py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="glass-panel-strong rounded-[1.5rem] px-4 py-3 sm:rounded-full">
          <div className="flex items-center justify-between gap-3">
          <Link href="/" className="flex items-center gap-3 font-semibold text-base sm:text-lg tracking-tight text-primary">
            <div className="flex h-10 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/85 px-2 shadow-lg shadow-accent/10 ring-1 ring-white/40 dark:bg-white/95">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={logoSrc}
                alt="Nexa Workspace logo"
                className="h-full w-full object-contain"
              />
            </div>
            <span className="hidden sm:inline">Nexa Workspace</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-sm font-medium text-secondary">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="#faq" className="hover:text-primary transition-colors">FAQ</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>

          <div className="hidden xl:flex items-center gap-2 rounded-full glass-chip px-3 py-1 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5 text-accent" />
            Open 8:00 AM - 8:00 PM
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <ThemeToggle />
            <Link href="/contact" className="hidden lg:block text-sm font-medium text-secondary hover:text-primary transition-colors">
              Member Login
            </Link>
            <MagneticButton href="/contact" className="hidden sm:inline-flex text-sm px-5 py-2.5">
              Book Visit
            </MagneticButton>
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/45 text-primary backdrop-blur-xl transition-colors hover:bg-white/60 md:hidden dark:border-white/10 dark:bg-white/10 dark:text-white"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
          </div>

          <motion.div
            initial={false}
            animate={menuOpen ? { height: 'auto', opacity: 1, marginTop: 12 } : { height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="overflow-hidden md:hidden"
          >
            <div className="rounded-[1.35rem] border border-white/30 bg-white/70 p-3 shadow-[0_20px_60px_rgba(15,23,42,0.12)] backdrop-blur-2xl dark:border-white/10 dark:bg-white/10">
              <div className="grid gap-2 text-sm font-medium text-primary">
                <Link href="#features" onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10">Features</Link>
                <Link href="#pricing" onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10">Pricing</Link>
                <Link href="#faq" onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10">FAQ</Link>
                <Link href="/contact" onClick={() => setMenuOpen(false)} className="rounded-2xl px-4 py-3 hover:bg-white/60 dark:hover:bg-white/10">Contact</Link>
              </div>
              <div className="mt-3 flex flex-col gap-3 border-t border-white/20 pt-3 dark:border-white/10">
                <div className="rounded-2xl glass-chip px-4 py-3 text-xs font-medium">
                  <Sparkles className="h-3.5 w-3.5 text-accent" />
                  Open 8:00 AM - 8:00 PM
                </div>
                <MagneticButton href="/contact" className="w-full px-5 py-3">
                  Book Visit
                </MagneticButton>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
