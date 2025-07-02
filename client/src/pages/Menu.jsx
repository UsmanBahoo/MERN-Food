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
            <div className="mt-[100px] container mx-auto my-4 flex flex-col items-center">
              <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
                BURGERS
              </h1>
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
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
            <div className="container mx-auto my-4 flex flex-col items-center">
              <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
                PIZZAS
              </h1>
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
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
            <div className="container mx-auto my-4 flex flex-col items-center">
              <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
                DESSERTS
              </h1>
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
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
            <div className="container mx-auto my-4 flex flex-col items-center">
              <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
                DRINKS
              </h1>
              <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
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
    <div className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
      <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="bg-white p-2 rounded-full shadow-md">
          <Link to={`/quick/${item._id}`}>
            <button className="cursor-pointer">
              <img src="/Svg/eye-solid.svg" alt="View" className="w-5 h-5" />
            </button>
          </Link>
        </div>
        <div className="bg-white p-2 rounded-full shadow-md">
          <button onClick={handleAddClick} className="cursor-pointer">
            <img src="/Svg/cart-shopping-solid.svg" alt="Cart" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <img
        src={`${API_BASE_URL}${item.image}`}
        alt={item.name}
        className="w-full h-64 object-cover rounded-lg"
        onError={(e) => {
          e.target.src = "/placeholder-image.jpg";
        }}
      />
      <h1 className="mt-6 text-gray-700 text-sm capitalize">{item.category}</h1>
      <h3 className="mt-6 text-lg font-semibold">{item.name}</h3>
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

    </div>
  );
};

export default Menu;