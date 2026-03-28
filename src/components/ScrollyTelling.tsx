"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Inter } from "next/font/google";
import { useScroll, useMotionValueEvent, useTransform, motion } from "framer-motion";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const padZero = (num: number) => num.toString().padStart(3, "0");

const ScrollyTelling = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const images1Ref = useRef<HTMLImageElement[]>([]);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [paneProgress, setPaneProgress] = useState(0);

  const textPaneRef = useRef<HTMLDivElement>(null);

  // PRELOAD LOGIC (Remains the same as before, ensuring arrays are pre-allocated)
  useEffect(() => {
    let loadedCount = 0;
    const framesPerSection = 240;
    const totalImages = framesPerSection * 2;
    images1Ref.current = new Array(framesPerSection);
    images2Ref.current = new Array(framesPerSection);

    const loadImages = (section: number, imagesRef: React.MutableRefObject<HTMLImageElement[]>) => {
      for (let i = 1; i <= framesPerSection; i++) {
        const img = new Image();
        img.src = `/animations/section${section}/ezgif-frame-${padZero(i)}.jpg`;
        const action = () => {
          loadedCount++;
          setLoadProgress(Math.floor((loadedCount / totalImages) * 100));
          if (loadedCount === totalImages) {
            setImagesLoaded(true);
            drawFrame(images1Ref.current[0]); 
          }
        };
        img.onload = action;
        img.onerror = action; 
        imagesRef.current[i - 1] = img;
      }
    };
    loadImages(1, images1Ref);
    loadImages(2, images2Ref);
  }, []);

  const drawFrame = useCallback((img: HTMLImageElement | undefined) => {
    if (!img || !canvasRef.current || !img.complete) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    
    const parent = canvas.parentElement;
    if (parent) {
      const dpr = window.devicePixelRatio || 1;
      const targetWidth = Math.floor(parent.clientWidth * dpr);
      const targetHeight = Math.floor(parent.clientHeight * dpr);
      if (canvas.width !== targetWidth || canvas.height !== targetHeight) {
        canvas.width = targetWidth;
        canvas.height = targetHeight;
        ctx.resetTransform();
        ctx.scale(dpr, dpr);
      }
    }

    const dpr = window.devicePixelRatio || 1;
    const logicalWidth = canvas.width / dpr;
    const logicalHeight = canvas.height / dpr;
    const canvasRatio = logicalWidth / logicalHeight;
    const imgRatio = img.width / img.height || 16/9;
    
    let drawWidth = logicalWidth;
    let drawHeight = logicalHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasRatio > imgRatio) {
      drawHeight = logicalWidth / imgRatio;
      offsetY = (logicalHeight - drawHeight) / 2;
    } else {
      drawWidth = logicalHeight * imgRatio;
      offsetX = (logicalWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, logicalWidth, logicalHeight);
    ctx.drawImage(img, Math.floor(offsetX), Math.floor(offsetY), Math.floor(drawWidth), Math.floor(drawHeight));
  }, []);

  // Split-Pane Scroll Listener
  const handlePaneScroll = () => {
    if (!textPaneRef.current || !imagesLoaded) return;
    const { scrollTop, scrollHeight, clientHeight } = textPaneRef.current;
    const progress = scrollTop / (scrollHeight - clientHeight);
    setPaneProgress(progress);

    const totalFrames = 480;
    const frameIndex = Math.min(totalFrames - 1, Math.floor(progress * totalFrames));
    
    let targetImg: HTMLImageElement | undefined;
    if (frameIndex < 240) {
      targetImg = images1Ref.current[frameIndex];
    } else {
      targetImg = images2Ref.current[frameIndex - 240];
    }
    if (targetImg) drawFrame(targetImg);
  };

  useEffect(() => {
    const handleResize = () => {
      if (imagesLoaded) {
        const totalFrames = 480;
        const frameIndex = Math.min(totalFrames - 1, Math.floor(paneProgress * totalFrames));
        const img = frameIndex < 240 ? images1Ref.current[frameIndex] : images2Ref.current[frameIndex - 240];
        drawFrame(img);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [imagesLoaded, drawFrame, paneProgress]);

  return (
    <div className="relative w-full h-[100svh] bg-black flex flex-col lg:flex-row overflow-hidden shadow-2xl">
      
      {/* Canvas Pane - 50% Desktop, 50% Mobile */}
      <div className="w-full lg:w-1/2 h-1/2 lg:h-full relative overflow-hidden bg-black border-b lg:border-b-0 lg:border-r border-white/5">
        <canvas ref={canvasRef} className="w-full h-full object-cover" />
        
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50" />

        {!imagesLoaded && (
          <div className={`${inter.className} absolute inset-0 flex flex-col items-center justify-center text-white/50 font-medium tracking-widest text-xs uppercase bg-black z-50`}>
            <span>Engineering Experience...</span>
            <span className="mt-4 text-[10px] text-white/20 tracking-[0.2em]">{loadProgress}%</span>
          </div>
        )}
      </div>

      {/* Text Pane - 50% Desktop, 50% Mobile - Independent Scrolling */}
      <div 
        ref={textPaneRef}
        onScroll={handlePaneScroll}
        className="w-full lg:w-1/2 h-1/2 lg:h-full overflow-y-auto overflow-x-hidden scroll-smooth bg-[#0a0a0a] selection:bg-white selection:text-black"
      >
        <div className="px-8 md:px-20 py-24 lg:py-48 flex flex-col gap-32">
          
          <section className="min-h-[60vh] flex flex-col justify-center">
            <h2 className={`${inter.className} text-5xl md:text-7xl text-white font-bold tracking-tighter leading-tight uppercase`}>
              MAPPED. <br />
              <span className="text-white/40">METERED.</span>
            </h2>
            <p className={`${inter.className} text-white/50 text-xl mt-8 font-light max-w-xl leading-relaxed`}>
              From the classical strings of the <span className="text-white/90">Veena</span> to the modern electric <span className="text-white/90">Guitar</span>, we map every resonance in our <span className="text-white/90">Chennai workshop</span>. Precision measured, locally engineered for the world&apos;s finest artists.
            </p>
          </section>

          <section className="min-h-[60vh] flex flex-col justify-center">
            <h2 className={`${inter.className} text-5xl md:text-7xl text-white font-bold tracking-tighter leading-tight uppercase`}>
              BENT. <br />
              <span className="text-white/40">WELDED.</span>
            </h2>
            <p className={`${inter.className} text-white/50 text-xl mt-8 font-light max-w-xl leading-relaxed`}>
              Tough enough for the <span className="text-white/90">Violin</span>, sturdy enough for the <span className="text-white/90">Organ</span>. Our hand-welded steel curves are forged in <span className="text-white/90">Tamil Nadu</span> to protect your legacy with absolute zero compromise in stability.
            </p>
          </section>

          <section className="min-h-[60vh] flex flex-col justify-center">
            <h2 className={`${inter.className} text-5xl md:text-7xl text-white font-bold tracking-tighter leading-tight uppercase`}>
              SILENT. <br />
              <span className="text-white/40">SECURE.</span>
            </h2>
            <p className={`${inter.className} text-white/50 text-xl mt-8 font-light max-w-xl leading-relaxed`}>
              Stage-ready for the world, built for the <span className="text-white/90">Chennai heat</span>. Vibration-free padding that keeps your performance pure and your instrument anchored, even on the tightest stages.
            </p>
          </section>

          <section className="min-h-[60vh] flex flex-col justify-center pb-24">
            <h2 className={`${inter.className} text-5xl md:text-7xl text-white font-bold tracking-tighter leading-tight uppercase`}>
              THE FAIR DEAL. <br />
              <span className="text-white/40">GUARANTEED.</span>
            </h2>
            <p className={`${inter.className} text-white/50 text-xl mt-8 font-light max-w-xl leading-relaxed`}>
              A legacy of <span className="text-white/90">Chennai craftsmanship</span>. We don&apos;t just build stands; we build trust for the instruments that define your art. That is the <span className="text-white/90">Fair Deal Industries</span> promise.
            </p>
            <div className="mt-12 flex items-center gap-4">
              <div className="h-px flex-1 bg-white/10" />
              <span className="text-[10px] text-white/30 uppercase tracking-[0.4em]">Scroll to Explore Products</span>
              <div className="h-px flex-1 bg-white/10" />
            </div>
          </section>

        </div>
      </div>
      
    </div>
  );
};

export default ScrollyTelling;
