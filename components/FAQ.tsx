'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    q: "Is parking available at the workspace?",
    a: "Yes! There is ample free two-wheeler parking available near the building. Four-wheeler parking is available along the roadside or nearby designated spots."
  },
  {
    q: "Can I bring guests or clients?",
    a: "Yes, you are welcome to bring guests. If you need to hold a formal discussion, you can book our private Meeting Cabin (subject to availability)."
  },
  {
    q: "What are the workspace hours?",
    a: "We are open from 8:00 AM to 8:00 PM, Monday to Saturday. Sunday access is available exclusively for Monthly and Quarterly members upon prior request."
  },
  {
    q: "Is there power backup?",
    a: "Absolutely. We provide uninterrupted high-speed internet and power backup so your work never stops during outages."
  }
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-24 lg:py-32">
      <div className="max-w-3xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="mb-4 block text-xs font-semibold uppercase tracking-[0.28em] text-accent">
            Got Questions?
          </span>
          <h2 className="font-display text-4xl font-semibold leading-[0.9] tracking-[-0.055em] text-primary sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base sm:text-lg text-secondary leading-7 sm:leading-8">
            A few practical details that help people decide quickly whether the space is the right fit.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="glass-panel overflow-hidden rounded-[1.65rem]"
            >
              <button 
                onClick={() => toggle(idx)}
                className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors hover:bg-white/25 dark:hover:bg-white/10 sm:px-7 sm:py-6"
              >
                <span className="text-left text-base sm:text-lg font-semibold text-primary">{faq.q}</span>
                <motion.div animate={{ rotate: openIndex === idx ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <ChevronDown className="w-5 h-5 text-secondary" />
                </motion.div>
              </button>
              
              <AnimatePresence>
                {openIndex === idx && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                  >
                    <div className="px-5 pb-5 pt-0 text-sm sm:text-base sm:px-7 sm:pb-6 text-secondary leading-relaxed">
                      {faq.a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
