import React from 'react';
import Link from 'next/link';
import { MagneticButton } from './MagneticButton';

const logoSrc = '/nexus-website/nexa-logo-clean.png';

export function Footer() {
  return (
    <footer className="mt-20 border-t border-white/15 bg-[linear-gradient(180deg,rgba(13,20,16,0.98),rgba(20,28,23,1))] text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid gap-10 py-14 sm:py-16 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/75 backdrop-blur-xl">
              Premium workspace, thoughtfully designed
            </div>
            <Link href="/" className="mt-6 flex items-center gap-3 font-semibold text-2xl tracking-[-0.04em] text-white">
              <div className="flex h-12 w-16 items-center justify-center overflow-hidden rounded-2xl bg-white/90 p-1.5 shadow-lg shadow-accent/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={logoSrc}
                  alt="Nexa Workspace logo"
                  className="h-full w-full object-contain"
                />
              </div>
              Nexa Workspace
            </Link>
            <p className="mt-5 max-w-xl text-white/72 leading-8">
              Premium private offices and dedicated desks for teams that want a beautiful room, steady infrastructure, and an easier workday.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="glass-panel rounded-[1.5rem] p-5 text-white">
              <div className="text-xs uppercase tracking-[0.22em] text-white/55">Visit</div>
              <div className="mt-2 text-lg font-semibold text-white">Book a walk-through</div>
              <div className="mt-2 text-sm leading-6 text-white/70">See the rooms, check the light, and feel the atmosphere in person.</div>
            </div>
            <div className="glass-panel rounded-[1.5rem] p-5 text-white">
              <div className="text-xs uppercase tracking-[0.22em] text-white/55">Hours</div>
              <div className="mt-2 text-lg font-semibold text-white">8:00 AM - 8:00 PM</div>
              <div className="mt-2 text-sm leading-6 text-white/70">Monday through Saturday, with Sunday access on request.</div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 py-7 md:flex-row md:items-center md:justify-between">
          <p className="text-sm text-white/60">© {new Date().getFullYear()} Nexa Workspace. Designed for excellence.</p>
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
            <Link href="#features" className="hover:text-white transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
          </div>
        </div>

        <div className="pb-12">
          <MagneticButton href="/contact" className="w-full sm:w-auto bg-white text-primary hover:bg-white/90">
            Schedule a visit
          </MagneticButton>
        </div>
      </div>
    </footer>
  );
}
