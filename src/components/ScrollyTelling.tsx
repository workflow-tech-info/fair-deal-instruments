"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const padZero = (num: number) => num.toString().padStart(3, "0");

/* ── Text phases configuration ── */
const PHASES = [
  { title: "MAPPED.", sub: "The Blueprint", desc: "Every curve of your instrument — veena, guitar, violin — digitally scanned and mapped in our Chennai workshop." },
  { title: "METERED.", sub: "Precision Engineering", desc: "Tolerances measured to the millimetre. Each stand is dimensionally locked to cradle your instrument with zero play." },
  { title: "CRAFTED.", sub: "Handcrafted in Chennai", desc: "Born in Tamil Nadu steel mills, shaped by artisan hands. Fair Deal stands carry decades of Chennai craftsmanship in every weld." },
  { title: "BENT.", sub: "Forging Strength", desc: "Cold-rolled steel, heated and bent into load-bearing curves. Engineered to hold the heaviest organs and keyboards without flex." },
  { title: "WELDED.", sub: "Structural Integrity", desc: "MIG-welded joints, ground smooth, powder-coated for life. Each seam is tested beyond stage-abuse thresholds." },
  { title: "THE FAIR\nDEAL.", sub: "The Promise", desc: "From Chennai\u2019s workshop floor to the world\u2019s greatest stages. We don\u2019t just build stands \u2014 we build trust for the instruments that define your art." },
];

