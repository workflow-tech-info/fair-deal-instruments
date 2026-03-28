"use client";

import React from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Inter, Playfair_Display } from "next/font/google";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "600"] });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

const features = [
  {
    name: "The Classical Collection",
    description: "Contoured for the Saraswati Veena.",
    className: "col-span-1 lg:col-span-2 row-span-2 relative min-h-[400px]",
    background: <img src="/veena stand.webp" alt="Veena" className="absolute object-cover w-full h-full inset-0 opacity-40 mix-blend-screen" />,
  },
  {
    name: "Performance Keys",
    description: "Touring-grade stability.",
    className: "col-span-1 lg:col-span-1 row-span-1 relative min-h-[250px]",
    background: <img src="/organ stand2.jpg" alt="Organ Stand" className="absolute object-cover w-full h-full inset-0 opacity-40 mix-blend-screen" />,
  },
  {
    name: "The Rhythm Section",
    description: "Precision Percussion Mounts.",
    className: "col-span-1 lg:col-span-1 row-span-1 relative min-h-[250px]",
    background: <img src="/tabala stand.jpg" alt="Tabala" className="absolute object-cover w-full h-full inset-0 opacity-40 mix-blend-screen" />,
  },
  {
    name: "Universal Support",
    description: "Acoustic & Electric. Handbuilt in Chennai.",
    className: "col-span-1 lg:col-span-3 row-span-1 relative min-h-[250px]",
    background: <img src="/guitar stand2.webp" alt="Guitar" className="absolute object-cover w-full h-full inset-0 opacity-40 mix-blend-screen" />,
  },
];

export default function ProductBento() {
  return (
    <section className="relative bg-black w-full py-24 md:py-32 overflow-hidden flex flex-col items-center">
      {/* Decorative Glow */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#D4AF37] opacity-10 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 w-full flex flex-col z-10">
        <div className="mb-16">
          <h2 className={`${playfair.className} text-4xl md:text-6xl text-white`}>
            Engineering <span className="text-[#D4AF37] italic">Stands</span>
          </h2>
          <p className={`${inter.className} text-white/70 mt-4 text-xl md:text-2xl font-light`}>
            Custom solutions for heavy brass, wood, and carbon.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-none lg:grid-rows-3 gap-4 lg:gap-6 auto-rows-[250px]">
           {features.map((feature, idx) => (
             <div
               key={idx}
               className={cn(
                 "group relative overflow-hidden rounded-xl border border-white/10 bg-white/5",
                 feature.className
               )}
             >
               <div className="absolute inset-0 z-0 bg-black/60 group-hover:bg-black/20 transition-colors duration-500 ease-in-out" />
               {feature.background}

               {/* Gradient for text shadow overlay natively */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />

               <div className="absolute flex flex-col justify-end p-8 z-20 bottom-0 pointer-events-none transition-transform duration-500 group-hover:-translate-y-2">
                 <h3 className={`${playfair.className} text-2xl md:text-3xl text-white font-semibold drop-shadow-md`}>
                   {feature.name}
                 </h3>
                 <p className={`${inter.className} mt-2 text-white/80 font-light drop-shadow`}>
                   {feature.description}
                 </p>
               </div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
