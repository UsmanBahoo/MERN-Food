import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

// Contexts
import { AuthProvider } from './contexts/Auth/AuthProvider';
import { CartProvider } from './contexts/Cart/CartContext';
import ShippingProvider from './contexts/Shipping/ShippingContext';
import { AdminAuthProvider } from './contexts/AdminAuth/AdminAuthProvider';

// Components
import AdminProtectedRoute from './components/AdminProtectedRoute';

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

// Admin Pages
import Dashboard from './pages/admin/Dashboard';
import Products from './pages/admin/Products';
import UpdateProduct from './pages/admin/UpdateProduct';
import AdminLogin from './pages/admin/AdminLogin';
import UpdateAdminProfile from './pages/admin/UpdateProfile';
import AdminPage from './pages/admin/AdminPage';
import Users from './pages/admin/Users';
import OrdersData from './pages/admin/Orders';
import Admins from './pages/admin/Admins';
import Feedbacks from './pages/admin/Feedbacks';
import AdminRegister from './pages/admin/AdminRegister';



function App() {
  return (
    <div className="App">
      <AuthProvider>
        <AdminAuthProvider>
          <CartProvider>
            <ShippingProvider>
              <Router>
                <Routes>

                  {/* Public Routes */}
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

                  {/* Admin Routes */}
                  <Route path="/admin/login" element={<AdminPage><AdminLogin /></AdminPage>} />
                  <Route path="/admin/register" element={<AdminPage><AdminRegister /></AdminPage>} />
                  
                  {/* Protected Admin Routes */}
                  <Route path="/admin/profile" element={
                    <AdminProtectedRoute>
                      <AdminPage><UpdateAdminProfile /></AdminPage>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/dashboard" element={
                    <AdminProtectedRoute>
                      <AdminPage><Dashboard /></AdminPage>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/products" element={
                    <AdminProtectedRoute>
                      <AdminPage><Products /></AdminPage>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/product/update" element={
                    <AdminProtectedRoute>
                      <AdminPage><UpdateProduct /></AdminPage>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/users" element={
                    <AdminProtectedRoute>
                      <AdminPage><Users /></AdminPage>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/orders" element={
                    <AdminProtectedRoute>
                      <AdminPage><OrdersData /></AdminPage>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/admins" element={
                    <AdminProtectedRoute>
                      <AdminPage><Admins /></AdminPage>
                    </AdminProtectedRoute>
                  } />
                  <Route path="/admin/feedbacks" element={
                    <AdminProtectedRoute>
                      <AdminPage><Feedbacks /></AdminPage>
                    </AdminProtectedRoute>
                  } />

                  {/* Catch-all route for 404 Not Found */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </Router>
            </ShippingProvider>
          </CartProvider>
        </AdminAuthProvider>
      </AuthProvider>
    </div>
  );
}

export default App;