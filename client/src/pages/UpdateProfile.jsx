import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import useAuth from "../contexts/Auth/UseAuth";
import axios from 'axios';

const UpdateProfile = () => {
  const { user, updateUser } = useAuth(); 

  console.log('Current User: ', user);

  const [formData, setFormData] = useState({
    name: user?.name ? user.name : '',
    email: user?.email ? user.email : '',
    phone: user?.phone ? user.phone : '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setError('');
 
    const userId = user._id;
    updateUser(userId, formData)
      .then((response) => {
        console.log("User updated successfully:", response);
        setSuccess("Profile updated successfully!");
        setTimeout(() => {
          navigate('/checkout'); // Redirect to the checkout page after 2 seconds
        }, 2000);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
        setError("Failed to update profile. Please try again.");
      });
    
    
  };

  return (
    <div>
      <section className="header">
        <div className="w-full bg-gray-900 text-white text-center py-8">
          <div className="container mx-auto px-4">
            <h1 className="font-semibold text-4xl md:text-6xl">Update Profile</h1>
            <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
              <Link
                to="/home"
                className="text-xl md:text-2xl text-yellow-400 hover:text-yellow-500 transition capitalize"
              >
                Home
              </Link>
              <span className="text-xl md:text-2xl text-gray-200">/ Update Profile</span>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-gray-100 py-10 min-h-screen">
        <div className="max-w-md mx-auto mt-10 p-6 bg-white border border-gray-300 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">UPDATE PROFILE</h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone:</label>
              <input
                type="text"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            {error && (
              <p className={`text-center ${error.includes('success') ? 'text-green-600' : 'text-red-600'}`}>
                {error}
              </p>
            )}
            {success && (
              <p className="text-center text-green-600">{success}</p>
            )}
            <button
              type="submit"
              className="w-full bg-amber-400 mt-4 text-white py-2 rounded-md hover:bg-amber-500 transition-colors"
            >
              Update Now
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default UpdateProfile;