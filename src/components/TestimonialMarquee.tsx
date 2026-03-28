"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

const testimonials = [
  {
    name: "Janice Alicia",
    body: "Best place for customized stands.",
  },
  {
    name: "B.R. Bharat",
    body: "Genuine manufacturer. Excellent keyboard stands.",
  },
  {
    name: "Suriyakala M",
    body: "The 5-star standard in Chennai.",
  },
  {
    name: "Mohan Kumar",
    body: "Precision quality on Triplicane High Road.",
  },
];

const ReviewCard = ({ name, body }: { name: string; body: string }) => {
  return (
    <figure
      className={cn(
        "relative w-[300px] md:w-[400px] shrink-0 cursor-pointer overflow-hidden rounded-[2rem] border p-8 md:p-10",
        "bg-[#1C1C1E]/80 backdrop-blur-xl border-white/10 hover:bg-[#2C2C2E] transition-all duration-500 shadow-sm"
      )}
    >
      <blockquote className={`${inter.className} text-xl md:text-2xl font-medium tracking-tight text-white leading-snug`}>
        "{body}"
      </blockquote>
      <div className="mt-8 flex flex-row items-center gap-4">
        <div className="flex flex-col">
          <figcaption className={`${inter.className} text-base font-medium text-white/60`}>
            {name}
          </figcaption>
        </div>
      </div>
    </figure>
  );
};

export default function TestimonialMarquee() {
  return (
    <section className="relative flex w-full flex-col items-center justify-center overflow-hidden bg-black py-24 md:py-32">
       <style dangerouslySetInnerHTML={{__html: `
         @keyframes scrollMarquee { 
           0% { transform: translateX(0); } 
           100% { transform: translateX(calc(-100% - 1.5rem)); } 
         }
         .animate-marquee {
           animation: scrollMarquee 35s linear infinite;
         }
         .animate-marquee:hover {
           animation-play-state: paused;
         }
       `}} />
       
      <div className="mb-16 text-center text-white px-6 relative z-10 w-full">
        <h2 className={`${inter.className} text-4xl md:text-6xl font-semibold tracking-tighter`}>
          Musicians <span className="text-white/40">Speak.</span>
        </h2>
      </div>

      <div className="relative w-full flex flex-row mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] py-8">
        <div className="flex shrink-0 animate-marquee gap-6">
          {testimonials.map((t, i) => (
            <ReviewCard key={"first-" + i} {...t} />
          ))}
        </div>
        <div className="flex shrink-0 animate-marquee gap-6 ml-6" aria-hidden="true">
          {testimonials.map((t, i) => (
            <ReviewCard key={"second-" + i} {...t} />
          ))}
        </div>
      </div>
    </section>
  );
}
