import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StudentCard from './StudentCard';
import StudentSearchBar from './StudentSearchBar';
import './RoomAllocation.css';
import axios from 'axios';

const StudentsColumn = ({ students }) => {
  return (
    <>
      <Droppable droppableId={'students-column'}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="items_list"
          >
            <div className="room-allocation-column-outer">
              <div className="room-allocation-column-inner">
                <h2 className="room-allocation-column-heading">Students</h2>
                <StudentSearchBar />
                {students.map((student, index) => (
                  <StudentCard
                    key={student._id}
                    student={student}
                    index={index}
                  />
                ))}
              </div>
            </div>
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </>
  );
};

export default StudentsColumn;
