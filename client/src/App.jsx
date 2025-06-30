import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/Auth/AuthContext';
import { CartProvider } from './contexts/Cart/CartContext';
import ShippingProvider from './contexts/Shipping/ShippingContext';

// Pages
import Page from './Page';
import Home from './pages/Home';
import Login from './pages/Login';
import About from './pages/About';
import Register from './pages/Register';
import Cart from './pages/Cart';
import Orders from './pages/Orders';
import Checkout from './pages/Checkout';
import ContactUs from './pages/ContactUs';
import Menu from './pages/Menu';
import UpdateProfile from './pages/UpdateProfile';
import Address from './pages/Address';
import NotFound from './pages/NotFound';


function App() {
  return (
    <div className="App">
      <AuthProvider>
        <CartProvider>
          <ShippingProvider>
            <Router>
              <Routes>
                <Route path="/" element={<Page><Home /></Page>} />
                <Route path="/home" element={<Page><Home /></Page>} />
                <Route path="/login" element={<Page><Login /></Page>} />
                <Route path="/about" element={<Page><About /></Page>} />
                <Route path="/register" element={<Page><Register /></Page>} />
                <Route path="/menu" element={<Page><Menu /></Page>} />
                <Route path="/cart" element={<Page><Cart /></Page>} />
                <Route path="/order" element={<Page><Orders /></Page>} />
                <Route path="/checkout" element={<Page><Checkout /></Page>} />
                <Route path="/contact-us" element={<Page><ContactUs /></Page>} />
                <Route path="/profile/update" element={<Page><UpdateProfile /></Page>} />
                <Route path="/address" element={<Page><Address /></Page>} />
                <Route path="*" element={<Page><NotFound /></Page>} />
              </Routes>
            </Router>
          </ShippingProvider>
        </CartProvider>
      </AuthProvider>
    </div>
  );
}

export default App;