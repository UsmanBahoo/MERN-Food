import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_BASE_URL from '../../config/api';

function Feedbacks() {
    const [feedbacks, setFeedbacks] = useState([]);
    console.log("Feedback: ", feedbacks);

    useEffect(() => {
        fetchFeedbacks();
    }, []);

    const fetchFeedbacks = () => {
        axios.get(`${API_BASE_URL}/api/feedbacks`)
            .then(response => {
                if (response.status === 200) {
                    setFeedbacks(response.data.feedbacks || []);
                } else {
                    console.error("Failed to fetch feedbacks");
                    setFeedbacks([]);
                }
            })
            .catch(error => {
                console.error("Error fetching feedbacks:", error);
                setFeedbacks([]);
            });
    };


    const handleDelete = (feedbackId, index) => {
        if (window.confirm('Are you sure you want to delete this feedback?')) {
            axios.delete(`${API_BASE_URL}/api/feedbacks/${feedbackId}`)
                .then(response => {
                    if (response.status === 200) {
                        alert('Feedback deleted successfully!');
                        fetchFeedbacks();
                    }
                })
                .catch(error => {
                    console.error('Error deleting feedback:', error);
                    const updatedFeedbacks = feedbacks.filter((_, i) => i !== index);
                    setFeedbacks(updatedFeedbacks);
                });
        }
    };

    return (
        <div className="max-w-6xl mx-auto mt-10 p-6 bg-white">
            <h2 className="text-2xl font-semibold text-center mb-6">Customer Feedbacks</h2>

            {/* Show fallback message when no feedbacks */}
            {(!feedbacks || !Array.isArray(feedbacks) || feedbacks.length === 0) && (
                <div className="text-center text-gray-500 mb-6">
                    <p>No feedbacks available.</p>
                </div>
            )}

            {/* Feedbacks Grid - 3 cards per row */}
            {Array.isArray(feedbacks) && feedbacks.length > 0 && (
                <div className="flex flex-wrap">
                    {feedbacks.map((feedback, index) => (
                        <div key={feedback._id || index} className="w-1/3 flex justify-center mb-6">
                            <FeedbackCard
                                feedback={{
                                    ...feedback,
                                    name: feedback.userId?.name || feedback.customerName,
                                    email: feedback.userId?.email || feedback.customerEmail,
                                    phone: feedback.userId?.phone || feedback.phone,
                                    subject: feedback.subject || feedback.message
                                }}
                                onDelete={() => handleDelete(feedback._id, index)}
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function FeedbackCard({ feedback, onDelete }) {

    return (
        <div className="border border-gray-300 rounded-md p-4 text-sm text-blue-800 space-y-2">
            <p><span className="font-semibold text-black">name :</span> {feedback.name || 'N/A'}</p>
            <p><span className="font-semibold text-black">number :</span> {feedback.phone || 'N/A'}</p>
            <p><span className="font-semibold text-black">email :</span> {feedback.email || 'N/A'}</p>
            <p><span className="font-semibold text-black">message :</span> {feedback.subject}</p>
            <button className="bg-red-500 text-white font-semibold px-6 py-2 rounded hover:bg-red-600 w-full mt-2" onClick={onDelete}>
                Delete
            </button>
        </div>
    );
}

export default Feedbacks;
