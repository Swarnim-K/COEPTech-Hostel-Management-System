import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RoomAllocation.css';
import StudentCard from './StudentCard';

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
            {room.members.map((student, index) => (
              <StudentCard key={student._id} student={student} index={index} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default StudentHoldingSpace;
