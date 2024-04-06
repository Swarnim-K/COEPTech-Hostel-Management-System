import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import HeldApplicantCard from './HeldApplicantCard';
import './AllotmentColumn.css';

const ApplicantHoldingSpace = ({
  branch,
  allotments,
  gender,
  removeSelectedApplicant,
  applicantSwitch,
}) => {
  return (
    <>
      <div className="holding-space-header">
        <h3 className="holding-space-header-small">Move</h3>
        <h3 className="holding-space-header-small">Sr. No</h3>
        <h3 className="holding-space-header-medium">MIS</h3>
        <h3 className="holding-space-header-large">Name of students</h3>
        <h3 className="holding-space-header-medium">Student Category</h3>
        <h3 className="holding-space-header-small">CGPA</h3>
        <h3 className="holding-space-header-small">Number of backlogs</h3>
        <h3 className="holding-space-header-medium">Seat Category</h3>
        <h3 className="holding-space-header-small">Remove</h3>
      </div>
      {allotments[branch] && (
        <Droppable droppableId={`allotment-column`}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="applicants-holding-space"
            >
              {allotments[branch][gender].map((applicant, index) => (
                <HeldApplicantCard
                  key={applicant._id}
                  applicant={applicant}
                  index={index}
                  removeSelectedApplicant={removeSelectedApplicant}
                  applicantSwitch={applicantSwitch}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      )}
    </>
  );
};

export default ApplicantHoldingSpace;
