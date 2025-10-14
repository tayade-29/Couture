import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery, useCreateOrderMutation } from "../store/apiSlice";
import OrderImage from '../Assets/PlaceOrder1.png';

export default function ShopWithUsForm() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const token = useSelector((state) => state.auth.token);

  const [formData, setFormData] = useState({
    product: "",
    quantity: 1,
    message: "",
    deliveryAddress: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.product) {
      alert("Please select a product");
      return;
    }

    try {
      await createOrder({
        productId: formData.product,
        quantity: formData.quantity,
        message: formData.message,
        deliveryAddress: formData.deliveryAddress
      }).unwrap();

      alert("Your order has been placed successfully! Check your email for product updates.");
      setFormData({
        product: "",
        quantity: 1,
        message: "",
        deliveryAddress: ""
      });
    } catch (err) {
      console.error("Error placing order:", err);
      alert(err?.data?.error || "Error placing order.");
    }
  };

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-96" style={{ backgroundColor: "#F8F4F0" }}>
        <p style={{ color: "#4B2142" }} className="text-lg">
          Loading products...
        </p>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center h-96" style={{ backgroundColor: "#F8F4F0" }}>
        <p style={{ color: "#8A1C2B" }} className="text-lg">
          Error loading products.
        </p>
      </div>
    );

  return (
    <section className="relative overflow-hidden" style={{ backgroundColor: "#F8F4F0", height: "600px" }}>
      {/* Main Heading */}
      <div className="absolute top-0 left-0 right-0 z-10 text-center pt-6 pb-4">
        <h2
          className="text-4xl md:text-5xl font-bold tracking-wide"
          style={{ color: "#4B2142", fontFamily: "Katibeh", textShadow: "0 2px 4px rgba(0,0,0,0.1)" }}
        >
          Place Your Order
        </h2>
      </div>

      {/* Two Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 h-full pt-20">
        {/* Left Side - Form with Purple Background */}
        <div
          className="flex items-center justify-center px-6 md:px-10 py-6"
          style={{
            backgroundColor: "rgba(94, 58, 110, 0.7)",
            boxShadow: "inset 0 0 30px rgba(0,0,0,0.1)"
          }}
        >
          <div className="w-full max-w-md">
            <form onSubmit={handleSubmit} className="space-y-3.5">
              {/* Product & Quantity Row */}
              <div className="grid grid-cols-2 gap-3">
                {/* Product */}
                <div>
                  <label
                    className="block text-xs font-bold mb-1.5 tracking-wide uppercase"
                    style={{ color: "#F8F4F0", letterSpacing: "0.5px" }}
                  >
                    Product
                  </label>
                  <select
                    name="product"
                    value={formData.product}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2.5 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm shadow-sm"
                    style={{
                      border: "none",
                      color: "#333333",
                      focusRingColor: "#4B2142"
                    }}
                  >
                    <option value="">Select</option>
                    {products
                      .filter((p) => p.quantity > 0)
                      .map((p) => (
                        <option key={p._id} value={p._id}>
                          {p.title} — ₹{p.price}
                        </option>
                      ))}
                  </select>
                </div>

                {/* Quantity */}
                <div>
                  <label
                    className="block text-xs font-bold mb-1.5 tracking-wide uppercase"
                    style={{ color: "#F8F4F0", letterSpacing: "0.5px" }}
                  >
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    required
                    className="block w-full px-3 py-2.5 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all text-sm shadow-sm"
                    style={{
                      border: "none",
                      color: "#333333"
                    }}
                  />
                </div>
              </div>

              {/* Message */}
              <div>
                <label
                  className="block text-xs font-bold mb-1.5 tracking-wide uppercase"
                  style={{ color: "#F8F4F0", letterSpacing: "0.5px" }}
                >
                  Special Instructions
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="2"
                  placeholder="Any special requests or notes..."
                  className="block w-full px-3 py-2.5 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none text-sm shadow-sm placeholder-gray-400"
                  style={{
                    border: "none",
                    color: "#333333"
                  }}
                />
              </div>

              {/* Delivery Address */}
              <div>
                <label
                  className="block text-xs font-bold mb-1.5 tracking-wide uppercase"
                  style={{ color: "#F8F4F0", letterSpacing: "0.5px" }}
                >
                  Delivery Address
                </label>
                <textarea
                  name="deliveryAddress"
                  value={formData.deliveryAddress}
                  onChange={handleChange}
                  required
                  rows="2"
                  placeholder="Street, City, State, PIN..."
                  className="block w-full px-3 py-2.5 bg-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all resize-none text-sm shadow-sm placeholder-gray-400"
                  style={{
                    border: "none",
                    color: "#333333"
                  }}
                />
              </div>

              {/* Submit button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={orderLoading}
                  className="w-full px-8 py-3.5 text-white text-base font-bold rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 shadow-lg uppercase tracking-wider"
                  style={{
                    backgroundColor: "#8A1C2B",
                    boxShadow: "0 4px 12px rgba(138, 28, 43, 0.4)"
                  }}
                  onMouseEnter={(e) =>
                    !orderLoading && (e.target.style.backgroundColor = "#6B1522")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "#8A1C2B")
                  }
                >
                  {orderLoading ? "Processing..." : "Submit Order"}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Side - Image (hidden on mobile) */}
        <div
          className="hidden lg:block relative overflow-hidden"
          style={{ backgroundColor: "#F8F4F0" }}
        >
          <img
            src={OrderImage}
            alt="Order placement"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ objectPosition: "center" }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(90deg, rgba(94, 58, 110, 0.2) 0%, transparent 100%)"
            }}
          />
        </div>
      </div>
    </section>
  );
}
