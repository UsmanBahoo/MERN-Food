import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAuth from "../contexts/Auth/UseAuth";
import API_BASE_URL from "../config/api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { isLoggedIn, user } = useAuth();

  // Mock fetching orders
  useEffect(() => {
    if (isLoggedIn && user?._id) {
      axios.get(`${API_BASE_URL}/api/orders/user/${user._id}`) // Fetch orders for the logged-in user
        .then((response) => {
          console.log("Orders fetched successfully:", response.data);
          setOrders(response.data); // Assuming the response contains an array of orders
          //setOrders(response.data.orders); // Assuming the response contains an array of orders
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
        });
    }
  }, [isLoggedIn, user]);

  return (
    <div>
      {/* Header Section */}
      <section className="header">
        <div className="w-full bg-gray-900 text-white text-center py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-semibold text-4xl md:text-6xl">Orders</h1>
            <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
              <Link
                to="/home"
                className="text-xl md:text-2xl text-yellow-400 hover:text-yellow-500 transition capitalize"
              >
                Home
              </Link>
              <span className="text-xl md:text-2xl text-gray-200">/ Orders</span>
            </div>
          </div>
        </div>
      </section>

      {/* Orders Section */}
      <section className="orders py-10">
        <div className="container mx-auto px-4">
          <h1 className="text-center text-4xl font-bold mb-8 underline decoration-yellow-400">
            Your Orders
          </h1>

          {isLoggedIn ? (
            orders.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {orders.map((order) => {
                  // Status color mapping
                  const statusColors = {
                    pending: "text-red-500",
                    confirmed: "text-blue-500",
                    preparing: "text-yellow-500",
                    "out for delivery": "text-purple-500",
                    delivered: "text-green-500",
                    cancelled: "text-gray-500",
                  };
                  const status = order.status?.toLowerCase();
                  const statusColor = statusColors[status] || "text-gray-700";
                  return (
                    <div
                      key={order._id}
                      className="border border-gray-300 p-6 rounded-lg shadow-md bg-white"
                    >
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Placed On:</span>{" "}
                        {order.updatedAt.substring(0, 10)}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Name:</span> {user.name}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Email:</span> {user.email}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Number:</span>{" "}
                        {user.phone}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Address:</span>{" "}
                        {order.shippingAddress.city}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Payment Method:</span>{" "}
                        {order.paymentMethod}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Total Products:</span>{" "}
                        {order.products.length}
                      </p>
                      <p className="text-gray-700 mb-2">
                        <span className="font-semibold">Total Price:</span> Rs.
                        {order.totalPrice}/-
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Order Status:</span>{" "}
                        <span className={`font-bold ${statusColor}`}>
                          {order.status}
                        </span>
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-2xl text-red-500">
                No orders placed yet!
              </p>
            )
          ) : (
            <p className="text-center text-2xl text-red-500">
              Please login to see your orders.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default Orders;