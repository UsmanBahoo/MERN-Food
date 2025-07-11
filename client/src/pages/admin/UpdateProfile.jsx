import React, { useState, useEffect } from 'react';
import useAdminAuth from '../../contexts/AdminAuth/UseAdminAuth';

function UpdateAdminProfile() {
  const { admin, updateAdmin } = useAdminAuth();
  
  // Profile Update State
  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    currentPassword: ''
  });
  
  // Password Update State
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    if (admin) {
      setProfileData(prev => ({
        ...prev,
        name: admin.name || '',
        email: admin.email || ''
      }));
    }
  }, [admin]);

  const handleProfileChange = (e) => {
    const { name, value } = e.target;
    setProfileData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    
    if (!profileData.name || !profileData.email || !profileData.currentPassword) {
      alert('Please fill in all fields including current password');
      return;
    }

    setLoading(true);
    try {
      const result = await updateAdmin(admin._id, {
        name: profileData.name,
        email: profileData.email,
        currentPassword: profileData.currentPassword
      });

      if (result.success) {
        alert('Profile updated successfully!');
        setProfileData(prev => ({ ...prev, currentPassword: '' }));
      } else {
        alert(result.message || 'Profile update failed');
      }
    } catch (error) {
      console.error('Profile update error:', error);
      alert('An error occurred during profile update');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      alert('Please fill in all password fields');
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }

    if (passwordData.newPassword.length < 6) {
      alert('New password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    try {
      const result = await updateAdmin(admin._id, {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword
      });

      if (result.success) {
        alert('Password updated successfully!');
        setPasswordData({
          currentPassword: '',
          newPassword: '',
          confirmPassword: ''
        });
      } else {
        alert(result.message || 'Password update failed');
      }
    } catch (error) {
      console.error('Password update error:', error);
      alert('An error occurred during password update');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className='mt-20'>
        <div className="relative mx-auto w-full max-w-lg bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:rounded-xl sm:px-10">
          {/* Section Tabs */}
          <div className="flex justify-center mb-6">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setActiveSection('profile')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeSection === 'profile' 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Update Profile
              </button>
              <button
                onClick={() => setActiveSection('password')}
                className={`px-4 py-2 rounded-lg transition ${
                  activeSection === 'password' 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Update Password
              </button>
            </div>
          </div>

          {/* Profile Update Section */}
          {activeSection === 'profile' && (
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">Update Profile</h1>
              </div>
              <div className="mt-5">
                <form onSubmit={handleProfileSubmit}>
                  <div className="relative mt-6">
                    <input
                      type="text"
                      name="name"
                      id="profile-name"
                      placeholder="Name"
                      className="peer mt-1 w-full border-0 border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-b-2 focus:border-gray-500 focus:outline-none focus:ring-0"
                      value={profileData.name}
                      onChange={handleProfileChange}
                      required
                    />
                    <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Name
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type="email"
                      name="email"
                      id="profile-email"
                      placeholder="Email Address"
                      className="peer mt-1 w-full border-0 border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-b-2 focus:border-gray-500 focus:outline-none focus:ring-0"
                      value={profileData.email}
                      onChange={handleProfileChange}
                      required
                    />
                    <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Email Address
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="currentPassword"
                      id="profile-current-password"
                      placeholder="Current Password"
                      className="peer mt-1 w-full border-0 border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-b-2 focus:border-gray-500 focus:outline-none focus:ring-0"
                      value={profileData.currentPassword}
                      onChange={handleProfileChange}
                      required
                    />
                    <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Current Password (Required)
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

                  <div className="my-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Updating...' : 'Update Profile'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {activeSection === 'password' && (
            <div>
              <div className="text-center">
                <h1 className="text-3xl font-semibold text-gray-900">Update Password</h1>
              </div>
              <div className="mt-5">
                <form onSubmit={handlePasswordSubmit}>
                  <div className="relative mt-6">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="currentPassword"
                      id="password-current"
                      placeholder="Current Password"
                      className="peer mt-1 w-full border-0 border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-b-2 focus:border-gray-500 focus:outline-none focus:ring-0"
                      value={passwordData.currentPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Current Password
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="newPassword"
                      id="password-new"
                      placeholder="New Password"
                      className="peer mt-1 w-full border-0 border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-b-2 focus:border-gray-500 focus:outline-none focus:ring-0"
                      value={passwordData.newPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      New Password
                    </label>
                  </div>

                  <div className="relative mt-6">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      id="password-confirm"
                      placeholder="Confirm New Password"
                      className="peer mt-1 w-full border-0 border-b-2 border-gray-300 px-0 py-1 placeholder:text-transparent focus:border-b-2 focus:border-gray-500 focus:outline-none focus:ring-0"
                      value={passwordData.confirmPassword}
                      onChange={handlePasswordChange}
                      required
                    />
                    <label className="pointer-events-none absolute top-0 left-0 origin-left -translate-y-1/2 transform text-sm text-gray-800 opacity-75 transition-all duration-100 ease-in-out peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-focus:top-0 peer-focus:pl-0 peer-focus:text-sm peer-focus:text-gray-800">
                      Confirm New Password
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

                  <div className="my-6">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full rounded-md bg-black px-3 py-4 text-white focus:bg-gray-600 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {loading ? 'Updating...' : 'Update Password'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default UpdateAdminProfile;