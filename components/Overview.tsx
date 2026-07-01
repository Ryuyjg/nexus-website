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
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-primary tracking-[-0.05em] mb-6 leading-[1]">
              Calm surfaces, sharp focus.
            </h2>
            <p className="text-lg md:text-xl text-secondary leading-relaxed mb-8 max-w-xl">
              The space is designed to lower friction: soft light, clean lines, and enough room for teams to think clearly without feeling boxed in.
            </p>

            <div className="space-y-4">
              {[
                { icon: SunMedium, title: 'Natural light', copy: 'Bright but balanced, so the room stays comfortable throughout the day.' },
                { icon: Sofa, title: 'Comfort-first seating', copy: 'Furniture and layout choices that support long stretches of focused work.' },
                { icon: MapPin, title: 'A quiet location', copy: 'A peaceful setting that keeps the energy high without the usual office noise.' },
              ].map((point) => (
                <div key={point.title} className="flex items-start gap-4 rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-[0_16px_40px_rgba(20,18,15,0.05)] backdrop-blur-sm">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-accent">
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
            <div className="relative h-[500px] md:h-[620px] overflow-hidden rounded-[2.5rem] border border-border/70 bg-surface shadow-[0_35px_90px_rgba(20,18,15,0.12)]">
              <Image
                src="/workspace-view-new.jpg"
                alt="Premium Workspace"
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-primary/0 to-transparent" />
              <div className="absolute inset-0 rounded-[2.5rem] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.12)] pointer-events-none" />

              <div className="absolute left-5 top-5 rounded-full border border-white/15 bg-primary/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-white backdrop-blur-md">
                Bookable tours available
              </div>

              <div className="absolute bottom-5 left-5 right-5 grid gap-3 sm:grid-cols-3">
                {[
                  'Private office suites',
                  'Meeting cabin access',
                  'Quiet work zones',
                ].map((label) => (
                  <div key={label} className="rounded-[1.25rem] border border-white/12 bg-background/90 px-4 py-3 text-sm font-semibold text-primary backdrop-blur-md">
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
