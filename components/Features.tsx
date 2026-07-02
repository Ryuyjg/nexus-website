'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Wifi, Zap, Users, Wind, MapPin } from 'lucide-react';

export function Features() {
  const features = [
    {
      icon: <Wifi className="w-8 h-8" />,
      title: "Highspeed Internet",
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
      title: "Best Greenery Location",
      description: "Situated in a beautiful, natural environment surrounded by lush greenery, giving you peace of mind and fresh air while you work."
    }
  ];

  return (
    <section id="features" className="py-20 sm:py-24 lg:py-32 relative overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-14 sm:mb-16 lg:mb-20"
        >
          <span className="text-accent font-semibold tracking-[0.24em] uppercase text-xs mb-4 block">
            Designed for work
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold text-primary tracking-[-0.06em] leading-[0.95]">
            Details that reduce friction
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
              className="group glass-panel rounded-[2rem] p-6 sm:p-8 transition-all duration-300 hover:border-accent/40 hover:shadow-[0_28px_90px_rgba(79,107,88,0.14)]"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-[linear-gradient(135deg,rgba(79,107,88,0.16),rgba(196,170,125,0.14))] flex items-center justify-center text-accent mb-5 sm:mb-6 ring-1 ring-white/25 transition-colors group-hover:bg-[linear-gradient(135deg,rgba(79,107,88,1),rgba(196,170,125,0.9))] group-hover:text-white">
                {feature.icon}
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-primary mb-3 tracking-tight">
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
