import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import useCart from "../contexts/Cart/UseCart";
import useShippingContext from "../contexts/Shipping/UseShippingContext"; // Importing the custom hook to access shipping context
import useAuth from "../contexts/Auth/UseAuth"; // Importing the custom hook to access authentication context
import axios from "axios";

const Checkout = () => {
  const { cart, getTotalPrice, clearCart } = useCart(); // Get cart items from context
  const { address, clearAddress } = useShippingContext(); // Get address from shipping context
  const { user } = useAuth(); // Get user info from authentication context
  const navigate = useNavigate();

  const total = getTotalPrice(); // Calculate total price from cart items

  const [ success, setSuccess ] = useState(false);
  const [ error, setError ] = useState(false);

  const cartItems = [
    ...cart.map(item => ({
      name: item.name,
      price: item.price,
      quantity: item.quantity || 1,
      total: item.price * (item.quantity || 1),
    })),
    {
      name: "Grand Total",
      price: cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    },
  ];

  const [paymenMethod, setPaymentMethod] = useState("");


  const handlePlaceOrder = async () => {
    if (!paymenMethod) {
      alert("Please select a payment method!");
      return;
    }

  
    const products = cart.map(item => {
      return {
        productId: item.id,
        quantity: item.quantity || 1,
      };
    })
    const totalPrice = getTotalPrice();
    const paymentMethod = paymenMethod;
    const shippingAddress = {
      flat: address.flatNo,
      building: address.buildingNo,
      area: address.areaName,
      town: address.townName,
      city: address.cityName,
      state: address.stateName,
      country: address.countryName,
      pincode: address.pinCode,
    }

    const data = {
      user,
      products,
      totalPrice,
      paymentMethod,
      shippingAddress,
    }

    await axios.post("http://localhost:5000/api/order", data)
    .then((response) => {
      console.log("Order placed successfully:", response.data);
      setSuccess(true);
      clearCart(); // Clear the cart after placing the order
      clearAddress(); // Clear the address after placing the order
      navigate("/order");
    })
    .catch((error) => {
      console.error("Error placing order:", error);
      alert("Error placing order. Please try again.");
    });

    
  };

  return (
    <div>
      <section className="header">
        <div className="w-full bg-gray-900 text-white text-center py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-semibold text-4xl md:text-6xl">Checkout</h1>
            <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
              <Link
                to="/home"
                className="text-xl md:text-2xl text-yellow-400 hover:text-yellow-500 transition capitalize"
              >
                Home
              </Link>
              <span className="text-xl md:text-2xl text-gray-200">/ Checkout</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10">
        <h1 className="text-3xl font-bold text-center mb-8 underline decoration-rose-600 underline-offset-8">
          ORDER SUMMARY
        </h1>
        <div className="max-w-md mx-auto border rounded-lg shadow-lg p-6 bg-white">
          <div className="mb-6">
            <div className="bg-black text-white p-4 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className={`flex justify-between my-4 text-md p-2 ${
                    item.name === "Grand Total" ? "bg-gray-800 font-bold" : "bg-white text-gray-700"
                  }`}
                >
                  <span>{item.name}</span>
                  {item.quantity ? (
                    <span>
                      Rs. {item.price.toFixed(2)} x {item.quantity} = Rs. {item.total.toFixed(2)}
                    </span>
                  ) : (
                    <span>Rs. {item.price.toFixed(2)}</span>
                  )}
                </div>
              ))}
              <Link to="/cart">
                <button className="px-6 mt-4 bg-yellow-400 text-white font-medium py-2 rounded-lg hover:bg-yellow-500 transition">
                  View Cart
                </button>
              </Link>
            </div>
          </div>

          <div>
             {user && (
              <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">USER INFO</h3>
                <p className="text-gray-700">{user.name}</p>
                <p className="text-gray-700">{user.email}</p>
                <p className="text-gray-700">{user.phone}</p>
              </div>
             )}
          </div>

          <div className="mb-6">
            <Link to="/profile/update">
              <button className="px-6 mt-4 bg-yellow-400 text-white font-medium py-2 rounded-lg hover:bg-yellow-500 transition">
                Update Info
              </button>
            </Link>
          </div>

          <hr />

          {address && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2">ADDRESS</h3>
              <p className="text-gray-700">{address.flatNo}</p>
              <p className="text-gray-700">{address.buildingNo}</p>
              <p className="text-gray-700">{address.areaName}</p>
              <p className="text-gray-700">{address.townName}</p>
              <p className="text-gray-700">{address.city}</p>
              <p className="text-gray-700">{address.state}</p>
              <p className="text-gray-700">{address.pincode}</p>
              <p className="text-gray-700">{address.country}</p>

            </div>
          )}

          <div className="mb-6">
            <Link to="/address">
              <button className="px-6 mt-4 bg-yellow-400 text-white font-medium py-2 rounded-lg hover:bg-yellow-500 transition">
                Update Address
              </button>
            </Link>
          </div>

          <div className="mb-6">
            <select
              className="w-full p-2 border rounded-lg text-gray-600"
              value={paymenMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <option value="" disabled>
                Select payment method
              </option>
              <option value="Credit Card">Credit Card</option>
              <option value="Debit Card">Debit Card</option>
              <option value="Cash on Delivery">Cash on Delivery</option>
            </select>
          </div>
          <button
            className="w-full bg-red-500 text-white font-medium py-3 rounded-lg hover:bg-red-600 transition"
            onClick={handlePlaceOrder}
          >
            Place Order
          </button>
          {success && <p className="text-green-500 mt-4">Order placed successfully!</p>}
          {error && <p className="text-red-500 mt-4">Error placing order. Please try again.</p>}
        </div>
      </section>
    </div>
  );
};

export default Checkout;