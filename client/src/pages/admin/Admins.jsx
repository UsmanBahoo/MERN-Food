import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function Admins() {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = () => {
        axios.get(`${API_BASE_URL}/api/admins`)
            .then(response => {
                if (response.status === 200) {
                    setAdmins(response.data.admins || []);
                } else {
                    console.error("Failed to fetch admins");
                    setAdmins([]);
                }
            })
            .catch(error => {
                console.error("Error fetching admins:", error);
                setAdmins([]);
            });
    };



    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Manage Admins</h2>

            {/* Show fallback message when no admins */}
            {(!admins || !Array.isArray(admins) || admins.length === 0) && (
                <div className="text-center text-gray-500 mb-6">
                    <p>No admins available.</p>
                </div>
            )}

            {/* Admins Grid - 3 cards per row */}
            {Array.isArray(admins) && admins.length > 0 && (
                <div className="flex flex-wrap">
                    {admins.map((admin, index) => (
                        <div key={admin._id || index} className="w-1/3 flex justify-center mb-6">
                            <AdminCard
                                admin={admin}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function AdminCard({ admin }) {
 
    return (
        <div className="border rounded-lg p-4 bg-white shadow-md w-64">
            <p className="text-gray-700">{admin._id}</p>
            <p className="text-purple-600">username: {admin.username || admin.email}</p>
        </div>
    );
}

export default Admins;
