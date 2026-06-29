'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';
import { MagneticButton } from '@/components/MagneticButton';

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-surface">
      <Navbar />
      
      <div className="pt-32 pb-20 px-6 max-w-lg mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Book a Visit
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-primary tracking-tight mb-4">
            Let&apos;s get started.
          </h1>
          <p className="text-secondary font-medium">
            Schedule a free tour of our premium workspace.
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="bg-background p-8 md:p-12 rounded-[2.5rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgba(255,255,255,0.02)] border border-border/50"
        >
          {isSubmitted ? (
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-primary mb-2">Request Sent</h3>
              <p className="text-secondary font-medium">We&apos;ll be in touch shortly to confirm your visit.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Full Name</label>
                <input 
                  type="text" 
                  required
                  className="w-full px-5 py-4 bg-surface border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-primary placeholder:text-secondary/60"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Email Address</label>
                <input 
                  type="email" 
                  required
                  className="w-full px-5 py-4 bg-surface border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-primary placeholder:text-secondary/60"
                  placeholder="john@company.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-primary mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  required
                  className="w-full px-5 py-4 bg-surface border border-border/50 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-primary placeholder:text-secondary/60"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>
              <MagneticButton className="w-full py-4 mt-4" variant="primary">
                Submit Request
              </MagneticButton>
            </form>
          )}
        </motion.div>
      </div>

      <Footer />
    </main>
  );
}
