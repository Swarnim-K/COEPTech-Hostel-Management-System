import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios from 'axios';
import './RoomAllocation.css';
import StudentsColumn from './StudentsColumn';
import RoomsColumn from './RoomsColumn';

const RoomAllocation = () => {
  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (source.droppableId === destination.droppableId) {
      return;
    }

    axios
      .put(`/api/students`, {
        student: draggableId,
        room: destination.droppableId,
      })
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="room-allocation-container">
        <StudentsColumn key={'students-column'} />
        <RoomsColumn key={'rooms-column'} />
      </div>
    </DragDropContext>
  );
};

export default RoomAllocation;
