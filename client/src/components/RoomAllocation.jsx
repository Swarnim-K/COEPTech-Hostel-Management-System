import React, { useState } from 'react';
import './RoomAllocation.css';

// Dummy data
const dummyStudents = [
  { id: 112103001, name: 'Student 1' },
  { id: 112103002, name: 'Student 2' },
  { id: 112103003, name: 'Student 3' },
  { id: 112103004, name: 'Student 4' },
  { id: 112103005, name: 'Student 5' },
  { id: 112103006, name: 'Student 6' },
  { id: 112105007, name: 'Student 7' },
  { id: 112105008, name: 'Student 8' },
  { id: 112105009, name: 'Student 9' },
  { id: 1112105010, name: 'Student 10' },
  { id: 1112105011, name: 'Student 11' },
  { id: 1112105012, name: 'Student 12' },
  // Add more dummy students as needed
];

const dummyRooms = [
  { id: 1, number: 101, capacity: 4, students: [] },
  { id: 2, number: 102, capacity: 4, students: [] },
  // Add more dummy rooms as needed
];

const RoomAllocation = () => {
  const [students, setStudents] = useState(dummyStudents);
  const [rooms, setRooms] = useState(dummyRooms);
  const [searchStudentId, setSearchStudentId] = useState('');
  const [selectedRoomId, setSelectedRoomId] = useState(null); // Selected room ID
  const [allocationMessage, setAllocationMessage] = useState(''); // Allocation message

  // Function to allocate students to rooms
  const allocateRooms = () => {
    let allocatedStudents = [...students];
    let allocatedRooms = [...rooms];

    allocatedRooms.forEach(room => {
      if (room.id === selectedRoomId) {
        const studentIndex = students.findIndex(student => student.id === parseInt(searchStudentId));
        if (studentIndex !== -1 && room.students.length < room.capacity) {
          room.students.push(students[studentIndex]);
          setStudents(prevStudents => prevStudents.filter((_, index) => index !== studentIndex));
          setAllocationMessage(`Allocated student to Room ${room.number}`);
        } else {
          setAllocationMessage(`Room ${room.number} is at capacity`);
        }
      }
    });

    setRooms(allocatedRooms);
    setSearchStudentId('');
    setSelectedRoomId(null);
  };

  // Function to filter students based on search input
  const filteredStudents = students.filter(student =>
    student.id.toString().startsWith(searchStudentId)
  );

  // Function to handle allocating a student to the specified room
  const allocateStudentToRoom = studentId => {
    const studentIndex = students.findIndex(student => student.id === parseInt(studentId));
    if (studentIndex !== -1) {
      const allocatedStudent = students[studentIndex];
      setStudents(prevStudents => prevStudents.filter((_, index) => index !== studentIndex));

      const updatedRooms = rooms.map(room => {
        if (room.id === selectedRoomId) {
          room.students.push(allocatedStudent);
        }
        return room;
      });
      setRooms(updatedRooms);
    }
  };

  // Function to render each student with disabled state if the room is at capacity
  const renderStudent = student => {
    const isRoomFull = rooms.some(room => room.id === selectedRoomId && room.students.length >= room.capacity);
    return (
      <div key={student.id} onClick={() => {
        if (!isRoomFull) {
          allocateStudentToRoom(student.id);
        }
      }} style={{ cursor: isRoomFull ? 'not-allowed' : 'pointer', color: isRoomFull ? 'gray' : 'inherit' }}>
        {student.name}
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div>
          <h2>Unallocated Students</h2>
          <div className="dropdown">
            <input
              type="text"
              value={searchStudentId}
              onChange={e => setSearchStudentId(e.target.value)}
              placeholder="Search by ID..."
            />
            {searchStudentId && (
              <div className="dropdown-content">
                {filteredStudents.map(student => renderStudent(student))}
              </div>
            )}
          </div>
        </div>
        <div>
          <h2>Available Rooms</h2>
          <ul>
            {rooms.map(room => (
              <li key={room.id}>
                Room {room.number}{' '}
                <button onClick={() => {
                  setSelectedRoomId(room.id);
                  setAllocationMessage(`Allocating to Room ${room.number}`);
                }}>Allocate</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div>
        <h2>{allocationMessage}</h2>
        <h2>Rooms</h2>
        {rooms.map(room => (
          <div key={room.id}>
            <h3>Room {room.number}</h3>
            <ul>
              {room.students.map(student => (
                <li key={student.id}>{student.name}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RoomAllocation;
