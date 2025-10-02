import { useParams } from 'react-router-dom';
import { useGetProductByIdQuery } from "../store/apiSlice";


export default function ProductDetailPage() {
  const { id } = useParams();
  const { data: product, error, isLoading } = useGetProductByIdQuery(id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F4EF' }}>
        <p className="text-3xl" style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}>
          Loading...
        </p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#F8F4EF' }}>
        <p className="text-3xl" style={{ color: '#8A1C2B', fontFamily: 'Katibeh' }}>
          Product not found
        </p>
      </div>
    );
  }

  return (
   <div className="min-h-screen py-0 md:py-0 px-6 md:px-12 lg:px-16" style={{ backgroundColor: '#F8F4EF' }}>
  <div className="max-w-7xl mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 lg:gap-20 min-h-screen">
      
      {/* Image Column */}
      <div className="w-full h-full flex items-center justify-center">
        <div className="w-full h-full max-h-screen rounded-2xl overflow-hidden flex items-center justify-center bg-#F8F4EF">
          <img
            src={product.imageUrl || 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=600'}
            alt={product.name || product.title}
            className="w-full h-full object-contain"
          />
        </div>

          </div>

          <div className="flex flex-col justify-center space-y-8 md:space-y-10 lg:pr-8">
            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}>
                Product Name
              </h3>
              <h1 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight" style={{ color: '#4B2142', fontFamily: 'Katibeh' }}>
                {product.name || product.title}
              </h1>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}>
                Price
              </h3>
              <p className="text-3xl md:text-4xl lg:text-5xl font-bold" style={{ color: '#4B2142', fontFamily: 'Katibeh' }}>
                ₹{product.price}
              </p>
            </div>

            <div>
              <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}>
                Description
              </h3>
              <p className="text-xl md:text-2xl lg:text-3xl leading-relaxed" style={{ color: '#4B2142', fontFamily: 'Katibeh', lineHeight: '1.7' }}>
                {product.description}
              </p>
            </div>

            {/* {product.quantity && (
              <div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-semibold mb-3" style={{ color: '#5E3A6E', fontFamily: 'Katibeh' }}>
                  Availability
                </h3>
                <p className="text-xl md:text-2xl lg:text-3xl" style={{ color: '#4B2142', fontFamily: 'Katibeh' }}>
                  {product.quantity} in stock
                </p>
              </div>
            )} */}
          </div>
        </div>
      </div>
    </div>
  );
}
