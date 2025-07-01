import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function UpdateProduct() {
  const location = useLocation();
  const navigate = useNavigate();
  const productData = location.state?.product;
  console.log('Product data received:', productData);

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    category: '',
    image: null
  });

  useEffect(() => {
    if (productData) {
      setFormData({
        name: productData.name || '',
        price: productData.price || '',
        category: productData.category || '',
        image: null
      });
    }
  }, [productData]);

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'file' ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!productData?.id) {
      alert('Product ID not found');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('category', formData.category);
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const response = await axios.put(
        `${API_BASE_URL}/api/products/${productData.id}`,
        formDataToSend,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      );

      if (response.status === 200) {
        alert('Product updated successfully!');
        navigate('/admin/products');
      }
    } catch (error) {
      console.error('Error updating product:', error);
      alert('Failed to update product: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto mt-40 p-6 space-y-5 bg-white border border-gray-300 rounded-lg shadow-md"
    >
      <h2 className="text-xl font-semibold text-gray-700 text-center">
        Update Product
      </h2>

      <input
        type="text"
        name="name"
        placeholder="Product name"
        value={formData.name}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
      />

      <input
        type="number"
        name="price"
        placeholder="Product price"
        value={formData.price}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
      />

      <select
        name="category"
        value={formData.category}
        onChange={handleChange}
        required
        className="w-full border border-gray-300 px-4 py-2 rounded focus:ring-2 focus:ring-indigo-500"
      >
        <option value="">Select category</option>
        <option value="burger">Burger</option>
        <option value="pizza">Pizza</option>
        <option value="desserts">Desserts</option>
        <option value="drinks">Drinks</option>
      </select>

      <input
        type="file"
        name="image"
        onChange={handleChange}
        accept="image/*"
        className="w-full border border-gray-300 text-gray-600 px-4 py-2 rounded cursor-pointer focus:ring-2 focus:ring-indigo-500"
      />

      <button
        type="submit"
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded transition-colors"
      >
        Update Product
      </button>
    </form>
  );
}

export default UpdateProduct;