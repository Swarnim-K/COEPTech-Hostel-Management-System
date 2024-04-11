import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import WaitingListHoldingSpace from './WaitingListHoldingSpace';
import './AllotmentColumn.css';

const WaitingListColumn = ({
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
    newAllotments[branch][gender]['waiting'].splice(index, 1);
    newAllotments[branch][gender]['waiting'].splice(newIndex, 0, applicant);
    setAllotments(newAllotments);
  };

  const updateAllotments = allotments => {
    console.log(allotments);
  };

  return (
    <div className="allotment-column">
      <h2 className="allotment-column-heading">Waiting List</h2>
      <div className="allotment-holder-card">
        <WaitingListHoldingSpace
          branch={branch}
          allotments={allotments}
          gender={gender}
          removeSelectedApplicant={removeSelectedApplicant}
          applicantSwitch={applicantSwitch}
          parent="waiting"
        />
      </div>
    </div>
  );
};

export default WaitingListColumn;
