import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../contexts/Cart/UseCart";
import { fetchProducts } from "../services/productService";
import API_BASE_URL from "../config/api";

const Menu = () => {
  const { addItem } = useCart();
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const products = await fetchProducts();
        setMenuItems(products);
        setError(null);
      } catch (err) {
        setError('Failed to load menu items');
        console.error('Error loading products:', err);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  const handleAddToCart = async (item) => {
    await addItem(item);
  };

  // Helper function to categorize items
  const getItemsByCategory = (category) => {
    return menuItems.filter(item => 
      item.category.toLowerCase() === category.toLowerCase()
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl">Loading menu...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-2xl text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <section className="header">
        <div className="w-full bg-gray-900 text-white text-center py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-semibold text-6xl md:text-6xl">Menu</h1>
            <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
              <Link to="/home" className="text-2xl text-yellow-400 hover:text-yellow-500 transition">
                Home
              </Link>
              <em className="text-2xl not-italic text-gray-200">/ Menu</em>
            </div>
          </div>
        </div>
      </section>

      {/* Burgers Section */}
      {getItemsByCategory('burger').length > 0 && (
        <section className="Foodcard">
          <div className="mt-[100px] container mx-auto my-4 flex flex-col items-center">
            <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
              BURGERS
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
              {getItemsByCategory('burger').map((item) => (
                <div key={item._id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                  <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <Link to={`/product/${item._id}`}>
                        <button>
                          <img src="Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <button onClick={() => handleAddToCart(item)}>
                        <img src="Svg/cart-shopping-solid.svg" alt="Cart" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <img src={`${API_BASE_URL}${item.image}`} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
                  <h1 className="mt-6 text-gray-700 text-sm">{item.category}</h1>
                  <h3 className="mt-6 text-lg font-semibold">{item.name}</h3>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Rs. {item.price}</span>
                    <input type="number" className="w-16 p-2 border rounded text-center" defaultValue="1" min="1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Pizzas Section */}
      {getItemsByCategory('pizza').length > 0 && (
        <section className="Foodcard1">
          <div className="container mx-auto my-4 flex flex-col items-center">
            <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
              PIZZAS
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
              {getItemsByCategory('pizza').map((item) => (
                <div key={item._id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                  <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <Link to={`/product/${item._id}`}>
                        <button>
                          <img src="Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <button onClick={() => handleAddToCart(item)}>
                        <img src="Svg/cart-shopping-solid.svg" alt="Cart" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <img src={`${API_BASE_URL}${item.image}`} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
                  <h1 className="mt-6 text-gray-700 text-sm">{item.category}</h1>
                  <h3 className="mt-6 text-lg font-semibold">{item.name}</h3>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Rs. {item.price}</span>
                    <input type="number" className="w-16 p-2 border rounded text-center" defaultValue="1" min="1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Desserts Section */}
      {getItemsByCategory('desserts').length > 0 && (
        <section className="Foodcard2">
          <div className="container mx-auto my-4 flex flex-col items-center">
            <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
              DESSERTS
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
              {getItemsByCategory('desserts').map((item) => (
                <div key={item._id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                  <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <Link to={`/product/${item._id}`}>
                        <button>
                          <img src="Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <button onClick={() => handleAddToCart(item)}>
                        <img src="Svg/cart-shopping-solid.svg" alt="Cart" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <img src={`${API_BASE_URL}${item.image}`} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
                  <h1 className="mt-6 text-gray-700 text-sm">{item.category}</h1>
                  <h3 className="mt-6 text-lg font-semibold">{item.name}</h3>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Rs. {item.price}</span>
                    <input type="number" className="w-16 p-2 border rounded text-center" defaultValue="1" min="1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Drinks Section */}
      {getItemsByCategory('drinks').length > 0 && (
        <section className="Foodcard3">
          <div className="container mx-auto my-4 flex flex-col items-center">
            <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
              DRINKS
            </h1>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
              {getItemsByCategory('drinks').map((item) => (
                <div key={item._id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                  <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <Link to={`/product/${item._id}`}>
                        <button>
                          <img src="Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
                        </button>
                      </Link>
                    </div>
                    <div className="bg-white p-2 rounded-full shadow-md">
                      <button onClick={() => handleAddToCart(item)}>
                        <img src="Svg/cart-shopping-solid.svg" alt="Cart" className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                  <img src={`${API_BASE_URL}${item.image}`} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
                  <h1 className="mt-6 text-gray-700 text-sm">{item.category}</h1>
                  <h3 className="mt-6 text-lg font-semibold">{item.name}</h3>
                  <div className="mt-6 flex justify-between items-center">
                    <span className="text-xl font-bold text-gray-900">Rs. {item.price}</span>
                    <input type="number" className="w-16 p-2 border rounded text-center" defaultValue="1" min="1" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Menu; 