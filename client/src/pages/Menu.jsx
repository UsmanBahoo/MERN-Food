import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../contexts/Cart/UseCart";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      if (response.status === 200) {
        setProducts(response.data.products || []);
        setFilteredProducts(response.data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "all") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(
        products.filter((product) => product.category === category)
      );
    }
  };

  const handleAddToCart = (product) => {
    addToCart({
      ...product,
      image: `${API_BASE_URL}${product.image}`,
      quantity: 1,
    });
    alert(`${product.name} added to cart!`);
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

      {/* Category Filter */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-center space-x-4 mb-8">
            {["all", "burger", "pizza", "desserts", "drinks"].map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryFilter(category)}
                className={`px-6 py-2 rounded-lg font-semibold transition ${
                  selectedCategory === category
                    ? "bg-yellow-400 text-gray-900"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <div
                  key={product._id}
                  className="border rounded-lg p-4 bg-white shadow-lg"
                >
                  <img
                    src={`${API_BASE_URL}${product.image}`}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "/placeholder-image.jpg";
                    }}
                  />
                  <div className="mt-4">
                    <h3 className="text-lg font-semibold">{product.name}</h3>
                    <p className="text-gray-600 capitalize">{product.category}</p>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-xl font-bold text-gray-900">
                        Rs. {product.price}
                      </span>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gray-900 text-white px-4 py-2 rounded hover:bg-gray-700 transition"
                      >
                        Add to Cart
                      </button>
                      <Link
                        to={`/quick/${product._id}`}
                        className="flex-1 border border-gray-900 text-gray-900 px-4 py-2 rounded hover:bg-gray-100 transition text-center"
                      >
                        Quick View
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <h3 className="text-2xl font-semibold text-gray-600">
                No products found
              </h3>
              <p className="text-gray-500 mt-2">
                Try selecting a different category
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Menu;