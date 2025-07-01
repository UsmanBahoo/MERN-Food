import React from 'react';
import { Navigate } from 'react-router-dom';
import useAdminAuth from '../contexts/AdminAuth/UseAdminAuth';

const AdminProtectedRoute = ({ children }) => {
    const { isAdminLoggedIn, loading } = useAdminAuth();

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAdminLoggedIn) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default AdminProtectedRoute;
