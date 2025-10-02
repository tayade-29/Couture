export default function AboutSection() {
  return (
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: '#F8F4EF' }}>
      <div className="container mx-auto max-w-6xl relative">
        <div className="relative py-12 md:py-16">
          <h2
            className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-bold text-center leading-none"
            style={{
              color: '#5E3A6E',
              opacity: '0.3',
              fontFamily: 'Katibeh'
            }}
          >
            Couture
          </h2>

          <div className="absolute inset-0 flex flex-col justify-between py-8 md:py-12 px-4 md:px-8">
            <div className="flex justify-end pr-12 pt-4">
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs md:max-w-sm text-right leading-relaxed"
                style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
              >
                Tinted. Tasty. Protected — Lip care that shines through."
              </p>
            </div>

            <div className="flex justify-start pl-12 pb-16">
              <p
                className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-xs md:max-w-sm leading-relaxed"
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
