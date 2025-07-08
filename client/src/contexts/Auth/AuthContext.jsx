import { useState, createContext, useEffect } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const register = async(userData) => {
        await axios.post(`${API_BASE_URL}/api/auth/register`, userData)
        .then((response) => {
            console.log("Registration successful:", response.data);
            //setUser(response.data.user); // Assuming the response contains user data
            //localStorage.setItem('FPAUTHUS', user)
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
                setUser(response.data.user); // Set the user state with the user object
                localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user)); // Convert the user object to a JSON string
                
                setIsLoggedIn(true); // Update the logged-in state
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
            setUser(response.data.user); // Update the user state with the new user data
            localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user)); // Update local storage with the new user data
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    };

    const refreshUser = async () => {
        try {
            const storedUser = localStorage.getItem('FPAUTHUS');
            if (storedUser && storedUser !== 'undefined') {
                const userData = JSON.parse(storedUser);
                // Fetch fresh user data from server
                const response = await axios.get(`${API_BASE_URL}/api/user/${userData._id}`);
                if (response.status === 200) {
                    console.log("User refreshed:", response.data.user);
                    setUser(response.data.user);
                    localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user));
                }
            }
        } catch (error) {
            console.error("Error refreshing user data:", error);
        }
    };

    const updateUserLocation = async (locationData) => {
        console.log("updateUserLocation function called with:", locationData);
        try {
            if (!user?._id) {
                console.error("No user ID available");
                return { success: false, error: "No user logged in" };
            }
            
            console.log("Updating location for user:", user._id);
            const response = await axios.put(`${API_BASE_URL}/api/users/${user._id}/location`, locationData);
            
            if (response.status === 200) {
                console.log("Location updated successfully:", response.data.user);
                setUser(response.data.user);
                localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user));
                return { success: true };
            }
        } catch (error) {
            console.error("Error updating location:", error);
            return { success: false, error: error.message };
        }
    };

    useEffect(() => {
        const storedUser = localStorage.getItem('FPAUTHUS');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser)); // Parse the stored JSON string back into an object
            setIsLoggedIn(true);
        }
    }, []); 

    // Create the context value object
    const contextValue = {
        user, 
        register, 
        login, 
        logout, 
        updateUser, 
        refreshUser,
        updateUserLocation: updateUserLocation, // Explicitly bind
        isLoggedIn
    };

    // Debug: Log what we're providing
    console.log("AuthContext Provider value keys:", Object.keys(contextValue));

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    )
}