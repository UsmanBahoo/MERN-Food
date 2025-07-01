import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function Users() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = () => {
        axios.get(`${API_BASE_URL}/api/users`)
            .then(response => {
                if (response.status === 200) {
                    setUsers(response.data.users || []);
                } else {
                    console.error("Failed to fetch users");
                    setUsers([]);
                }
            })
            .catch(error => {
                console.error("Error fetching users:", error);
                setUsers([]);
            });
    };

    const handleDelete = (userId) => {
        if (!userId) {
            alert('Invalid user ID');
            return;
        }

        if (window.confirm('Are you sure you want to delete this user?')) {
            axios.delete(`${API_BASE_URL}/api/users/${userId}`)
                .then(response => {
                    if (response.status === 200) {
                        alert('User deleted successfully!');
                        fetchUsers();
                    }
                })
                .catch(error => {
                    console.error('Error deleting user:', error);
                    alert('Failed to delete user: ' + (error.response?.data?.message || error.message));
                });
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Manage Users</h2>

            {/* Show fallback message when no users */}
            {(!users || !Array.isArray(users) || users.length === 0) && (
                <div className="text-center text-gray-500 mb-6">
                    <p>No users available.</p>
                </div>
            )}

            {/* Users Grid - 3 cards per row */}
            {Array.isArray(users) && users.length > 0 && (
                <div className="flex flex-wrap">
                    {users.map((user, index) => (
                        <div key={user._id || index} className="w-1/3 flex justify-center mb-6">
                            <UserCard
                                user={user}
                                onDelete={() => handleDelete(user._id)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function UserCard({ user, onDelete }) {
    return (
        <div className="border border-gray-300 rounded-md p-4 text-sm text-blue-800 space-y-2">
            <p>
                <span className="font-semibold text-black">User ID:</span>{" "}
                <span className="text-blue-700">{user._id}</span>
            </p>
            <p>
                <span className="font-semibold text-black">Username:</span>{" "}
                <span className="text-purple-700">{user.username || user.email}</span>
            </p>
            <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600 w-full mt-2" onClick={onDelete}>
                Delete
            </button>
        </div>
    );
}

export default Users;
