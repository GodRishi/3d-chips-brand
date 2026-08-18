import React from 'react';
import { Flame, Sparkles } from 'lucide-react';

const CLAIMS = [
  '100% MOZAMBIQUE BIRD’S EYE CHILI',
  'REAL SINGLE-ORIGIN POTATOES',
  'TRIPLE KETTLE COOKED',
  'ZERO MSG & TRANS-FATS',
  'GLUTEN FREE & NON-GMO',
  'NO ARTIFICIAL COLOURS',
  'HAND HARVESTED SEA SALT',
  'UNAPOLOGETIC HEAT'
];

export default function IngredientsStrip() {
  return (
    <div className="w-full bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C1121F] py-4 overflow-hidden shadow-2xl relative z-20 border-y border-[#FF6B00]/40">
      <div className="flex animate-marquee whitespace-nowrap items-center">
        {[...CLAIMS, ...CLAIMS, ...CLAIMS, ...CLAIMS].map((claim, idx) => (
          <div key={idx} className="flex items-center gap-6 mx-6">
            <span className="text-white font-extrabold text-sm md:text-base tracking-widest uppercase font-display flex items-center gap-2">
              {claim}
            </span>
            <Flame className="w-4 h-4 text-[#F5F1E8] fill-white" />
          </div>
        ))}
      </div>
    </div>
  );
}
