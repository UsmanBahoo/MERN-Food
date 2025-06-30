import React, { createContext, useContext, useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";

const DashboardContext = createContext();

function AdminDashboardProvider({ children }) {
  const defaultCards = [
    { id: 1, value: 1, label: "admin", buttonText: "Update Profile", link: "/admindashboard/updateprofile" },
    { id: 2, value: 0, label: "total pendings", buttonText: "See Orders", link: "/admindashboard/order" },
    { id: 3, value: 0, label: "total completes", buttonText: "See Orders", link: "/admindashboard/order" },
    { id: 4, value: 0, label: "total orders", buttonText: "See Orders", link: "/admindashboard/order" },
    { id: 5, value: 12, label: "products added", buttonText: "See Products", link: "/admindashboard/addproduct" },
    { id: 6, value: 0, label: "users accounts", buttonText: "See Users", link: "/admindashboard/users" },
    { id: 7, value: 1, label: "admins", buttonText: "See Admins", link: "/admindashboard/updateprofile" },
    { id: 8, value: 0, label: "new messages", buttonText: "See Messages", link: "/admindashboard/messages" },
  ];

 const [cards, setCards] = useState(() => {
    const stored = localStorage.getItem("dashboardCards");
    return stored ? JSON.parse(stored) : defaultCards;
  });

  useEffect(() => {
    localStorage.setItem("dashboardCards", JSON.stringify(cards));
  }, [cards]);

  const incrementCard = (id) => {
    setCards((prev) =>
      prev.map((card) =>
        card.id === id ? { ...card, value: card.value + 1 } : card
      )
    );
  };

  return (
    <DashboardContext.Provider value={{ cards, incrementCard }}>
      {children}
    </DashboardContext.Provider>
  );
}

const useDashboard = () => useContext(DashboardContext);

function Card({ value, label, buttonText, link }) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center mt-10 border border-gray-200">
      <h2 className="text-2xl font-semibold text-gray-800">
        {label.includes("pendings") || label.includes("completes") ? `Rs.${value}/-` : value}
      </h2>
      <p className="bg-gray-100 w-full py-3 rounded my-4 text-gray-600">{label}</p>
      {link ? (
        <Link to={link}>
          <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition">
            {buttonText}
          </button>
        </Link>
      ) : (
        <button className="mt-2 bg-indigo-600 text-white px-4 py-2 rounded cursor-not-allowed opacity-50">
          {buttonText}
        </button>
      )}
    </div>
  );
}

function AdminDashboard() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("Dashboard");
  const { cards } = useDashboard();

  const toggleMenu = (e) => {
    e.preventDefault();
    setShowMenu((prev) => !prev);
  };

  useEffect(() => {
    const path = location.pathname.toLowerCase();
    if (path.includes("addproduct")) setActiveSection("Products");
    else if (path.includes("adminupdateprofile") || path.includes("updateprofile")) setActiveSection("Admins");
    else if (path.includes("order")) setActiveSection("Orders");
    else if (path.includes("users")) setActiveSection("Users");
    else if (path.includes("messages")) setActiveSection("Messages");
    else setActiveSection("Dashboard");
  }, [location.pathname]);

  const navItems = [
    { name: "Dashboard", path: "/admindashboard" },
    { name: "Products", path: "/admindashboard/addproduct" },
    { name: "Orders", path: "/admindashboard/order" },
    { name: "Admins", path: "/admindashboard/updateprofile" },
    { name: "Users", path: "/admindashboard/users" },
    { name: "Messages", path: "/admindashboard/messages" },
  ];

  // Show cards on admin dashboard home OR search page
  const showCards =
    location.pathname === "/admindashboard" ||
    location.pathname === "/search";

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-blue-700 dark:bg-gray-900 dark:border-gray-700">
        <div className="max-w-screen-xl mx-auto p-4 flex items-center justify-between relative">
          <span className="text-2xl font-semibold dark:text-white">Admin Panel</span>

          {/* Desktop Nav */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <ul className="flex items-center space-x-6 font-medium text-gray-900 dark:text-white">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => setActiveSection(item.name)}
                    className={`py-2 px-3 hover:text-blue-700 dark:hover:text-blue-400 transition-colors ${
                      activeSection === item.name ? "dark:text-blue-400 font-semibold" : ""
                    }`}
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* User menu & mobile toggle */}
          <div className="flex items-center gap-4">
            <div className="relative inline-block text-left">
              <a href="#" onClick={toggleMenu}>
                <img src="/Svg/user-solid.svg" alt="User" className="h-7 w-7 cursor-pointer" />
              </a>

              {showMenu && (
                <div className="absolute right-0 mt-4 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
                  <h3 className="text-center text-lg font-medium mb-3">admin</h3>
                  <Link to="/admindashboard/updateprofile">
                    <button className="w-full bg-indigo-700 text-white py-2 rounded mb-2">Update Profile</button>
                  </Link>
                  <div className="flex justify-between gap-2 mb-2">
                    <Link to="/admin/login" className="w-1/2">
                      <button className="w-full bg-orange-400 text-white py-2 rounded">Login</button>
                    </Link>
                    <Link to="/admin/signup" className="w-1/2">
                      <button className="w-full bg-orange-400 text-white py-2 rounded">Signup</button>
                    </Link>
                  </div>
                  <Link to="/admin/login">
                    <button className="w-full bg-red-500 text-white py-2 rounded">Logout</button>
                  </Link>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
              aria-label="Open main menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {isOpen && (
          <div className="md:hidden px-4 pb-4">
            <ul className="space-y-2 font-medium text-gray-900 dark:text-white">
              {navItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    onClick={() => {
                      setActiveSection(item.name);
                      setIsOpen(false);
                    }}
                    className="block w-full text-left py-2 px-3 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Dashboard Cards */}
      {showCards && (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 px-4 py-10 max-w-screen-xl mx-auto">
          {cards.map((card) => (
            <Card
              key={card.id}
              value={card.value}
              label={card.label}
              buttonText={card.buttonText}
              link={card.link}
            />
          ))}
        </div>
      )}

      <Outlet />
    </div>
  );
}

export default function AdminDashboardWrapper() {
  return (
    <AdminDashboardProvider>
      <AdminDashboard />
    </AdminDashboardProvider>
  );
}
