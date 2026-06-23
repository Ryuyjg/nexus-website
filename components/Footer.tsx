import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="bg-surface py-16 border-t border-border mt-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg tracking-tight text-primary mb-4">
              <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center text-sm font-bold">N</div>
              Nexa Workspace
            </Link>
            <p className="text-secondary text-sm max-w-sm">
              Premium private offices and dedicated desks built for teams that demand excellence. Plug into an infrastructure designed to accelerate your growth.
            </p>
          </div>
          <div className="flex flex-col md:items-end gap-3 text-sm text-secondary">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Pricing</Link>
            <Link href="/contact" className="hover:text-primary transition-colors">Contact</Link>
          </div>
        </div>
        
        <div className="mt-16 pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-secondary">
          <p>© {new Date().getFullYear()} Nexa Workspace. Designed for excellence.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
