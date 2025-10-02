import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery, useCreateOrderMutation } from "../store/apiSlice";

export default function ShopWithUsForm() {
  const { data: products = [], isLoading, error } = useGetProductsQuery();
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const token = useSelector((state) => state.auth.token); // currently unused

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
      <div
        className="flex items-center justify-center min-h-[300px]"
        style={{ backgroundColor: "#3C322B" }}
      >
        <p style={{ color: "#F8F4EF" }} className="text-lg">
          Loading products...
        </p>
      </div>
    );

  if (error)
    return (
      <div
        className="flex items-center justify-center min-h-[300px]"
        style={{ backgroundColor: "#3C322B" }}
      >
        <p style={{ color: "#8F1D2C" }} className="text-lg">
          Error loading products.
        </p>
      </div>
    );

  return (
    <section
      className="flex flex-col items-center justify-center py-12 sm:py-16 px-4"
      style={{ backgroundColor: "#F8F4F0" }}
    >
      <div className="w-full max-w-5xl px-4 sm:px-6 md:px-8 lg:px-16">
        <h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-8 sm:mb-10 md:mb-12"
          style={{ color: "#4B2142", fontFamily: "Katibeh" }}
        >
          Place Your Order
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {/* Product */}
            <div className="w-full">
              <label
                className="block text-sm sm:text-base font-semibold mb-2"
                style={{ color: "#3A2D35" }}
              >
                Product
              </label>
              <select
                name="product"
                value={formData.product}
                onChange={handleChange}
                required
                className="block w-full max-w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl focus:outline-none transition-all text-sm sm:text-base"
                style={{
                  border: "2px solid #C6A8CE",
                  color: "#333333"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4B2142")}
                onBlur={(e) => (e.target.style.borderColor = "#C6A8CE")}
              >
                <option value="">Select a product</option>
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
            <div className="w-full">
              <label
                className="block text-sm sm:text-base font-semibold mb-2"
                style={{ color: "#3A2D35" }}
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
                className="block w-full max-w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl focus:outline-none transition-all text-sm sm:text-base"
                style={{
                  border: "2px solid #C6A8CE",
                  color: "#333333"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4B2142")}
                onBlur={(e) => (e.target.style.borderColor = "#C6A8CE")}
              />
            </div>

            {/* Message */}
            <div className="md:col-span-1 w-full">
              <label
                className="block text-sm sm:text-base font-semibold mb-2"
                style={{ color: "#3A2D35" }}
              >
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows="3"
                placeholder="Add any special instructions..."
                className="block w-full max-w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl focus:outline-none transition-all resize-none text-sm sm:text-base"
                style={{
                  border: "2px solid #C6A8CE",
                  color: "#333333"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4B2142")}
                onBlur={(e) => (e.target.style.borderColor = "#C6A8CE")}
              />
            </div>

            {/* Delivery Address */}
            <div className="md:col-span-1 w-full">
              <label
                className="block text-sm sm:text-base font-semibold mb-2"
                style={{ color: "#3A2D35" }}
              >
                Delivery Address
              </label>
              <textarea
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleChange}
                required
                rows="3"
                placeholder="Enter your complete delivery address..."
                className="block w-full max-w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white rounded-xl focus:outline-none transition-all resize-none text-sm sm:text-base"
                style={{
                  border: "2px solid #C6A8CE",
                  color: "#333333"
                }}
                onFocus={(e) => (e.target.style.borderColor = "#4B2142")}
                onBlur={(e) => (e.target.style.borderColor = "#C6A8CE")}
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="flex justify-center mt-4 sm:mt-6">
            <button
              type="submit"
              disabled={orderLoading}
              className="w-full sm:w-auto px-8 sm:px-10 md:px-12 py-3 sm:py-3.5 md:py-4 text-white text-base sm:text-lg font-semibold rounded-full transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: "#8A1C2B" }}
              onMouseEnter={(e) =>
                !orderLoading && (e.target.style.backgroundColor = "#6B1522")
              }
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor = "#8A1C2B")
              }
            >
              {orderLoading ? "Placing Order..." : "Submit Order"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
