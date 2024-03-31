// RoomDetails.js
import React from 'react';
import './RoomDetails.css'; // Import CSS for RoomDetails styling

const RoomDetails = ({ roomNumber }) => {
    // Mock data for room details and students
    const roomDetails = {
        '1A': {
            roomNumber: '1A',
            capacity: 4,
            students: [
                { name: 'Student 1', photo: 'student1.jpg' },
                { name: 'Student 2', photo: 'student2.jpg' },
                { name: 'Student 3', photo: 'student3.jpg' },
                { name: 'Student 4', photo: 'student4.jpg' }
            ]
        },
        // Add more room details as needed
    };

    const { capacity, students } = roomDetails[roomNumber];

    return (
        <div className="room-details">
            <h2>Room {roomNumber}</h2>
            <p>Capacity: {capacity}</p>
            <div className="student-list">
                {students.map((student, index) => (
                    <div key={index} className="student">
                        <img src={student.photo} alt={student.name} />
                        <p>{student.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RoomDetails;