const ScrollyTelling = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const images1Ref = useRef<HTMLImageElement[]>([]);
  const images2Ref = useRef<HTMLImageElement[]>([]);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [phaseOpacity, setPhaseOpacity] = useState(1);
  const rafRef = useRef<number>(0);

  /* ═══ PRELOAD 480 FRAMES ═══ */
  useEffect(() => {
    let loaded = 0;
    const PER = 240;
    const TOTAL = PER * 2;
    images1Ref.current = new Array(PER);
    images2Ref.current = new Array(PER);

    const load = (sec: number, arr: React.MutableRefObject<HTMLImageElement[]>) => {
      for (let i = 1; i <= PER; i++) {
        const img = new Image();
        img.src = `/animations/section${sec}/ezgif-frame-${padZero(i)}.jpg`;
        const done = () => {
          loaded++;
          setLoadProgress(Math.floor((loaded / TOTAL) * 100));
          if (loaded === TOTAL) {
            setImagesLoaded(true);
          }
        };
        img.onload = done;
        img.onerror = done;
        arr.current[i - 1] = img;
      }
    };
    load(1, images1Ref);
    load(2, images2Ref);
  }, []);

  /* ═══ DRAW FRAME (Retina-aware cover-fit) ═══ */
  const paintFrame = useCallback((img: HTMLImageElement | undefined) => {
    if (!img || !canvasRef.current || !img.complete || !img.naturalWidth) return;
    const cvs = canvasRef.current;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = cvs.getBoundingClientRect();
    const pw = Math.floor(rect.width * dpr);
    const ph = Math.floor(rect.height * dpr);

    if (cvs.width !== pw || cvs.height !== ph) {
      cvs.width = pw;
      cvs.height = ph;
    }

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";

    const lw = rect.width;
    const lh = rect.height;
    const cr = lw / lh;
    const ir = img.naturalWidth / img.naturalHeight;
    let dw = lw, dh = lh, dx = 0, dy = 0;
    if (cr > ir) { dh = lw / ir; dy = (lh - dh) / 2; }
    else { dw = lh * ir; dx = (lw - dw) / 2; }

    ctx.clearRect(0, 0, lw, lh);
    ctx.drawImage(img, Math.floor(dx), Math.floor(dy), Math.floor(dw), Math.floor(dh));
  }, []);

  /* ═══ SCROLL HANDLER ═══ */
  useEffect(() => {
    if (!imagesLoaded) return;
    paintFrame(images1Ref.current[0]);

    const onScroll = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const el = containerRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const containerHeight = el.offsetHeight;
        const viewportHeight = window.innerHeight;
        const scrollableDistance = containerHeight - viewportHeight;
        if (scrollableDistance <= 0) return;

        const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));

        // Drive frame (0-479)
        const frame = Math.min(479, Math.floor(progress * 480));
        const img = frame < 240
          ? images1Ref.current[frame]
          : images2Ref.current[frame - 240];
        if (img) paintFrame(img);

        // Drive text phase (6 phases across 0→1)
        const phaseFloat = progress * 6;
        const phase = Math.min(5, Math.floor(phaseFloat));
        const phaseProgress = phaseFloat - phase;
        setCurrentPhase(phase);

        // Fade: in 0→0.15, hold 0.15→0.75, out 0.75→1.0
        let opacity = 1;
        if (phaseProgress < 0.15) opacity = phaseProgress / 0.15;
        else if (phaseProgress > 0.75) opacity = 1 - (phaseProgress - 0.75) / 0.25;
        setPhaseOpacity(opacity);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [imagesLoaded, paintFrame]);

  /* ═══ RESIZE ═══ */
  useEffect(() => {
    const fn = () => { if (imagesLoaded) paintFrame(images1Ref.current[0]); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, [imagesLoaded, paintFrame]);

  const phase = PHASES[currentPhase] || PHASES[0];

  /* ═══════════ RENDER ═══════════ */
  return (
    <section
      ref={containerRef}
      className="relative w-full bg-black"
      style={{ height: "600vh" }}
    >
      {/* Sticky full-screen viewport — 100svh for mobile browser bar compat */}
      <div
        className="sticky top-0 left-0 w-full overflow-hidden"
        style={{ height: "100svh" }}
      >

        {/* Canvas background — fills viewport */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{ display: "block", zIndex: 0 }}
        />

        {/* Cinematic vignette — vertical */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to top, rgba(0,0,0,0.9) 0%, transparent 45%, rgba(0,0,0,0.45) 100%)",
          }}
        />
        {/* Cinematic vignette — horizontal (left side for text readability) */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            zIndex: 2,
            background: "linear-gradient(to right, rgba(0,0,0,0.65) 0%, transparent 60%)",
          }}
        />

        {/* ── Text overlay ── */}
        {/* 
          Desktop: vertically centered (items-center)
          Mobile: positioned toward bottom-third to avoid navbar + leave room for instrument visual 
        */}
        <div
          className="absolute inset-0 flex items-end sm:items-center pointer-events-none"
          style={{
            zIndex: 10,
            paddingLeft: "clamp(20px, 6vw, 10%)",
            paddingRight: "clamp(20px, 6vw, 10%)",
            paddingBottom: "clamp(60px, 12vh, 120px)",
          }}
        >
          <div
            style={{
              maxWidth: "640px",
              width: "100%",
              opacity: phaseOpacity,
              transform: `translateY(${(1 - phaseOpacity) * 25}px)`,
              transition: "opacity 0.15s ease-out, transform 0.15s ease-out",
            }}
          >
            {/* Subtitle label */}
            <p
              className={inter.className}
              style={{
                fontSize: "clamp(0.65rem, 1.5vw, 0.875rem)",
                textTransform: "uppercase",
                letterSpacing: "0.2em",
                color: "rgba(255,255,255,0.45)",
                marginBottom: "clamp(8px, 2vw, 16px)",
              }}
            >
              {phase.sub}
            </p>

            {/* Main heading */}
            <h2
              className={inter.className}
              style={{
                fontSize: "clamp(2.5rem, 12vw, 9rem)",
                fontWeight: 700,
                color: "#fff",
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                textTransform: "uppercase",
                textShadow: "0 4px 40px rgba(0,0,0,0.7)",
                whiteSpace: "pre-line",
              }}
            >
              {phase.title}
            </h2>

            {/* Description paragraph */}
            <p
              className={inter.className}
              style={{
                fontSize: "clamp(0.875rem, 2.2vw, 1.25rem)",
                color: "rgba(255,255,255,0.6)",
                marginTop: "clamp(12px, 3vw, 24px)",
                fontWeight: 300,
                lineHeight: 1.65,
                maxWidth: "480px",
                textShadow: "0 2px 16px rgba(0,0,0,0.5)",
              }}
            >
              {phase.desc}
            </p>
          </div>
        </div>

        {/* ── Scroll indicator (mobile hint) ── */}
        <div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none sm:hidden"
          style={{
            zIndex: 10,
            opacity: phaseOpacity > 0.5 ? 0.4 : 0,
            transition: "opacity 0.3s ease",
          }}
        >
          <span
            className={inter.className}
            style={{ fontSize: "9px", textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.4)" }}
          >
            Scroll
          </span>
          <div style={{ width: "1px", height: "20px", background: "rgba(255,255,255,0.3)" }} />
        </div>

        {/* ── Loading screen ── */}
        {!imagesLoaded && (
          <div
            className="absolute inset-0 flex flex-col items-center justify-center bg-black"
            style={{ zIndex: 100 }}
          >
            <span
              className={inter.className}
              style={{
                color: "rgba(255,255,255,0.4)",
                fontSize: "clamp(10px, 2vw, 12px)",
                textTransform: "uppercase",
                letterSpacing: "0.3em",
              }}
            >
              Loading Cinematic Experience
            </span>
            <div
              style={{
                width: "clamp(120px, 40vw, 192px)",
                height: "2px",
                background: "rgba(255,255,255,0.1)",
                marginTop: "20px",
                borderRadius: "99px",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${loadProgress}%`,
                  background: "rgba(255,255,255,0.6)",
                  borderRadius: "99px",
                  transition: "width 0.3s ease-out",
                }}
              />
            </div>
            <span
              className={inter.className}
              style={{
                marginTop: "12px",
                fontSize: "11px",
                color: "rgba(255,255,255,0.2)",
                letterSpacing: "0.2em",
              }}
            >
              {loadProgress}%
            </span>
          </div>
        )}

      </div>
    </section>
  );
};

export default ScrollyTelling;
