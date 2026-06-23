'use client';

import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import Link from 'next/link';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  variant?: 'primary' | 'secondary' | 'outline';
}

export function MagneticButton({ children, className, href, variant = 'primary' }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    setPosition({ x: middleX * 0.1, y: middleY * 0.1 });
  };

  const reset = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variants = {
    primary: "bg-primary text-white hover:bg-black/90",
    secondary: "bg-surface text-primary hover:bg-[#EAEAEA]",
    outline: "border border-border text-primary hover:bg-surface",
  };

  const baseClasses = "relative inline-flex items-center justify-center px-6 py-3 rounded-full font-medium transition-colors overflow-hidden group";

  const content = (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={reset}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 150, damping: 15, mass: 0.1 }}
      className={cn(baseClasses, variants[variant], className)}
    >
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {/* Shine effect on hover */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-shimmer z-0" />
    </motion.div>
  );

  if (href) {
    return <Link href={href} passHref legacyBehavior><a className="inline-block">{content}</a></Link>;
  }

  return <div className="inline-block cursor-pointer">{content}</div>;
}
