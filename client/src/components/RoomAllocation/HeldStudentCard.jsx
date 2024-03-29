import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RoomAllocation.css';

const HeldStudentCard = ({ student, index }) => {
  return (
    <>
      {/* <Draggable draggableId={student._id} index={index}>
        {provided => ( */}
      <div
        // ref={provided.innerRef}
        // {...provided.draggableProps}
        // {...provided.dragHandleProps}
        className="held-student-card"
      >
        <div className="student-card-basic-details">
          <div className="held-student-card-username">{student.username}</div>
          <div className="held-student-card-name">{student.name}</div>
        </div>

        <div className="student-card-menu">
          <div className="circle"></div>
          <div className="circle"></div>
          <div className="circle"></div>
        </div>
      </div>
      {/* )}
      </Draggable> */}
    </>
  );
};

export default HeldStudentCard;
