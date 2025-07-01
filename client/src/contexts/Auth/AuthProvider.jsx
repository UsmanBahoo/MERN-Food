import { useState, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const register = async(userData) => {
        await axios.post(`${API_BASE_URL}/api/auth/register`, userData)
        .then((response) => {
            console.log("Registration successful:", response.data);
        })
        .catch((error) => {
            console.error("Error registering:", error);
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
            })
            .catch((error) => {
                console.error("Error logging in:", error);
            });
    };

    const logout = () => {
        localStorage.removeItem('FPAUTHUS');
        setIsLoggedIn(false);
        setUser(null);
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

    return (
        <AuthContext.Provider value={{user, register, login, logout, updateUser, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}
