import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import './RoomAllocation.css';
import StudentsColumn from './StudentsColumn';
import RoomsColumn from './RoomsColumn';

const RoomAllocation = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('/api/students?withoutRoom=true')
      .then(res => {
        setStudents(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .get('/api/rooms')
      .then(res => {
        setRooms(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

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
        if (res.status === 200) {
          fetchData(); // Update data after successful drag and drop
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="room-allocation-container">
        <StudentsColumn students={students} />
        <RoomsColumn rooms={rooms} />
      </div>
    </DragDropContext>
  );
};

export default RoomAllocation;
