import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-indigo-600 tracking-wider">
            404
          </h1>
          <div className="w-24 h-1 bg-indigo-600 mx-auto mb-4"></div>
        </div>

        {/* Error Message */}
        <div className="mb-8">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            Page Not Found
          </h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            Oops! The page you're looking for doesn't exist.
            It might have been moved, deleted, or you entered the wrong URL.
          </p>
        </div>

        {/* Illustration */}
        <div className="mb-8">
          <div className="w-32 h-32 mx-auto bg-indigo-100 rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-indigo-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-3-8.5a8.5 8.5 0 11-8.5 8.5 8.5 8.5 0 018.5-8.5z"
              />
            </svg>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <Link
            to="/home"
            className="inline-block w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105 shadow-lg"
          >
            Back to Home
          </Link>

          <div className="flex space-x-4">
            <Link
              to="/menu"
              className="flex-1 bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition duration-300"
            >
              View Menu
            </Link>
            <Link
              to="/contact-us"
              className="flex-1 bg-white text-indigo-600 font-semibold py-2 px-4 rounded-lg border-2 border-indigo-600 hover:bg-indigo-50 transition duration-300"
            >
              Contact Us
            </Link>
          </div>
        </div>

        {/* Footer Text */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>Need help? Contact our support team</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;