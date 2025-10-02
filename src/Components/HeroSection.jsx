import { useState, useEffect } from 'react';
import Model1 from '../Assets/Model1.png';

export default function HeroSection() {
  const [displayedText, setDisplayedText] = useState('');
  const [visibleSubheadings, setVisibleSubheadings] = useState([]);
  const [currentMobileSubheading, setCurrentMobileSubheading] = useState(0);
  const [showSubheadings, setShowSubheadings] = useState(false);
  const fullText = 'Couture';

  const subheadings = [
    'Deep Moisturization that lasts all day',
    'Tinted finish for naturally beautiful lips',
    'Infused with irresistible flavours',
    'Enriched with natural oils & butters'
  ];

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => setShowSubheadings(true), 500);
      }
    }, 150);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!showSubheadings) return;

    let index = 0;
    const showNextSubheading = () => {
      if (index < subheadings.length) {
        setVisibleSubheadings(prev => [...prev, index]);
        index++;
        setTimeout(showNextSubheading, 800);
      }
    };

    showNextSubheading();
  }, [showSubheadings]);

  useEffect(() => {
    if (visibleSubheadings.length < subheadings.length) return;

    const mobileInterval = setInterval(() => {
      setCurrentMobileSubheading((prev) => (prev + 0) % subheadings.length);
    }, 3000);

    return () => clearInterval(mobileInterval);
  }, [visibleSubheadings]);

  return (
    <section className="relative h-screen flex items-center overflow-hidden" style={{ backgroundColor: '#F8F4EF' }}>
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex-1 flex flex-col justify-center items-start px-6 sm:px-8 md:pl-20 lg:pl-32 xl:pl-56 z-10">
          <h1
            className="text-5xl sm:text-7xl md:text-8xl lg:text-8xl xl:text-9xl font-bold mb-2 sm:mb-4 md:mb-2 transition-all duration-500 ease-out"
            style={{
              color: '#4B2142',
              fontFamily: 'Katibeh',
              letterSpacing: '0.02em'
            }}
          >
            {displayedText}
            <span className="opacity-0 animate-pulse">.</span>
          </h1>

          <div className="relative w-full max-w-md">
            <div className="hidden md:flex md:flex-col md:gap-2">
              {subheadings.map((text, index) => (
                <p
                  key={index}
                  className={`text-lg md:text-xl lg:text-2xl transition-all duration-700 ease-in-out ${
                    visibleSubheadings.includes(index)
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-4'
                  }`}
                  style={{
                    color: '#5E3A6E',
                    fontFamily: 'Katibeh',
                    lineHeight: '1.8'
                  }}
                >
                  {text}
                </p>
              ))}
            </div>

            <div className="md:hidden relative min-h-[100px] flex items-center">
              {subheadings.map((text, index) => (
                <p
                  key={index}
                  className={`absolute top-1/2 -translate-y-1/2 left-0 text-base sm:text-lg transition-all duration-700 ease-in-out ${
                    currentMobileSubheading === index && visibleSubheadings.includes(index)
                      ? 'opacity-100'
                      : 'opacity-0'
                  }`}
                  style={{
                    color: '#5E3A6E',
                    fontFamily: 'Katibeh',
                    lineHeight: '1.8'
                  }}
                >
                  {text}
                </p>
              ))}
            </div>
          </div>
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
