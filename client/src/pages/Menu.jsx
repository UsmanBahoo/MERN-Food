import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../contexts/Cart/UseCart";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      if (response.status === 200) {
        setMenuItems(response.data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (product, quantity = 1) => {
    try {
      const item = {
      ...product,
      id: product._id,
      image: `${API_BASE_URL}${product.image}`,
      quantity: quantity,
    };
    addItem(item);
    alert(`${product.name} (${quantity}) added to cart!`);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div>
      <section className="header">
        <div className="w-full bg-gray-900 text-white text-center py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-semibold text-6xl md:text-6xl">Menu</h1>
            <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
              <Link
                to="/home"
                className="text-2xl text-yellow-400 hover:text-yellow-500 transition"
              >
                Home
              </Link>
              <em className="text-2xl not-italic text-gray-200">/ Menu</em>
            </div>
          </div>
        </div>
      </section>

      {loading ? (
        <div className="flex justify-center items-center min-h-[400px]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* Burgers Section */} 
          <section className="Foodcard">
            <div className="mt-16 sm:mt-20 md:mt-[100px] container mx-auto px-4 sm:px-6 lg:px-8 my-4 flex flex-col items-center">
              <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-4 sm:mb-6">
                BURGERS
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl justify-items-center">
                {menuItems
                  .filter((item) => item.category === "burger")
                  .map((item) => (
                    <MenuCard key={item._id} item={item} onAdd={handleAddToCart} />
                  ))}
              </div>
            </div>
          </section>

          {/* Pizzas Section */}
          <section className="Foodcard1">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-4 flex flex-col items-center">
              <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-4 sm:mb-6">
                PIZZA
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl justify-items-center">
                {menuItems
                  .filter((item) => item.category === "pizza")
                  .map((item) => (
                    <MenuCard key={item._id} item={item} onAdd={handleAddToCart} />
                  ))}
              </div>
            </div>
          </section>

          {/* Desserts Section */}
          <section className="Foodcard2">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-4 flex flex-col items-center">
              <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-4 sm:mb-6">
                DESSERTS
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl justify-items-center">
                {menuItems
                  .filter((item) => item.category === "desserts")
                  .map((item) => (
                    <MenuCard key={item._id} item={item} onAdd={handleAddToCart} />
                  ))}
              </div>
            </div>
          </section>

          {/* Drinks Section */}
          <section className="Foodcard3">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 my-4 flex flex-col items-center">
              <h1 className="mt-2 text-xl sm:text-2xl md:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-4 sm:mb-6">
                DRINKS
              </h1>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 w-full max-w-6xl justify-items-center">
                {menuItems
                  .filter((item) => item.category === "drinks")
                  .map((item) => (
                    <MenuCard key={item._id} item={item} onAdd={handleAddToCart} />
                  ))}
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

// Reusable Card Component
const MenuCard = ({ item, onAdd }) => {
  const [quantity, setQuantity] = useState(1);

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const handleAddClick = () => {
    onAdd(item, quantity);
  };

  return (
    <div className="border rounded-lg p-3 sm:p-4 md:p-5 bg-white shadow-lg relative group hover:shadow-xl transition-shadow duration-300 w-full max-w-sm mx-auto">
      <div className="absolute top-2 lg:top-3 left-2 lg:left-3 right-2 lg:right-3 flex justify-between
        opacity-100 lg:opacity-0 lg:group-hover:opacity-100
        transition-opacity duration-300 z-10">
        <div className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
          <Link to={`/quick/${item._id}`}>
            <button className="cursor-pointer">
              <img src="/Svg/eye-solid.svg" alt="View" className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </Link>
        </div>
        <div className="bg-white p-1.5 sm:p-2 rounded-full shadow-md hover:shadow-lg transition-shadow">
          <button onClick={handleAddClick} className="cursor-pointer">
            <img src="/Svg/cart-shopping-solid.svg" alt="Cart" className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
      <div className="w-full h-40 sm:h-48 md:h-52 lg:h-56 overflow-hidden rounded-lg bg-gray-100 flex items-center justify-center">
        <img
          src={`${API_BASE_URL}${item.image}`}
          alt={item.name}
          className="w-full h-full object-contain hover:scale-105 transition-transform duration-300"
        />
      </div>
      <h1 className="mt-3 sm:mt-4 md:mt-6 text-gray-700 text-xs sm:text-sm capitalize">{item.category}</h1>
      <h3 className="mt-2 sm:mt-3 md:mt-4 text-base sm:text-lg font-semibold line-clamp-2">{item.name}</h3>
      <div className="mt-3 sm:mt-4 md:mt-6 flex justify-between items-center">
        <span className="text-lg sm:text-xl font-bold text-gray-900">Rs. {item.price}</span>
        <input
          type="number"
          className="w-12 sm:w-14 md:w-16 p-1 sm:p-2 border border-gray-300 rounded text-center text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          value={quantity}
          onChange={handleQuantityChange}
          min="1"
        />
      </div>
    </div>
  );
};

export default Menu;