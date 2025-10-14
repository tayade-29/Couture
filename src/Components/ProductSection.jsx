import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../store/apiSlice';

export default function ProductsSection() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const getItemsPerPage = () => {
    if (typeof window === 'undefined') return 3;
    if (window.innerWidth < 640) return 1;
    if (window.innerWidth < 1024) return 2;
    return 3;
  };

  const [itemsPerPage, setItemsPerPage] = useState(getItemsPerPage());
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

  useEffect(() => {
    const handleResize = () => {
      setItemsPerPage(getItemsPerPage());
      setCurrentIndex(0);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const visibleProducts = products
    ? products.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)
    : [];

  if (isLoading) {
    return (
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F4EF' }}>
        <div className="text-center text-2xl" style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}>
          Loading products...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 px-4" style={{ backgroundColor: '#F8F4EF' }}>
        <div className="text-center text-2xl" style={{ color: '#8A1C2B', fontFamily: 'Katibeh' }}>
          Failed to load products
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 sm:py-20 px-4 md:px-8" style={{ backgroundColor: '#F8F4EF' }}>
      <div className="relative max-w-7xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-12 sm:mb-16"
          style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}
        >
          Explore our Products
        </h2>

        {products && products.length > 0 ? (
          <div className="relative">
            {totalPages > 1 && (
              <button
                onClick={prevSlide}
                className="absolute left-0 sm:left-2 md:left-0 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 md:p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: '#5E3A6E' }}
                aria-label="Previous"
              >
                <ChevronLeft size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" color="#F8F4EF" />
              </button>
            )}

            <div className="px-10 sm:px-12 md:px-16 lg:px-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-6 md:gap-8">
                {visibleProducts.map((product) => (
                  <ProductCard key={product._id} product={product} navigate={navigate} />
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-0 sm:right-2 md:right-0 top-1/2 -translate-y-1/2 z-10 p-2 sm:p-2.5 md:p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: '#5E3A6E' }}
                aria-label="Next"
              >
                <ChevronRight size={24} className="sm:w-7 sm:h-7 md:w-8 md:h-8" color="#F8F4EF" />
              </button>
            )}
          </div>
        ) : (
          <p
            className="text-center text-xl md:text-2xl"
            style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
          >
            No products available
          </p>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product, navigate }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleCardClick = () => {
    if (!isFlipped) {
      navigate(`/product/${product._id}`);
    }
  };

  return (
    <div
      className="mx-auto w-full max-w-sm perspective-1000"
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      style={{ height: '550px' }}
    >
      <div
        className="relative w-full h-full transition-transform duration-700 cursor-pointer"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(-180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT SIDE */}
        <div
          className="absolute w-full h-full backface-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
          style={{ backfaceVisibility: 'hidden', backgroundColor: '#F8F4EF' }}
          onClick={handleCardClick}
        >
          <div className="overflow-hidden rounded-t-lg aspect-[2/3]">
            <img
              src={
                product.imageUrl ||
                'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600'
              }
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="p-4">
            <h3
              className="text-xl sm:text-xl md:text-2xl font-semibold mb-1.5"
              style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
            >
              {product.name || product.title}
            </h3>
            <p
              className="text-lg sm:text-lg md:text-xl font-bold"
              style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}
            >
              ₹{product.price}
            </p>
          </div>
        </div>

        {/* BACK SIDE */}
        <div
          className="absolute w-full h-full backface-hidden rounded-lg shadow-xl p-6 flex flex-col justify-center items-center"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            backgroundColor: '#5E3A6E',
          }}
        >
          <h3
            className="text-2xl sm:text-3xl font-bold mb-4 text-center"
            style={{ color: '#F8F4EF', fontFamily: 'Katibeh' }}
          >
            {product.name || product.title}
          </h3>
          <div className="flex-1 flex items-center justify-center overflow-y-auto px-2 mb-4">
            <p
              className="text-base sm:text-lg text-center leading-relaxed"
              style={{ color: '#F8F4EF' }}
            >
              {product.description ||
                'No description available for this product. Click to view more details.'}
            </p>
          </div>
          <p
            className="text-2xl sm:text-3xl font-bold mb-4"
            style={{ color: '#F8F4EF', fontFamily: 'Katibeh' }}
          >
            ₹{product.price}
          </p>

          {/* ✅ The button now navigates correctly */}
          <button
            onClick={() => navigate(`/product/${product._id}`)}
            className="px-6 py-2 rounded-lg font-semibold transition-all hover:scale-105 hover:shadow-lg"
            style={{ backgroundColor: '#F8F4EF', color: '#5E3A6E' }}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}

