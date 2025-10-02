import { useState, useEffect } from 'react';
import Model1 from '../Assets/Model1.png';

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [showSubheading, setShowSubheading] = useState(false);
  const fullText = 'Couture';

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubheading(true), 300);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative h-[60vh] sm:h-[70vh] md:h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#F8F4EF' }}>
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex-1 flex flex-col justify-center items-start px-6 sm:px-8 md:pl-16 lg:pl-24 z-10">
          <h1
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-bold mb-3 md:mb-4 transition-all duration-500 ease-out"
            style={{
              color: '#4B2142',
              fontFamily: 'Katibeh',
              letterSpacing: '0.02em'
            }}
          >
            {displayedText}
            <span className="opacity-0 animate-pulse">|</span>
          </h1>

          <p
            className={`text-lg sm:text-xl md:text-2xl lg:text-3xl transition-all duration-700 ease-in-out max-w-md md:max-w-lg ${
              showSubheading ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
            }`}
            style={{
              color: '#5E3A6E',
              fontFamily: 'Katibeh',
              lineHeight: '1.6'
            }}
          >
            Where Flavor Meets Flair.
          </p>
        </div>

        <div className="hidden md:block h-full" style={{ width: '45%' }}>
          <img
            src={Model1}
            alt="Fashion model"
            className="w-full h-full object-cover"
            style={{ margin: 0, padding: 0 }}
          />
        </div>
      </div>
    </section>
  );
}
