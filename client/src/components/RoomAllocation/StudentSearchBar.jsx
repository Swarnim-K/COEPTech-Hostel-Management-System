import React, { useState } from 'react';
import './RoomAllocation.css';

const StudentSearchBar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div>
      <div className="search">
        <div className="bar">
          <div className="icon">
            <i></i>
          </div>
        </div>
        <form>
          <input onChange={e => setSearchTerm(e.target.value)}></input>
        </form>
        <div className="close"></div>
      </div>
    </div>
  );
};

export default StudentSearchBar;
