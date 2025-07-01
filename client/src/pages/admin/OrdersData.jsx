import React, { useEffect, useState } from 'react';
import axios from 'axios';

function OrdersData() {
    // Mock data for testing
    const mockOrders = [
        {
            id: 1,
            customerName: "John Doe",
            customerEmail: "john.doe@email.com",
            customerPhone: "+1-234-567-8901",
            items: [
                { name: "Burger Deluxe", quantity: 2, price: 12.99 },
                { name: "French Fries", quantity: 1, price: 4.99 }
            ],
            totalAmount: 30.97,
            status: "pending",
            paymentStatus: "paid",
            orderDate: "2024-03-15T10:30:00Z",
            deliveryAddress: "123 Main St, City, State 12345"
        },
        {
            id: 2,
            customerName: "Jane Smith",
            customerEmail: "jane.smith@email.com",
            customerPhone: "+1-234-567-8902",
            items: [
                { name: "Pizza Margherita", quantity: 1, price: 16.99 },
                { name: "Coca Cola", quantity: 2, price: 2.99 }
            ],
            totalAmount: 22.97,
            status: "confirmed",
            paymentStatus: "paid",
            orderDate: "2024-03-15T11:15:00Z",
            deliveryAddress: "456 Oak Ave, City, State 12345"
        },
        {
            id: 3,
            customerName: "Mike Johnson",
            customerEmail: "mike.johnson@email.com",
            customerPhone: "+1-234-567-8903",
            items: [
                { name: "Chicken Wings", quantity: 3, price: 8.99 },
                { name: "Chocolate Cake", quantity: 1, price: 6.99 }
            ],
            totalAmount: 33.96,
            status: "preparing",
            paymentStatus: "paid",
            orderDate: "2024-03-15T12:00:00Z",
            deliveryAddress: "789 Pine St, City, State 12345"
        },
        {
            id: 4,
            customerName: "Sarah Wilson",
            customerEmail: "sarah.wilson@email.com",
            customerPhone: "+1-234-567-8904",
            items: [
                { name: "Caesar Salad", quantity: 1, price: 9.99 },
                { name: "Iced Tea", quantity: 1, price: 2.49 }
            ],
            totalAmount: 12.48,
            status: "delivered",
            paymentStatus: "paid",
            orderDate: "2024-03-15T09:45:00Z",
            deliveryAddress: "321 Elm St, City, State 12345"
        },
        {
            id: 5,
            customerName: "David Brown",
            customerEmail: "david.brown@email.com",
            customerPhone: "+1-234-567-8905",
            items: [
                { name: "Fish & Chips", quantity: 1, price: 14.99 },
                { name: "Beer", quantity: 1, price: 4.99 }
            ],
            totalAmount: 19.98,
            status: "cancelled",
            paymentStatus: "refunded",
            orderDate: "2024-03-15T13:20:00Z",
            deliveryAddress: "654 Maple Ave, City, State 12345"
        },
        {
            id: 6,
            customerName: "Lisa Davis",
            customerEmail: "lisa.davis@email.com",
            customerPhone: "+1-234-567-8906",
            items: [
                { name: "Vegetarian Pizza", quantity: 1, price: 18.99 },
                { name: "Garlic Bread", quantity: 1, price: 5.99 }
            ],
            totalAmount: 24.98,
            status: "out_for_delivery",
            paymentStatus: "paid",
            orderDate: "2024-03-15T14:10:00Z",
            deliveryAddress: "987 Cedar Ln, City, State 12345"
        }
    ];

    const [orders, setOrders] = useState(mockOrders);

    useEffect(() => {
        //fetchOrders();  uncomment this line to fetch orders from API
    }, []);

    const fetchOrders = () => {
        axios.get('/api/admin/orders')
            .then(response => {
                if (response.status === 200) {
                    setOrders(response.data.orders);
                } else {
                    console.error("Failed to fetch orders");
                }
            })
            .catch(error => {
                console.error("Error fetching orders:", error);
                console.log("Using mock data for testing");
            });
    };

    const handleStatusUpdate = (orderId, newStatus) => {
        axios.patch(`/api/admin/orders/${orderId}/status`, { status: newStatus })
            .then(response => {
                if (response.status === 200) {
                    alert(`Order status updated to ${newStatus}!`);
                    fetchOrders();
                }
            })
            .catch(error => {
                console.error('Error updating order status:', error);
                // Fallback to local status update if API fails
                const updatedOrders = orders.map(order => 
                    order.id === orderId ? { ...order, status: newStatus } : order
                );
                setOrders(updatedOrders);
                alert(`Order status updated to ${newStatus} locally!`);
            });
    };

    const handleDelete = (orderId, index) => {
        if (window.confirm('Are you sure you want to delete this order?')) {
            axios.delete(`/api/admin/orders/${orderId}`)
                .then(response => {
                    if (response.status === 200) {
                        alert('Order deleted successfully!');
                        fetchOrders();
                    }
                })
                .catch(error => {
                    console.error('Error deleting order:', error);
                    // Fallback to local deletion if API fails
                    const updatedOrders = orders.filter((_, i) => i !== index);
                    setOrders(updatedOrders);
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
                        <div key={order.id || index} className="w-1/2 flex justify-center mb-6 px-2">
                            <OrderCard
                                order={order}
                                onStatusUpdate={(newStatus) => handleStatusUpdate(order.id, newStatus)}
                                onDelete={() => handleDelete(order.id, index)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function OrderCard({ order, onStatusUpdate, onDelete }) {
    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'confirmed': return 'bg-blue-100 text-blue-800';
            case 'preparing': return 'bg-purple-100 text-purple-800';
            case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800';
            case 'delivered': return 'bg-green-100 text-green-800';
            case 'cancelled': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    const getPaymentStatusColor = (status) => {
        switch (status) {
            case 'paid': return 'bg-green-100 text-green-800';
            case 'pending': return 'bg-yellow-100 text-yellow-800';
            case 'refunded': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="border rounded-lg shadow-sm p-4 w-[500px] bg-white h-auto flex flex-col">
            {/* Header with Order Icon */}
            <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold text-lg">#</span>
                </div>
                <div className="flex flex-col items-end space-y-1">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status.replace('_', ' ')}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusColor(order.paymentStatus)}`}>
                        {order.paymentStatus}
                    </span>
                </div>
            </div>

            {/* Order Info */}
            <div className="mb-3">
                <h3 className="text-lg font-semibold text-gray-900 mb-1">Order #{order.id}</h3>
                <p className="text-sm text-gray-600 mb-1">{order.customerName || 'N/A'}</p>
                <p className="text-sm text-gray-600 mb-1">{order.customerEmail || 'No email'}</p>
                <p className="text-sm text-gray-600 mb-1">{order.customerPhone || 'No phone'}</p>
                <p className="text-xs text-gray-500">Date: {formatDate(order.orderDate)}</p>
            </div>

            {/* Order Items Summary */}
            <div className="mb-3 bg-gray-50 p-2 rounded">
                <h5 className="font-medium text-gray-900 mb-1 text-sm">Items ({order.items.length}):</h5>
                <div className="space-y-1 max-h-20 overflow-y-auto">
                    {order.items.slice(0, 2).map((item, index) => (
                        <div key={index} className="flex justify-between text-xs">
                            <span>{item.name} x{item.quantity}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    {order.items.length > 2 && (
                        <p className="text-xs text-gray-500">+{order.items.length - 2} more items</p>
                    )}
                </div>
                <div className="border-t pt-1 mt-1">
                    <div className="flex justify-between font-semibold text-sm">
                        <span>Total:</span>
                        <span>${order.totalAmount.toFixed(2)}</span>
                    </div>
                </div>
            </div>

            {/* Status Update */}
            <div className="mb-3">
                <select
                    value={order.status}
                    onChange={(e) => onStatusUpdate(e.target.value)}
                    className="w-full border border-gray-300 px-3 py-2 rounded text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                </select>
            </div>

            {/* Actions */}
            <div className="flex justify-end mt-auto">
                <button
                    onClick={onDelete}
                    className="bg-red-500 text-white text-sm px-6 py-2 rounded hover:bg-red-600 transition"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

export default OrdersData;
