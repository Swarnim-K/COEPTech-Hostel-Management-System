import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import './RoomAllocation.css';
import StudentsColumn from './StudentsColumn';
import RoomsColumn from './RoomsColumn';
import RoomAllocationActionBar from './RoomAllocationActionBar';
import ErrorHeader from './ErrorHeader';

const RoomAllocation = () => {
  const [students, setStudents] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [error, setError] = useState(null);

  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [filteredStudents, setFilteredStudents] = useState([]); // State to store filtered students

  const addSelectedStudent = student => {
    if (selectedRoom === null) {
      setError('Please select a room first');
    }

    if (selectedStudents.includes(student)) {
      setSelectedStudents(selectedStudents.filter(s => s !== student));
      return;
    }

    if (selectedStudents.length == 4 - selectedRoom.members.length) {
      setError('Cannot exceed room capacity');
      return;
    } else {
      setSelectedStudents([...selectedStudents, student]);
    }
  };

  const addSelectedRoom = room => {
    if (selectedRoom === room) {
      setSelectedRoom(null);
      return;
    } else {
      setError(null);
      setSelectedRoom(null);
      setSelectedRoom(room);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('/api/students?withoutRoom=true')
      .then(res => {
        setStudents(res.data);
        setFilteredStudents(res.data); // Initialize filtered students with all students
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
      <ErrorHeader error={error} />
      <div className="room-allocation-container">
        <StudentsColumn
          students={filteredStudents}
          setFilteredStudents={setFilteredStudents}
          selectedStudents={selectedStudents}
          addSelectedStudent={addSelectedStudent}
          selectedRoom={selectedRoom}
        />
        <RoomsColumn addSelectedRoom={addSelectedRoom} rooms={rooms} />
      </div>
      <RoomAllocationActionBar
        selectedStudents={selectedStudents}
        selectedRoom={selectedRoom}
        addSelectedStudent={addSelectedStudent}
        addSelectedRoom={addSelectedRoom}
        updateStudentData={setStudents}
        updateRoomData={setRooms}
      />
    </DragDropContext>
  );
};

export default RoomAllocation;
