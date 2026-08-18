import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Flame, ChevronDown, Play, Pause, Zap, FlameKindling, MapPin, Award } from 'lucide-react';

const TOTAL_FRAMES = 120;

const getFrameUrl = (index) => {
  const paddedIndex = String(index + 1).padStart(3, '0');
  return `/frames/ezgif-frame-${paddedIndex}.jpg`;
};

export default function DesktopHeroScrubber({ onOpenStoreModal }) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const sparkCanvasRef = useRef(null);
  const imagesRef = useRef([]);
  const lastDrawnFrameRef = useRef(0);
  
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);

  const animFrameId = useRef(null);

  // Preload frames
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
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      img.onerror = () => {
        if (isCancelled) return;
        loaded++;
        setLoadedCount(loaded);
        if (loaded === TOTAL_FRAMES) setIsLoaded(true);
      };
      images.push(img);
    }
    imagesRef.current = images;

    return () => { isCancelled = true; };
  }, []);

  // Desktop Canvas Frame Rendering
  const renderFrame = useCallback((frameIdx) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let img = imagesRef.current[frameIdx];
    if (!img || !img.complete || img.naturalWidth === 0) {
      img = imagesRef.current[lastDrawnFrameRef.current] || imagesRef.current[0];
    }
    if (!img || !img.complete || img.naturalWidth === 0) return;

    lastDrawnFrameRef.current = frameIdx;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== Math.round(displayWidth * dpr) || canvas.height !== Math.round(displayHeight * dpr)) {
      canvas.width = Math.round(displayWidth * dpr);
      canvas.height = Math.round(displayHeight * dpr);
    }

    ctx.save();
    ctx.scale(dpr, dpr);

    const imgW = img.naturalWidth || 1920;
    const imgH = img.naturalHeight || 1080;
    
    const scale = Math.max(displayWidth / imgW, displayHeight / imgH);
    const drawW = imgW * scale;
    const drawH = imgH * scale;
    const drawX = (displayWidth - drawW) / 2;
    const drawY = (displayHeight - drawH) / 2;

    ctx.clearRect(0, 0, displayWidth, displayHeight);
    ctx.drawImage(img, drawX, drawY, drawW, drawH);
    ctx.restore();
  }, []);

  // Ember sparks overlay for Desktop PC
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

    const sparks = [];
    for (let i = 0; i < 45; i++) {
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

  // Scroll Listener for Desktop
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
        renderFrame(frameIdx);
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

  // Initial draw
  useEffect(() => {
    if (isLoaded) renderFrame(0);
  }, [isLoaded, renderFrame]);

  return (
    <div ref={containerRef} className="relative w-full h-[360vh] bg-[#080808]">
      <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
        
        {/* Preloader */}
        {!isLoaded && (
          <div className="absolute inset-0 z-50 bg-[#080808] flex flex-col items-center justify-center p-6 text-center">
            <div className="relative mb-6">
              <div className="w-20 h-20 rounded-full border-4 border-[#E85D04]/20 border-t-[#E85D04] animate-spin flex items-center justify-center" />
              <Flame className="w-8 h-8 text-[#FF6B00] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce" />
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-[#F5F1E8] tracking-widest mb-2 font-display uppercase">
              IGNITING THE HEAT...
            </h2>
            <p className="text-xs text-neutral-400 mb-6 font-mono uppercase tracking-widest">
              Preparing Interactive 60FPS Desktop Experience
            </p>
            <div className="w-64 h-2 bg-neutral-900 rounded-full overflow-hidden p-0.5 border border-neutral-800">
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

        {/* Desktop Canvas */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none transition-opacity duration-500"
          style={{ opacity: isLoaded ? 1 : 0 }}
        />

        {/* Floating Sparks */}
        <canvas
          ref={sparkCanvasRef}
          className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70"
        />

        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/85 pointer-events-none z-10" />

        {/* Top Control Badge */}
        <div className="absolute top-24 right-8 z-30 flex items-center gap-3">
          <button
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="btn-brutal-outline px-4 py-2 text-xs font-extrabold uppercase tracking-wider flex items-center gap-2"
          >
            <div>
              {isAutoPlaying ? (
                <span className="flex items-center gap-2">
                  <Pause className="w-3.5 h-3.5 text-[#E85D04]" />
                  <span>SCROLL MODE</span>
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  <Play className="w-3.5 h-3.5 text-[#FF6B00]" />
                  <span>AUTO PLAY</span>
                </span>
              )}
            </div>
          </button>
        </div>

        {/* Phase 1 Desktop Overlay */}
        <div
          className={`absolute z-20 flex flex-col items-center text-center px-4 transition-all duration-700 max-w-4xl ${
            scrollProgress < 0.28
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 -translate-y-12 scale-95 pointer-events-none'
          }`}
        >
          <div className="badge-warning-tape px-5 py-1.5 text-xs font-black uppercase mb-6 flex items-center gap-2">
            <Flame className="w-4 h-4 text-black fill-black" />
            <span>WARNING: MOZAMBIQUE BIRD'S EYE FLAME</span>
          </div>

          <h1 className="text-8xl lg:text-9xl font-black tracking-tight uppercase leading-none font-display mb-4 text-white drop-shadow-2xl">
            CRUNCH THAT <br />
            <span className="text-gradient-fiery drop-shadow-[0_10px_25px_rgba(232,93,4,0.6)]">STRIKES BACK.</span>
          </h1>

          <p className="text-xl text-neutral-200 max-w-xl font-normal leading-relaxed mb-8 drop-shadow-md">
            Hand-cut kettle crisps drenched in authentic African Bird's Eye Chili spice. Zero fake extracts. Pure explosive flame.
          </p>

          <div className="flex items-center gap-3 text-xs text-neutral-300 font-mono tracking-widest uppercase bg-[#121212] px-5 py-2.5 border-2 border-black shadow-[4px_4px_0px_#000]">
            <span className="w-2.5 h-2.5 bg-[#FF6B00] animate-ping" />
            <span>SCROLL DOWN TO IGNITE THE FLAME</span>
          </div>
        </div>

        {/* Phase 2 Desktop Widescreen Overlay (Tactile Slanted Cards) */}
        <div
          className={`absolute z-20 inset-0 pointer-events-none flex items-center justify-between px-12 lg:px-24 transition-all duration-700 ${
            scrollProgress >= 0.28 && scrollProgress < 0.68
              ? 'opacity-100 scale-100'
              : 'opacity-0 scale-95'
          }`}
        >
          {/* Left Widescreen Card */}
          <div className="bg-[#121212] p-7 rounded-none max-w-sm border-2 border-[#E85D04] shadow-[8px_8px_0px_#000] backdrop-blur-2xl animate-float pointer-events-auto clip-notch">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-[#E85D04] text-black border border-black font-bold">
                <Zap className="w-5 h-5 text-black" />
              </div>
              <h4 className="font-black text-white uppercase text-xl tracking-wider font-display">
                TRIPLE KETTLE CRUNCH
              </h4>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-medium">
              Batch-cooked in pure non-GMO sunflower oil at precise high temperatures for an acoustic crunch.
            </p>
          </div>

          {/* Right Widescreen Card */}
          <div className="bg-[#121212] p-7 rounded-none max-w-sm border-2 border-[#C1121F] shadow-[8px_8px_0px_#000] backdrop-blur-2xl animate-float-slow pointer-events-auto clip-notch">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2.5 bg-[#C1121F] text-white border border-black font-bold">
                <FlameKindling className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-black text-white uppercase text-lg tracking-wider font-display">
                BIRD'S EYE CHILI
              </h4>
            </div>
            <p className="text-sm text-neutral-300 leading-relaxed font-medium">
              Slow-roasted wild African chilis blended with sun-ripened lemons and coarse Atlantic sea salt.
            </p>
          </div>
        </div>

        {/* Phase 3 Desktop Impact Overlay */}
        <div
          className={`absolute z-20 flex flex-col items-center text-center px-4 transition-all duration-700 max-w-4xl ${
            scrollProgress >= 0.68
              ? 'opacity-100 translate-y-0 scale-100 pointer-events-auto'
              : 'opacity-0 translate-y-12 scale-95 pointer-events-none'
          }`}
        >
          <div className="badge-gold-stamp px-5 py-1.5 text-xs font-black uppercase mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-black" />
            <span>100% UNAPOLOGETIC HEAT GUARANTEE</span>
          </div>

          <h2 className="text-8xl lg:text-9xl font-black uppercase tracking-tight leading-none font-display mb-6 text-white drop-shadow-2xl">
            BOLD. SPICY. <br />
            <span className="text-gradient-fiery drop-shadow-[0_15px_35px_rgba(232,93,4,0.6)]">UNAPOLOGETIC.</span>
          </h2>

          <p className="text-2xl text-neutral-200 max-w-2xl font-normal leading-relaxed mb-8">
            No preservatives. No artificial junk. Just raw potato power packed with intense African fire.
          </p>

          <div className="flex items-center gap-5">
            <a
              href="#spotlight"
              className="btn-brutal-orange px-9 py-4.5 text-sm font-extrabold uppercase tracking-widest flex items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <span>EXPLORE FLAVOR NOTES</span>
                <ChevronDown className="w-5 h-5" />
              </div>
            </a>

            <button
              onClick={onOpenStoreModal}
              className="btn-brutal-outline px-9 py-4.5 text-sm font-extrabold uppercase tracking-widest flex items-center gap-3"
            >
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#C9A227]" />
                <span>FIND NEAREST STORE</span>
              </div>
            </button>
          </div>
        </div>

        {/* Scroll Prompt */}
        <div
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 transition-opacity duration-500 pointer-events-none ${
            scrollProgress > 0.85 ? 'opacity-0' : 'opacity-80'
          }`}
        >
          <span className="text-[10px] font-mono text-neutral-400 tracking-widest uppercase">
            SCROLL TO SCRUB ANIMATION
          </span>
          <div className="w-6 h-10 rounded-none border-2 border-neutral-600 flex items-start justify-center p-1">
            <div className="w-1.5 h-2.5 bg-[#E85D04] animate-bounce mt-1" />
          </div>
        </div>

        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-2 bg-[#000] z-30 border-t border-neutral-800">
          <div
            className="h-full bg-gradient-to-r from-[#E85D04] via-[#FF6B00] to-[#C9A227] transition-all duration-75 shadow-[0_0_15px_#FF6B00]"
            style={{ width: `${scrollProgress * 100}%` }}
          />
        </div>

      </div>
    </div>
  );
}
