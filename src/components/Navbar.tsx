"use client";

import React, { useState, useEffect } from "react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Cinematic Showcase", href: "#hero" },
    { name: "Stand Alignments", href: "#stands" },
    { name: "Musician Insights", href: "#about" },
    { name: "Request Build", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 flex items-center justify-between px-6 md:px-12 ${
        scrolled 
          ? "bg-[#1C1C1E]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl" 
          : "bg-transparent py-6 border-b border-transparent"
      }`}
    >
      <div className={`${inter.className} flex items-center gap-2`}>
        {/* Sleek F logo representing Fair Deal Industries */}
        <div className={`w-8 h-8 flex items-center justify-center rounded-lg font-bold text-lg tracking-tighter transition-colors duration-500 bg-white text-black`}>
          F
        </div>
        <span className={`font-medium tracking-tight whitespace-nowrap hidden sm:block transition-colors duration-500 text-white`}>
          FAIR DEAL
        </span>
      </div>

      <ul className="hidden md:flex items-center gap-8">
        {navLinks.map((link, idx) => (
          <li key={idx}>
            <a
              href={link.href}
              className={`${inter.className} text-[13px] tracking-wide transition-colors duration-300 hover:opacity-100 text-white/70 hover:text-white`}
            >
              {link.name}
            </a>
          </li>
        ))}
      </ul>

      <button className={`${inter.className} text-xs md:text-sm font-medium px-4 md:px-5 py-2 rounded-full transition-all duration-500 bg-white text-black hover:bg-white/90`}>
        Buy
      </button>
    </nav>
  );
}
