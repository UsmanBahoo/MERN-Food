import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import API_BASE_URL from '../config/api';

const ContactUs = () => {
    // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    feedback: ''
  });

  // State for form submission status
  const [submitStatus, setSubmitStatus] = useState({
    loading: false,
    success: null,
    error: null
  });

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.feedback ) {
      setSubmitStatus({
        loading: false,
        success: false,
        error: 'Please fill in all required fields'
      });
      return;
    }

    setSubmitStatus({ loading: true, success: null, error: null });
    console.log("submitted feedback")
    try {
      console.log(formData);
      await axios.post(`${API_BASE_URL}/api/feedback`, formData)
      .then((response) => {
        console.log("server resposne", response);
        setSubmitStatus({
          loading: false,
          success: 'Feedback submitted successfully!',
          error: null
        });
        
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          feedback: ''
        });
      })
      .catch((error) => {
        console.log(error);
      });
    
    } catch (error) {
      setSubmitStatus({
        loading: false,
        success: null,
        error: 'An error occurred while submitting the form'
      });
    }
  };

  return (
    <div>
      <section className="header">
        <div className="w-full bg-gray-900 text-white text-center py-8">  
          <div className="container mx-auto px-4">
            <h1 className="font-semibold text-6xl md:text-6xl text-s">Contact Us</h1>
            <div className="mt-5 flex justify-center items-center space-x-2 text-sm text-gray-300">
              <Link to="/home" className="text-2xl text-yellow-400 hover:text-yellow-500 transition">home</Link>
              <em className="text-2xl not-italic text-md text-gray-200">/ contact</em>
            </div>
          </div>     
        </div> 
      </section>
      <section className="form">
        <div className="container mx-auto px-8 py-8">
          <div className="flex justify-between items-center flex-col md:flex-row">
            <div className="w-full mt-2">
              <img src="Svg\contact-img.svg" className="h-[600px] w-[600px]" alt="image-description" />
            </div>
            <div className="container mx-auto px-4 w-full">
              <form 
                onSubmit={handleSubmit}
                className="max-w-xl mx-auto mt-20 p-6 bg-white border rounded-lg shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-6">Feedback Form</h2>
                
                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                    Name:
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="name" 
                    type="text" 
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="phone">
                    Phone:
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="phone" 
                    type="tel" 
                    placeholder="Enter your number"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="email">
                    Email:
                  </label>
                  <input 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="email" 
                    type="email" 
                    placeholder="Enter your email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 font-bold mb-2" htmlFor="feedback">
                    Feedback:
                  </label>
                  <textarea 
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                    id="feedback" 
                    rows="5" 
                    placeholder="Enter your feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    required
                  />
                </div>

                {/* Status Messages */}
                {submitStatus.success && (
                  <p className="text-green-600 mb-4">{submitStatus.success}</p>
                )}
                {submitStatus.error && (
                  <p className="text-red-600 mb-4">{submitStatus.error}</p>
                )}

                <div className="flex justify-center mt-5">
                  <button 
                    type="submit"
                    disabled={submitStatus.loading}
                    className={`bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold text-lg rounded-lg px-12 text-center py-2 dark:focus:ring-yellow-900 ${
                      submitStatus.loading ? 'opacity-50 cursor-not-allowed' : ''
                    }`}
                  >
                    {submitStatus.loading ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>     
            </div>
          </div>
        </div>
      </section> 
    </div>
  );
}

export default ContactUs;
