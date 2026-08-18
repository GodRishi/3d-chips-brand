import React, { useState } from 'react';
import { Flame, Volume2, AlertTriangle, Zap, VolumeX, ShieldAlert, Snowflake, Sun, Skull, Award } from 'lucide-react';

const HEAT_LEVELS = [
  {
    id: 'mild',
    name: 'MILD LIME',
    scoville: '2,500 SHU',
    level: '4 / 10',
    type: 'cool',
    colorTheme: 'from-cyan-500 via-teal-400 to-emerald-500',
    borderColor: 'border-cyan-400',
    glowColor: 'bg-cyan-500/25',
    activeTabClass: 'bg-cyan-400 text-black border-2 border-black shadow-[3px_3px_0px_#000]',
    inactiveTabClass: 'bg-[#121212] text-neutral-400 border border-neutral-800 hover:text-white',
    icon: Snowflake,
    description: 'Smooth, refreshing cool citrus lime undertone with a gentle tickle of spice. Crisp, breezy, and refreshing.',
    notes: ['Key Lime Zest', 'Mild Paprika', 'Atlantic Sea Salt']
  },
  {
    id: 'medium',
    name: 'MEDIUM CHARGE',
    scoville: '15,000 SHU',
    level: '7 / 10',
    type: 'warm',
    colorTheme: 'from-amber-400 via-yellow-500 to-orange-500',
    borderColor: 'border-amber-400',
    glowColor: 'bg-amber-500/30',
    activeTabClass: 'bg-amber-400 text-black border-2 border-black shadow-[3px_3px_0px_#000]',
    inactiveTabClass: 'bg-[#121212] text-neutral-400 border border-neutral-800 hover:text-white',
    icon: Sun,
    description: 'Rich warm roasted cumin, black pepper, and golden paprika kick. A cozy, savory warmth that builds steadily.',
    notes: ['Roasted Cumin', 'Golden Paprika', 'Crushed Black Pepper']
  },
  {
    id: 'peri-peri',
    name: 'PERI PERI IGNITION',
    scoville: '100,000 SHU',
    level: '10 / 10',
    type: 'hot',
    colorTheme: 'from-[#E85D04] via-[#FF6B00] to-[#C1121F]',
    borderColor: 'border-[#E85D04]',
    glowColor: 'bg-[#E85D04]/40',
    activeTabClass: 'bg-[#E85D04] text-white border-2 border-black shadow-[3px_3px_0px_#000]',
    inactiveTabClass: 'bg-[#121212] text-neutral-400 border border-neutral-800 hover:text-white',
    icon: Flame,
    description: 'Our signature flagship! Authentic sun-dried Mozambique Bird’s Eye Chili flame that explodes on your tongue.',
    notes: ['Bird’s Eye Chili', 'Wild Garlic', 'Sun-Dried Lemon']
  },
  {
    id: 'apocalyptic',
    name: 'APOCALYPTIC REAPER',
    scoville: '1,500,000 SHU',
    level: '12 / 10',
    type: 'apocalyptic',
    colorTheme: 'from-[#C1121F] via-rose-700 to-black',
    borderColor: 'border-[#C1121F]',
    glowColor: 'bg-[#C1121F]/60',
    activeTabClass: 'bg-[#C1121F] text-white border-2 border-black shadow-[3px_3px_0px_#000]',
    inactiveTabClass: 'bg-[#121212] text-neutral-400 border border-neutral-800 hover:text-white',
    icon: Skull,
    description: 'EXTREME HAZARD! Infused with Carolina Reaper and Ghost Pepper extracts. Pure unadulterated inferno for brave souls.',
    notes: ['Carolina Reaper', 'Ghost Pepper', 'Smoked Capsaicin']
  }
];

