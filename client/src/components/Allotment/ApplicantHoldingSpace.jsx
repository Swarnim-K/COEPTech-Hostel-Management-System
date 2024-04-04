import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ApplicantCard from './ApplicantCard';

const ApplicantHoldingSpace = ({ branch, allotments }) => {
  return (
    <>
      {allotments[branch] && (
        <Droppable droppableId={`allotment-column`}>
          {provided => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="student-holding-space"
            >
              {allotments[branch].map((applicant, index) => (
                <ApplicantCard
                  key={applicant._id}
                  applicant={applicant}
                  index={index}
                />
              ))}
              {provided.placeholder}
              {console.log(allotments)}
            </div>
          )}
        </Droppable>
      )}
    </>
  );
};

export default ApplicantHoldingSpace;
