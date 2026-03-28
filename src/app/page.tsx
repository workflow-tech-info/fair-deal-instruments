import Navbar from "@/components/Navbar";
import ScrollyTelling from "@/components/ScrollyTelling";
import ProductShowcase from "@/components/ProductShowcase";
import AboutTracingBeam from "@/components/AboutTracingBeam";
import TestimonialMarquee from "@/components/TestimonialMarquee";
import ContactForm from "@/components/ContactForm";

export default function Home() {
  return (
    <main className="bg-black min-h-screen w-full flex flex-col overflow-x-hidden text-white selection:bg-white selection:text-black relative">
      <Navbar />
      
      <div id="hero" className="relative z-0">
        <ScrollyTelling />
      </div>
      
      <div id="stands" className="relative z-10 bg-black">
        <ProductShowcase />
      </div>
      
      <div id="about" className="relative z-10 bg-black">
        <AboutTracingBeam />
      </div>
      
      <div className="relative z-10 bg-black">
        <TestimonialMarquee />
      </div>
      
      <div id="contact" className="relative z-10 bg-black">
        <ContactForm />
      </div>
    </main>
  );
}
