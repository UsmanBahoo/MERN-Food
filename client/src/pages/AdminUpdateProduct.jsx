import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function AdminUpdateProduct() {

  const showCards = location.pathname.toLowerCase() === "/admindashboard";
  const { state } = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: state?.product?.name || "",
    price: state?.product?.price || "",
    category: state?.product?.category || "",
    image: state?.product?.image || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.price || !formData.category) {
      alert("Please fill in all required fields.");
      return;
    }
    if (isNaN(formData.price) || formData.price <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    console.log("Updated product:", formData);
    navigate("/admindashboard/addproduct");
  };

  if (!state?.product) {
    return (
      <div className="p-4 text-center">
        <p>No product data available. Please select a product to update.</p>
        <button
          onClick={() => navigate("/admindashboard/addproduct")}
          className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded"
        >
          Back
        </button>
      </div>
    );
  }

  return (
      <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto p-6 space-y-5 bg-white border border-gray-300 rounded-lg shadow-md mt-40"
    >
      <h2 className="text-xl font-semibold text-gray-700 text-center">Update Product</h2>

      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Product name"
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="text"
        name="price"
        value={formData.price}
        onChange={handleChange}
        placeholder="Product price"
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select category</option>
        <option value="Burger">Burger</option>
        <option value="Pizza">Pizza</option>
        <option value="Desserts">Desserts</option>
        <option value="Drinks">Drinks</option>
      </select>

       <input
            type="file"
            className="w-full border border-gray-300 text-gray-600 px-4 py-2 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />

      <button
        type="submit"
        className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors duration-200"
      >
        Update Product
      </button>
      </form>

  );
}

export default AdminUpdateProduct;
