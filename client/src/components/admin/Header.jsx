import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import useAdminAuth from '../../contexts/AdminAuth/UseAdminAuth';

function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [activeSection, setActiveSection] = useState("Dashboard");

    const { admin, adminLogout } = useAdminAuth();

    const handleLogout = () => {
        adminLogout();
        setShowUserMenu(false);
    };

    const navItems = [
        { name: "Dashboard", path: "/admin/dashboard" },
        { name: "Products", path: "/admin/products" },
        { name: "Orders", path: "/admin/orders" },
        { name: "Admins", path: "/admin/admins" },
        { name: "Users", path: "/admin/users" },
        { name: "Feedbacks", path: "/admin/feedbacks" },
    ];

    return (
        <>
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
                                        className={`py-2 px-3 hover:text-blue-700 dark:hover:text-blue-400 transition-colors ${activeSection === item.name ? "dark:text-blue-400 font-semibold" : ""
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
                            <button onClick={() => setShowUserMenu(prev => !prev)}>
                                <img src="/Svg/user-solid.svg" alt="User" className="h-7 w-7 cursor-pointer" />
                            </button>

                            {showUserMenu && (
                                <div className="absolute right-0 mt-4 w-64 bg-white border rounded-lg shadow-lg p-4 z-10">
                                    <h3 className="text-center text-lg font-medium mb-3">{admin?.name || 'Admin'}</h3>
                                    <Link to="/admin/profile">
                                        <button
                                            className="w-full bg-indigo-700 text-white py-2 rounded mb-2"
                                            onClick={() => setShowUserMenu(false)}
                                        >
                                            Update Profile
                                        </button>
                                    </Link>
                                    <button
                                        className="w-full bg-red-500 text-white py-2 rounded"
                                        onClick={handleLogout}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>

                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden focus:outline-none"
                            aria-label="Toggle navigation menu"
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
        </>
    )
}

export default Header