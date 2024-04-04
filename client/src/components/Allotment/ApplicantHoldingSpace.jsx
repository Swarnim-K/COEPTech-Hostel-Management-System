import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ApplicantCard from './ApplicantCard';

const ApplicantHoldingSpace = ({ allotments }) => {
  return (
    <>
      <Droppable droppableId={`allotment-column`}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="student-holding-space"
          >
            {allotments.map((applicant, index) => (
              <ApplicantCard
                key={applicant._id}
                applicant={applicant}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default ApplicantHoldingSpace;
