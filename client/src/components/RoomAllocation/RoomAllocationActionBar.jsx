import React, { useEffect, useState } from 'react';
import SelectedItems from './SelectedItems';
import './RoomAllocationActionBar.css';
import axios from 'axios';

const RoomAllocationActionBar = ({
  selectedStudents,
  selectedRoom,
  updateStudentData,
  updateRoomData,
}) => {
  const [allocationCompleted, setAllocationCompleted] = useState(false);

  useEffect(() => {
    if (allocationCompleted) {
      window.location.reload();
    }
  }, [allocationCompleted]);

  const onAllocationSubmit = () => {
    if (selectedStudents.length === 0 || !selectedRoom) {
      console.log('Please select students and a room');
      return;
    }

    let promises = [];

    selectedStudents.forEach(student => {
      promises.push(
        axios.put(`/api/students`, {
          student: student._id,
          room: selectedRoom._id,
        }),
      );
    });

    Promise.all(promises)
      .then(responses => {
        console.log('All students allocated successfully');
        setAllocationCompleted(true); // Set allocationCompleted to true
      })
      .catch(err => {
        console.log('Error occurred while allocating students:', err);
      });
  };

  return (
    <>
      {selectedRoom ? (
        <>
          <div className="action-bar-dropdown"></div>
          <div className="room-allocation-action-bar">
            <SelectedItems
              selectedStudents={selectedStudents}
              selectedRoom={selectedRoom}
            />
            <div className="action-bar-item">
              <button
                className="action-bar-button"
                onClick={onAllocationSubmit}
              >
                Allocate
              </button>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};

export default RoomAllocationActionBar;
