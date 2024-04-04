import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ApplicantCard from './ApplicantCard';

const ApplicantsColumn = ({ applications }) => {
  return (
    <>
      <Droppable droppableId={'applicants-column'}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="items_list"
          >
            <div className="student-column-inner">
              <h2 className="student-column-heading">Applicants</h2>
              {applications.map((applicant, index) => (
                <ApplicantCard
                  key={applicant._id}
                  applicant={applicant}
                  index={index}
                />
              ))}
            </div>

            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default ApplicantsColumn;
