import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook from react-router-dom
import './usercard.css'; // Make sure the CSS file is in the same directory

function UserCards() {
  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const navigateTo = (url) => {
    navigate(url); 
  };

  return (
    <div className="card-container">
      <div className="card" onClick={() => navigateTo('./admin-login')}>
        <div className="card-icon admin-icon"></div>
        <h3>Administrator Access</h3>
        <p>Full control over room management, student assignments, reservations, and comprehensive reporting capabilities.</p>
        <button>Manage Now</button>
      </div>

      <div className="card" onClick={() => navigateTo('./guest-login')}>
        <div className="card-icon faculty-icon"></div>
        <h3>Faculty/Guest Portal</h3>
        <p>Browse available rooms, submit reservation requests, and review your stay history.</p>
        <button>View Availability</button>
      </div>
    </div>
  );
}

export default UserCards;
