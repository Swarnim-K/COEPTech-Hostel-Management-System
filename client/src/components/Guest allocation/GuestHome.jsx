import React from 'react';
import GuestRoomsSection from './GuestRoomsSection'; // Assuming the correct file path

const GuestHome = () => {
  // Sample data for guest rooms
  const guestRooms = [
    { _id: 1, capacity: 2 },
    { _id: 2, capacity: 3 },
    { _id: 3, capacity: 4 }
  ];

  return (
    <div>
      <GuestRoomsSection guestRooms={guestRooms} />
    </div>
  );
};

export default GuestHome;
