import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ApplicantHoldingSpace from './ApplicantHoldingSpace';
import './AllotmentColumn.css';

const AllotmentColumn = ({ allotments }) => {
  const updateAllotments = allotments => {
    console.log(allotments);
  };

  return (
    <div className="rooms-column">
      <h2 className="rooms-column-heading">Round 1</h2>
      <div className="room-holder-card">
        <div className="room-holder-card-header">
          <div className="room-card-selector">
            {/* <div className="checkbox-wrapper-33">
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
          </div> */}
          </div>
          <h3 className="room-holder-card-title">Allotment Order</h3>
          <div className="room-card-menu">
            {/* <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div> */}
          </div>
        </div>
        <ApplicantHoldingSpace allotments={allotments} />
        <button
          className="student-form-submit-btn"
          type="submit"
          onClick={() => updateAllotments(allotments)}
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default AllotmentColumn;
