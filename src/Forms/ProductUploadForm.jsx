import { useState } from "react";
import { useCreateProductMutation } from "../store/apiSlice";

export default function ProductForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState(null);

  const [createProduct, { isLoading }] = useCreateProductMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("quantity", quantity);
    formData.append("image", image);

    try {
      await createProduct(formData).unwrap();
      alert("Product created successfully!");
    } catch (err) {
      console.error("Failed to create product:", err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12" style={{ backgroundColor: '#F6F1F8' }}>
      <div className="bg-white p-8 sm:p-10 md:p-12 rounded-2xl shadow-lg w-full max-w-3xl">
        <h2 className="text-3xl font-bold text-center mb-8" style={{ color: '#4B2142' }}>
          Add New Product (Only admin can add products)
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                Product Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter product title"
                required
                className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                style={{
                  border: '2px solid #C6A8CE',
                  color: '#3A2D35'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter detailed product description"
                required
                rows="4"
                className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all resize-none"
                style={{
                  border: '2px solid #C6A8CE',
                  color: '#3A2D35'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                  Price (₹)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="0.00"
                  required
                  min="0"
                  step="0.01"
                  className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                  style={{
                    border: '2px solid #C6A8CE',
                    color: '#3A2D35'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                  onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                  Quantity
                </label>
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0"
                  required
                  min="1"
                  className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all"
                  style={{
                    border: '2px solid #C6A8CE',
                    color: '#3A2D35'
                  }}
                  onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                  onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" style={{ color: '#3A2D35' }}>
                Product Image
              </label>
              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                required
                className="block w-full px-4 py-3 bg-white rounded-xl focus:outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:cursor-pointer"
                style={{
                  border: '2px solid #C6A8CE',
                  color: '#3A2D35'
                }}
                onFocus={(e) => e.target.style.borderColor = '#4B2142'}
                onBlur={(e) => e.target.style.borderColor = '#C6A8CE'}
              />
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <button
              type="submit"
              disabled={isLoading}
              className="px-12 py-4 text-white text-lg font-semibold rounded-full transition-all hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed"
              style={{ backgroundColor: '#4B2142' }}
              onMouseEnter={(e) => !isLoading && (e.target.style.backgroundColor = '#3A1832')}
              onMouseLeave={(e) => e.target.style.backgroundColor = '#4B2142'}
            >
              {isLoading ? "Uploading..." : "Add Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
