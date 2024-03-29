import React, { useState } from 'react';
import './RoomAllocation.css';

const StudentSearchBar = ({ students, setFilteredStudents }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = e => {
    setSearchTerm(e.target.value);
    const filteredStudents = students.filter(
      student =>
        student.name.toLowerCase().includes(e.target.value.toLowerCase()) ||
        student.username.toLowerCase().includes(e.target.value.toLowerCase()),
    );
    setFilteredStudents(filteredStudents);
  };

  return (
    <div>
      <div className="search">
        <div className="bar">
          <div className="icon">
            <i></i>
          </div>
        </div>
        <form>
          <input
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search by name or username"
          ></input>
        </form>
        <div className="close"></div>
      </div>
    </div>
  );
};

export default StudentSearchBar;
