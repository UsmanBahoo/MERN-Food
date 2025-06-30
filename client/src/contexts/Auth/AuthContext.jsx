import { useState, createContext, useEffect, useContext } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const register = async(userData) => {
        await axios.post("http://localhost:5000/api/auth/register", userData)
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
        await axios.post("http://localhost:5000/api/auth/login", { email, password })
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
        await axios.put(`http://localhost:5000/api/user/${userId}`, updatedData)
        .then((response) => {
            console.log("User updated successfully:", response.data);
            setUser(response.data.user); // Update the user state with the new user data
            localStorage.setItem('FPAUTHUS', JSON.stringify(response.data.user)); // Update local storage with the new user data
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
    };


    useEffect(() => {
        const storedUser = localStorage.getItem('FPAUTHUS');
        if (storedUser && storedUser !== 'undefined') {
            setUser(JSON.parse(storedUser)); // Parse the stored JSON string back into an object
            setIsLoggedIn(true);
        }
    }, []); 


    return (
        <AuthContext.Provider value={{user, register, login, logout, updateUser, isLoggedIn}}>
            {children}
        </AuthContext.Provider>
    )
}