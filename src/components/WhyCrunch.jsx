import React from 'react';
import { Flame, ShieldCheck, Zap, HeartHandshake, CheckCircle2, Award } from 'lucide-react';

const FEATURES = [
  {
    number: '01',
    icon: Flame,
    color: 'from-[#E85D04] to-[#FF6B00]',
    title: 'REAL MOZAMBIQUE CHILIS',
    subtitle: 'RAW AFRICAN FLAME',
    description:
      'We import whole, sun-dried African Bird’s Eye chilis directly from Mozambique farms and grind them fresh daily. Raw flame, zero synthetic capsaicin.'
  },
  {
    number: '02',
    icon: Zap,
    color: 'from-[#FF6B00] to-[#C9A227]',
    title: 'TRIPLE KETTLE CRUNCH',
    subtitle: 'ACOUSTIC SOUND TECH',
    description:
      'Cut 35% thicker than standard mass-market chips, kettle-cooked in small batch copper vats to produce an unmistakable, loud acoustic crunch.'
  },
  {
    number: '03',
    icon: ShieldCheck,
    color: 'from-[#C1121F] to-[#E85D04]',
    title: 'ZERO ARTIFICIAL JUNK',
    subtitle: 'PURE CLEAN INGREDIENTS',
    description:
      'No monosodium glutamate (MSG), no artificial colors, no trans-fats, and no chemical flavor powder. Just real potatoes, real oil, real spices.'
  },
  {
    number: '04',
    icon: HeartHandshake,
    color: 'from-[#C9A227] to-[#E85D04]',
    title: 'SINGLE-ORIGIN POTATOES',
    subtitle: 'FARM TO FRYER IN 24 HRS',
    description:
      'Hand-selected high-starch russet potatoes harvested directly from certified local farms. Never reconstituted from potato flakes or starches.'
  }
];

export default function WhyCrunch() {
  return (
    <section id="why-crunch" className="relative py-16 sm:py-28 bg-[#080808] overflow-hidden border-t border-neutral-900">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#1A1A1A_1px,transparent_1px)] [background-size:32px_32px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Shockwave Burst Animation */}
        <div className="text-center max-w-4xl mx-auto mb-12 sm:mb-20 relative">
          
          {/* Explosive Shockwave Burst Rings Behind Headline */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[280px] sm:w-[550px] h-[280px] sm:h-[550px] pointer-events-none">
            {/* Inner Flame Glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#E85D04]/25 via-[#FF6B00]/20 to-[#C1121F]/25 rounded-full blur-3xl animate-pulse" />
            {/* Expanding Burst Ring 1 */}
            <div className="absolute inset-0 rounded-full border-2 border-[#FF6B00]/40 animate-burst-ring" />
            {/* Expanding Burst Ring 2 */}
            <div className="absolute inset-[-30px] sm:inset-[-40px] rounded-full border-2 border-[#E85D04]/30 animate-burst-ring [animation-delay:1.2s]" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-[#121212] border-2 border-[#C9A227] text-[#C9A227] text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6 shadow-[3px_3px_0px_#000] -rotate-1 relative z-10">
            <Award className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A227]" />
            Why Settle For Mass-Market Chips?
          </div>

          {/* Burst Headline */}
          <h2 className="text-3xl sm:text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight font-display text-white mb-4 sm:mb-6 relative z-10 leading-none drop-shadow-2xl">
            ENGINEERED FOR <br />
            <span className="text-gradient-fiery drop-shadow-[0_15px_35px_rgba(232,93,4,0.7)] relative inline-block">
              UNCOMPROMISING SNACKERS
            </span>
          </h2>

          <p className="text-neutral-300 text-xs sm:text-lg leading-relaxed max-w-2xl mx-auto relative z-10 font-medium px-2">
            Most brands hide behind artificial flavor dust and paper-thin potato shavings. Here is why Crunch Chips stands in a class of its own.
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-8">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group relative bg-[#121212] p-5 sm:p-8 border-2 border-neutral-800 hover:border-[#E85D04] transition-all duration-500 hover:-translate-y-2 flex flex-col justify-between overflow-hidden shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] clip-notch"
              >
                {/* Background Stroke Number */}
                <span className="absolute top-2 right-3 sm:right-4 text-5xl sm:text-7xl font-black font-display text-stroke-white pointer-events-none opacity-20 group-hover:opacity-40 transition-opacity">
                  {feature.number}
                </span>

                {/* Glow backdrop on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#E85D04]/15 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                <div>
                  {/* Card Icon */}
                  <div
                    className={`w-11 h-11 sm:w-14 sm:h-14 bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 sm:mb-6 shadow-[3px_3px_0px_#000] border-2 border-black group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className="w-5 h-5 sm:w-7 sm:h-7 text-black fill-black" />
                  </div>

                  {/* Subtitle */}
                  <span className="text-[9px] sm:text-[10px] font-bold font-mono text-[#FF6B00] tracking-widest uppercase block mb-1">
                    {feature.subtitle}
                  </span>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl font-bold uppercase tracking-wide font-display text-white mb-2 sm:mb-3 leading-tight">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11px] sm:text-xs text-neutral-400 leading-relaxed mb-4 sm:mb-6 font-medium">
                    {feature.description}
                  </p>
                </div>

                {/* Checkmark Tag at Bottom */}
                <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-[10px] sm:text-[11px] font-semibold text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#FF6B00]" />
                    <span>Verified Standard</span>
                  </div>
                  <span className="font-mono text-[9px] text-neutral-500">{feature.number}/04</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner Comparison Strip with Compact Wax Seal for Mobile */}
        <div className="mt-12 sm:mt-16 bg-[#121212] p-5 sm:p-8 border-2 border-[#E85D04] shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 clip-notch">
          <div className="flex items-center gap-3.5 text-left w-full sm:w-auto">
            <div className="p-3 bg-[#E85D04] text-black border-2 border-black shrink-0 shadow-[3px_3px_0px_#000]">
              <Flame className="w-6 h-6 sm:w-8 sm:h-8 fill-black animate-pulse" />
            </div>
            <div>
              <h4 className="text-xl sm:text-2xl font-bold uppercase font-display text-white tracking-wide leading-tight">
                THE ACOUSTIC CRUNCH GUARANTEE
              </h4>
              <p className="text-[11px] sm:text-xs text-neutral-300 leading-relaxed max-w-xl font-medium mt-1">
                Taste Crunch Peri Peri against any ordinary chip. If it's not louder, spicier, and crunchier, we'll refund your bag on the spot.
              </p>
            </div>
          </div>
          
          {/* Compact Wax Seal Badge */}
          <div className="shrink-0 flex items-center justify-center p-1">
            <div className="seal-stamp scale-90 sm:scale-100">
              <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-black fill-black mb-0.5" />
              <span className="text-[8px] sm:text-[9px] font-black text-black font-mono leading-none tracking-tighter uppercase">100%</span>
              <span className="text-[7px] sm:text-[8px] font-extrabold text-black font-mono leading-tight tracking-widest uppercase">SATISFACTION</span>
              <span className="text-[6px] sm:text-[7px] font-bold text-black font-mono tracking-widest uppercase">SEAL</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
