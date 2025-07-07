import { createContext, useState, useEffect } from "react";
import useAuth from "../Auth/UseAuth";
import axios from "axios";
import API_BASE_URL from "../../config/api";

// eslint-disable-next-line react-refresh/only-export-components
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { user, isLoggedIn } = useAuth();

  // Sync cart with database when user logs in
  useEffect(() => {
    if (isLoggedIn && user?._id) {
      syncCartWithDatabase();
    }
  }, [isLoggedIn, user]);

  const syncCartWithDatabase = async () => {
    try {
      // First, sync local cart to database
      if (cart.length > 0) {
        await axios.post(`${API_BASE_URL}/api/cart/${user._id}/sync`, {
          localCart: cart,
        });
      }

      // Then fetch the updated cart from database
      const response = await axios.get(`${API_BASE_URL}/api/cart/${user._id}`);
      if (response.status === 200) {
        setCart(response.data.cart || []);
      }
    } catch (error) {
      console.error("Error syncing cart:", error);
    }
  };

  const addItem = async (item) => {
    if (isLoggedIn && user?._id) {
      // Add to database
      try {
        await axios.post(`${API_BASE_URL}/api/cart/${user._id}/add`, {
          productId: item.id || item._id,
          quantity: item.quantity || 1,
        });
        // Refresh cart from database
        const response = await axios.get(`${API_BASE_URL}/api/cart/${user._id}`);
        setCart(response.data.cart || []);
      } catch (error) {
        console.error("Error adding to database cart:", error);
        // Fallback to local cart
        addToLocalCart(item);
      }
    } else {
      // Add to local cart
      addToLocalCart(item);
    }
  };

  const addToLocalCart = (item) => {
    setCart((prevCart) => {
      const itemId = item.id || item._id;
      const existingItem = prevCart.find((cartItem) => 
        (cartItem.id || cartItem._id) === itemId
      );
      
      if (existingItem) {
        return prevCart.map((cartItem) =>
          (cartItem.id || cartItem._id) === itemId
            ? { ...cartItem, quantity: cartItem.quantity + (item.quantity || 1) }
            : cartItem
        );
      } else {
        return [...prevCart, { 
          ...item, 
          id: itemId, // Ensure consistent ID field
          quantity: item.quantity || 1 
        }];
      }
    });
  };

  const removeItem = async (itemId) => {
    if (isLoggedIn && user?._id) {
      // Remove from database
      try {
        await axios.delete(`${API_BASE_URL}/api/cart/${user._id}/item/${itemId}`);
        // Refresh cart from database
        const response = await axios.get(`${API_BASE_URL}/api/cart/${user._id}`);
        setCart(response.data.cart || []);
      } catch (error) {
        console.error("Error removing from database cart:", error);
        // Fallback to local removal
        removeFromLocalCart(itemId);
      }
    } else {
      removeFromLocalCart(itemId);
    }
  };

  const removeFromLocalCart = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const updateQuantity = async (itemId, quantity) => {
    if (isLoggedIn && user?._id) {
      // Update in database
      try {
        await axios.put(`${API_BASE_URL}/api/cart/${user._id}/item/${itemId}`, {
          quantity
        });
        // Refresh cart from database
        const response = await axios.get(`${API_BASE_URL}/api/cart/${user._id}`);
        setCart(response.data.cart || []);
      } catch (error) {
        console.error("Error updating database cart:", error);
        // Fallback to local update
        updateLocalQuantity(itemId, quantity);
      }
    } else {
      updateLocalQuantity(itemId, quantity);
    }
  };

  const updateLocalQuantity = (itemId, quantity) => {
    if (quantity < 1) {
      removeFromLocalCart(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
        )
      );
    }
  };

  const clearCart = async () => {
    if (isLoggedIn && user?._id) {
      // Clear database cart
      try {
        await axios.delete(`${API_BASE_URL}/api/cart/${user._id}/clear`);
      } catch (error) {
        console.error("Error clearing database cart:", error);
      }
    }
    // Always clear local cart
    setCart([]);
  };

  const clearCartOnLogout = () => {
    setCart([]); // Clear the cart state
    localStorage.removeItem("cart"); // Remove the cart from localStorage
  };

  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Load cart from localStorage on component mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem("cart");
      if (storedCart && storedCart !== "undefined" && storedCart !== "null") {
        const parsedCart = JSON.parse(storedCart);
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
        }
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      localStorage.removeItem("cart"); // Clear invalid data
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        clearCartOnLogout,
        getTotalItems,
        getTotalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
