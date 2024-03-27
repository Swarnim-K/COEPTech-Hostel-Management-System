import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RoomAllocation.css';

const StudentCard = ({ student, index }) => {
  return (
    <div>
      {/* {student.name} */}
      <Draggable draggableId={student._id} index={index}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className="student-card"
          >
            {student.username} | {student.name}
          </div>
        )}
      </Draggable>
    </div>
  );
};

export default StudentCard;
