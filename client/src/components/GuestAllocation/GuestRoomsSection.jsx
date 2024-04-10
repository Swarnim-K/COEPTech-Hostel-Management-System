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
  });

  const handleAllocateRoom = roomId => {
    setShowForm(true);
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

    console.log(formData);
    handleCloseForm();
  };

  return (
    <div className="guest-rooms-section">
      <h2 className="guest-rooms-section-heading">Guest Rooms</h2>
      <div className="guest-room-cards">
        {guestRooms.map((guestRoom, index) => (
          <div key={guestRoom._id} className="guest-room-card">
            <h3 className="guest-room-card-title">{guestRoom.name}</h3>
            <div className="guest-room-card-details">
              <button onClick={() => handleAllocateRoom(guestRoom._id)}>
                Allocate Room
              </button>
            </div>
          </div>
        ))}
      </div>
      {showForm && (
        <div className="allocation-form">
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="address">Address:</label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
            />
            <label htmlFor="rent">Rent:</label>
            <input
              type="number"
              id="rent"
              name="rent"
              value={formData.rent}
              onChange={handleInputChange}
              required
            />
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
