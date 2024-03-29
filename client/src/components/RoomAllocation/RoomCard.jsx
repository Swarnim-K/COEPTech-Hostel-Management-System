import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StudentHoldingSpace from './StudentHoldingSpace';
import './RoomAllocation.css';

const RoomCard = ({ room, index, addSelectedRoom }) => {
  const checkboxId = `check-${room._id}`;
  return (
    <div className="room-holder-card">
      <div className="room-holder-card-header">
        <div className="room-card-selector">
          <div className="checkbox-wrapper-33">
            <label className="checkbox" htmlFor={checkboxId}>
              <input
                className="checkbox__trigger visuallyhidden"
                type="checkbox"
                id={checkboxId}
                onChange={() => addSelectedRoom(room)}
              />
              <span className="checkbox__symbol">
                <svg
                  aria-hidden="true"
                  className="icon-checkbox"
                  width="28px"
                  height="28px"
                  viewBox="0 0 28 28"
                  version="1"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4 14l8 7L24 7"></path>
                </svg>
              </span>
            </label>
          </div>
        </div>
        <h3 className="room-holder-card-title"> {room.customId} </h3>
        <div className="room-card-menu">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
      <StudentHoldingSpace room={room} />
    </div>
  );
};

export default RoomCard;
