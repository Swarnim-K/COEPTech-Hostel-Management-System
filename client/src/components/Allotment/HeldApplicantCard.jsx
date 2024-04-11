import React, { useState, useEffect } from 'react';
import { FaPlus, FaMinus, FaChevronUp, FaChevronDown } from 'react-icons/fa';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './ApplicantCard.css';

const HeldApplicantCard = ({
  applicant,
  index,
  removeSelectedApplicant,
  applicantSwitch,
  parent,
}) => {
  return (
    <Draggable draggableId={applicant._id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="held-applicant-card"
        >
          <div className="applicant-card-movers">
            {index !== 0 ? (
              <FaChevronUp
                onClick={() => applicantSwitch(applicant, index, 'up', 1)}
              />
            ) : (
              <div></div>
            )}
            <FaChevronDown
              onClick={() => applicantSwitch(applicant, index, 'down', 1)}
            />
          </div>
          <div className="applicant-card-small">{index + 1}</div>
          <div className="applicant-card-medium">{applicant.username}</div>
          <div className="applicant-card-large">{applicant.name}</div>
          <div className="applicant-card-medium">{applicant.category}</div>
          <div className="applicant-card-small">{applicant.grade}</div>
          <div className="applicant-card-small">{applicant.backlogs}</div>
          <div className="applicant-card-medium seat-category">
            <input type="text" />
          </div>

          <div className="applicant-card-actions">
            <FaMinus
              onClick={() => removeSelectedApplicant(applicant, parent)}
            />
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default HeldApplicantCard;
