"use client";

import React from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600"] });

export default function ContactForm() {
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      alert("Custom build request submitted!");
    }, 1000);
  };

  return (
    <section className="bg-black py-24 md:py-32 flex flex-col items-center">
      <div className="w-full max-w-2xl px-6 relative z-10">
        <div className="mb-16 text-center">
          <h2 className={`${inter.className} text-4xl md:text-5xl lg:text-6xl text-white font-semibold tracking-tighter mb-4`}>
            Start Your <br className="md:hidden" />
            <span className="text-white/40">Custom Build.</span>
          </h2>
          <p className={`${inter.className} text-white/60 max-w-md mx-auto text-lg mt-6 font-light tracking-tight`}>
            Request specific dimensions, materials, or speak with our engineers about fitting a rare instrument.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full bg-[#1C1C1E] p-8 md:p-12 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-white/5">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className={`${inter.className} text-white/80 text-sm font-medium ml-1`}>
              Full Name
            </label>
            <input
              required
              id="name"
              type="text"
              placeholder="Janice Alicia"
              className="w-full bg-[#2C2C2E] border border-white/5 rounded-xl py-4 px-5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-[#3C3C3E] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="instrument" className={`${inter.className} text-white/80 text-sm font-medium ml-1`}>
              Instrument Type
            </label>
            <input
              required
              id="instrument"
              type="text"
              placeholder="e.g. Saraswati Veena"
              className="w-full bg-[#2C2C2E] border border-white/5 rounded-xl py-4 px-5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-[#3C3C3E] transition-all"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="requirements" className={`${inter.className} text-white/80 text-sm font-medium ml-1`}>
              Unique Requirements
            </label>
            <textarea
              required
              id="requirements"
              rows={4}
              placeholder="Touring-grade stability, heavy base padding..."
              className="w-full bg-[#2C2C2E] border border-white/5 rounded-xl py-4 px-5 text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/10 focus:bg-[#3C3C3E] transition-all resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`${inter.className} mt-6 w-full bg-white hover:bg-white/90 text-black font-semibold py-4 px-6 rounded-xl transition-all active:scale-[0.98] disabled:opacity-50 flex justify-center items-center`}
          >
            {loading ? "Transmitting..." : "Request Blueprint"}
          </button>
        </form>

        <footer className="mt-24 pt-12 text-center flex flex-col items-center gap-2 border-t border-white/10">
          <div className={`${inter.className} text-white/50 text-sm leading-relaxed max-w-sm`}>
            <strong className="text-white/80 font-medium tracking-wide uppercase text-xs block mb-3">Fair Deal Industries</strong>
            65, 111, Triplicane High Rd<br />
            Chennai, Tamil Nadu
          </div>
          <div className={`${inter.className} text-white font-medium mt-4`}>
            +91 98407 07481
          </div>
        </footer>
      </div>
    </section>
  );
}
