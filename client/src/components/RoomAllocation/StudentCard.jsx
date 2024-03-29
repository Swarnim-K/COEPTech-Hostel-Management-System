import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RoomAllocation.css';

const StudentCard = ({
  student,
  index,
  selectedStudents,
  addSelectedStudent,
  selectedRoom,
}) => {
  // Generate a unique checkbox ID for each student
  const checkboxId = `check-${student._id}`;

  return (
    <Draggable draggableId={student._id} index={index}>
      {provided => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="student-card"
        >
          <div className="student-card-selector">
            <div className="checkbox-wrapper-33">
              <label className="checkbox" htmlFor={checkboxId}>
                <input
                  className="checkbox__trigger visuallyhidden"
                  type="checkbox"
                  id={checkboxId}
                  onClick={() => addSelectedStudent(student)}
                  // checked={}
                />
                <span className="checkbox__symbol">
                  <svg
                    aria-hidden="true"
                    className="icon-checkbox"
                    width="28px"
                    height="28px"
                    viewBox="0 0 28 28"
                    version="1"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M4 14l8 7L24 7"></path>
                  </svg>
                </span>
              </label>
            </div>
          </div>

          <div className="student-card-basic-details">
            <div className="student-card-username">{student.username}</div>
            <div className="student-card-name">{student.name}</div>
          </div>

          <div className="student-card-menu">
            <div className="circle"></div>
            <div className="circle"></div>
            <div className="circle"></div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default StudentCard;
