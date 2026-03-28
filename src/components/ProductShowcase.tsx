"use client";

import React from "react";
import { Inter } from "next/font/google";
import { Heart, Copy } from "lucide-react";

const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"] });

const products = [
  {
    name: "Acoustic Guitar Secure Stand",
    oldPrice: "₹1,199",
    price: "₹839",
    discount: "30% OFF",
    colors: ["#000000", "#1C1C1E"],
    image: "/guitar stand/guitar stand2.webp",
  },
  {
    name: "Saraswati Veena Stand",
    oldPrice: "₹4,999",
    price: "₹1,299",
    discount: "74% OFF",
    colors: ["#000000", "#D4AF37", "#8E8E93"],
    image: "/veena stand/veena stand.webp",
  },
  {
    name: "Standard Keyboard Stand",
    oldPrice: "₹3,499",
    price: "₹799",
    discount: "77% OFF",
    colors: ["#1C1C1E"],
    image: "/organ stand/organ stand.jpg",
  },
  {
    name: "Classical Violin Rest",
    oldPrice: "₹2,499",
    price: "₹999",
    discount: "60% OFF",
    colors: ["#E5E5EA"],
    image: "/violin stand/violin stand.jpg",
  }
];

export default function ProductShowcase() {
  return (
    <section className="bg-black w-full py-24 md:py-32 overflow-hidden flex flex-col items-center">
      <div className="w-full max-w-[1400px] mx-auto px-6 mb-16 text-center">
        <h2 className={`${inter.className} text-4xl md:text-6xl text-white font-semibold tracking-tighter`}>
          Stands. <span className="text-white/40">Reimagined.</span>
        </h2>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 justify-center">
          {products.map((product, idx) => (
            <div key={idx} className="flex flex-col group cursor-pointer w-full max-w-sm mx-auto">
              
              {/* Image Container */}
              <div className="relative w-full aspect-[3/4] bg-[#1C1C1E] rounded-2xl overflow-hidden mb-4 border border-white/5">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="absolute inset-0 w-full h-full object-contain p-6 transition-all duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <button className="absolute top-4 right-4 p-2 text-white/40 hover:text-white transition-colors rounded-full hover:bg-white/10">
                  <Heart className="w-5 h-5 stroke-[1.5]" />
                </button>
                <div className="absolute bottom-4 right-4 text-white/40 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Copy className="w-5 h-5 stroke-[1.5]" />
                </div>
              </div>

              {/* Product Details */}
              <div className="flex flex-col px-1">
                <h3 className={`${inter.className} text-sm font-medium text-white/80 truncate mb-1`}>
                  {product.name}
                </h3>
                
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className={`${inter.className} text-[13px] text-white/40 line-through`}>
                    {product.oldPrice}
                  </span>
                  <span className={`${inter.className} text-[15px] font-semibold text-white`}>
                    {product.price}
                  </span>
                  <span className={`${inter.className} text-[10px] font-bold text-black bg-white px-1.5 py-0.5 rounded-sm`}>
                    {product.discount}
                  </span>
                </div>

                <div className="flex items-center gap-1.5">
                  {product.colors.map((color, cIdx) => (
                    <div 
                      key={cIdx} 
                      className={`w-3 h-3 rounded-full border ${color === "#E5E5EA" ? "border-white/20" : "border-transparent"}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
