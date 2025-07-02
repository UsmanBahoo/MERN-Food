import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import useCart from '../contexts/Cart/UseCart';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function QuickNow() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/admin/products`);
      if (response.status === 200) {
        const products = response.data.products;
        const product = products.find(p => p._id === id);
        if (product) {
          setItem({
            ...product,
            image: product.image ? `${API_BASE_URL}${product.image}` : '/placeholder-image.jpg'
          });
        } else {
          navigate('/menu');
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
      navigate('/menu');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (item) {
      const cartItem = {
        ...item,
        quantity: quantity
      };
      addToCart(cartItem);
      alert(`${item.name} added to cart!`);
    }
  };

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!item) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <button
            onClick={() => navigate('/menu')}
            className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
          >
            Back to Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-10 container mx-auto my-4 flex flex-col items-center px-4">
      <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
        Quick View - {item.name}
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap justify-between items-center gap-4 auto-cols-fr">
        <div className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
          {/* Image */}
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-full h-76 object-cover rounded-lg"
            onError={(e) => {
              e.target.src = '/placeholder-image.jpg';
            }}
          />
          {/* Text Content */}
          <h1 className="mt-6 text-gray-700 text-sm capitalize">
            {item.category || "Food Item"}
          </h1>
          <h3 className="mt-6 text-lg font-semibold">{item.name}</h3>
          {/* Price and Quantity */}
          <div className="mt-6 flex justify-between items-center">
            <span className="text-xl font-bold text-gray-900">Rs. {item.price}</span>
            <input
              type="number"
              className="w-16 p-2 border rounded text-center"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
            />
          </div>
          <div className="mt-4">
            <button
              onClick={handleAddToCart}
              className="w-full border border-black text-black px-6 py-2 hover:bg-gray-900 hover:text-white transition duration-300 rounded"
            >
              Add To Cart
            </button>
          </div>
          <div className="mt-4">
            <button
              onClick={() => navigate('/menu')}
              className="w-full bg-gray-200 text-gray-700 px-6 py-2 hover:bg-gray-300 transition duration-300 rounded"
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuickNow;
