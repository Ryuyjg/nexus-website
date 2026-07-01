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
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top_left,rgba(63,107,79,0.14),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(196,148,74,0.16),transparent_24%),linear-gradient(180deg,rgba(255,255,255,0.72),rgba(244,239,230,0.96))] dark:bg-[radial-gradient(circle_at_top_left,rgba(139,191,155,0.16),transparent_30%),radial-gradient(circle_at_80%_18%,rgba(196,148,74,0.12),transparent_26%),linear-gradient(180deg,rgba(15,20,18,0.95),rgba(21,28,25,0.98))]" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div className="max-w-2xl">
            <motion.div variants={item} className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-secondary shadow-[0_12px_30px_rgba(20,18,15,0.06)] backdrop-blur-sm">
              <Leaf className="w-3.5 h-3.5 text-accent" />
              Premium workspace, calmer by design
            </motion.div>

            <motion.h1 variants={item} className="mt-8 text-5xl font-semibold tracking-[-0.05em] text-primary sm:text-6xl lg:text-7xl xl:text-8xl leading-[0.94]">
              A workspace that feels
              <span className="block text-accent">quiet, confident, and alive.</span>
            </motion.h1>

            <motion.p variants={item} className="mt-7 max-w-xl text-lg sm:text-xl leading-8 text-secondary">
              Nexa Workspace gives teams a premium place to focus, meet, and grow with natural light, reliable infrastructure, and a refined atmosphere that never feels cramped.
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
                <div key={feature.label} className="rounded-[1.75rem] border border-border/70 bg-background/80 p-4 shadow-[0_18px_40px_rgba(20,18,15,0.05)] backdrop-blur-sm">
                  <feature.icon className="h-5 w-5 text-accent" />
                  <div className="mt-3 text-sm font-semibold text-primary">{feature.label}</div>
                  <div className="mt-1 text-sm leading-6 text-secondary">{feature.copy}</div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div variants={item} className="relative">
            <div className="absolute -left-6 top-12 hidden rounded-full border border-border/70 bg-background/90 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-secondary shadow-[0_20px_40px_rgba(20,18,15,0.08)] backdrop-blur-sm lg:block">
              Open 8:00 AM - 8:00 PM
            </div>

            <div className="relative overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface shadow-[0_40px_90px_rgba(20,18,15,0.15)]">
              <div className="relative aspect-[4/5] w-full">
                <Image
                  src="/workspace-view-new.jpg"
                  alt="Premium workspace interior"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/45 via-primary/5 to-transparent" />
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-2">
                <div className="rounded-[1.4rem] border border-white/15 bg-primary/85 p-4 text-white backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-white/70">
                    <Building2 className="h-3.5 w-3.5" />
                    Workspace
                  </div>
                  <div className="mt-2 text-lg font-semibold">Private offices and focused desks</div>
                </div>
                <div className="rounded-[1.4rem] border border-white/15 bg-background/90 p-4 text-primary backdrop-blur-md">
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
                <div key={stat.label} className="rounded-[1.5rem] border border-border/70 bg-background/85 px-4 py-5 text-center shadow-[0_16px_35px_rgba(20,18,15,0.05)] backdrop-blur-sm">
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
