import React, { useEffect, useRef, useState } from 'react';
import { Flame, ChevronDown, Play, Pause, Zap, FlameKindling, MapPin, Award } from 'lucide-react';

const TOTAL_FRAMES = 120;

const getFrameUrl = (index) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function MobileHeroScrubber({ onOpenStoreModal }) {
  const containerRef = useRef(null);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const animFrameId = useRef(null);

  // Preload all frames
  useEffect(() => {
    let isCancelled = false;
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
    }

    return () => { isCancelled = true; };
  }, []);

  // Scroll listener for Mobile Frame Scrubber
  useEffect(() => {
    if (!isLoaded || isAutoPlaying) return;

    const handleScroll = () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);

      animFrameId.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        if (totalScrollable <= 0) return;

        const currentScroll = Math.min(Math.max(-rect.top, 0), totalScrollable);
        const rawProgress = currentScroll / totalScrollable;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

        setScrollProgress(clampedProgress);
        const frameIdx = Math.min(TOTAL_FRAMES - 1, Math.floor(clampedProgress * TOTAL_FRAMES));
        setCurrentFrame(frameIdx);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isLoaded, isAutoPlaying]);

  // Autoplay
  useEffect(() => {
    if (!isAutoPlaying || !isLoaded) return;
    let frame = currentFrame;
    const interval = setInterval(() => {
      frame = (frame + 1) % TOTAL_FRAMES;
      setCurrentFrame(frame);
      setScrollProgress(frame / TOTAL_FRAMES);
    }, 45);
    return () => clearInterval(interval);
  }, [isAutoPlaying, isLoaded, currentFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[320vh] bg-[#080808]">
      <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Preloader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 rounded-full border-4 border-[#E85D04]/20 border-t-[#E85D04] animate-spin flex items-center justify-center" />
              <Flame className="w-6 h-6 text-[#FF6B00] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
            </div>
            <h2 className="text-2xl font-black text-[#F5F1E8] tracking-widest mb-2 font-display uppercase">
              IGNITING THE HEAT...
            </h2>
            <p className="text-[11px] text-neutral-400 mb-6 font-mono uppercase tracking-widest">
              Preparing Mobile Experience
            </p>
            <div className="w-56 h-2 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-neutral-800">
              <div
                className="h-full bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C9A227] rounded-full transition-all duration-150"
                style={{ width: `${(loadedCount / TOTAL_FRAMES) * 100}%` }}
              />
            </div>
            <span className="mt-3 text-xs font-mono text-[#E85D04] font-bold tracking-widest">
              {Math.round((loadedCount / TOTAL_FRAMES) * 100)}%
            </span>
          </div>
        )}

        {/* NATIVE HTML IMAGE FRAME SCRUBBER FOR MOBILE */}
        <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#080808] flex items-center justify-center">
          <img
            src={getFrameUrl(currentFrame)}
            alt="Crunch Chips Mobile Animation Frame"
            className="w-full h-full object-cover select-none pointer-events-none transition-opacity duration-300"
            style={{ opacity: isLoaded ? 1 : 0 }}
          />
        </div>

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/85 pointer-events-none z-10" />

        {/* Top Control Button */}
        <div className="absolute top-20 right-4 z-30 flex items-center gap-2">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="btn-brutal-outline px-3.5 py-1.5 text-[11px] font-extrabold uppercase tracking-wider flex items-center gap-1.5"
          >
            <div>
              {isAutoPlaying ? (
                <span className="flex items-center gap-1.5">
                  <Pause className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>SCROLL MODE</span>
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  <Play className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>AUTO PLAY</span>
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Phase 1 Mobile Overlay */}
        <div
          className={`absolute z-20 flex flex-col items-center text-center px-4 transition-all duration-700 max-w-sm ${
            scrollProgress < 0.28
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-y-12 scale-95 pointer-events-none'
          }`}
        >
          <div className="badge-warning-tape px-3.5 py-1 text-[10px] font-black uppercase mb-4 flex items-center gap-1.5">
            <Flame className="w-3.5 h-3.5 text-black fill-black" />
            <span>MOZAMBIQUE BIRD'S EYE FLAME</span>
          </div>

          <h1 className="text-4xl sm:text-5xl font-black tracking-tight uppercase leading-none font-display mb-3 text-white drop-shadow-2xl">
            CRUNCH THAT <br />
            <span className="text-gradient-fiery drop-shadow-[0_10px_20px_rgba(232,93,4,0.5)]">STRIKES BACK.</span>
          </h1>

          <p className="text-xs text-neutral-200 leading-relaxed mb-5 drop-shadow-md">
            Hand-cut kettle crisps drenched in authentic African Bird's Eye Chili spice. Zero fake extracts. Pure explosive flame.
          </p>

          <div className="flex items-center gap-2 text-[10px] text-neutral-300 font-mono tracking-widest uppercase bg-[#121212] px-3.5 py-2 border-2 border-black shadow-[3px_3px_0px_#000]">
            <span className="w-2 h-2 bg-[#FF6B00] animate-ping" />
            <span>SCROLL DOWN TO IGNITE</span>
          </div>
        </div>

        {/* Phase 2 Mobile Overlay */}
        <div
          className={`absolute z-20 inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col items-center justify-center px-4 gap-3 transition-all duration-700 max-w-sm mx-auto ${
            scrollProgress >= 0.28 && scrollProgress < 0.68
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
          }`}
        >
          <div className="bg-[#121212] p-4 rounded-none border-2 border-[#E85D04] shadow-[6px_6px_0px_#000] backdrop-blur-2xl animate-float pointer-events-auto w-full clip-notch">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-1.5 bg-[#E85D04] text-black border border-black font-bold">
                <Zap className="w-4 h-4 text-black" />
              </div>
              <h4 className="font-black text-white uppercase text-xs tracking-wider font-display">
                TRIPLE KETTLE CRUNCH
              </h4>
            </div>
            <p className="text-[10px] text-neutral-300 leading-relaxed">
              Batch-cooked in pure non-GMO sunflower oil at high temperatures for an acoustic crunch.
            </p>
          </div>

          <div className="bg-[#121212] p-4 rounded-none border-2 border-[#C1121F] shadow-[6px_6px_0px_#000] backdrop-blur-2xl animate-float-slow pointer-events-auto w-full clip-notch">
            <div className="flex items-center gap-2.5 mb-1.5">
              <div className="p-1.5 bg-[#C1121F] text-white border border-black font-bold">
                <FlameKindling className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-black text-white uppercase text-xs tracking-wider font-display">
                BIRD'S EYE CHILI
              </h4>
            </div>
            <p className="text-[10px] text-neutral-300 leading-relaxed">
              Slow-roasted wild African chilis blended with sun-ripened lemons and coarse Atlantic sea salt.
            </p>
          </div>
        </div>

        {/* Phase 3 Mobile Overlay */}
        <div
          className={`absolute z-20 flex flex-col items-center text-center px-4 transition-all duration-700 max-w-sm ${
            scrollProgress >= 0.68
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
          }`}
        >
          <div className="badge-gold-stamp px-3.5 py-1 text-[10px] font-black uppercase mb-3 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-black" />
            <span>UNAPOLOGETIC HEAT GUARANTEE</span>
          </div>

          <h2 className="text-4xl font-black uppercase tracking-tight leading-none font-display mb-3 text-white drop-shadow-2xl">
            BOLD. SPICY. <br />
            <span className="text-gradient-fiery drop-shadow-[0_15px_35px_rgba(232,93,4,0.6)]">UNAPOLOGETIC.</span>
          </h2>

          <p className="text-xs text-neutral-200 leading-relaxed mb-5">
            No preservatives. No artificial junk. Just raw potato power packed with intense African fire.
          </p>

          <div className="flex flex-col items-center gap-3 w-full">
            <a
              href="#spotlight"
              className="w-full btn-brutal-orange py-3.5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <div className="flex items-center gap-2">
                <span>EXPLORE FLAVOR NOTES</span>
                <ChevronDown className="w-4 h-4" />
              </div>
            </a>

            <button
              onClick={onOpenStoreModal}
              className="w-full btn-brutal-outline py-3.5 text-xs font-extrabold uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-[#C9A227]" />
                <span>FIND NEAREST STORE</span>
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          className={`absolute bottom-5 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none ${
            scrollProgress > 0.85 ? 'opacity-0' : 'opacity-80'
          }`}
        >
          <span className="text-[9px] font-mono text-neutral-400 tracking-widest uppercase">
            SCROLL TO IGNITE
          </span>
          <div className="w-5 h-8 rounded-none border-2 border-neutral-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 bg-[#E85D04] animate-bounce mt-1" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-[#000] z-30 border-t border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C9A227] transition-all duration-75 shadow-[0_0_15px_#FF6B00]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
}
