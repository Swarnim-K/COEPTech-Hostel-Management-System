import React from 'react';
import './RoomsSection.css';

const RoomCard = ({ room, index }) => {
  return (
    <div className="room-section-card">
      <div className="room-section-card-header">
        <h3 className="room-section-card-title"> {room.customId} </h3>
      </div>
      <div className="room-section-member-holding-space">
        {room.members.map((student, index) => (
          <div className="room-section-member-card">
            <div className="room-section-member-name">{student.name}</div>
            <div className="room-section-member-username">
              {student.username}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomCard;
