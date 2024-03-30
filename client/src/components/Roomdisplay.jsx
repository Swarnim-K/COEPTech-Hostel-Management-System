// RoomDisplay.js
import React, { useState } from 'react';
import RoomDetails from './Roomdetails'; // Import RoomDetails component
import './Roomdisplay.css'; // This is the CSS file where you'll add your styles.

const RoomDisplay = () => {
    const [selectedYear, setSelectedYear] = useState('1st'); // Default to first year
    const [selectedRoom, setSelectedRoom] = useState(null); // Track selected room

    // Mock data for the buildings, replace or expand as needed.
    const buildings = {
        '1st': [{ floor: 'Floor 1', rooms: 10 }, { floor: 'Floor 2', rooms: 8 }],
        '2nd': [{ floor: 'Floor 1', rooms: 12 }, { floor: 'Floor 2', rooms: 9 }],
        '3rd': [{ floor: 'Floor 1', rooms: 11 }, { floor: 'Floor 2', rooms: 10 }],
        '4th': [{ floor: 'Floor 1', rooms: 7 }, { floor: 'Floor 2', rooms: 8 }]
    };

    // Handle room click event
    const handleRoomClick = roomNumber => {
        setSelectedRoom(roomNumber);
    };

    return (
        <div className="room-display">
            <select
                value={selectedYear}
                onChange={e => setSelectedYear(e.target.value)}
                className="year-selector"
            >
                <option value="1st">1st Year</option>
                <option value="2nd">2nd Year</option>
                <option value="3rd">3rd Year</option>
                <option value="4th">4th Year</option>
            </select>

            <div className="floors-container">
                {buildings[selectedYear].map((building, index) => (
                    <div key={index} className="floor">
                        <div className="floor-title">{building.floor}</div>
                        <div className="rooms">
                            {Array.from({ length: building.rooms }).map((_, roomIdx) => (
                                <div
                                    key={roomIdx}
                                    className="room"
                                    onClick={() => handleRoomClick(`${building.floor}-${roomIdx + 1}`)}
                                >
                                    {`Room ${roomIdx + 1}`}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Render RoomDetails component if a room is selected */}
            {selectedRoom && <RoomDetails roomNumber={selectedRoom} />}
        </div>
    );
};

export default RoomDisplay;
