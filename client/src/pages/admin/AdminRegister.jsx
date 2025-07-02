import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAdminAuth from '../../contexts/AdminAuth/UseAdminAuth';

function AdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const { adminRegister } = useAdminAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      alert('Please fill in all required fields.');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);
    try {
      const result = await adminRegister({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone
      });
      
      if (result.success) {
        alert('Admin registered successfully!');
        navigate('/admin/login');
      } else {
        alert(result.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('An error occurred during registration');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className='mt-20'>
        <div className="relative mx-auto w-full max-w-md bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          <div className="text-center">
            <h1 className="text-3xl font-semibold text-gray-900">Admin Register</h1>
          </div>
          <div className="mt-5">
            <form onSubmit={handleSubmit}>
              <div className="relative mt-6">
                <input
                  type="text"
                  name="name"
                  id="name"
                  placeholder="Full Name"
                  className="peer mt-1 w-full border-0 border-b-2 border-b-gray-300 px-0 py-1 placeholder:text-transparent focus:border-0 focus:border-b-2 focus:border-b-gray-500 focus:outline-none focus:ring-0"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                  Full Name
                </label>
              </div>

              <div className="relative mt-6">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email Address"
                  className="peer mt-1 w-full border-0 border-b-2 border-b-gray-300 px-0 py-1 placeholder:text-transparent focus:border-0 focus:border-b-2 focus:border-b-gray-500 focus:outline-none focus:ring-0"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                  Email Address
                </label>
              </div>

              <div className="relative mt-6">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  placeholder="Phone Number"
                  className="peer mt-1 w-full border-0 border-b-2 border-b-gray-300 px-0 py-1 placeholder:text-transparent focus:border-0 focus:border-b-2 focus:border-b-gray-500 focus:outline-none focus:ring-0"
                  value={formData.phone}
                  onChange={handleChange}
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                  Phone Number (Optional)
                </label>
              </div>

              <div className="relative mt-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  id="password"
                  placeholder="Password"
                  className="peer mt-1 w-full border-0 border-b-2 border-b-gray-300 px-0 py-1 placeholder:text-transparent focus:border-0 focus:border-b-2 focus:border-b-gray-500 focus:outline-none focus:ring-0"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-0 top-2 text-gray-600"
                >
                  {showPassword ? (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                    </svg>
                  )}
                </button>
              </div>

              <div className="relative mt-6">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  className="peer mt-1 w-full border-0 border-b-2 border-b-gray-300 px-0 py-1 placeholder:text-transparent focus:border-0 focus:border-b-2 focus:border-b-gray-500 focus:outline-none focus:ring-0"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                  Confirm Password
                </label>
              </div>

              <div className="my-6">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>

              <p className="text-center text-sm text-gray-500">
                Already have an account?{' '}
                <Link
                  to="/admin/login"
                  className="font-semibold text-gray-600 hover:underline focus:text-gray-800 focus:outline-none"
                >
                  Sign in
                </Link>.
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default AdminRegister;
                