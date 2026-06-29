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
    <section id="features" className="py-32 relative bg-surface overflow-hidden">
      <div className="w-full max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Enterprise Infrastructure
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-bold text-primary tracking-tight">
            Engineered for Focus
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
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
      </div>
    </section>
  );
}
