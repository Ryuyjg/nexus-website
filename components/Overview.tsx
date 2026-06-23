'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Overview() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [-50, 50]);

  return (
    <section id="overview" ref={ref} className="py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
              Premium Ambience
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-8">
              A space that inspires.
            </h2>
            <p className="text-xl text-secondary leading-relaxed font-medium">
              Step away from the noise and focus on what matters. Our workspace combines ergonomic comfort with breathtaking views of lush greenery, creating the perfect environment for deep work and creativity.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="relative h-[500px] rounded-[2.5rem] overflow-hidden shadow-2xl"
          >
            <motion.img 
              style={{ y }}
              src="/workspace-view-new.jpg" 
              alt="Premium Workspace" 
              className="absolute inset-0 w-full h-[120%] object-cover object-center -top-[10%]"
            />
            {/* Soft inner shadow for premium feel */}
            <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.05)] rounded-[2.5rem] pointer-events-none" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
