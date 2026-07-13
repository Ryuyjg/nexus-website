'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { Building2, Clock3, Leaf, Wifi, Users, ShieldCheck, ArrowUpRight } from 'lucide-react';

export function Hero() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.4 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <section className="relative overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
      <div className="absolute inset-0 -z-10 premium-shell dark:bg-[linear-gradient(135deg,rgba(7,17,13,0.98),rgba(18,31,24,0.96)_54%,rgba(47,35,18,0.92))]" />
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[rgba(23,49,38,0.2)] blur-3xl" />
      <div className="absolute right-0 top-12 h-96 w-96 rounded-full bg-[rgba(214,183,122,0.28)] blur-3xl dark:bg-[rgba(214,183,122,0.14)]" />
      <div className="absolute bottom-10 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-white/45 blur-3xl dark:bg-white/5" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16"
        >
          <div className="max-w-2xl">
            <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full glass-chip px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <Leaf className="w-3.5 h-3.5 text-accent" />
              Private workspace with a resort calm
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 max-w-3xl text-balance font-display text-primary"
            >
              <span className="block text-[clamp(3.5rem,8vw,7.8rem)] font-semibold leading-[0.82] tracking-[-0.07em]">
                Work in
              </span>
              <span className="block text-[clamp(3.5rem,8vw,7.8rem)] font-semibold italic leading-[0.82] tracking-[-0.055em]">
                stillness.
              </span>
              <span className="gold-text mt-4 block font-sans text-[clamp(1.55rem,3.6vw,3.15rem)] font-semibold leading-[1.02] tracking-[-0.065em]">
                Built for focused days, warm meetings, and premium first impressions.
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-xl text-base sm:text-lg sm:leading-8 leading-7 text-secondary">
              Nexa Workspace blends private offices, steady infrastructure, and quiet greenery into a polished room that feels calm from the moment you arrive.
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <MagneticButton href="/contact" className="w-full px-7 py-4 text-base shadow-lg shadow-accent/10 sm:w-auto">
                Book a Visit <ArrowUpRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="#pricing" variant="outline" className="w-full px-7 py-4 text-base sm:w-auto">
                View Plans
              </MagneticButton>
            </motion.div>

            <motion.div variants={item} className="mt-9 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Wifi, label: 'Gigabit Wi-Fi', copy: 'Reliable connection for teams and calls' },
                { icon: Users, label: 'Meeting Cabin', copy: 'Private room for client sessions' },
                { icon: ShieldCheck, label: 'Power Backup', copy: 'Built for long, uninterrupted workdays' },
              ].map((feature) => (
                <div key={feature.label} className="glass-panel rounded-[1.75rem] p-4 sm:p-5">
                  <feature.icon className="h-5 w-5 text-accent" />
                  <div className="mt-3 text-sm font-semibold tracking-[-0.02em] text-primary">{feature.label}</div>
                  <div className="mt-1 text-xs leading-5 text-secondary sm:text-sm sm:leading-6">{feature.copy}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="absolute -left-7 top-12 z-20 hidden rounded-full border border-white/35 bg-[#111812]/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_50px_rgba(17,24,18,0.25)] backdrop-blur-2xl lg:block">
              Open 8:00 AM - 8:00 PM
            </div>

            <div className="glass-panel-strong relative overflow-hidden rounded-[2rem] p-2 sm:rounded-[2.75rem] sm:p-3">
              <div className="relative aspect-[4/3.85] overflow-hidden rounded-[1.6rem] sm:aspect-[4/4.25] sm:rounded-[2.25rem] lg:aspect-[4/4.18]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="gallery_lounge.png"
                  alt="Premium workspace lounge"
                  loading="eager"
                  className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-[center_58%]"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_26%,rgba(17,24,18,0.52))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_10%,rgba(255,255,255,0.22),transparent_25%),radial-gradient(circle_at_86%_30%,rgba(214,183,122,0.16),transparent_25%)]" />
              </div>

              <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-2 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 lg:mt-0">
                <div className="rounded-[1.4rem] border border-white/20 bg-[linear-gradient(135deg,rgba(17,24,18,0.86),rgba(23,49,38,0.58))] p-4 text-white backdrop-blur-2xl shadow-[0_18px_54px_rgba(17,24,18,0.28)]">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-white/70">
                    <Building2 className="h-3.5 w-3.5" />
                    Workspace
                  </div>
                  <div className="mt-2 text-base font-semibold leading-6">Private offices and focused desks</div>
                </div>
                <div className="rounded-[1.4rem] border border-white/35 bg-[linear-gradient(135deg,rgba(255,250,240,0.9),rgba(255,255,255,0.62))] p-4 text-primary backdrop-blur-2xl shadow-[0_18px_54px_rgba(17,24,18,0.1)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] dark:text-white">
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-secondary">
                    <Clock3 className="h-3.5 w-3.5 text-accent" />
                    Availability
                  </div>
                  <div className="mt-2 text-base font-semibold leading-6">Easy tours and flexible membership</div>
                </div>
              </div>
            </div>

            <div className="mt-4 grid gap-4 sm:mt-5 sm:grid-cols-3">
              {[
                { value: '100%', label: 'air-conditioned comfort' },
                { value: '24/7', label: 'power backup support' },
                { value: '1', label: 'peaceful location choice' },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel rounded-[1.65rem] px-4 py-5 text-center">
                  <div className="font-display text-4xl font-semibold leading-none text-primary">{stat.value}</div>
                  <div className="mt-1 text-sm leading-6 text-secondary">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
