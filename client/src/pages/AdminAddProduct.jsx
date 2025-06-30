import { useState } from "react";
import { Link } from "react-router-dom";

function AdminAddProduct() {
  const [products, setProducts] = useState([
    {
      name: "Zinger Burger",
      price: 500,
      category: "Burger",
      image: "/Image/a.png",
    },
    {
      name: "Krunch Burger",
      price: 350,
      category: "Burger",
      image: "/Image/bg.png",
    },
    {
      name: "Krunch Chicken Combo",
      price: 520,
      category: "Burger",
      image: "/Image/z1.png",
    },
    {
      name: "Veggie Pizza",
      price: 1500,
      category: "Pizza",
      image: "/Image/p1.png",
    },
    {
      name: "Pizza Chicken Tikka",
      price: 2500,
      category: "Pizza",
      image: "/Image/p2.png",
    },
    {
      name: "Creamy Chicken Delight",
      price: 3000,
      category: "Pizza",
      image: "/Image/p3.png",
    },
    {
      name: "Roasted Strawberry Crumble",
      price: 5000,
      category: "Desserts",
      image: "/Image/d1.png",
    },
    {
      name: "Angel Food Cake",
      price: 2000,
      category: "Desserts",
      image: "/Image/d2.png",
    },
    {
      name: "Almond and Date Cake",
      price: 1200,
      category: "Desserts",
      image: "/Image/d3.png",
    },
    {
      name: "Red Bull",
      price: 500,
      category: "Drink",
      image: "/Image/a3.png",
    },
    {
      name: "Coke",
      price: 100,
      category: "Drink",
      image: "/Image/a1.png",
    },
    {
      name: "Sprite",
      price: 90,
      category: "Drink",
      image: "/Image/a2.png",
    },
  ]);

  // Handle product deletion
  const handleDelete = (index) => {
    setProducts(products.filter((_, i) => i !== index));
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white">
      <h2 className="text-2xl font-semibold text-center mb-6">Add Product</h2>

      {/* Form Section */}
      <div className="max-w-md mx-auto mb-10 bg-white border border-gray-300 rounded-lg shadow-md p-6">
        <form className="space-y-4">
          <input
            type="text"
            placeholder="Enter product name"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <input
            type="text"
            placeholder="Enter product price"
            className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <select className="w-full border border-gray-300 px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="">Select category --</option>
            <option value="burger">Burger</option>
            <option value="pizza">Pizza</option>
            <option value="desserts">Desserts</option>
            <option value="drinks">Drinks</option>
          </select>
          <input
            type="file"
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


      {/* Products Grid - Only 3 cards per row using flex */}
      <div className="flex flex-wrap ">
        {products.map((item, index) => (
          <div key={index} className="w-1/3 flex justify-center mb-6">
            <ProductCard
              name={item.name}
              price={item.price}
              category={item.category}
              image={item.image}
              onDelete={() => handleDelete(index)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// ProductCard Component
function ProductCard({ name, price, category, image, onDelete }) {
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
          to="/admindashboard/updateproduct"
          state={{ product: { name, price, category, image } }}
        >
          <button className="bg-yellow-400 text-white text-sm px-6 py-2 rounded hover:bg-yellow-500">
            Update
          </button>
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

export default AdminAddProduct;
