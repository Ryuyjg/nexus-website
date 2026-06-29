'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { Check } from 'lucide-react';

const plans = [
  {
    name: "Monthly",
    price: "₹3,000",
    period: "/ Month",
    desc: "Perfect for professionals looking for a productive workspace with flexible access.",
    badge: "Fast Filling",
    badgeColor: "text-amber-600 bg-amber-100/50",
    featured: false
  },
  {
    name: "Quarterly",
    price: "₹8,000",
    period: "/ 3 Months",
    desc: "Save more with a long-term commitment while enjoying all member benefits.",
    badge: "Most Popular",
    badgeColor: "text-accent bg-accent/10",
    featured: true
  },
  {
    name: "Semi-Annual",
    price: "₹15,000",
    period: "/ 6 Months",
    desc: "Our best-value plan for professionals and businesses seeking a dedicated workspace.",
    badge: "Only 2 Left",
    badgeColor: "text-rose-600 bg-rose-100/50",
    featured: false
  }
];

const benefits = [
  "Fully Air-Conditioned Workspace",
  "Complimentary High-Speed Internet",
  "Free Electricity & Utilities",
  "Scenic Paddy Field Views & Peaceful Ambience",
  "Access to Meeting Cabin (Subject to Prior Booking)",
  "Clean, Professional & Productive Environment",
  "Comfortable Seating & Work-Friendly Setup",
  "Ideal for Freelancers, Startups & Remote Pros"
];

export function Pricing() {
  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.15 } },
  };

  const item = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
  };

  return (
    <section id="pricing" className="py-32 bg-background border-t border-border/50">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Flexible Memberships
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-primary tracking-tight">
            Choose your perfect plan
          </h2>
        </div>

        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-32"
        >
          {plans.map((plan, idx) => (
            <motion.div 
              key={idx}
              variants={item}
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className={`relative flex flex-col p-10 rounded-[2rem] border transition-all duration-300 ${
                plan.featured 
                  ? 'border-accent shadow-[0_20px_40px_rgb(0,113,227,0.1)] bg-background z-10' 
                  : 'border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_40px_rgb(0,0,0,0.08)] dark:hover:shadow-[0_20px_40px_rgba(255,255,255,0.05)] bg-background/50 backdrop-blur-xl'
              }`}
            >
              <div className={`inline-flex self-start px-3 py-1 rounded-full text-xs font-bold mb-6 ${plan.badgeColor}`}>
                {plan.badge}
              </div>
              <h3 className="text-2xl font-semibold text-primary mb-2">{plan.name}</h3>
              <div className="flex items-baseline gap-2 mb-6">
                <span className="text-4xl font-bold text-primary">{plan.price}</span>
                <span className="text-sm font-medium text-secondary">{plan.period}</span>
              </div>
              <p className="text-secondary font-medium leading-relaxed mb-10 flex-grow">
                {plan.desc}
              </p>
              <MagneticButton href="/contact" variant={plan.featured ? 'primary' : 'secondary'} className="w-full">
                Select Plan
              </MagneticButton>
            </motion.div>
          ))}
        </motion.div>

        {/* Benefits Section */}
        <div className="pt-20 border-t border-border/50">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-primary tracking-tight">Membership Benefits</h3>
          </div>
          
          <motion.div 
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {benefits.map((benefit, idx) => (
              <motion.div 
                key={idx}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="flex items-start gap-4 p-6 bg-surface rounded-2xl border border-border/30 hover:border-accent/20 transition-colors"
              >
                <div className="mt-1 flex-shrink-0">
                  <Check className="w-5 h-5 text-accent" />
                </div>
                <p className="text-sm font-medium text-primary leading-relaxed">{benefit}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  );
}
