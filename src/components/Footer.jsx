import React from 'react';
import { Flame, Share2, Globe, MessageSquare, ArrowUpRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#050505] text-[#F5F1E8] border-t-2 border-neutral-900 pt-16 pb-12 relative overflow-hidden">
      
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:32px_32px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-16 border-b border-neutral-900">
          
          {/* Brand Col (5 cols) */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-[#E85D04] border-2 border-black shadow-[3px_3px_0px_#000] -rotate-3 flex items-center justify-center">
                <Flame className="w-6 h-6 text-black fill-black" />
              </div>
              <span className="text-3xl font-black tracking-widest text-white uppercase font-display">
                CRUNCH<span className="text-[#FF6B00]">.</span>
              </span>
            </div>

            <p className="text-xs text-neutral-400 leading-relaxed max-w-sm font-medium mb-6">
              Crunch Chips is a bold, high-energy marketing demo built to showcase cutting-edge 60FPS scroll frame animation, acoustic sound equalizer visualizers, and brutalist design.
            </p>

            <div className="flex items-center gap-3">
              <a
                href="#"
                className="w-9 h-9 bg-[#121212] border border-neutral-800 hover:border-[#E85D04] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-[2px_2px_0px_#000]"
                aria-label="Share"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#121212] border border-neutral-800 hover:border-[#E85D04] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-[2px_2px_0px_#000]"
                aria-label="Globe"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 bg-[#121212] border border-neutral-800 hover:border-[#E85D04] text-neutral-300 hover:text-white flex items-center justify-center transition-colors shadow-[2px_2px_0px_#000]"
                aria-label="Community"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-mono font-black text-[#FF6B00] uppercase tracking-widest mb-4">
              // NAVIGATION
            </h4>
            <ul className="space-y-2.5 text-xs font-extrabold uppercase font-mono text-neutral-300">
              <li>
                <a href="#spotlight" className="hover:text-[#FF6B00] transition-colors">
                  Spotlight Flavor
                </a>
              </li>
              <li>
                <a href="#why-crunch" className="hover:text-[#FF6B00] transition-colors">
                  Why Crunch Chips
                </a>
              </li>
              <li>
                <a href="#flavors" className="hover:text-[#FF6B00] transition-colors">
                  Product Variants
                </a>
              </li>
              <li>
                <a href="#social-proof" className="hover:text-[#FF6B00] transition-colors">
                  Customer Reviews
                </a>
              </li>
            </ul>
          </div>

          {/* Portfolio & Legal Specs (4 cols) */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-mono font-black text-[#C9A227] uppercase tracking-widest mb-4">
              // CREATOR CREDITS
            </h4>
            <p className="text-xs text-neutral-400 leading-relaxed font-medium mb-4">
              Designed & developed as a portfolio masterpiece showcasing high-performance web animations.
            </p>

            <div className="p-3 bg-[#0D0D0D] border border-neutral-800 text-xs font-mono text-neutral-300">
              <span className="text-[#FF6B00] font-bold block mb-1">CREATOR WATERMARK:</span>
              <span className="text-white font-black uppercase text-sm block">RISHI SAHA</span>
              <span className="text-[10px] text-neutral-500 font-normal">All rights reserved © 2026</span>
            </div>
          </div>

        </div>

        {/* Bottom Disclaimer & Signature Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-500">
          <div>
            <span>© 2026 CRUNCH CHIPS DEMO. CRAFTED WITH FIRE BY </span>
            <span className="text-white font-extrabold">RISHI SAHA</span>.
          </div>
          <div className="flex items-center gap-4">
            <span className="hover:text-neutral-300 cursor-pointer">PRIVACY POLICY</span>
            <span>•</span>
            <span className="hover:text-neutral-300 cursor-pointer">TERMS OF SERVICE</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
