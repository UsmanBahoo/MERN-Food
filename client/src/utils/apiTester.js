import axios from 'axios';
import API_BASE_URL from '../config/api';

export const testAPI = async (endpoint, method = 'GET', data = null, headers = {}) => {
  try {
    console.log(`Testing ${method} ${API_BASE_URL}${endpoint}`);
    
    const config = {
      method,
      url: `${API_BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    };
    
    if (data && (method === 'POST' || method === 'PUT' || method === 'PATCH')) {
      config.data = data;
    }
    
    const response = await axios(config);
    console.log('✅ Success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Error:', error.response?.data || error.message);
    return { error: error.response?.data || error.message };
  }
};

// Usage examples:
// testAPI('/api/admin/products');
// testAPI('/api/orders/user/123');
// testAPI('/api/users/123/location', 'PUT', { location: { coordinates: [74, 31] } });
