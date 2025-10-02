import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useGetProductsQuery } from '../store/apiSlice';

export default function ProductsSection() {
  const { data: products, error, isLoading } = useGetProductsQuery();
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const itemsPerPage = 3;
  const totalPages = products ? Math.ceil(products.length / itemsPerPage) : 0;

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
    <section className="py-20 px-4 md:px-8" style={{ backgroundColor: '#F8F4EF' }}>
      <div className="relative max-w-7xl mx-auto">
        <h2
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-16"
          style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}
        >
          Explore our Products
        </h2>

        {products && products.length > 0 ? (
          <div className="relative">
            {totalPages > 1 && (
              <button
                onClick={prevSlide}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: '#5E3A6E' }}
                aria-label="Previous"
              >
                <ChevronLeft size={32} color="#F8F4EF" />
              </button>
            )}

            <div className="px-8 md:px-24">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleProducts.map((product) => (
                  <div
                    key={product._id}
                    onClick={() => navigate(`/product/${product._id}`)}
                    className="cursor-pointer group"
                  >
                    <div className="overflow-hidden rounded-lg mb-4 aspect-[2/3] shadow-md hover:shadow-xl transition-shadow duration-300">
                      <img
                        src={product.imageUrl || 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600'}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                    <h3
                      className="text-xl md:text-2xl font-semibold mb-2 transition-colors group-hover:opacity-80"
                      style={{ color: '#4B2142', fontFamily: 'Katibeh' }}
                    >
                      {product.name || product.title}
                    </h3>
                    <p
                      className="text-lg md:text-xl font-bold"
                      style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}
                    >
                      ₹{product.price}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {totalPages > 1 && (
              <button
                onClick={nextSlide}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 md:p-3 rounded-full transition-all hover:scale-110 hover:shadow-lg"
                style={{ backgroundColor: '#5E3A6E' }}
                aria-label="Next"
              >
                <ChevronRight size={32} color="#F8F4EF" />
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
