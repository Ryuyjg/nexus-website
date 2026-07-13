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
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError('Please fill in all three fields.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/enquiries.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          preferredDate,
          message,
        }),
      });

      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        throw new Error(result?.error || 'Could not send your request.');
      }

      setIsSubmitted(true);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : 'Could not send your request.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background">
      <Navbar />
      
      <div className="relative px-5 pb-16 pt-24 sm:px-6 sm:pb-20 sm:pt-28 lg:pt-36">
        <div className="absolute left-0 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute right-0 top-40 h-80 w-80 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-500/10" />
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-10">
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
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold text-primary tracking-[-0.06em] leading-[0.95]">
                Let&apos;s find the right room for your team.
              </h1>
              <p className="mt-5 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-secondary">
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
                <div key={item.title} className="glass-panel rounded-[1.5rem] p-5">
                  <item.icon className="h-5 w-5 text-accent" />
                  <div className="mt-3 text-base font-semibold text-primary">{item.title}</div>
                  <div className="mt-1 text-sm leading-6 text-secondary">{item.copy}</div>
                </div>
              ))}
            </div>

            <div className="glass-panel-strong rounded-[1.75rem] p-6">
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
            className="glass-panel-strong rounded-[1.75rem] sm:rounded-[2.25rem] p-5 sm:p-6 md:p-8 lg:p-10"
          >
            {isSubmitted ? (
              <motion.div 
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="flex min-h-[320px] sm:min-h-[420px] flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 rounded-full bg-[linear-gradient(135deg,rgba(79,107,88,0.12),rgba(196,170,125,0.14))] flex items-center justify-center text-accent mx-auto mb-6 ring-1 ring-white/20">
                  <ShieldCheck className="w-10 h-10" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-semibold text-primary mb-3">Request sent</h3>
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="glass-input"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Email Address</label>
                  <input 
                    name="email"
                    type="email" 
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="glass-input"
                    placeholder="john@company.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Phone Number</label>
                  <input 
                    name="phone"
                    type="tel" 
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="glass-input"
                    placeholder="+91 XXXXX XXXXX"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Preferred Visit Date</label>
                  <input
                    name="preferredDate"
                    type="text"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="glass-input"
                    placeholder="Tomorrow evening, Saturday, etc."
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-primary mb-2">Message</label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="glass-input min-h-32 resize-y"
                    placeholder="Tell us what kind of workspace you need."
                  />
                </div>
                <input name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
                {error && <p className="text-sm font-medium text-rose-600">{error}</p>}
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(24,20,16,1),rgba(79,107,88,1))] px-5 py-4 font-semibold text-white transition-transform hover:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50 shadow-[0_20px_60px_rgba(79,107,88,0.18)]"
                >
                  {isLoading ? 'Sending request...' : 'Submit Request'}
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
