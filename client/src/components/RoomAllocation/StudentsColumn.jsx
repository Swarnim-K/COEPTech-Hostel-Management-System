import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import StudentCard from './StudentCard';
import StudentSearchBar from './StudentSearchBar';
import './RoomAllocation.css';
import axios from 'axios';

const StudentsColumn = ({
  students,
  addSelectedStudent,
  selectedStudents,
  selectedRoom,
  setFilteredStudents,
}) => {
  return (
    <>
      <Droppable droppableId={'students-column'}>
        {provided => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="items_list"
          >
            <div className="student-column-inner">
              <h2 className="student-column-heading">Students</h2>
              {/* <StudentSearchBar
                students={students}
                setFilteredStudents={setFilteredStudents}
              />{' '} */}
              {/* Pass students and setFilteredStudents */}
              {students.map((student, index) => (
                <StudentCard
                  key={student._id}
                  student={student}
                  index={index}
                  selectedStudents={selectedStudents}
                  addSelectedStudent={addSelectedStudent}
                  selectedRoom={selectedRoom}
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

export default StudentsColumn;
