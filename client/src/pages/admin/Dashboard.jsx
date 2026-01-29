import React, { useState, useEffect } from 'react'
import DashoardCards from './DashoardCards';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function Dashboard() {
  const [cardsData, setCardsData] = useState([]);
  const [loading, setLoading] = useState(true);

  const defaultCards = [
    { id: 1, value: 0, label: "admin", buttonText: "Update Profile", link: "/admin/profile" },
    { id: 2, value: 0, label: "total pendings", buttonText: "See Orders", link: "/admin/orders" },
    { id: 3, value: 0, label: "total completes", buttonText: "See Orders", link: "/admin/orders" },
    { id: 4, value: 0, label: "total orders", buttonText: "See Orders", link: "/admin/orders" },
    { id: 5, value: 0, label: "products added", buttonText: "See Products", link: "/admin/products" },
    { id: 6, value: 0, label: "users accounts", buttonText: "See Users", link: "/admin/users" },
    { id: 7, value: 0, label: "admins", buttonText: "See Admins", link: "/admin/admins" },
    { id: 8, value: 0, label: "new messages", buttonText: "See Messages", link: "/admin/feedbacks" },
  ];

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch all data in parallel using admin routes
      const [
        adminsResponse,
        ordersResponse,
        productsResponse,
        usersResponse,
        feedbacksResponse
      ] = await Promise.all([
        axios.get(`${API_BASE_URL}/api/admins`),
        axios.get(`${API_BASE_URL}/api/orders`),
        axios.get(`${API_BASE_URL}/api/products`),
        axios.get(`${API_BASE_URL}/api/users`),
        axios.get(`${API_BASE_URL}/api/feedbacks`)
      ]);

      console.log('admin response', adminsResponse)

      const admins = adminsResponse.data.length || 1;
      // Process orders data - API returns array directly
      const orders = ordersResponse.data || [];
      const pendingOrders = orders.filter(order => 
        order.status === 'pending' || order.status === 'Pending'
      ).length;
      const completedOrders = orders.filter(order => 
        order.status === 'delivered' || order.status === 'Delivered'
      ).length;

      // Process feedbacks data
      const feedbacks = feedbacksResponse.data.feedbacks || feedbacksResponse.data || [];
      const unreadFeedbacks = feedbacks.filter(feedback => 
        feedback.status === 'unread'
      ).length;

      // Update cards data with real values
      const updatedCards = [
        { id: 1, value: admins, label: "admin", buttonText: "Update Profile", link: "/admin/profile" },
        { id: 2, value: pendingOrders, label: "total pendings", buttonText: "See Orders", link: "/admin/orders" },
        { id: 3, value: completedOrders, label: "total completes", buttonText: "See Orders", link: "/admin/orders" },
        { id: 4, value: orders.length, label: "total orders", buttonText: "See Orders", link: "/admin/orders" },
        { id: 5, value: productsResponse.data.products?.length || productsResponse.data?.length || 0, label: "products added", buttonText: "See Products", link: "/admin/products" },
        { id: 6, value: usersResponse.data.users?.length || usersResponse.data?.length || 0, label: "users accounts", buttonText: "See Users", link: "/admin/users" },
        { id: 7, value: adminsResponse.data.admins?.length || adminsResponse.data?.length || 0, label: "admins", buttonText: "See Admins", link: "/admin/admins" },
        { id: 8, value: unreadFeedbacks, label: "new messages", buttonText: "See Messages", link: "/admin/feedbacks" },
      ];

      setCardsData(updatedCards);

    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setCardsData(defaultCards); // Fallback to default cards
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='container mx-auto px-4 py-8'>
        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
              <p className="mt-4 text-gray-600">Loading dashboard data...</p>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            {cardsData.map((card) => (
              <DashoardCards 
                key={card.id} 
                value={card.value} 
                label={card.label} 
                buttonText={card.buttonText} 
                link={card.link} 
              />
            ))}
          </div>
        )}
      </div>
    </>
  )
}

export default Dashboard
