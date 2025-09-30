import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useGetProductsQuery, useCreateOrderMutation } from "../store/apiSlice";

export const ShopWithUsForm = () => {
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
        productId: formData.product, // Match backend expectation
        quantity: formData.quantity,
        message: formData.message,
        deliveryAddress: formData.deliveryAddress
      }).unwrap();

      alert("Order placed successfully!");
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

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error loading products.</p>;

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Shop With Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block mb-1">Product:</label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          >
            <option value="">Select a product</option>
            {products.filter(p => p.quantity > 0).map((p) => (
              <option key={p._id} value={p._id}>
                {p.title} — ₹{p.price}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block mb-1">Quantity:</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            className="border p-2 rounded w-full"
          />
        </div>

        <div>
          <label className="block mb-1">Delivery Address:</label>
          <input
            type="text"
            name="deliveryAddress"
            value={formData.deliveryAddress}
            onChange={handleChange}
            required
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          type="submit"
          disabled={orderLoading}
          className="bg-blue-600 text-white px-4 py-2 rounded w-full"
        >
          {orderLoading ? "Placing Order..." : "Submit Order"}
        </button>
      </form>
    </div>
  );
};
