import React, { useState, useEffect } from 'react';
import { Flame, Menu, X, MapPin } from 'lucide-react';

export default function Navbar({ onOpenStoreModal }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'py-3 bg-[#080808]/95 backdrop-blur-2xl border-b-2 border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
          : 'py-5 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Wordmark with Slanted Stamped Emblem */}
        <a href="#" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-[#E85D04] border-2 border-black shadow-[3px_3px_0px_#000] -rotate-3 flex items-center justify-center group-hover:rotate-0 transition-transform duration-300">
            <Flame className="w-6 h-6 text-black fill-black" />
          </div>
          <div className="flex flex-col">
            <span className="text-2xl font-black tracking-widest text-white uppercase font-display leading-none flex items-center gap-1">
              CRUNCH<span className="text-[#FF6B00]">.</span>
            </span>
            <span className="text-[9px] font-mono font-extrabold text-[#C9A227] tracking-widest uppercase">
              PERI PERI // 150G SPEC
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links (Brutalist Architectural Border) */}
        <nav className="hidden md:flex items-center gap-8 bg-[#121212] px-8 py-2.5 border-2 border-neutral-800 shadow-[4px_4px_0px_#000]">
          <a
            href="#spotlight"
            className="text-xs font-black text-neutral-300 hover:text-[#FF6B00] transition-colors uppercase tracking-widest"
          >
            // SPOTLIGHT
          </a>
          <a
            href="#why-crunch"
            className="text-xs font-black text-neutral-300 hover:text-[#FF6B00] transition-colors uppercase tracking-widest"
          >
            // WHY CRUNCH
          </a>
          <a
            href="#flavors"
            className="text-xs font-black text-neutral-300 hover:text-[#FF6B00] transition-colors uppercase tracking-widest"
          >
            // FLAVORS
          </a>
          <a
            href="#social-proof"
            className="text-xs font-black text-neutral-300 hover:text-[#FF6B00] transition-colors uppercase tracking-widest"
          >
            // REVIEWS
          </a>
        </nav>

        {/* Right CTA Area: Slanted Brutalist Button */}
        <div className="flex items-center gap-3 sm:gap-4">
          <div className="hidden lg:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C1121F] border-2 border-black text-white text-xs font-black font-mono shadow-[2px_2px_0px_#000] -rotate-1">
            <Flame className="w-3.5 h-3.5 fill-white" />
            <span>HEAT: 10/10</span>
          </div>

          <button
            onClick={onOpenStoreModal}
            className="hidden sm:flex btn-brutal-orange px-5 py-2.5 text-xs font-extrabold uppercase tracking-wider items-center gap-2"
          >
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-white" />
              <span>STORE LOCATOR</span>
            </div>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 bg-[#121212] border-2 border-black shadow-[3px_3px_0px_#000] text-white cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#080808] border-b-2 border-black px-6 py-6 mt-3 flex flex-col gap-4 animate-in fade-in slide-in-from-top-4 duration-300 shadow-2xl">
          <a
            href="#spotlight"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-extrabold text-white hover:text-[#FF6B00] py-2 uppercase tracking-wider border-b border-neutral-800"
          >
            // SPOTLIGHT
          </a>
          <a
            href="#why-crunch"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-extrabold text-white hover:text-[#FF6B00] py-2 uppercase tracking-wider border-b border-neutral-800"
          >
            // WHY CRUNCH
          </a>
          <a
            href="#flavors"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-extrabold text-white hover:text-[#FF6B00] py-2 uppercase tracking-wider border-b border-neutral-800"
          >
            // FLAVORS
          </a>
          <a
            href="#social-proof"
            onClick={() => setMobileMenuOpen(false)}
            className="text-sm font-extrabold text-white hover:text-[#FF6B00] py-2 uppercase tracking-wider border-b border-neutral-800"
          >
            // REVIEWS
          </a>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenStoreModal();
              }}
              className="w-full btn-brutal-orange py-3.5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <div>
                <span>FIND NEAREST STORE</span>
              </div>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
