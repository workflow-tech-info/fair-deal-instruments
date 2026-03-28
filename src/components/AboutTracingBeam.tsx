"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start center", "end end"],
  });

  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  const y1 = useTransform(scrollYProgressSpring, [0, 1], [50, 400]);
  const y2 = useTransform(scrollYProgressSpring, [0, 1], [50, 400]);

  return (
    <motion.div
      ref={ref}
      className={cn("relative w-full max-w-4xl mx-auto h-full", className)}
    >
      <div className="absolute -left-10 md:-left-20 top-3 border-l border-white/10 h-full z-0 ml-1">
        <motion.div
          transition={{
            duration: 0.2,
            delay: 0.5,
          }}
          className="ml-[10px] h-full w-[2px] rounded-full"
        >
          <svg
            viewBox="0 0 20 800"
            width="20"
            height="100%"
            className="ml-[-10px] block"
          >
            <motion.path
              d="M 10 0 L 10 800"
              fill="none"
              stroke="url(#gradient)"
              strokeWidth="2"
            />
            <defs>
              <linearGradient
                id="gradient"
                gradientUnits="userSpaceOnUse"
                x1="0"
                x2="0"
                y1={y1 as any}
                y2={y2 as any}
              >
                <stop stopColor="#1C1C1E" stopOpacity="0" />
                <stop stopColor="#8E8E93" />
                <stop offset="0.325" stopColor="#FFFFFF" />
                <stop offset="1" stopColor="#FFFFFF" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </motion.div>
      </div>
      <div className="z-10 relative">
        {children}
      </div>
    </motion.div>
  );
};

export default function AboutTracingBeam() {
  return (
    <section className="bg-black py-32 overflow-hidden px-8 md:px-16 lg:px-24">
      <TracingBeam>
        <div className="flex flex-col gap-6 md:gap-10 h-full">
          <h2 className={`${inter.className} text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tighter text-white`}>
            A Legacy of <br />
            <span className="text-white/40">Metal & Music.</span>
          </h2>
          
          <div className={`${inter.className} text-white/60 max-w-2xl text-xl md:text-3xl mt-4 space-y-10 font-light tracking-tight leading-relaxed pb-24`}>
            <p className="text-white">
              At Fair Deal Industries, we don't just bend metal; we protect art. 
            </p>
            <p>
              Being a <strong className="text-white font-medium">Genuine Manufacturer</strong> means every weld is checked, every stand is balanced, and every customer gets a "Fair Deal."
            </p>
            <p>
              Our Chennai factory specializes in customized solutions for instruments that require more than just a generic shelf. From the acoustic resonance of the Saraswati Veena to the stage-heaviness of an organ setup, we map and cut precisely to the instrument's unique footprint.
            </p>
          </div>
        </div>
      </TracingBeam>
    </section>
  );
}
