import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function Orders() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = () => {
        axios.get(`${API_BASE_URL}/api/orders`)
            .then(response => {
                if (response.status === 200) {
                    setOrders(response.data.orders || []);
                } else {
                    console.error("Failed to fetch orders");
                    setOrders([]);
                }
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                setOrders([]);
            });
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        axios.patch(`${API_BASE_URL}/api/orders/${orderId}/status`, { status: newStatus })
            .then(response => {
                if (response.status === 200) {
                    alert(`Order status updated to ${newStatus}!`);
                    fetchOrders();
                }
            })
            .catch(error => {
                console.error('Error updating order status:', error);
                alert('Failed to update order status');
            });
    };

    const handleDelete = (orderId) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            axios.delete(`${API_BASE_URL}/api/orders/${orderId}`)
                .then(response => {
                    if (response.status === 200) {
                        alert('Order deleted successfully!');
                        fetchOrders();
                    }
                })
                .catch(error => {
                    console.error('Error deleting order:', error);
                    alert('Failed to delete order');
                });
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Manage Orders</h2>

            {/* Show fallback message when no orders */}
            {(!orders || !Array.isArray(orders) || orders.length === 0) && (
                <div className="text-center text-gray-500 mb-6">
                    <p>No orders available.</p>
                </div>
            )}

            {/* Orders Grid - 2 cards per row */}
            {Array.isArray(orders) && orders.length > 0 && (
                <div className="flex flex-wrap">
                    {orders.map((order, index) => (
                        <div key={order._id || index} className="w-1/2 flex justify-center mb-6 px-2">
                            <OrderCard
                                order={{
                                    ...order,
                                    customerName: order.userId?.name || order.customerName,
                                    customerEmail: order.userId?.email || order.customerEmail,
                                    customerPhone: order.userId?.phone || order.customerPhone
                                }}
                                onStatusUpdate={(newStatus) => handleStatusUpdate(order._id, newStatus)}
                                onDelete={() => handleDelete(order._id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function OrderCard({ order, onStatusUpdate, onDelete }) {
    const [currentStatus, setCurrentStatus] = useState(order.status || order.orderStatus || 'Pending');

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const handleStatusChange = (e) => {
        const newStatus = e.target.value;
        setCurrentStatus(newStatus);
    };

    const handleUpdateClick = () => {
        onStatusUpdate(currentStatus);
    };

    return (
        <>
            <div className={`border rounded-lg p-4 bg-white shadow-md w-full text-sm text-gray-800 space-y-2`}>
            <div className="space-y-2 text-sm text-gray-800">
                <p>
                    <span className="font-semibold">User ID:</span> {order.userId?._id || 'N/A'}
                </p>
                <p>
                    <span className="font-semibold">Placed On:</span> {formatDate(order.createdAt)}
                </p>
                <p>
                    <span className="font-semibold">Name:</span> {order.customerName || 'N/A'}
                </p>
                <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                        className="text-blue-600"
                        href={`mailto:${order.customerEmail || ''}`}
                    >
                        {order.customerEmail || 'N/A'}
                    </a>
                </p>
                <p>
                    <span className="font-semibold">Number:</span> {order.customerPhone || 'N/A'}
                </p>
                <p>
                    <span className="font-semibold">Address:</span> {order.shippingAddress?.flat || ''}, {order.shippingAddress?.building || ''}, {order.shippingAddress?.area || ''}, {order.shippingAddress?.town || ''}, {order.shippingAddress?.city || 'N/A'}, {order.shippingAddress?.state || ''}, {order.shippingAddress?.country || 'N/A'} - {order.shippingAddress?.pincode || 'N/A'}
                </p>
                <p>
                    <span className="font-semibold">Total Products:</span>{" "}
                    {order.products?.length || 0}
                </p>
                <p>
                    <span className="font-semibold">Total Price:</span> Rs. {order.totalPrice || 0}/-
                </p>
                <p>
                    <span className="font-semibold">Payment Method:</span> {order.paymentMethod} </p>
            </div>

            <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Order Status:
                </label>
                <select 
                    className="w-full border border-gray-300 rounded px-2 py-1 text-sm" 
                    value={currentStatus} 
                    onChange={handleStatusChange}
                >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="Out for Delivery">Out for Delivery</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                </select>
            </div>

            <div className="flex justify-between mt-4">
                <button 
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-1 rounded" 
                    onClick={handleUpdateClick}
                >
                    Update Status
                </button>
                <button 
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-1 rounded"
                    onClick={onDelete}
                >
                    Delete
                </button>
            </div>
            </div>
        </>
    );
}

export default Orders;
