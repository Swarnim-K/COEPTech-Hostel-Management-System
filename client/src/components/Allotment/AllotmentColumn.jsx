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
    newAllotments[branch][gender]['confirmed'].splice(index, 1);
    newAllotments[branch][gender]['confirmed'].splice(newIndex, 0, applicant);
    setAllotments(newAllotments);
  };

  return (
    <div className="allotment-column">
      <h2 className="allotment-column-heading">
        Allotment List ({`Round ${round}`})
      </h2>
      <div className="allotment-holder-card">
        <div className="allotment-holder-card-header">
          <h3 className="allotment-holder-card-title">
            {year} {`(${branch})`}
          </h3>
        </div>
        <ApplicantHoldingSpace
          branch={branch}
          allotments={allotments}
          gender={gender}
          removeSelectedApplicant={removeSelectedApplicant}
          applicantSwitch={applicantSwitch}
          parent="confirmed"
        />
      </div>
    </div>
  );
};

export default AllotmentColumn;
