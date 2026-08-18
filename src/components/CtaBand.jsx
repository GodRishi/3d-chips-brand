import React from 'react';
import { Flame, MapPin, Package } from 'lucide-react';

export default function CtaBand({ onOpenStoreModal }) {
  return (
    <section className="relative py-16 sm:py-24 bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C1121F] overflow-hidden shadow-2xl border-y-4 border-black">
      
      {/* Continuous Moving Diagonal Stripe Pattern Background */}
      <div className="absolute inset-0 animate-stripe-slide pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2 bg-black text-white text-[10px] sm:text-xs font-black uppercase tracking-widest mb-4 sm:mb-6 border-2 border-white shadow-[3px_3px_0px_#000] sm:shadow-[4px_4px_0px_#000] -rotate-1 font-mono">
          <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00] fill-[#FF6B00]" />
          READY FOR THE CRUNCH CHALLENGE?
        </div>

        <h2 className="text-4xl sm:text-8xl md:text-9xl font-black uppercase tracking-tight font-display text-white mb-4 sm:mb-6 leading-none drop-shadow-2xl">
          CAN YOU HANDLE <br />
          <span className="drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] text-yellow-300">THE PERI PERI HEAT?</span>
        </h2>

        <p className="text-xs sm:text-xl text-white max-w-2xl mx-auto mb-8 sm:mb-10 font-medium leading-relaxed drop-shadow-md px-2">
          Grab your bag today at leading gourmet supermarkets or request a sample box delivered directly to your doorstep.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-5 max-w-sm sm:max-w-none mx-auto">
          <button
            onClick={onOpenStoreModal}
            className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 bg-black text-white font-black text-xs sm:text-base uppercase tracking-widest border-2 border-white shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:bg-[#121212] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all cursor-pointer flex items-center justify-center gap-2 sm:gap-3 -skew-x-6"
          >
            <div className="skew-x-6 flex items-center gap-2 sm:gap-3">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF6B00]" />
              <span>FIND NEAREST STORE</span>
            </div>
          </button>

          <button
            onClick={onOpenStoreModal}
            className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-5 bg-white text-black font-black text-xs sm:text-base uppercase tracking-widest border-2 border-black shadow-[4px_4px_0px_#000] sm:shadow-[6px_6px_0px_#000] hover:bg-yellow-300 hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_#000] transition-all cursor-pointer flex items-center justify-center gap-2 sm:gap-3 -skew-x-6"
          >
            <div className="skew-x-6 flex items-center gap-2 sm:gap-3">
              <Package className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
              <span>CLAIM SAMPLE BOX</span>
            </div>
          </button>
        </div>

      </div>
    </section>
  );
}
