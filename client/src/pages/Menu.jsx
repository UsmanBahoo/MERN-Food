import React from "react";
import { Link } from "react-router-dom";
import useCart from "../contexts/Cart/UseCart";

const Menu = () => {

  const { addItem } = useCart();

  const handleAddToCart = async (item) => {
    await addItem(item)
  };

  const menuItems = [
    { id: 1, name: "Zinger Burger", category: "Burger", price: 550, image: "Image/a.png", quickPath: "/Quicknow" },
    { id: 2, name: "Krunch Burger", category: "Burger", price: 350, image: "Image/bg.png", quickPath: "/Quicknow2" },
    { id: 3, name: "Krunch Chicken Combo", category: "Burger", price: 520, image: "Image/z1.png", quickPath: "/Quicknow3" },
    { id: 4, name: "Veggie Pizza", category: "Pizza", price: 1500, image: "Image/p1.png", quickPath: "/Quicknow4" },
    { id: 5, name: "Pizza Chicken Tikka", category: "Pizza", price: 2500, image: "Image/p2.png", quickPath: "/Quicknow5" },
    { id: 6, name: "Creamy Chicken Delight", category: "Pizza", price: 3000, image: "Image/p3.png", quickPath: "/Quicknow6" },
    { id: 7, name: "Roasted Strawberry Crumble", category: "Desserts", price: 5000, image: "Image/d1.png", quickPath: "/Quicknow7" },
    { id: 8, name: "Angel Food Cake", category: "Desserts", price: 2000, image: "Image/d2.png", quickPath: "/Quicknow8" },
    { id: 9, name: "Almond and Date Cake", category: "Desserts", price: 1200, image: "Image/d3.png", quickPath: "/Quicknow9" },
    { id: 10, name: "Red Bull", category: "Drink", price: 500, image: "Image/a3.png", quickPath: "/Quicknow10" },
    { id: 11, name: "Coke", category: "Drink", price: 100, image: "Image/a1.png", quickPath: "/Quicknow11" },
    { id: 12, name: "Sprite", category: "Drink", price: 1200, image: "Image/a2.png", quickPath: "/Quicknow12" },
  ];

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
      <section className="Foodcard">
        <div className="mt-[100px] container mx-auto my-4 flex flex-col items-center">
          <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
            BURGERS
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
            {menuItems.slice(0, 3).map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <Link to={item.quickPath}>
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
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
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

      {/* Pizzas Section */}
      <section className="Foodcard1">
        <div className="container mx-auto my-4 flex flex-col items-center">
          <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
            PIZZAS
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
            {menuItems.slice(3, 6).map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <Link to={item.quickPath}>
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
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
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

      {/* Desserts Section */}
      <section className="Foodcard2">
        <div className="container mx-auto my-4 flex flex-col items-center">
          <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
            DESSERTS
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
            {menuItems.slice(6, 9).map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <Link to={item.quickPath}>
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
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
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

      {/* Drinks Section */}
      <section className="Foodcard3">
        <div className="container mx-auto my-4 flex flex-col items-center">
          <h1 className="mt-2 text-2xl sm:text-3xl underline underline-offset-4 decoration-rose-600 decoration-4 font-bold text-center text-gray-900 mb-6">
            DRINKS
          </h1>
          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-8 auto-cols-fr">
            {menuItems.slice(9).map((item) => (
              <div key={item.id} className="border rounded-lg p-4 bg-white shadow-lg w-80 relative group">
                <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-white p-2 rounded-full shadow-md">
                    <Link to={item.quickPath}>
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
                <img src={item.image} alt={item.name} className="w-full h-64 object-cover rounded-lg" />
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
    </div>
  );
}

export default Menu; 