import React, { useState } from "react";
import Cart from "./Cart"; // Ensure this path is correct

const Search = () => {
  const [query, setQuery] = useState("");
  const [showCart, setShowCart] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim().toLowerCase().includes("cart")) {
      setShowCart(true);
    } else {
      setShowCart(false);
      alert("No results found for '" + query + "'");
    }
  };

  return (
    <div>
      <form
        className="mt-10 mx-auto max-w-xl py-2 px-6 rounded-full bg-gray-50 border flex focus-within:border-gray-300"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          placeholder="Search anything"
          className=" w-full focus:outline-none pr-4 font-semibold border-0 focus:ring-0 px-0 py-0"
          name="topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          type="submit"
          className="flex flex-row items-center justify-center min-w-[130px] px-4 rounded-full border disabled:cursor-not-allowed disabled:opacity-50 transition ease-in-out duration-150 text-base bg-black text-white font-medium tracking-wide border-transparent py-1.5 h-[38px] -mr-3"
        >
          Search
        </button>
      </form>

      {/* Show Cart component conditionally */}
      {showCart && <Cart />}
    </div>
  );
};

export default Search;
