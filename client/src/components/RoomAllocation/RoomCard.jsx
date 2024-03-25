import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StudentHoldingSpace from './StudentHoldingSpace';
import './RoomAllocation.css';

const RoomCard = ({ room, index }) => {
  return (
    <div className="room-holder-card">
      <h3 className="room-holder-card-title"> {room.customId} </h3>
      <StudentHoldingSpace room={room} />
    </div>
  );
};

export default RoomCard;
