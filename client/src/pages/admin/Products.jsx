import React, { useEffect } from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function Products() {
    const [products, setProducts] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        price: '',
        category: '',
        image: null
    });
    const [alert, setAlert] = useState(null);

    useEffect(() => {
        fetchProducts();
    }, [])

    const fetchProducts = () => {
        axios.get(`${API_BASE_URL}/api/products`)
            .then(response => {
                if (response.status === 200) {
                    setProducts(response.data.products || []);
                } else {
                    console.error("Failed to fetch products");
                    setProducts([]);
                }
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                setProducts([]);
            });
    }

    const handleInputChange = (e) => {
        const { name, value, type, files } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'file' ? files[0] : value
        }));
    }

    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!formData.name || !formData.price || !formData.category || !formData.image) {
            alert('Please fill in all fields including image');
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('name', formData.name);
        formDataToSend.append('price', formData.price);
        formDataToSend.append('category', formData.category);
        formDataToSend.append('image', formData.image);

        try {
            const response = await axios.post(`${API_BASE_URL}/api/products`, formDataToSend, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            
            if (response.status === 201) {
                showAlert("success", "Product added successfully!");
                setFormData({ name: '', price: '', category: '', image: null });
                // Reset file input
                const fileInput = document.querySelector('input[type="file"]');
                if (fileInput) fileInput.value = '';
                fetchProducts();
            }
        } catch (error) {
            console.error('Error adding product:', error);
            showAlert("error", "Failed to add product. Please try again.");
        }
    }


    const handleDelete = async (productId) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                await axios.delete(`${API_BASE_URL}/api/products/${productId}`);
                showAlert("success", "Product deleted successfully!");
                fetchProducts();
            } catch (error) {
                console.error('Error deleting product:', error);
                showAlert("error", "Failed to delete product.");
            }
        }
    }

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white">
          <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>
    
          {/* Form Section */}
          <div className="max-w-md mx-auto mb-10 bg-white border border-gray-300 rounded-lg shadow-md p-6">
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Enter product name"
                value={formData.name}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="number"
                name="price"
                placeholder="Enter product price"
                value={formData.price}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <select 
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select category --</option>
                <option value="burger">Burger</option>
                <option value="pizza">Pizza</option>
                <option value="desserts">Desserts</option>
                <option value="drinks">Drinks</option>
              </select>
              <input
                type="file"
                name="image"
                onChange={handleInputChange}
                accept="image/*"
                required
                className="w-full border border-gray-300 text-gray-600 px-4 py-2 rounded cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="submit"
                className="w-full bg-indigo-700 text-white py-2 rounded hover:bg-indigo-800 transition"
              >
                Add Product
              </button>
            </form>
          </div>
    
          {/* Show fallback message when no products */}
          {(!products || !Array.isArray(products) || products.length === 0) && (
            <div className="text-center text-gray-500 mb-6">
              <p>No products available. Please add some products.</p>
            </div>
          )}
    
          {/* Products Grid */}
          {Array.isArray(products) && products.length > 0 && (
            <div className="flex flex-wrap ">
              {products.map((item, index) => (
                <div key={item._id || index} className="w-1/3 flex justify-center mb-6">
                  <ProductCard
                    id={item._id}
                    name={item.name}
                    price={item.price}
                    category={item.category}
                    image={item.image ? item.image : '/placeholder-image.jpg'}
                    onDelete={() => handleDelete(item._id)}
                  />
                </div>
              ))}
            </div>
          )}

          {alert && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
          alert.type === 'success' ? 'bg-green-500 text-white' 
          : alert.type === 'error' ? 'bg-red-500 text-white'
          : 'bg-blue-500 text-white'
        }`}>
          <div className="flex items-center justify-between">
            <span>{alert.message}</span>
            <button 
              onClick={() => setAlert(null)}
              className="ml-3 text-white hover:text-gray-200"
            >
              ×
            </button>
          </div>
        </div>
      )}
        </div>
      );
}

function ProductCard({id, name, price, category, image, onDelete }) {
  return (
    <div className="border rounded-lg shadow-sm p-3 w-[350px] bg-white h-auto flex flex-col">
      <img
        src={image}
        alt={name}
        className="w-full h-[320px] object-cover rounded-md mb-2"
      />
      <p className="text-sm text-gray-700 mb-1 flex justify-between w-full">
        <span className="font-semibold">Rs.{price}</span>
        <em className="text-md not-italic">{category}</em>
      </p>
      <p className="text-md text-left mb-2 not-italic">{name}</p>
      <div className="flex justify-between mt-auto">
        <Link
          to="/admin/product/update"
          state={{ product: {id, name, price, category, image } }}
          className="bg-yellow-400 text-white text-sm px-6 py-2 rounded hover:bg-yellow-500 flex items-center justify-center"
        >
          Update
        </Link>
        <button
          onClick={onDelete}
          className="bg-red-500 text-white text-sm px-6 py-2 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
}
export default Products