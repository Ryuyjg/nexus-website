'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Check, MapPin, Sofa, SunMedium } from 'lucide-react';

export function Overview() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <span className="text-accent font-semibold tracking-[0.24em] uppercase text-xs mb-4 block">
              Crafted atmosphere
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary tracking-[-0.06em] mb-6 leading-[0.98]">
              Warm surfaces, glassy depth, sharp focus.
            </h2>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-xl">
              The room now uses translucent layers, soft highlights, and warmer contrast so the environment feels lighter without losing clarity.
            </p>

            <div className="space-y-4">
              {[
                { icon: SunMedium, title: 'Natural light', copy: 'Bright but balanced, so the room stays comfortable throughout the day.' },
                { icon: Sofa, title: 'Comfort-first seating', copy: 'Furniture and layout choices that support long stretches of focused work.' },
                { icon: MapPin, title: 'A quiet location', copy: 'A peaceful setting that keeps the energy high without the usual office noise.' },
              ].map((point) => (
                <div key={point.title} className="glass-panel flex items-start gap-4 rounded-[1.5rem] p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(79,107,88,0.16),rgba(196,170,125,0.14))] text-accent ring-1 ring-white/20">
                    <point.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="text-base font-semibold text-primary">{point.title}</div>
                    <div className="mt-1 text-sm leading-6 text-secondary">{point.copy}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="order-1 lg:order-2 relative"
          >
            <div className="glass-panel-strong relative h-[500px] md:h-[620px] overflow-hidden rounded-[2.75rem]">
              <Image
                src="/private_office.png"
                alt="Premium Workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),transparent_34%,rgba(24,20,16,0.42))]" />
              <div className="absolute inset-0 rounded-[2.75rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] pointer-events-none" />
              <div className="absolute -right-10 top-10 h-40 w-40 rounded-full bg-white/35 blur-3xl" />

              <div className="absolute left-5 top-5 rounded-full glass-chip px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em]">
                Bookable tours available
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                {[
                  'Private office suites',
                  'Meeting cabin access',
                  'Quiet work zones',
                ].map((label) => (
                  <div key={label} className="rounded-[1.25rem] border border-white/20 bg-white/70 px-4 py-3 text-sm font-semibold text-primary backdrop-blur-2xl shadow-[0_12px_40px_rgba(7,17,31,0.1)] dark:bg-white/10 dark:text-white">
                    <Check className="mb-2 h-4 w-4 text-accent" />
                    {label}
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
