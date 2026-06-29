'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function Overview() {
  return (
    <section className="py-32 relative bg-background overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
              Premium Ambience
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary tracking-tight mb-8 leading-tight">
              A space that <br className="hidden md:block" /> inspires.
            </h2>
            <p className="text-xl text-secondary leading-relaxed font-medium mb-8">
              Step away from the noise and focus on what matters. Our workspace combines ergonomic comfort with breathtaking views, creating the perfect environment for deep work and creativity.
            </p>
            <ul className="space-y-4 text-secondary font-medium">
              <li className="flex items-center gap-3">
                <span className="text-accent">✓</span> Natural light
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent">✓</span> Ergonomic seating arrangements
              </li>
              <li className="flex items-center gap-3">
                <span className="text-accent">✓</span> Calm, distraction-free zones
              </li>
            </ul>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[400px] md:h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <img 
              src="/nexus-website/workspace-view-new.jpg" 
              alt="Premium Workspace" 
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-[2.5rem] pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
