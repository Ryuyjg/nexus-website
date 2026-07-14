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
    <section className="relative overflow-hidden bg-[#07120d] pt-24 pb-16 text-white sm:pt-28 sm:pb-20 lg:pt-36 lg:pb-28">
      <div className="absolute inset-0 -z-0 premium-shell" />
      <div className="absolute inset-0 -z-0 bg-[linear-gradient(90deg,rgba(7,18,13,0.96),rgba(7,18,13,0.72)_46%,rgba(7,18,13,0.18))]" />
      <div className="absolute -left-24 top-24 h-80 w-80 rounded-full bg-[rgba(205,164,93,0.18)] blur-3xl" />
      <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-[rgba(205,164,93,0.16)] blur-3xl" />

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-12 lg:grid-cols-[0.98fr_1.02fr] lg:gap-16"
        >
          <div className="max-w-3xl">
            <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/75 backdrop-blur-xl">
              <Leaf className="w-3.5 h-3.5 text-[#cda45d]" />
              Premium private workspace
            </motion.div>

            <motion.h1
              variants={item}
              className="mt-7 max-w-4xl text-balance font-display text-white"
            >
              <span className="block text-[clamp(3.75rem,8vw,8.4rem)] font-semibold leading-[0.78] tracking-[-0.075em]">
                Private offices,
              </span>
              <span className="block text-[clamp(3.75rem,8vw,8.4rem)] font-semibold italic leading-[0.78] tracking-[-0.065em] text-[#d9bd80]">
                quiet views.
              </span>
              <span className="mt-5 block font-sans text-[clamp(1.35rem,2.8vw,2.55rem)] font-semibold leading-[1.04] tracking-[-0.055em] text-white/82">
                A polished workspace for teams who want calm, privacy, and a better first impression.
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-6 max-w-2xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Work from a refined, fully serviced room with high-speed internet, power backup, meeting access, and a peaceful green outlook.
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
                <div key={feature.label} className="rounded-[1.5rem] border border-white/10 bg-white/8 p-4 backdrop-blur-xl sm:p-5">
                  <feature.icon className="h-5 w-5 text-[#cda45d]" />
                  <div className="mt-3 text-sm font-semibold tracking-[-0.02em] text-white">{feature.label}</div>
                  <div className="mt-1 text-xs leading-5 text-white/56 sm:text-sm sm:leading-6">{feature.copy}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="absolute -left-7 top-12 z-20 hidden rounded-full border border-white/15 bg-[#07120d]/82 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white shadow-[0_18px_50px_rgba(0,0,0,0.28)] backdrop-blur-2xl lg:block">
              Open 8:00 AM - 8:00 PM
            </div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/12 bg-white/8 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.34)] backdrop-blur-2xl sm:rounded-[2.75rem] sm:p-3">
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
                <div key={stat.label} className="rounded-[1.5rem] border border-white/10 bg-white/8 px-4 py-5 text-center backdrop-blur-xl">
                  <div className="font-display text-4xl font-semibold leading-none text-white">{stat.value}</div>
                  <div className="mt-1 text-sm leading-6 text-white/55">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
