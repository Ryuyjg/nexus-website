'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Shield, MapPin, Zap } from 'lucide-react';

const features = [
  {
    icon: <Shield className="w-6 h-6 text-accent" />,
    title: 'Enterprise Security',
    description: 'Bank-grade network security and 24/7 biometric physical access control for ultimate peace of mind.'
  },
  {
    icon: <MapPin className="w-6 h-6 text-accent" />,
    title: 'Prime Location',
    description: 'Located in the heart of the tech district with premium restaurants, cafes, and transit options steps away.'
  },
  {
    icon: <Zap className="w-6 h-6 text-accent" />,
    title: 'Highspeed Internet',
    description: 'Dedicated gigabit fiber connections with full redundancy so you never drop a critical call or commit.'
  }
];

export function Features() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 40 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <section id="features" className="py-32 bg-surface">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Why Nexa
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Everything you need. <br className="hidden md:block"/> Nothing you don&apos;t.
          </h2>
        </motion.div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="bg-white rounded-[2rem] p-10 border border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] hover:border-accent/20 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mb-8">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-4">{feature.title}</h3>
              <p className="text-secondary leading-relaxed font-medium">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
