import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import './RoomCard.css';

const GuestRoomsSection = ({ guestRooms }) => {

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    rent: '',
    gender: '',
    date_from: '',
    date_to: '',
  });
  const [allocations, setAllocations] = useState({});

  const handleAllocateRoom = roomId => {
    setShowForm({ ...showForm, [roomId]: true });
  };

  const handleCloseForm = () => {
    setShowForm(false);
  };

  const handleInputChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    // Find the first available room ID or use the first room ID if none available
    const roomId = Object.keys(allocations).find(key => allocations[key] === null) || guestRooms[0]._id;

    // Store the form data in the allocations object
    const newAllocations = { ...allocations };
    if (newAllocations[roomId]) {
      newAllocations[roomId].push(formData);
    } else {
      newAllocations[roomId] = [formData];
    }
    setAllocations(newAllocations);

    // Reset form data and hide the form
    setFormData({
      name: '',
      address: '',
      rent: '',
      gender: '',
    });
    setShowForm(false);
  };

  return (
    <div className="guest-rooms-section">
      <h2 className="guest-rooms-section-heading">Guest Rooms</h2>
      <div className="guest-room-cards">
        { guestRooms.map((guestRoom, index)=> (
          <div key={guestRoom._id} className="guest-room-card">
            <h3 className="guest-room-card-title">{guestRoom.name}</h3>
            <div className="guest-room-card-details">
              {/* Conditionally render allocation data if available */}
              {allocations[guestRoom._id] &&
                allocations[guestRoom._id].map((allocation, idx) => (
                  <div key={idx} className="room-data-member-card">
                    <p className="room-data-member-name">Name: {allocation.name}</p>
                    <p className="room-data-member-username">Rent: {allocation.rent}</p>
                    <p className="room-data-member-username">Date From: {allocation.date_from}</p>
                    <p className="room-data-member-username">Date To: {allocation.date_to}</p>
                  </div>
                ))}
            </div>
          <button className="room-allocation-button mt-3" onClick={() => handleAllocateRoom(guestRoom._id)}>Allocate Room</button>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="allocation-form">
        <form onSubmit={handleSubmit}>
          {/* Form fields for guest information */}
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="rent">Rent:</label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={formData.rent}
              onChange={handleInputChange}
              required
            />
          </div>
          
          <div>
            <label htmlFor="dateFrom">Date From:</label>
            <input
              type="date"
              id="date_from"
              name="date_from"
              value={formData.date_from}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="dateTo">Date To:</label>
            <input
              type="date"
              id="date_to"
              name="date_to"
              value={formData.date_to}
              onChange={handleInputChange}
              required
            />
          </div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          <button type="submit">Allocate</button>
          <button type="button" onClick={handleCloseForm}>
            Cancel
          </button>
          <FaTimes className="cancel-icon" onClick={handleCloseForm} />
        </form>
      </div>
      
      )}
    </div>
  );
};

export default GuestRoomsSection;
