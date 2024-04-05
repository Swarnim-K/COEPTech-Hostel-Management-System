import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; 
import './RoomCard.css';

const GuestRoomsSection = ({ guestRooms }) => {
  const [showForm, setShowForm] = useState(false);

  const handleAllocateRoom = (roomId) => {
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  return (
    <div className="guest-rooms-section">
      <h2 className="guest-rooms-section-heading">Guest Rooms</h2>
      <div className="guest-room-cards">
        {guestRooms.map((guestRoom, index) => (
          <div key={guestRoom._id} className="guest-room-card">
            <h3 className="guest-room-card-title">Guest Room {index + 1}</h3>
            <div className="guest-room-card-details">
              <p>Capacity: {guestRoom.capacity}</p>
              <button onClick={() => handleAllocateRoom(guestRoom._id)}>Allocate Room</button>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="allocation-form">
          <form>
            <label htmlFor="name">Name:</label>
            <input type="text" id="name" name="name" required />
            <label htmlFor="address">Address:</label>
            <input type="text" id="address" name="address" required />
            <label htmlFor="rent">Rent:</label>
            <input type="number" id="rent" name="rent" required />
            <button type="submit">Allocate</button>
            <button type="button" onClick={handleCloseForm}>Cancel</button>
            <FaTimes className="cancel-icon" onClick={handleCloseForm} /> 
          </form>
        </div>
      )}
    </div>
  );
};

export default GuestRoomsSection;
