'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, MapPin, Sofa, SunMedium } from 'lucide-react';

export function Overview() {
  return (
    <section className="relative overflow-hidden bg-[#f5efe5] py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
      <div className="absolute left-0 top-24 h-72 w-72 rounded-full bg-[rgba(214,183,122,0.16)] blur-3xl" />
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 lg:gap-16 items-center w-full">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1"
          >
            <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-[#9e7434]">
              Crafted atmosphere
            </span>
            <h2 className="mb-5 font-display text-4xl font-semibold leading-[0.9] tracking-[-0.055em] text-primary sm:mb-6 sm:text-5xl md:text-6xl lg:text-7xl">
              Quiet luxury, made practical.
            </h2>
            <p className="mb-7 max-w-xl text-base leading-relaxed text-secondary sm:mb-8 sm:text-lg md:text-xl">
              A warm room, green views, soft light, and reliable basics. The experience feels premium without becoming loud or distracting.
            </p>

            <div className="space-y-4">
              {[
                { icon: SunMedium, title: 'Soft natural light', copy: 'Bright enough to feel fresh, calm enough for long focus blocks.' },
                { icon: Sofa, title: 'Premium seating rhythm', copy: 'Work desks, lounge corners, and meeting space feel intentionally placed.' },
                { icon: MapPin, title: 'Green quiet outside', copy: 'The paddy view gives the space a rare calm that city offices usually miss.' },
              ].map((point) => (
                <div key={point.title} className="glass-panel flex items-start gap-4 rounded-[1.65rem] p-4 sm:p-5">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(23,49,38,0.14),rgba(214,183,122,0.22))] text-accent ring-1 ring-white/30">
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
            <div className="relative overflow-hidden rounded-[2rem] border border-[#e2d3bd] bg-[#fffaf1] p-2 shadow-[0_30px_90px_rgba(17,17,15,0.14)] sm:rounded-[2.75rem] sm:p-3">
              <div className="relative h-[320px] w-full overflow-hidden rounded-[1.55rem] sm:h-[400px] sm:rounded-[2.25rem] md:h-[540px]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="gallery_meeting.png"
                alt="Premium meeting room"
                loading="lazy"
                className="absolute inset-0 h-full w-full scale-[1.01] object-cover object-[center_46%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),transparent_34%,rgba(17,24,18,0.46))]" />
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.14)] pointer-events-none" />
              <div className="absolute -right-10 top-10 h-36 w-36 rounded-full bg-white/30 blur-3xl" />
              </div>

              <div className="mt-3 inline-flex rounded-full border border-white/40 bg-[#fffaf1]/72 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-primary shadow-[0_12px_34px_rgba(17,17,15,0.08)] backdrop-blur-2xl sm:mt-4 sm:text-xs lg:absolute lg:left-6 lg:top-6 lg:mt-0">
                Bookable tours available
              </div>

              <div className="mt-3 grid gap-3 sm:mt-4 sm:grid-cols-3 lg:absolute lg:bottom-6 lg:left-6 lg:right-6 lg:mt-0">
                {[
                  'Private office suites',
                  'Meeting cabin access',
                  'Quiet work zones',
                ].map((label) => (
                  <div key={label} className="rounded-[1.25rem] border border-white/25 bg-white/75 px-4 py-3 text-sm font-semibold text-primary backdrop-blur-2xl shadow-[0_14px_38px_rgba(17,24,18,0.1)] dark:bg-white/10 dark:text-white">
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
