import React from "react";
import { Link } from "react-router-dom";
import { useGetProductsQuery } from '../store/apiSlice'

export const Home = () => {
  const { data: products, error, isLoading } = useGetProductsQuery();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-white shadow-md sticky top-0">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">Couture Lip Balm</h1>
          <div className="space-x-6">
            <Link to="/" className="text-gray-700 hover:text-blue-600">Home</Link>
            <Link to="/add-product" className="text-gray-700 hover:text-blue-600">Add Product</Link>
            <Link to="/explore" className="text-gray-700 hover:text-blue-600">Explore</Link>
            <Link to="/shop-with-us" className="text-gray-700 hover:text-blue-600">
  Shop With Us
</Link>
<Link to="/profile" className="text-gray-700 hover:text-blue-600">
  Profile
  
</Link>

          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="text-center py-20 bg-gradient-to-r from-blue-100 to-blue-50">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Welcome to Couture Lip Balm
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Your one-stop shop for luxurious lip care products crafted with love,
          style, and a touch of elegance. Explore our collection or add your own creations.
        </p>
        <div className="mt-6 space-x-4">
          <Link
            to="/explore"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Explore Products
          </Link>
          <Link
            to="/add-product"
            className="px-6 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Add Product
          </Link>
        </div>
      </header>

      {/* Products Section */}
      <section className="max-w-7xl mx-auto p-6">
        <h3 className="text-2xl font-bold mb-6">Available Products</h3>

        {isLoading && <p>Loading products...</p>}
        {error && <p className="text-red-500">Failed to load products.</p>}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products && products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="bg-white p-4 rounded-lg shadow">
                <img
                  src={product.imageUrl || "https://via.placeholder.com/300"}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded"
                />
                <h4 className="mt-2 text-lg font-semibold">{product.name}</h4>
                <p className="text-gray-600">{product.description}</p>
                <p className="mt-2 font-bold">₹{product.price}</p>
              </div>
            ))
          ) : (
            !isLoading && <p>No products available.</p>
          )}
        </div>
      </section>
    </div>
  );
};