export default function FlavorSpotlight({ onOpenStoreModal }) {
  const [selectedHeat, setSelectedHeat] = useState(HEAT_LEVELS[2]);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const handleAudioPlay = () => {
    setIsPlayingSound(true);
    setTimeout(() => setIsPlayingSound(false), 2400);
  };

  return (
    <section id="spotlight" className="relative py-16 sm:py-28 bg-[#080808] overflow-hidden border-t border-neutral-900">
      
      {/* Dynamic Ambient Background Glow */}
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[600px] h-[340px] sm:h-[600px] rounded-full blur-[100px] sm:blur-[140px] transition-all duration-700 pointer-events-none ${selectedHeat.glowColor}`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-16 gap-4 sm:gap-6">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 sm:px-4 sm:py-1.5 bg-[#121212] border-2 border-[#E85D04] text-[#FF6B00] text-[10px] sm:text-xs font-black uppercase tracking-widest mb-3 sm:mb-4 shadow-[3px_3px_0px_#000] -rotate-1">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00] fill-[#FF6B00]" />
              FLAGSHIP PRODUCT SPOTLIGHT
            </div>
            <h2 className="text-3xl sm:text-7xl lg:text-8xl font-black uppercase tracking-tight font-display text-white leading-tight">
              PERI PERI <span className="text-gradient-fiery">FLAVOR IGNITION</span>
            </h2>
          </div>
          
          <p className="text-neutral-300 text-xs sm:text-base max-w-md leading-relaxed font-medium">
            Hand-harvested Mozambique chilis, batch-cooked kettle crunch, and zero artificial preservatives. Select a heat tier below to test the thermal profile.
          </p>
        </div>

        {/* Hazard Warning Banner on Apocalyptic */}
        {selectedHeat.id === 'apocalyptic' && (
          <div className="mb-8 animate-rapid-blink bg-[#C1121F] text-white border-2 sm:border-4 border-black p-3 sm:p-4 text-center font-black uppercase tracking-widest flex items-center justify-center gap-2 sm:gap-3 shadow-[6px_6px_0px_#000] clip-notch">
            <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300 shrink-0" />
            <span className="text-[10px] sm:text-base font-display tracking-wider">
              HIGH HEAT HAZARD WARNING: 1,500,000 SHU CAROLINA REAPER INFUSION! CONSUME AT YOUR OWN RISK!
            </span>
            <AlertTriangle className="w-4 h-4 sm:w-6 sm:h-6 text-yellow-300 fill-yellow-300 shrink-0" />
          </div>
        )}

        {/* Compact Heat Tier Selector Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 sm:gap-4 mb-8 sm:mb-12">
          {HEAT_LEVELS.map((level) => {
            const Icon = level.icon;
            const isSelected = selectedHeat.id === level.id;
            return (
              <button
                key={level.id}
                onClick={() => setSelectedHeat(level)}
                className={`py-2.5 px-2.5 sm:py-4 sm:px-4 font-black uppercase text-[10px] sm:text-xs tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer ${
                  isSelected ? level.activeTabClass : level.inactiveTabClass
                }`}
              >
                <Icon className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSelected ? (level.type === 'cool' ? 'text-black' : 'text-white') : 'text-neutral-400'}`} />
                <div className="flex flex-col items-start leading-tight">
                  <span className="font-display text-xs sm:text-sm">{level.name}</span>
                  <span className="text-[8px] sm:text-[9px] font-mono opacity-80">{level.level}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Spotlight Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center">
          
          {/* Pack Display Box */}
          <div className="lg:col-span-5 relative group">
            <div className={`relative bg-[#121212] p-5 sm:p-8 border-2 ${selectedHeat.borderColor} shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] clip-notch flex flex-col items-center justify-center min-h-[340px] sm:min-h-[440px] overflow-hidden`}>
              
              {/* Heat Tag Header */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4 z-20 flex items-center gap-2">
                <span className={`px-2.5 py-0.5 sm:px-3 sm:py-1 text-black font-extrabold text-[9px] sm:text-[10px] uppercase font-mono shadow-[2px_2px_0px_#000] border border-black ${selectedHeat.type === 'cool' ? 'bg-cyan-400' : selectedHeat.type === 'warm' ? 'bg-amber-400' : selectedHeat.type === 'hot' ? 'bg-[#E85D04] text-white' : 'bg-[#C1121F] text-white'}`}>
                  {selectedHeat.type.toUpperCase()} PROFILE
                </span>
                <span className="text-[10px] sm:text-xs font-mono text-neutral-400 font-bold">{selectedHeat.scoville}</span>
              </div>

              {/* Product Pack Image */}
              <div className="relative z-10 my-2 sm:my-4 flex items-center justify-center">
                <img
                  src="/frames/ezgif-frame-120.jpg"
                  alt="Crunch Chips Peri Peri Pack"
                  className="w-48 sm:w-72 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.9)] group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Acoustic Audio Button */}
              <button
                onClick={handleAudioPlay}
                className="mt-3 px-4 py-2 sm:px-5 sm:py-2.5 bg-[#080808] border-2 border-neutral-700 hover:border-[#FF6B00] text-neutral-200 text-[10px] sm:text-xs font-bold font-mono tracking-widest uppercase flex items-center gap-2 sm:gap-3 transition-all cursor-pointer shadow-[3px_3px_0px_#000]"
              >
                {isPlayingSound ? (
                  <>
                    <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF6B00] animate-bounce" />
                    <span className="text-[#FF6B00]">CRUNCH ACTIVE...</span>
                  </>
                ) : (
                  <>
                    <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-neutral-400" />
                    <span>TEST CRUNCH AUDIO</span>
                  </>
                )}
              </button>

              {/* Soundwave Visualizer Bars */}
              {isPlayingSound && (
                <div className="flex items-center gap-1 mt-2.5">
                  {[40, 80, 60, 100, 75, 90, 50, 85, 65, 95, 45, 70].map((height, i) => (
                    <div
                      key={i}
                      className="w-1 bg-[#FF6B00] animate-pulse"
                      style={{
                        height: `${height * 0.2}px`,
                        animationDuration: `${0.3 + (i % 4) * 0.15}s`
                      }}
                    />
                  ))}
                </div>
              )}

            </div>
          </div>

          {/* Flavor Details */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            
            <div className="bg-[#121212] p-5 sm:p-8 border-2 border-neutral-800 shadow-[6px_6px_0px_#000] sm:shadow-[8px_8px_0px_#000] clip-notch mb-5 sm:mb-6">
              
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
                <span className="text-[10px] sm:text-xs font-mono font-bold text-[#FF6B00] uppercase tracking-widest">
                  HEAT LEVEL: {selectedHeat.level}
                </span>
                <span className="text-neutral-600">//</span>
                <span className="text-[10px] sm:text-xs font-mono font-bold text-neutral-400">{selectedHeat.scoville}</span>
              </div>

              <h3 className="text-3xl sm:text-5xl font-black uppercase font-display text-white mb-3 leading-tight">
                {selectedHeat.name}
              </h3>

              <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed mb-5 font-medium">
                {selectedHeat.description}
              </p>

              {/* Dominant Spice Notes */}
              <div className="mb-5">
                <span className="text-[9px] sm:text-[10px] font-mono text-neutral-500 font-extrabold uppercase tracking-widest block mb-2">
                  DOMINANT SPICE PROFILE NOTES
                </span>
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {selectedHeat.notes.map((note) => (
                    <span
                      key={note}
                      className="px-2.5 py-1 bg-[#080808] border border-neutral-700 text-neutral-200 text-[10px] sm:text-xs font-bold font-mono"
                    >
                      ✓ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Scoville Gauge */}
              <div>
                <div className="flex items-center justify-between text-[9px] sm:text-[11px] font-mono font-bold text-neutral-400 mb-1.5">
                  <span>MILD (2.5K)</span>
                  <span>MED (15K)</span>
                  <span>PERI (100K)</span>
                  <span className="text-[#C1121F]">REAPER (1.5M)</span>
                </div>
                
                <div className="w-full h-2.5 sm:h-3 bg-neutral-900 border border-neutral-800 p-0.5 overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${selectedHeat.colorTheme} transition-all duration-500`}
                    style={{
                      width:
                        selectedHeat.id === 'mild'
                          ? '25%'
                          : selectedHeat.id === 'medium'
                          ? '50%'
                          : selectedHeat.id === 'peri-peri'
                          ? '75%'
                          : '100%'
                    }}
                  />
                </div>
              </div>

            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
              <button
                onClick={onOpenStoreModal}
                className="w-full sm:flex-1 btn-brutal-orange py-3.5 sm:py-4 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <div>
                  <span>ORDER PERI PERI SAMPLE PACK</span>
                </div>
              </button>

              <button
                onClick={onOpenStoreModal}
                className="w-full sm:w-auto btn-brutal-outline px-6 py-3.5 sm:py-4 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
              >
                <div>
                  <span>FIND LOCAL STORES</span>
                </div>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
