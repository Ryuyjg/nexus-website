'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Zap, Users, Wind, MapPin } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "High-speed Internet",
      description: "Dedicated gigabit fiber connection ensuring you stay online with lightning-fast speeds and uninterrupted reliability."
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Free Electricity",
      description: "Power is completely covered in your plan. Run your machines and equipment all day with zero extra utility bills."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Free Meeting Cabin",
      description: "Exclusive, complimentary access to premium meeting rooms for our members. Book your slots easily whenever needed."
    },
    {
      icon: <Wind className="w-8 h-8" />,
      title: "Air Conditioned",
      description: "Enjoy a perfectly chilled, whisper-quiet, and comfortable working environment all day long across the entire workspace."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Green View Location",
      description: "A calm natural outlook that makes focused work feel lighter, fresher, and less boxed-in."
    }
  ];

  return (
    <section id="features" className="relative overflow-hidden py-20 sm:py-24 lg:py-32">
      <div className="absolute inset-x-6 top-10 -z-10 h-80 rounded-[3rem] bg-[linear-gradient(135deg,rgba(17,24,18,0.06),rgba(214,183,122,0.1),transparent)] blur-2xl" />
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-16 lg:mb-20"
        >
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Designed for work
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[0.9] tracking-[-0.055em] text-primary sm:text-5xl md:text-6xl lg:text-7xl">
            The details feel invisible. That is the point.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-secondary leading-7 sm:leading-8">
            Every feature reinforces the same goal: keep the room calm, reliable, and easy to work in for a whole day.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 justify-center">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group glass-panel relative overflow-hidden rounded-[2rem] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:shadow-[0_30px_90px_rgba(23,49,38,0.16)] sm:p-8"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[rgba(214,183,122,0.16)] blur-2xl transition-opacity group-hover:opacity-100 sm:opacity-60" />
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(23,49,38,0.14),rgba(214,183,122,0.22))] text-accent ring-1 ring-white/30 transition-colors group-hover:bg-[linear-gradient(135deg,#173126,#9b7138)] group-hover:text-white sm:mb-6 sm:h-16 sm:w-16">
                {feature.icon}
              </div>
              <h3 className="mb-3 text-lg font-semibold tracking-[-0.03em] text-primary sm:text-xl">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base text-secondary leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
