import React, { useState, useEffect } from 'react';
import GuestRoomsSection from './GuestRoomsSection'; // Assuming the correct file path
import axios from 'axios';
import './GuestRoom.css';

const GuestRoom = () => {
  const [guestRooms, setGuestRooms] = useState([]);

  useEffect(() => {
    axios
      .get('/api/guests')
      .then(response => {
        setGuestRooms(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  return (
    <div className="guest-room-container">
      <GuestRoomsSection guestRooms={guestRooms} />
    </div>
  );
};

export default GuestRoom;
