import useAuth from "../contexts/Auth/UseAuth";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";


const Login = () => {
  
  const { login } = useAuth(); // Get login function from Auth context
  const navigate = useNavigate(); // Hook to programmatically navigate

  // State to store form data, login status, user's name, and password visibility
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [id]: value
    }));
  };

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword(prevState => !prevState);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredEmail = formData.email.toLowerCase().trim();
    
    try {
        await login(enteredEmail, formData.password) // Call login function from Auth context
        .then((response) => {
            window.location.href = '/home'; // Redirect to home page after successful login
        })

    } catch (err) {
      if (err.response?.status === 400) {
        alert('Invalid credentials');
      } else {
        console.error('Error during login:', err);
        alert('An error occurred. Please try again.');
      }
    }
  };


  return (
    <div className="container mx-auto px-4 w-full flex justify-center items-center h-screen">
      <form
        className="max-w-xl mx-auto w-[500px] p-6 bg-white border rounded-lg shadow-lg"
        onSubmit={handleSubmit}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Login Now</h2>
        
        <div className="mb-4">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="email"
          >
            Email:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            placeholder="Enter your email (e.g., usman@example.com)"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-4 relative">
          <label
            className="block text-gray-700 font-bold mb-2"
            htmlFor="password"
          >
            Password:
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-4 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pr-10"
            id="password"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 mt-8"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? (
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              </svg>
            ) : (
              <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"></path>
              </svg>
            )}
          </button>
        </div>

        <div className="flex justify-center mt-5">
          <button
            type="submit"
            className="bg-yellow-300 hover:bg-yellow-400 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-semibold text-lg rounded-lg px-12 py-3 text-center dark:focus:ring-yellow-900"
          >
            Submit
          </button>
        </div>

        <p className="mt-4 text-center text-sm">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-500 hover:underline">
            Register Now
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;