import React, { useState } from 'react';
import './RoomsSection.css';

const RoomCard = ({ room }) => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div
      className="room-section-card"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="room-section-card-header">
        <h3 className="room-section-card-title"> {room.customId} </h3>
      </div>
      <div className="room-section-member-holding-space">
        {hovered &&
          room.members.map((student, index) => (
            <div className="room-section-member-card" key={index}>
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
