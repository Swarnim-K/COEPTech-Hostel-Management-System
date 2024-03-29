import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import RoomCard from './RoomCard';
import './RoomAllocation.css';
import axios from 'axios';

const RoomsColumn = ({ rooms, addSelectedRoom }) => {
  return (
    <div className="rooms-column">
      <h2 className="rooms-column-heading">Rooms</h2>
      <div className="room-cards">
        {rooms.map((room, index) => (
          <RoomCard
            key={room._id}
            room={room}
            index={index}
            addSelectedRoom={addSelectedRoom}
          />
        ))}
      </div>
    </div>
  );
};

export default RoomsColumn;
