'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export function Overview() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Complex 3D scroll mapping
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.9]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -10]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.5], [100, 0]);
  const imageY = useTransform(scrollYProgress, [0.5, 1], [0, -50]);

  return (
    <section ref={containerRef} className="h-[300vh] relative bg-background">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden [perspective:1000px]">
        <motion.div 
          style={{ 
            scale, 
            rotateX, 
            opacity,
            transformStyle: "preserve-3d"
          }}
          className="w-full max-w-7xl mx-auto px-6 h-full flex items-center justify-center"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center w-full">
            
            <motion.div style={{ y: textY }}>
              <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
                Premium Ambience
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary tracking-tight mb-8">
                A space that <br/>inspires.
              </h2>
              <p className="text-xl text-secondary leading-relaxed font-medium max-w-lg">
                Step away from the noise and focus on what matters. Our workspace combines ergonomic comfort with breathtaking views, creating the perfect environment for deep work and creativity.
              </p>
            </motion.div>

            <motion.div 
              style={{ y: imageY }}
              className="relative h-[600px] rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              <img 
                src="/nexus-website/workspace-view-new.jpg" 
                alt="Premium Workspace" 
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 shadow-[inset_0_0_0_1px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] rounded-[2.5rem] pointer-events-none" />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
}
