import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import ApplicantCard from './ApplicantCard';
import './ApplicantsColumn.css';

const ApplicantsColumn = ({ applications, addSelectedApplicant }) => {
  return (
    <>
      <Droppable droppableId={'applicants-column'}>
        {provided => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <div className="applicants-column-inner">
              <h2 className="student-column-heading">Applicants</h2>
              {applications.map((applicant, index) => (
                <ApplicantCard
                  key={applicant._id}
                  applicant={applicant}
                  index={index}
                  addSelectedApplicant={addSelectedApplicant}
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
