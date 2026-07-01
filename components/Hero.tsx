'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { Building2, Clock3, Leaf, Wifi, Users, ShieldCheck } from 'lucide-react';

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
    <section className="relative overflow-hidden pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(47,125,246,0.16),transparent_24%),radial-gradient(circle_at_82%_18%,rgba(68,217,196,0.18),transparent_22%),radial-gradient(circle_at_50%_110%,rgba(255,255,255,0.8),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(110,184,255,0.18),transparent_26%),radial-gradient(circle_at_82%_18%,rgba(68,217,196,0.16),transparent_24%),linear-gradient(180deg,rgba(7,17,31,0.98),rgba(16,28,45,1))]" />
      <div className="absolute -left-24 top-28 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      <div className="absolute right-0 top-10 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
      <div className="absolute bottom-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-white/35 blur-3xl dark:bg-white/5" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="max-w-2xl">
            <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full glass-chip px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em]">
              <Leaf className="w-3.5 h-3.5 text-accent" />
              Liquid glass workspace, calmer by design
            </motion.div>

            <motion.h1 variants={item} className="mt-8 text-5xl font-semibold tracking-[-0.06em] text-primary sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.92]">
              A workspace that feels
              <span className="block bg-[linear-gradient(135deg,#2f7df6,#44d9c4_55%,#0d1524)] bg-clip-text text-transparent dark:bg-[linear-gradient(135deg,#8ad4ff,#74f0dd_55%,#f6f9ff)]">
                fluid, focused, and quietly premium.
              </span>
            </motion.h1>

            <motion.p variants={item} className="mt-7 max-w-xl text-lg sm:text-xl leading-8 text-secondary">
              Nexa Workspace now feels like a pane of polished glass: airy, luminous, and intentionally layered for teams that want design to support the work instead of distracting from it.
            </motion.p>

            <motion.div variants={item} className="mt-10 flex flex-col gap-4 sm:flex-row">
              <MagneticButton href="/contact" className="px-7 py-4 text-base shadow-lg shadow-accent/10">
                Book a Visit
              </MagneticButton>
              <MagneticButton href="#pricing" variant="outline" className="px-7 py-4 text-base">
                View Plans
              </MagneticButton>
            </motion.div>

            <motion.div variants={item} className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { icon: Wifi, label: 'Gigabit Wi-Fi', copy: 'Reliable connection for teams and calls' },
                { icon: Users, label: 'Meeting Cabin', copy: 'Private room for client sessions' },
                { icon: ShieldCheck, label: 'Power Backup', copy: 'Built for long, uninterrupted workdays' },
              ].map((feature) => (
                <div key={feature.label} className="glass-panel rounded-[1.75rem] p-4">
                  <feature.icon className="h-5 w-5 text-accent" />
                  <div className="mt-3 text-sm font-semibold text-primary">{feature.label}</div>
                  <div className="mt-1 text-sm leading-6 text-secondary">{feature.copy}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="absolute -left-6 top-12 hidden rounded-full glass-chip px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] lg:block">
              Open 8:00 AM - 8:00 PM
            </div>

            <div className="glass-panel-strong relative overflow-hidden rounded-[2.75rem]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/workspace-view-new.jpg"
                  alt="Premium workspace interior"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),transparent_30%,rgba(7,17,31,0.5))]" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.3),transparent_28%)]" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/20 bg-[linear-gradient(135deg,rgba(7,17,31,0.72),rgba(47,125,246,0.35))] p-4 text-white backdrop-blur-2xl shadow-[0_18px_50px_rgba(7,17,31,0.28)]">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/70">
                    <Building2 className="h-3.5 w-3.5" />
                    Workspace
                  </div>
                  <div className="mt-2 text-lg font-semibold">Private offices and focused desks</div>
                </div>
                <div className="rounded-[1.4rem] border border-white/20 bg-[linear-gradient(135deg,rgba(255,255,255,0.82),rgba(255,255,255,0.56))] p-4 text-primary backdrop-blur-2xl shadow-[0_18px_50px_rgba(7,17,31,0.1)] dark:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] dark:text-white">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-secondary">
                    <Clock3 className="h-3.5 w-3.5 text-accent" />
                    Availability
                  </div>
                  <div className="mt-2 text-lg font-semibold">Easy tours and flexible membership</div>
                </div>
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {[
                { value: '100%', label: 'air-conditioned comfort' },
                { value: '24/7', label: 'power backup support' },
                { value: '1', label: 'peaceful location choice' },
              ].map((stat) => (
                <div key={stat.label} className="glass-panel rounded-[1.5rem] px-4 py-5 text-center">
                  <div className="text-2xl font-semibold text-primary">{stat.value}</div>
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
