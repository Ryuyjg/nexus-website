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
    <section id="faq" className="py-32 bg-surface">
      <div className="max-w-3xl mx-auto px-6">
        
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-accent font-semibold tracking-wider uppercase text-sm mb-4 block">
            Got Questions?
          </span>
          <h2 className="text-4xl font-bold text-primary tracking-tight">
            Frequently Asked Questions
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden border border-border/50 shadow-sm"
            >
              <button 
                onClick={() => toggle(idx)}
                className="w-full px-8 py-6 flex items-center justify-between bg-white hover:bg-surface/50 transition-colors"
              >
                <span className="text-lg font-semibold text-primary text-left">{faq.q}</span>
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
                    <div className="px-8 pb-6 pt-0 text-secondary font-medium leading-relaxed">
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
