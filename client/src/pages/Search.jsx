import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCart from "../contexts/Cart/UseCart";
import axios from "axios";
import API_BASE_URL from "../config/api";

const Search = () => {
  const [query, setQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/products`);
      if (response.status === 200) {
        setProducts(response.data.products || []);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product, quantity = 1) => {
    const item = {
      ...product,
      id: product._id,
      image: `${API_BASE_URL}${product.image}`,
      quantity: quantity,
    };
    addToCart(item);
    alert(`${product.name} added to cart!`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!query.trim()) {
      alert("Please enter a search term");
      return;
    }

    setLoading(true);
    setHasSearched(true);

    // Search for products by name or category
    const filteredProducts = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(filteredProducts);
    setLoading(false);
  };

  const clearSearch = () => {
    setQuery("");
    setSearchResults([]);
    setHasSearched(false);
  };

  return (
    <div>
      {/* Header Section */}
      <section className="header">
        <div className="w-full bg-gray-900 text-white text-center py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-semibold text-4xl md:text-6xl">Search</h1>
            <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
              <Link
                to="/home"
                className="text-xl md:text-2xl text-yellow-400 hover:text-yellow-500 transition capitalize"
              >
                Home
              </Link>
              <span className="text-xl md:text-2xl text-gray-200">
                / Search
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Form */}
      <section className="py-10">
        <div className="container mx-auto px-4">
          <form
            className="mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search for products, categories..."
              className="w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              type="submit"
              disabled={loading}
              className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>

          {hasSearched && (
            <div className="text-center mt-4">
              <button
                onClick={clearSearch}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                Clear Search
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Search Results */}
      {hasSearched && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-center mb-6">
              Search Results for "{query}"
            </h2>

            {loading ? (
              <div className="flex justify-center items-center min-h-[200px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
              </div>
            ) : searchResults.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-4">
                {searchResults.map((product) => (
                  <ProductCard
                    key={product._id}
                    item={product}
                    onAdd={handleAddToCart}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <h3 className="text-xl font-semibold text-gray-600 mb-2">
                  No products found
                </h3>
                <p className="text-gray-500 mb-4">
                  Try searching with different keywords
                </p>
                <Link
                  to="/menu"
                  className="bg-gray-900 text-white px-6 py-2 rounded hover:bg-gray-700 transition"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
};

// Product Card Component
const ProductCard = ({ item, onAdd }) => {
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
    <div className="border rounded-lg p-4 bg-white shadow-lg w-full max-w-sm mx-auto relative group">
      <div className="absolute top-2 left-2 right-2 flex justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
        <div className="bg-white p-2 rounded-full shadow-md">
          <Link to={`/quick/${item._id}`}>
            <button className="cursor-pointer">
              <img
                src="/Svg/eye-solid.svg"
                alt="View"
                className="w-5 h-5"
              />
            </button>
          </Link>
        </div>
        <div className="bg-white p-2 rounded-full shadow-md">
          <button onClick={handleAddClick} className="cursor-pointer">
            <img
              src="/Svg/cart-shopping-solid.svg"
              alt="Cart"
              className="w-5 h-5"
            />
          </button>
        </div>
      </div>
      <img
        src={`${API_BASE_URL}${item.image}`}
        alt={item.name}
        className="w-full h-48 object-cover rounded-lg"
        onError={(e) => {
          e.target.src = "/placeholder-image.jpg";
        }}
      />
      <h1 className="mt-4 text-gray-700 text-sm capitalize">
        {item.category}
      </h1>
      <h3 className="mt-2 text-lg font-semibold">{item.name}</h3>
      <div className="mt-4 flex justify-between items-center">
        <span className="text-xl font-bold text-gray-900">
          Rs. {item.price}
        </span>
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
          onClick={handleAddClick}
          className="w-full bg-gray-900 text-white py-2 rounded hover:bg-gray-700 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Search;
