import React, { useState, useEffect, useRef } from 'react';
import { Star, Flame, Award, Quote, CheckCircle2, Sprout, Heart, ShieldAlert } from 'lucide-react';

const REVIEWS = [
  {
    name: 'MARCUS V.',
    role: 'VERIFIED BUYER',
    rating: 5,
    tag: 'SPICE ENTHUSIAST',
    comment:
      'Hands down the single loudest crunch and most authentic Peri Peri flavor I have ever had. The Mozambique chili burn strikes right at the back of your throat!',
    location: 'NEW YORK, NY'
  },
  {
    name: 'SARAH L.',
    role: 'VERIFIED BUYER',
    rating: 5,
    tag: 'CHIP CONNOISSEUR',
    comment:
      'Most brands claim they are spicy, but Crunch Chips actually delivers. You can taste the real chili seeds and zesty lemon peel in every batch.',
    location: 'AUSTIN, TX'
  },
  {
    name: 'DEVON K.',
    role: 'VERIFIED BUYER',
    rating: 5,
    tag: 'GOURMET FOODIE',
    comment:
      'Thick kettle cut means zero soggy chips at the bottom of the bag. The acoustic crunch is insane — my coworkers heard me from across the room.',
    location: 'CHICAGO, IL'
  }
];

export default function SocialProof() {
  const [bagsCount, setBagsCount] = useState(0.1);
  const sectionRef = useRef(null);
  const hasAnimatedRef = useRef(false);

  // Decelerating Count-Up Effect for 1.2M+ Bags Sold
  useEffect(() => {
    const handleScroll = () => {
      if (hasAnimatedRef.current || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        hasAnimatedRef.current = true;
        
        let start = 0.1;
        const target = 1.2;
        const startTime = performance.now();
        const duration = 2400;

        const updateCounter = (currentTime) => {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeOutProgress = 1 - Math.pow(1 - progress, 3);
          const currentVal = start + (target - start) * easeOutProgress;
          setBagsCount(currentVal.toFixed(1));

          if (progress < 1) {
            requestAnimationFrame(updateCounter);
          }
        };
        requestAnimationFrame(updateCounter);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section ref={sectionRef} id="social-proof" className="relative py-16 sm:py-28 bg-[#080808] overflow-hidden border-t border-neutral-900">
      
      {/* Background Accent Grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Animated Key Stats Bar */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 mb-12 sm:mb-20">
          
          {/* Stat 1: Animated 1.2M+ Bags Sold Count */}
          <div className="bg-[#121212] p-4 sm:p-6 border-2 border-[#E85D04] shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] clip-notch text-center relative overflow-hidden group">
            <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest block mb-1 sm:mb-2">
              GLOBAL SALES
            </span>
            <div className="text-3xl sm:text-6xl font-black font-display text-white mb-0.5 sm:mb-1 tracking-tight leading-none">
              <span className="text-gradient-fiery">{bagsCount}M+</span>
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              Bags Devoured
            </span>
          </div>

          {/* Stat 2: Shining 4.9 Stars Rating */}
          <div className="bg-[#121212] p-4 sm:p-6 border-2 border-[#C9A227] shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] clip-notch text-center relative overflow-hidden">
            <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#C9A227] uppercase tracking-widest block mb-1 sm:mb-2">
              AVERAGE RATING
            </span>
            
            {/* Shining Stars Row */}
            <div className="flex items-center justify-center gap-0.5 sm:gap-1 mb-1 sm:mb-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-[#C9A227] fill-[#C9A227] animate-star-shine"
                  style={{ animationDelay: `${s * 0.15}s` }}
                />
              ))}
            </div>

            <div className="text-xl sm:text-3xl font-black font-display text-white mb-0.5 sm:mb-1 leading-none">
              4.9 / 5.0
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              14,800+ Reviews
            </span>
          </div>

          {/* Stat 3: 0 Apologies For The Heat Stat */}
          <div className="bg-[#121212] p-4 sm:p-6 border-2 border-[#C1121F] shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] clip-notch text-center relative overflow-hidden group">
            <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 p-1 bg-[#C1121F] text-white border border-black animate-pulse">
              <Flame className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white animate-bounce" />
            </div>
            <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-[#FF6B00] uppercase tracking-widest block mb-1 sm:mb-2">
              SPICE COMMITMENT
            </span>
            <div className="text-3xl sm:text-6xl font-black font-display text-white mb-0.5 sm:mb-1 tracking-tight flex items-center justify-center gap-1 leading-none">
              <span className="text-gradient-fiery">0</span>
              <Flame className="w-5 h-5 sm:w-8 sm:h-8 text-[#FF6B00] fill-[#FF6B00] animate-bounce" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              Apologies For Heat
            </span>
          </div>

          {/* Stat 4: 100% Real Farm Potatoes Power */}
          <div className="bg-[#121212] p-4 sm:p-6 border-2 border-emerald-500 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] clip-notch text-center relative overflow-hidden">
            <div className="absolute inset-0 rounded-full border border-emerald-500/40 animate-burst-ring pointer-events-none" />

            <span className="text-[9px] sm:text-[10px] font-mono font-extrabold text-emerald-400 uppercase tracking-widest block mb-1 sm:mb-2">
              SINGLE-ORIGIN FARM
            </span>
            <div className="text-3xl sm:text-6xl font-black font-display text-white mb-0.5 sm:mb-1 tracking-tight flex items-center justify-center gap-1 leading-none">
              <span className="text-emerald-400">100%</span>
              <Sprout className="w-4 h-4 sm:w-7 sm:h-7 text-emerald-400 animate-pulse" />
            </div>
            <span className="text-[10px] sm:text-xs font-bold text-neutral-300 uppercase tracking-wider block">
              Real Farm Potatoes
            </span>
          </div>

        </div>

        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-[#121212] border-2 border-[#E85D04] text-[#FF6B00] text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 shadow-[3px_3px_0px_#000] -rotate-1">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00]" />
            REAL REVIEWS FROM REAL SNACKERS
          </div>
          <h2 className="text-3xl sm:text-7xl font-black uppercase tracking-tight font-display text-white leading-tight">
            TESTED BY <span className="text-gradient-fiery">HEAT SEEKERS</span>
          </h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-8">
          {REVIEWS.map((rev) => (
            <div
              key={rev.name}
              className="bg-[#121212] p-5 sm:p-8 border-2 border-neutral-800 hover:border-[#E85D04] transition-all duration-500 shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] clip-notch flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A227] fill-[#C9A227]" />
                    ))}
                  </div>
                  <span className="px-2 py-0.5 sm:px-2.5 sm:py-1 bg-[#E85D04] text-black font-extrabold text-[8px] sm:text-[9px] uppercase font-mono shadow-[2px_2px_0px_#000]">
                    {rev.tag}
                  </span>
                </div>

                <Quote className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF6B00]/40 mb-2 sm:mb-3" />

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-medium mb-4 sm:mb-6">
                  "{rev.comment}"
                </p>
              </div>

              <div className="pt-3 sm:pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-black text-white font-display text-sm sm:text-base tracking-wide block leading-none">
                    {rev.name}
                  </span>
                  <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 font-bold">{rev.location}</span>
                </div>
                <div className="flex items-center gap-1 text-emerald-400 font-mono text-[9px] sm:text-[10px] font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>VERIFIED</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
