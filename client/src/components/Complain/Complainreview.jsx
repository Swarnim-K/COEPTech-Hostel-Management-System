import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios
import './Complainreview.css';
import { FaTrash } from 'react-icons/fa'; // Import trash icon from react-icons/fa

function App() {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        // Define a function to fetch all reports from the server
        const fetchReviews = async () => {
            try {
                // Make a GET request to the server to fetch all reviews
                const response = await axios.get('/api/reports');
                // Update the state with the received data
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        // Call the function to fetch reviews when the component mounts
        fetchReviews();
    }, []); // Empty dependency array ensures this effect runs only once

    const handleCheckboxChange = async (id) => {
        try {
            // Make a PUT request to the server to mark the review as resolved
            await axios.put(`/api/reports/status/${id}`, { status: 'resolved' });
            // Update the local state to reflect the change
            setReviews(reviews.map(review => {
                if (review._id === id) {
                    return { ...review, status: 'resolved' };
                }
                return review;
            }));
        } catch (error) {
            console.error('Error updating review status:', error);
        }
    };

    const handleDeleteReview = async (id) => {
        try {
            // Make a DELETE request to the server to delete the review
            await axios.delete(`/api/reports/${id}`);
            // Update the local state to remove the deleted review
            setReviews(reviews.filter(review => review._id !== id));
        } catch (error) {
            console.error('Error deleting review:', error);
        }
    };
    
    return (
        <div className="App">
            <header className="App-header">
                Complain Page
            </header>
            <div className="review-list">
                {reviews.map(review => (
                    <div className="review-card" key={review._id}>
                    <div className="icons" style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <div className="checkbox">
                        <input
                            type="checkbox"
                            checked={review.status === 'resolved'}
                            onChange={() => handleCheckboxChange(review._id)}
                        />
                        </div>
                        <div className="delete-icon" onClick={() => handleDeleteReview(review._id)}>
                        <FaTrash />
                        </div>
                    </div>
                    <div style={{ marginTop: '20px' }}>
                        <h4>Issue: {review.issue}</h4>
                        <p>Details: {review.details}</p>
                        <p>Status: <strong>{review.status}</strong></p>
                        <p>Created At: {new Date(review.createdAt).toLocaleString()}</p>
                        <p>Updated At: {new Date(review.updatedAt).toLocaleString()}</p>
                    </div>
                    </div>
                ))}
            </div>

        </div>
    );
}

export default App;
