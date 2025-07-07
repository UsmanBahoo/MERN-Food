import useAuth from '../contexts/Auth/UseAuth';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useCart from '../contexts/Cart/UseCart';


const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { isLoggedIn, logout, user } = useAuth();
    const { getTotalItems, clearCartOnLogout} = useCart();

    const counter = getTotalItems(); // Get total items of cart

    // Handle logout
    const handleLogout = async () => {
      clearCartOnLogout(); // Clear the cart on logout
      logout(); 
      window.location.href = '/login'; // Reload the page to reflect changes
    };
  
    return (
      <div>
        <nav className="mt-2 bg-white border-b-2 border-gray-300 dark:border-gray-700 dark:bg-gray-900">
          <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
            <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
              <img src="Svg/Food.svg" className="h-8" alt="Food Logo" />
            </Link>
  
            <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
              <div className="flex gap-6 items-center">
                <Link to="/search" className="hover:text-yellow-500 transition">
                  <img src="Svg/magnifying-glass-solid.svg" className="h-8" alt="Search" />
                </Link>
  
                {/* Cart Button */}
                <Link to="/cart" className="flex items-center">
                  <img src="Svg\cart-shopping-solid.svg" className="h-8" alt="Cart" />
                  <span className="text-black dark:text-white text-lg font-semibold">
                    ({counter}) {/* Displays total items from Cart1 to Cart12 */}
                  </span>
                </Link>
  
                {/* User Profile Button */}
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="hover:text-yellow-500 transition relative"
                >
                  <img src="Svg/user-solid.svg" className="h-8" alt="User" />
                </button>
  
                {/* Dropdown Menu */}
                {isOpen && (
                  <div className="absolute top-12 sm:top-0 md:top-10 lg:top-10 right-4 sm:right-6 md:right-12 lg:right-20 mt-8 w-[90vw] sm:w-72 md:w-80 lg:w-96 bg-white border border-gray-200 shadow-lg p-4 sm:p-5 md:p-6 z-50 rounded-lg">
                    {isLoggedIn ? (
                      <div className="text-center">
                        <h1 className="text-lg sm:text-xl font-bold mb-4">{user?.name ? user?.name : "Anonymus User"}</h1>
                        <div className="flex justify-center gap-3 mb-4">
                          <button
                            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 rounded-lg"
                            onClick={() => alert('Profile clicked!')}
                          >
                            Profile
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg"
                            onClick={handleLogout}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center">
                        <p className="text-base sm:text-lg font-semibold">Please Login First!</p>
                        <div className="flex justify-center items-center gap-4 mt-4">
                          <Link to="/login" className="w-full sm:w-1/2">
                            <button
                              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg"
                              onClick={() => setIsOpen(false)}
                            >
                              Login
                            </button>
                          </Link>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
  
              {/* Mobile Menu Button */}
              <button
                data-collapse-toggle="navbar-cta"
                type="button"
                className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                aria-controls="navbar-cta"
                aria-expanded={isMobileMenuOpen}
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 17 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M1 1h15M1 7h15M1 13h15"
                  />
                </svg>
              </button>
            </div>
  
            <div
              className={`items-center justify-between w-full md:flex md:w-auto md:order-1 ${isMobileMenuOpen ? 'block' : 'hidden'}`}
              id="navbar-cta"
            >
              <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {["home", "about", "menu", "order", "contact-us"].map((item) => (
                  <li key={item}>
                    <Link
                      to={`/${item}`}
                      className="block py-2 px-3 text-xl md:p-0 text-gray-900 rounded-sm hover:bg-gray-100 md:hover:bg-transparent md:hover:text-yellow-700 md:dark:hover:text-yellow-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
                    >
                      {item.charAt(0).toUpperCase() + item.slice(1).replace("-", " ")}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </nav>
      </div>
    );
}

export default Header;