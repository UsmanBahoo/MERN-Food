import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { AdminAuthContext } from "./AdminAuthContext";

export const AdminAuthProvider = ({ children }) => {
    const [admin, setAdmin] = useState(null);
    const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
    const [loading, setLoading] = useState(true);

    const adminLogin = async (email, password) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/admin/login`, { 
                email, 
                password 
            });
            
            if (response.status === 200) {
                console.log("Admin login successful:", response.data);
                setAdmin(response.data.admin);
                localStorage.setItem('FPADMINAUTHUS', JSON.stringify(response.data.admin));
                setIsAdminLoggedIn(true);
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error("Error logging in admin:", error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Login failed" 
            };
        }
    };

    const adminLogout = () => {
        localStorage.removeItem('FPADMINAUTHUS');
        setIsAdminLoggedIn(false);
        setAdmin(null);
    };

    const updateAdmin = async (adminId, updatedData) => {
        try {
            const response = await axios.put(
                `${API_BASE_URL}/api/admin/profile/${adminId}`, 
                updatedData
            );
            
            if (response.status === 200) {
                console.log("Admin updated successfully:", response.data);
                setAdmin(response.data.admin);
                localStorage.setItem('FPADMINAUTHUS', JSON.stringify(response.data.admin));
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error("Error updating admin:", error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Update failed" 
            };
        }
    };

    const adminRegister = async (userData) => {
        try {
            const response = await axios.post(`${API_BASE_URL}/api/admin/register`, userData);
            
            if (response.status === 201) {
                console.log("Admin registration successful:", response.data);
                return { success: true, data: response.data };
            }
        } catch (error) {
            console.error("Error registering admin:", error);
            return { 
                success: false, 
                message: error.response?.data?.message || "Registration failed" 
            };
        }
    };

    const checkAdminAuth = () => {
        const storedAdmin = localStorage.getItem('FPADMINAUTHUS');
        if (storedAdmin && storedAdmin !== 'undefined') {
            try {
                const adminData = JSON.parse(storedAdmin);
                setAdmin(adminData);
                setIsAdminLoggedIn(true);
            } catch (error) {
                console.error("Error parsing stored admin data:", error);
                localStorage.removeItem('FPADMINAUTHUS');
            }
        }
        setLoading(false);
    };

    useEffect(() => {
        checkAdminAuth();
    }, []);

    const value = {
        admin,
        isAdminLoggedIn,
        loading,
        adminLogin,
        adminRegister,
        adminLogout,
        updateAdmin,
        checkAdminAuth
    };

    return (
        <AdminAuthContext.Provider value={value}>
            {children}
        </AdminAuthContext.Provider>
    );
};
