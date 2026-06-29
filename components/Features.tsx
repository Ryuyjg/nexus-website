'use client';

import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Wifi, Coffee, Users, Shield, MapPin, Monitor } from 'lucide-react';

export function Features() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.9, 1, 1, 0.9]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);

  const features = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Gigabit Internet",
      description: "Enterprise-grade fiber connection with built-in redundancy for zero downtime."
    },
    {
      icon: <Coffee className="w-8 h-8" />,
      title: "Artisan Cafe",
      description: "Unlimited single-origin coffee and premium teas curated by local roasters."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Boardrooms",
      description: "Acoustically treated meeting spaces with 4K screens and Zoom Rooms integration."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "24/7 Security",
      description: "Biometric access, secure VLANs, and physical security presence around the clock."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Prime Location",
      description: "Located in the heart of the tech district with direct transit and parking access."
    },
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Ergonomic Setup",
      description: "Herman Miller seating and motorized standing desks equipped for deep work."
    }
  ];

  return (
    <section id="features" ref={containerRef} className="h-[200vh] relative bg-surface">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        <motion.div 
          style={{ scale, opacity }}
          className="w-full max-w-7xl mx-auto px-6 py-20"
        >
          <div className="text-center mb-20">
            <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
              Why Nexa
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary tracking-tight">
              Everything you need. <br className="hidden md:block"/> Nothing you don&apos;t.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-background rounded-[2rem] p-10 border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_30px_60px_rgb(0,0,0,0.12)] dark:hover:shadow-[0_30px_60px_rgba(255,255,255,0.05)] hover:border-accent/30 transition-all duration-300"
              >
                <div className="w-16 h-16 rounded-2xl bg-surface flex items-center justify-center text-primary mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-secondary font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
