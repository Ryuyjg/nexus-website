'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock3, MapPin, Sparkles, ShieldCheck } from 'lucide-react';
import { Navbar } from '@/components/Navbar';
import { Footer } from '@/components/Footer';


export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error('Failed to send request');
      }

      setIsSubmitted(true);
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative px-6 pb-20 pt-28 lg:pt-36">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <div>
              <span className="text-accent font-semibold tracking-[0.24em] uppercase text-xs mb-4 block">
                Book a visit
              </span>
              <h1 className="text-4xl md:text-5xl font-semibold text-primary tracking-[-0.05em] leading-[0.98]">
                Let&apos;s find the right room for your team.
              </h1>
              <p className="mt-5 max-w-xl text-lg leading-8 text-secondary">
                Share your details and we&apos;ll help you plan a tour, answer questions, and show you the membership that fits your workflow.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {[
                { icon: Clock3, title: 'Fast response', copy: 'We usually reply quickly during business hours.' },
                { icon: ShieldCheck, title: 'Clear next steps', copy: 'No pressure, just a simple visit and a straightforward answer.' },
                { icon: MapPin, title: 'Peaceful location', copy: 'A calm site with enough room to work, meet, and breathe.' },
                { icon: Sparkles, title: 'Premium feel', copy: 'A polished workspace that feels good from the first minute.' },
              ].map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-border/70 bg-background/80 p-5 shadow-[0_16px_40px_rgba(20,18,15,0.05)] backdrop-blur-sm">
                  <item.icon className="h-5 w-5 text-accent" />
                  <div className="mt-3 text-base font-semibold text-primary">{item.title}</div>
                  <div className="mt-1 text-sm leading-6 text-secondary">{item.copy}</div>
                </div>
              ))}
            </div>

            <div className="rounded-[1.75rem] border border-border/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(242,248,243,0.82))] p-6 shadow-[0_24px_60px_rgba(20,18,15,0.08)]">
              <div className="text-sm font-semibold uppercase tracking-[0.24em] text-secondary">What happens next</div>
              <div className="mt-3 space-y-3 text-sm leading-7 text-secondary">
                <p>1. We get your enquiry.</p>
                <p>2. We confirm a visit time that works for you.</p>
                <p>3. You tour the space and decide if it fits.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="rounded-[2.25rem] border border-border/70 bg-background/85 p-6 shadow-[0_24px_70px_rgba(20,18,15,0.08)] backdrop-blur-sm md:p-8 lg:p-10"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex min-h-[420px] flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center text-accent mx-auto mb-6">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-3xl font-semibold text-primary mb-3">Request sent</h3>
                <p className="max-w-md text-secondary leading-7">We&apos;ll be in touch shortly to confirm your visit and help with the next step.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Full Name</label>
                  <input 
                    name="name"
                    type="text" 
                    required
                    className="w-full px-5 py-4 bg-surface border border-border/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-primary placeholder:text-secondary/60"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    className="w-full px-5 py-4 bg-surface border border-border/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-primary placeholder:text-secondary/60"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Phone Number</label>
                  <input 
                    name="phone"
                    type="tel" 
                    required
                    className="w-full px-5 py-4 bg-surface border border-border/70 rounded-2xl focus:outline-none focus:ring-2 focus:ring-accent/20 focus:border-accent transition-all text-primary placeholder:text-secondary/60"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-primary px-5 py-4 font-semibold text-background transition-transform hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {isLoading ? 'Sending...' : 'Submit Request'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
