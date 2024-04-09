import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ApplicantHoldingSpace from './ApplicantHoldingSpace';
import './AllotmentColumn.css';

const AllotmentColumn = ({
  branch,
  allotments,
  setAllotments,
  gender,
  year,
  round,
  removeSelectedApplicant,
}) => {
  const applicantSwitch = (applicant, index, direction, positions) => {
    const newIndex = direction === 'up' ? index - positions : index + positions;
    const newAllotments = { ...allotments };
    newAllotments[branch][gender].splice(index, 1);
    newAllotments[branch][gender].splice(newIndex, 0, applicant);
    setAllotments(newAllotments);
  };

  const updateAllotments = allotments => {
    console.log(allotments);
  };

  return (
    <div className="allotment-column">
      <h2 className="rooms-column-heading">
        Allotment List ({`Round ${round}`})
      </h2>
      <div className="room-holder-card">
        <div className="room-holder-card-header">
          <div className="room-card-selector"></div>
          <h3 className="room-holder-card-title">
            {year} {`(${branch})`}
          </h3>
          <div className="room-card-menu"></div>
        </div>
        <ApplicantHoldingSpace
          branch={branch}
          allotments={allotments}
          gender={gender}
          removeSelectedApplicant={removeSelectedApplicant}
          applicantSwitch={applicantSwitch}
        />
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
