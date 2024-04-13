import React from 'react';
import {
  FaPlus,
  FaMinus,
  FaChevronUp,
  FaChevronDown,
  FaCircleNotch,
} from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './ApplicantCard.css';

const ApplicantCard = ({ applicant, index, addSelectedApplicant }) => {
  return (
    <Draggable draggableId={applicant._id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="applicant-card"
        >
          <div className="applicant-card-basic-details">
            <div className="student-card-username">{applicant.username}</div>
            <div className="student-card-name">{applicant.name}</div>
            <div className="student-card-grade">{applicant.grade}</div>
            <div className="student-card-address">{applicant.address}</div>
            <div className="student-card-gender">{applicant.gender}</div>
          </div>

          <div className="applicant-card-actions">
            <FaPlus
              onClick={() => addSelectedApplicant(applicant, 'Confirmed')}
            />
            <FaCircleNotch
              onClick={() => addSelectedApplicant(applicant, 'Waiting')}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default ApplicantCard;
