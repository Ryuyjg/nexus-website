'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 200]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 15 } },
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-background">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-5xl mx-auto px-6 text-center z-10"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.div variants={item}>
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-6 block">
            Next Generation Excellence
          </span>
        </motion.div>
        
        <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-primary mb-8 leading-[1.05]">
          Workspace designed for <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">pure performance.</span>
        </motion.h1>
        
        <motion.p variants={item} className="text-xl md:text-2xl text-secondary max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Premium private offices and dedicated desks built for teams that demand excellence. Plug into an infrastructure designed to accelerate your growth.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton href="#pricing" className="w-full sm:w-auto text-lg px-8 py-4">
            Explore Memberships
          </MagneticButton>
          <MagneticButton href="/contact" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-4">
            Contact Sales
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
