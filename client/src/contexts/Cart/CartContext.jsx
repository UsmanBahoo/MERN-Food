import { createContext, useState, useEffect } from "react";
import useAuth from "../Auth/UseAuth";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const { isLoggedIn } = useAuth(); // Get the current user from Auth context

  console.log("CartProvider initialized with cart:", cart);

  const addItem = (item) => {
    if(isLoggedIn){
      setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        return [...prevCart, { ...item, quantity: 1 }];
      }
    });
    } else {
      console.warn("Cannot add item to cart. User is not logged in.");
      alert("Please log in first.");
    }

    
  };

  const removeItem = (itemId) => {
    setCart((prevCart) =>
      prevCart.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const updateQuantity = (itemId, quantity) => {
    console.log("Updating quantity for item:", itemId, "to:", quantity);
    if (quantity < 1) {
      removeItem(itemId);
    } else {
      setCart((prevCart) =>
        prevCart.map((cartItem) =>
          cartItem.id === itemId ? { ...cartItem, quantity } : cartItem
        )
      );
    }
  };

  const clearCart = () => {
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
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    } catch (error) {
      console.error("Error parsing cart from localStorage:", error);
      localStorage.removeItem("cart"); // Clear invalid data
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    console.log("Saving cart to localStorage:", cart);
    localStorage.setItem("cart", JSON.stringify(cart));
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
