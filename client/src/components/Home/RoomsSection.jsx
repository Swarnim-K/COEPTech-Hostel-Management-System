import React from 'react';
import './RoomsSection.css';
import RoomCard from './RoomCard';

const RoomsSection = ({ rooms }) => {
  return (
    <div className="rooms-section">
      <h2 className="rooms-section-heading">Rooms</h2>
      <div className="room-cards">
        {rooms.map((room, index) => (
          <RoomCard key={room._id} room={room} index={index} />
        ))}
      </div>
    </div>
  );
};

export default RoomsSection;
