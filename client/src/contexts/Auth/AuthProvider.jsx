import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [alert, setAlert] = useState(null);

    // Function to show alert
    const showAlert = (type, message) => {
        setAlert({ type, message });
        setTimeout(() => setAlert(null), 3000);
    };

    const register = async(userData) => {
        await axios.post(`${API_BASE_URL}/api/auth/register`, userData)
        .then((response) => {
            console.log("Registration successful:", response.data);
            showAlert("success", "Registration successful! Please login.");
        })
        .catch((error) => {
            console.error("Error registering:", error);
            const errorMessage = error.response?.data?.message || "Registration failed";
            showAlert("error", errorMessage);
        });
    }

    const login = async (email, password) => {
        console.log("Logging in with email:", email, "and password:", password);
        await axios.post(`${API_BASE_URL}/api/auth/login`, { email, password })
            .then((response) => {
                console.log("Login successful:", response.data.user);
                setUser(response.data.user);
                localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user));
                setIsLoggedIn(true);
                showAlert("success", "Login successful!");
            })
            .catch((error) => {
                console.error("Error logging in:", error);
                const errorMessage = error.response?.data?.message || "Login failed";
                showAlert("error", errorMessage);
            });
    };

    const logout = () => {
        localStorage.removeItem('FPAUTHUS');
        setIsLoggedIn(false);
        setUser(null);
        showAlert("success", "Logged out successfully!");
    }

    const updateUser = async (userId, updatedData) => {
        await axios.put(`${API_BASE_URL}/api/user/${userId}`, updatedData)
        .then((response) => {
            console.log("User updated successfully:", response.data);
            setUser(response.data.user);
            localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user));
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('FPAUTHUS');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser));
            setIsLoggedIn(true);
        }
    }, []); 

    const value = { user, register, login, logout, updateUser, isLoggedIn };

    return (
        <AuthContext.Provider value={value}>
            {children}
            {alert && (
                <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg ${
                    alert.type === 'success' 
                        ? 'bg-green-500 text-white' 
                        : 'bg-red-500 text-white'
                }`}>
                    <div className="flex items-center justify-between">
                        <span>{alert.message}</span>
                        <button 
                            onClick={() => setAlert(null)}
                            className="ml-3 text-white hover:text-gray-200"
                        >
                            ×
                        </button>
                    </div>
                </div>
            )}
        </AuthContext.Provider>
    )
}
