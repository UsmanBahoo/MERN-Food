import React, { useState } from 'react';
import useAuth from '../contexts/Auth/UseAuth';
import axios from 'axios';
import API_BASE_URL from '../config/api';

function LocationPanel({ onLocationUpdate, onClose }) {
  const [loading, setLoading] = useState(false);
  const [manualLocation, setManualLocation] = useState({
    address: '',
    city: '',
    state: '',
    country: '',
    pincode: ''
  });
  
  const { user, updateUserLocation } = useAuth();

  // Temporary direct API call workaround
  const updateLocationDirect = async (locationData) => {
    try {
      if (!user?._id) {
        return { success: false, error: "No user logged in" };
      }
      
      const response = await axios.put(`${API_BASE_URL}/api/users/${user._id}/location`, locationData);
      
      if (response.status === 200) {
        // Manually update localStorage since context might not update immediately
        localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user));
        return { success: true };
      }
    } catch (error) {
      console.error("Error updating location:", error);
      return { success: false, error: error.message };
    }
  };

  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          console.log(`Getting location: Latitude: ${latitude}, Longitude: ${longitude}`);
          
          const locationData = {
            location: {
              type: 'Point',
              coordinates: [longitude, latitude]
            }
          };

          try {
            // Use direct API call as fallback
            const result = updateUserLocation ? 
              await updateUserLocation(locationData) : 
              await updateLocationDirect(locationData);
              
            console.log('Location update result:', result);
            if (result.success) {
              console.log('Location updated successfully');
              onLocationUpdate();
            } else {
              alert('Failed to update location. Please try again.');
            }
          } catch (error) {
            console.error('Error updating location:', error);
            alert('Failed to update location. Please try again.');
          } finally {
            setLoading(false);
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your location. Please enter manually.');
          setLoading(false);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0
        }
      );
    } else {
      alert('Geolocation is not supported by this browser.');
      setLoading(false);
    }
  };

  const handleManualSubmit = async (e) => {
    e.preventDefault();
    if (!manualLocation.city || !manualLocation.country) {
      alert('Please fill in at least city and country.');
      return;
    }

    setLoading(true);
    
    const locationData = {
      location: {
        type: 'Point',
        coordinates: [0, 0], // You can use a geocoding service here
        ...manualLocation
      }
    };

    try {
      const result = await updateUserLocation(locationData);
      if (result.success) {
        onLocationUpdate();
      } else {
        alert('Failed to update location. Please try again.');
      }
    } catch (error) {
      console.error('Error updating location:', error);
      alert('Failed to update location. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setManualLocation(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Set Your Location</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        
        <p className="text-gray-600 mb-6">
          We need your location to show nearby restaurants and accurate delivery estimates.
        </p>

        {/* Auto Location Button */}
        <button
          onClick={getCurrentLocation}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-3 rounded-lg mb-4 hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Getting Location...' : '📍 Use Current Location'}
        </button>

        <div className="text-center text-gray-500 mb-4">Or</div>

        {/* Manual Location Form */}
        <form onSubmit={handleManualSubmit}>
          <div className="space-y-3">
            <input
              type="text"
              name="address"
              placeholder="Street Address"
              value={manualLocation.address}
              onChange={handleInputChange}
              className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="city"
                placeholder="City *"
                value={manualLocation.city}
                onChange={handleInputChange}
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={manualLocation.state}
                onChange={handleInputChange}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="text"
                name="country"
                placeholder="Country *"
                value={manualLocation.country}
                onChange={handleInputChange}
                required
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                value={manualLocation.pincode}
                onChange={handleInputChange}
                className="p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-500 text-white py-3 rounded-lg mt-4 hover:bg-green-600 disabled:opacity-50"
          >
            {loading ? 'Saving...' : 'Save Location'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default LocationPanel;