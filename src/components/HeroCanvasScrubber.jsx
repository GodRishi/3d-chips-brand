import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Flame, ChevronDown, Sparkles, Play, Pause, Zap, FlameKindling } from 'lucide-react';

const TOTAL_FRAMES = 120;

// Helper to construct frame URL
const getFrameUrl = (index) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function HeroCanvasScrubber({ onOpenStoreModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sparkCanvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnFrameRef = useRef(0);
  const dimensionsRef = useRef({ w: 0, h: 0 });
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const animFrameId = useRef(null);
  const sparksRef = useRef([]);

  // Preload frames into memory
  useEffect(() => {
    let isCancelled = false;
    const images = [];
    let loaded = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.src = getFrameUrl(i);
      img.onload = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) {
          setIsLoaded(true);
        }
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => {
      isCancelled = true;
    };
  }, []);

  // Update Canvas Buffer Dimensions ONLY when window dimensions actually change
  const syncCanvasDimensions = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const targetW = Math.round(displayWidth * dpr);
    const targetH = Math.round(displayHeight * dpr);

    // Only update canvas pixel size if dimensions changed to avoid unnecessary context resets
    if (dimensionsRef.current.w !== targetW || dimensionsRef.current.h !== targetH) {
      canvas.width = targetW;
      canvas.height = targetH;
      dimensionsRef.current = { w: targetW, h: targetH };
    }
  }, []);

  // Render Frame onto Canvas with 100% precision for PC and Mobile
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ensure canvas buffer dimensions are in sync
    syncCanvasDimensions();

    // Get requested image or fallback to last drawn or first frame
    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[lastDrawnFrameRef.current] || imagesRef.current[0];
    }

    if (!img || !img.complete || img.naturalWidth === 0) return;

    lastDrawnFrameRef.current = frameIdx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;
    
    // Cover math logic that works on both PC widescreen and Mobile portrait viewports
    const scale = Math.max(displayWidth / imgW, displayHeight / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (displayWidth - drawW) / 2;
    const drawY = (displayHeight - drawH) / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, [syncCanvasDimensions]);

  // Ember sparks floating overlay loop
  useEffect(() => {
    let animationId;
    const sparkCanvas = sparkCanvasRef.current;
    if (!sparkCanvas) return;
    const ctx = sparkCanvas.getContext('2d');

    const handleResize = () => {
      if (sparkCanvas) {
        sparkCanvas.width = window.innerWidth;
        sparkCanvas.height = window.innerHeight;
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const count = window.innerWidth < 768 ? 20 : 45;
    const sparks = [];
    for (let i = 0; i < count; i++) {
      sparks.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        size: Math.random() * 2.5 + 1,
        speedY: Math.random() * 1.2 + 0.4,
        speedX: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.8 + 0.2,
        hue: Math.random() > 0.4 ? 25 : 5
      });
    }

    const renderSparks = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, sparkCanvas.width, sparkCanvas.height);

      sparks.forEach((spark) => {
        spark.y -= spark.speedY;
        spark.x += spark.speedX;

        if (spark.y < -10) {
          spark.y = sparkCanvas.height + 10;
          spark.x = Math.random() * sparkCanvas.width;
        }

        ctx.beginPath();
        ctx.arc(spark.x, spark.y, spark.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${spark.hue}, 100%, 55%, ${spark.opacity})`;
        ctx.shadowBlur = 8;
        ctx.shadowColor = '#FF6B00';
        ctx.fill();
      });

      animationId = requestAnimationFrame(renderSparks);
    };

    renderSparks();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Resize Listener
  useEffect(() => {
    const handleResize = () => {
      syncCanvasDimensions();
      renderFrame(lastDrawnFrameRef.current);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [syncCanvasDimensions, renderFrame]);

  // Scroll Listener & Frame Scrubbing Loop
  useEffect(() => {
    if (!isLoaded || isAutoPlaying) return;

    const handleScroll = () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }

      animFrameId.current = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const totalScrollable = rect.height - window.innerHeight;
        
        if (totalScrollable <= 0) return;

        const currentScroll = Math.min(Math.max(-rect.top, 0), totalScrollable);
        const rawProgress = currentScroll / totalScrollable;
        const clampedProgress = Math.min(Math.max(rawProgress, 0), 1);

        setScrollProgress(clampedProgress);

        const frameIdx = Math.min(
          TOTAL_FRAMES - 1,
          Math.floor(clampedProgress * TOTAL_FRAMES)
        );

        setCurrentFrame(frameIdx);
        renderFrame(frameIdx);
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isLoaded, isAutoPlaying, renderFrame]);

  // Autoplay mode
  useEffect(() => {
    if (!isAutoPlaying || !isLoaded) return;

    let frame = currentFrame;
    const interval = setInterval(() => {
      frame = (frame + 1) % TOTAL_FRAMES;
      setCurrentFrame(frame);
      renderFrame(frame);
      setScrollProgress(frame / TOTAL_FRAMES);
    }, 45);

    return () => clearInterval(interval);
  }, [isAutoPlaying, isLoaded, currentFrame, renderFrame]);

  // Initial Draw when frames load
  useEffect(() => {
    if (isLoaded) {
      syncCanvasDimensions();
      renderFrame(0);
    }
  }, [isLoaded, syncCanvasDimensions, renderFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[360vh] bg-[#0D0D0D]">
      {/* Sticky Viewport Container */}
      <div className="sticky top-0 h-screen h-[100dvh] w-full overflow-hidden flex items-center justify-center">
        
        {/* Preloader Overlay */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-[#0D0D0D] flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 border-[#E85D04]/20 border-t-[#E85D04] animate-spin flex items-center justify-center" />
              <Flame className="w-6 h-6 sm:w-8 sm:h-8 text-[#FF6B00] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
            </div>
            
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-black text-[#F5F1E8] tracking-widest mb-2 font-display uppercase">
              IGNITING THE HEAT...
            </h2>
            <p className="text-[11px] sm:text-xs text-neutral-400 mb-6 font-mono uppercase tracking-widest">
              Preparing Interactive 60FPS Experience
            </p>

            {/* Progress Bar */}
            <div className="w-56 sm:w-64 h-2 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-neutral-800">
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

        {/* HTML5 Canvas Frame Scrubber (Universal PC & Mobile) */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Floating Ember Sparks Canvas Overlay */}
        <canvas
          ref={sparkCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
        />

        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-transparent to-[#0D0D0D]/80 pointer-events-none z-10" />

        {/* Top Control Badge */}
        <div className="absolute top-20 right-4 sm:top-24 sm:right-6 z-30 flex items-center gap-2 sm:gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="glass-panel-orange px-3.5 py-2 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-white hover:border-[#E85D04] transition-all shadow-xl cursor-pointer"
          >
            {isAutoPlaying ? (
              <>
                <Pause className="w-3.5 h-3.5 text-[#E85D04]" />
                <span>Scroll Mode</span>
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 text-[#FF6B00]" />
                <span>Auto Play</span>
              </>
            )}
          </button>
        </div>

        {/* Phase 1 Overlay (0.0 to 0.28 scroll progress) */}
        <div
          className={`absolute z-20 flex flex-col items-center text-center px-4 transition-all duration-700 max-w-4xl ${
            scrollProgress < 0.28
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-y-12 scale-95 pointer-events-none'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full glass-panel-orange text-[#FF6B00] text-[10px] sm:text-xs font-extrabold uppercase tracking-widest mb-4 sm:mb-6 border border-[#E85D04]/40 shadow-2xl">
            <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FF6B00] animate-pulse" />
            Signature Mozambique Chili Flame
          </div>

          <h1 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none font-display mb-3 sm:mb-4 text-white drop-shadow-2xl">
            CRUNCH THAT <br />
            <span className="text-gradient-fiery drop-shadow-[0_10px_20px_rgba(232,93,4,0.5)]">STRIKES BACK.</span>
          </h1>

          <p className="text-xs sm:text-lg md:text-xl text-neutral-200 max-w-xl font-normal leading-relaxed mb-5 sm:mb-8 drop-shadow-md">
            Hand-cut kettle crisps drenched in authentic African Bird's Eye Chili spice. Zero fake extracts. Pure explosive flame.
          </p>

          <div className="flex items-center gap-2.5 text-[10px] sm:text-xs text-neutral-300 font-mono tracking-widest uppercase bg-black/60 px-3.5 py-2 rounded-full border border-white/10">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-ping" />
            Scroll Down To Unleash The Explosion
          </div>
        </div>

        {/* Phase 2 Overlay (0.28 to 0.68 scroll progress) — Universal PC Widescreen + Mobile Layout */}
        <div
          className={`absolute z-20 inset-x-0 top-1/2 -translate-y-1/2 pointer-events-none flex flex-col md:flex-row items-center justify-center md:justify-between px-4 sm:px-8 lg:px-20 gap-4 lg:gap-8 transition-all duration-700 max-w-7xl mx-auto ${
            scrollProgress >= 0.28 && scrollProgress < 0.68
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
          }`}
        >
          {/* Card 1 (Left on PC, Top on Mobile) */}
          <div className="glass-panel-orange p-5 sm:p-7 rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-sm border border-[#E85D04]/40 shadow-[0_0_40px_rgba(232,93,4,0.25)] backdrop-blur-2xl animate-float pointer-events-auto w-full md:w-auto">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="p-2.5 rounded-xl bg-[#E85D04]/30 text-[#FF6B00]">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white uppercase text-sm sm:text-lg tracking-wider font-display">
                Triple Kettle Crunch
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
              Batch-cooked in pure non-GMO sunflower oil at precise high temperatures for an acoustic crunch.
            </p>
          </div>

          {/* Card 2 (Right on PC, Bottom on Mobile) */}
          <div className="glass-panel-red p-5 sm:p-7 rounded-2xl sm:rounded-3xl max-w-xs sm:max-w-sm border border-[#C1121F]/40 shadow-[0_0_40px_rgba(193,18,31,0.25)] backdrop-blur-2xl animate-float-slow pointer-events-auto w-full md:w-auto">
            <div className="flex items-center gap-3 mb-2 sm:mb-3">
              <div className="p-2.5 rounded-xl bg-[#C1121F]/30 text-[#FF6B00]">
                <FlameKindling className="w-5 h-5" />
              </div>
              <h4 className="font-extrabold text-white uppercase text-sm sm:text-lg tracking-wider font-display">
                Bird's Eye Chili
              </h4>
            </div>
            <p className="text-xs sm:text-sm text-neutral-200 leading-relaxed">
              Slow-roasted wild African chilis blended with sun-ripened lemons and coarse Atlantic sea salt.
            </p>
          </div>
        </div>

        {/* Phase 3 Main Impact Overlay (0.68 to 1.0 scroll progress) */}
        <div
          className={`absolute z-20 flex flex-col items-center text-center px-4 transition-all duration-700 max-w-4xl ${
            scrollProgress >= 0.68
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full glass-panel-gold text-[#C9A227] text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-3 sm:mb-4 border border-[#C9A227]/40 shadow-2xl">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C9A227]" />
            Pure Handcrafted Perfection
          </div>

          <h2 className="text-4xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none font-display mb-3 sm:mb-6 text-white drop-shadow-2xl">
            BOLD. SPICY. <br />
            <span className="text-gradient-fiery drop-shadow-[0_15px_35px_rgba(232,93,4,0.6)]">UNAPOLOGETIC.</span>
          </h2>

          <p className="text-xs sm:text-xl md:text-2xl text-neutral-200 max-w-2xl font-normal leading-relaxed mb-5 sm:mb-8">
            No preservatives. No artificial junk. Just raw potato power packed with intense African fire.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto">
            <a
              href="#spotlight"
              className="w-full sm:w-auto px-7 py-3.5 sm:px-9 sm:py-4.5 rounded-2xl bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C1121F] text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase shadow-[0_10px_30px_rgba(232,93,4,0.5)] hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
            >
              <span>EXPLORE FLAVOR NOTES</span>
              <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-y-1 transition-transform" />
            </a>

            <button
              onClick={onOpenStoreModal}
              className="w-full sm:w-auto px-7 py-3.5 sm:px-9 sm:py-4.5 rounded-2xl glass-panel text-white font-extrabold text-xs sm:text-sm tracking-widest uppercase border border-neutral-700 hover:border-[#E85D04] hover:bg-[#E85D04]/20 transition-all duration-300 cursor-pointer shadow-xl"
            >
              FIND NEAREST STORE
            </button>
          </div>
        </div>

        {/* Scroll Indicator Prompt */}
        <div
          className={`absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-1 transition-opacity duration-500 pointer-events-none ${
            scrollProgress > 0.85 ? 'opacity-0' : 'opacity-80'
          }`}
        >
          <span className="text-[9px] sm:text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
            SCROLL TO IGNITE
          </span>
          <div className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border-2 border-neutral-600 flex items-start justify-center p-1">
            <div className="w-1 h-2 sm:w-1.5 sm:h-2.5 bg-[#E85D04] rounded-full animate-bounce mt-1" />
          </div>
        </div>

        {/* Scroll Progress Bar at Bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-neutral-950 z-30">
          <div
            className="h-full bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C9A227] transition-all duration-75 shadow-[0_0_15px_#FF6B00]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
}
