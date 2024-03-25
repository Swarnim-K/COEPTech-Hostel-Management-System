import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RoomAllocation.css';

const StudentHoldingSpace = ({ room, index }) => {
  return (
    <div>
      <Droppable droppableId={room._id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="student-holding-space"
          >
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StudentHoldingSpace;
