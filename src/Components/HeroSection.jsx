import { Heart } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Model1 from '../Assets/Model1.png';


export default function HeroSection() {
  const [showRest, setShowRest] = useState(false);
  const headingText = "Your Lips' New Best Friend.";

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowRest(true);
    }, headingText.length * 50 + 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="hidden md:flex relative h-screen bg-[#F8F4EF] overflow-hidden">
      {/* Floating decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-pink-200/20 to-purple-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-40 left-40 w-40 h-40 bg-gradient-to-br from-purple-200/20 to-pink-200/20 rounded-full blur-3xl animate-float-delayed"></div>
      </div>

      {/* Left Content Overlay */}
      <div className="absolute left-0 top-0 w-[60%] h-full flex items-center justify-center z-10">
        <div className="max-w-2xl px-16 relative">
          {/* Subtle background shape */}
          <div className="absolute -top-20 -left-20 w-96 h-96 bg-white/5 rounded-full blur-2xl"></div>

          <div className="relative space-y-8">
            {/* Multiple hearts spread */}
            <div className={`inline-block relative transition-opacity duration-500 ${showRest ? 'opacity-100' : 'opacity-0'}`}>
              <div className="relative w-32 h-24">
                <Heart className="absolute bottom-0 left-0 w-16 h-16 text-[#E91E63] animate-pulse-slow" strokeWidth={0} fill="#5E3A6E" />
                <Heart className="absolute top-0 left-8 w-10 h-10 text-[#E91E63] animate-pulse-slow" strokeWidth={0} fill="#5E3A6E" style={{ animationDelay: '0.3s' }} />
                <Heart className="absolute bottom-2 right-0 w-14 h-14 text-[#E91E63] animate-pulse-slow" strokeWidth={0} fill="#5E3A6E" style={{ animationDelay: '0.6s' }} />
              </div>
            </div>

            {/* Main headline with letter-by-letter animation */}
            <h1 className="font-serif text-6xl lg:text-7xl leading-tight text-[#5E3A6E]">
              {headingText.split('').map((char, index) => (
                <span
                  key={index}
                  className="inline-block animate-letter-appear"
                  style={{
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </h1>

            {/* Rest of content - appears after heading completes */}
            <div className={`transition-all duration-700 ${showRest ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Subheading */}
              <p className="text-2xl text-[#5E3A6E]/70 font-light tracking-wide mb-6">
                Hydrate. Tint. Shine.
              </p>

              {/* CTA Button */}
              <div className="pt-4 mb-8">
                <Link to="/shop-with-us">
                  <button className="group relative px-10 py-4 bg-[#5E3A6E] text-white rounded-full text-lg font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                    <span className="relative z-10">Shop Now</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                </Link>
              </div>

              {/* Decorative line */}
              <div className="pt-8 flex items-center gap-4">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-[#5E3A6E]/30"></div>
                <p className="text-sm text-[#5E3A6E]/50 uppercase tracking-widest">Premium Quality</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Image Section */}
      <div className="absolute right-0 top-0 w-[40%] h-full flex items-center justify-center">
        <div className="relative w-full h-full">
          <img
            src={Model1}
            alt="Fashion model"
            className="w-full h-full object-cover animate-fade-in"
          />

          {/* Gradient overlay on image edge */}
          <div className="absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-[#F8F4EF] to-transparent"></div>
        </div>
      </div>
    </section>
  );
}
