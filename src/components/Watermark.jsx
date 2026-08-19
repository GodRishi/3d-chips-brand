import React from 'react';
import { Flame, Code2 } from 'lucide-react';

export default function Watermark() {
  return (
    <div className="fixed bottom-5 right-5 z-50 pointer-events-auto">
      <div className="group bg-[#080808]/90 backdrop-blur-md px-3.5 py-2 border-2 border-neutral-800 hover:border-[#E85D04] shadow-[4px_4px_0px_#000] transition-all duration-300 flex items-center gap-2.5 clip-notch">
        <div className="w-6 h-6 bg-[#E85D04] text-black border border-black flex items-center justify-center font-bold shrink-0 group-hover:rotate-12 transition-transform">
          <Flame className="w-3.5 h-3.5 fill-black text-black" />
        </div>
        <div className="flex flex-col text-left leading-none">
          <span className="text-[9px] font-mono font-extrabold text-neutral-400 uppercase tracking-widest block mb-0.5">
            CRAFTED BY
          </span>
          <span className="text-xs font-black font-display text-white tracking-wider uppercase group-hover:text-[#FF6B00] transition-colors">
            RISHI SAHA
          </span>
        </div>
      </div>
    </div>
  );
}
