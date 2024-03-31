import { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentFinder.css';
import { IoMdCall } from 'react-icons/io';
import StudentDisplayCard from './StudentDisplayCard';

const StudentFinder = () => {
  const [searchInput, setSearchInput] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  let typingTimer;

  const handleInputChange = e => {
    clearTimeout(typingTimer);
    const input = e.target.value;
    setSearchInput(input);

    typingTimer = setTimeout(() => {
      fetchData(input.trim());
    }, 500);
  };

  const fetchData = async username => {
    if (username) {
      try {
        const response = await axios.post('/api/students', {
          username: username,
        });
        setStudentData(response.data);
        setError(null);
      } catch (error) {
        setStudentData(null);
        setError('An error occurred while fetching student data.');
      }
    } else {
      setStudentData(null);
      setError(null);
    }
  };

  return (
    <>
      <div className="sticky-search-bar">
        <div className="search">
          <div className="bar">
            <div className="icon">
              <i></i>
            </div>
          </div>
          <form>
            <input
              type="text"
              placeholder="Search by MIS, Name, Room number"
              value={searchInput}
              onChange={handleInputChange}
            ></input>
          </form>
          <div className="close"></div>
        </div>
      </div>

      <div className="student-finder-result">
        {studentData ? <StudentDisplayCard studentData={studentData} /> : <></>}
      </div>
    </>
  );
};

export default StudentFinder;
