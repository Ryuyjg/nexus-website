'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MagneticButton } from './MagneticButton';

export function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 250]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const scale = useTransform(scrollY, [0, 500], [1, 0.9]);
  const videoBlur = useTransform(scrollY, [0, 500], ["blur(0px)", "blur(20px)"]);
  const videoOpacity = useTransform(scrollY, [0, 800], [0.6, 0]);

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
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden bg-black">
      {/* Video Background */}
      <motion.div 
        style={{ opacity: videoOpacity, filter: videoBlur }}
        className="absolute inset-0 z-0"
      >
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-flowing-gradient-background-texture-33827-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-background" />
      </motion.div>

      <motion.div 
        style={{ y, opacity, scale }}
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
        
        <motion.h1 variants={item} className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white mb-8 leading-[1.05]">
          Workspace designed for <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/40">pure performance.</span>
        </motion.h1>
        
        <motion.p variants={item} className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto mb-12 font-medium leading-relaxed">
          Premium private offices and dedicated desks built for teams that demand excellence. Plug into an infrastructure designed to accelerate your growth.
        </motion.p>
        
        <motion.div variants={item} className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <MagneticButton href="#pricing" variant="primary" className="w-full sm:w-auto text-lg px-8 py-4 !bg-white !text-black hover:!bg-white/90">
            Explore Memberships
          </MagneticButton>
          <MagneticButton href="/contact" variant="outline" className="w-full sm:w-auto text-lg px-8 py-4 !border-white/20 !text-white hover:!bg-white/10">
            Contact Sales
          </MagneticButton>
        </motion.div>
      </motion.div>
    </section>
  );
}
