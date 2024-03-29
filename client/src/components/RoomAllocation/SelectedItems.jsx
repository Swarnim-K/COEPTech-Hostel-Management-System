import React from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import './RoomAllocationActionBar.css';

const SelectedItems = ({ selectedStudents, selectedRoom }) => {
  return (
    <>
      <div className="action-bar-item">
        <div className="action-bar-selected-students">
          {selectedStudents.map((student, index) => (
            <div className="action-bar-student-card">
              <div className="action-bar-student-username">
                {student.username}
              </div>
              <div className="action-bar-student-name">{student.name}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="action-bar-item">
        <FaArrowRight className="action-bar-arrow-icon" />
      </div>
      <div className="action-bar-item">
        {selectedRoom && (
          <div className="action-bar-selected-room">
            <div className="action-bar-room-card">
              <div className="room-card-custom-id">{selectedRoom.customId}</div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default SelectedItems;
