import React from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import './RoomAllocation.css';
import HeldStudentCard from './HeldStudentCard';

const StudentHoldingSpace = ({ room, index }) => {
  return (
    <>
      <Droppable droppableId={room._id}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="student-holding-space"
          >
            {room.members.map((student, index) => (
              <HeldStudentCard
                key={student._id}
                student={student}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default StudentHoldingSpace;
