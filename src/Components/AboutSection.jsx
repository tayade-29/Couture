export default function AboutSection() {
  return (
    <section className="py-16 sm:py-20 px-4 md:px-8" style={{ backgroundColor: '#F8F4EF' }}>
      <div className="container mx-auto max-w-6xl">
        <div className="relative py-8 sm:py-12 md:py-16 min-h-[400px] sm:min-h-[450px] md:min-h-[500px] flex items-center justify-center">
          <h2
            className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[12rem] font-bold text-center leading-none absolute"
            style={{
              color: '#5E3A6E',
              opacity: '0.25',
              fontFamily: 'Katibeh'
            }}
          >
            Couture
          </h2>

          <div className="relative z-10 w-full flex flex-col justify-between gap-8 sm:gap-12 md:gap-16 py-4 sm:py-8 md:py-12 px-2 sm:px-4 md:px-8">
            <div className="flex justify-center sm:justify-end sm:pr-8 md:pr-12 pt-4 sm:pt-6 md:pt-8">
              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-xs sm:max-w-sm md:max-w-md text-center sm:text-right leading-relaxed"
                style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
              >
                Tinted. Tasty. Protected — Lip care that shines through."
              </p>
            </div>

            <div className="flex justify-center sm:justify-start sm:pl-8 md:pl-12 pb-4 sm:pb-6 md:pb-0">
              <p
                className="text-lg sm:text-xl md:text-2xl lg:text-3xl max-w-xs sm:max-w-sm md:max-w-md text-center sm:text-left leading-relaxed"
                style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
              >
                Flavorful Tint with SPF — Shine Safely
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
