import { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentFinder.css';
import { IoMdCall } from 'react-icons/io';

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
        console.log(response.data);
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
        {studentData ? (
          <>
            <div className="result-student-data">
              <div className="student-data-name">{studentData.name}</div>
              <div className="student-data-username">
                {studentData.username}
              </div>
              <div className="student-data-phone-email">
                <div className="student-data-phone">
                  <a href={`tel:${studentData.phone}`}>
                    {studentData.phone}
                    <label>Phone Number</label>
                  </a>
                </div>

                <div className="student-data-email">
                  <a href={`mailto:${studentData.email}`}>
                    {studentData.email}
                    <label>Email Address</label>
                  </a>
                </div>
              </div>
              {studentData.room ? (
                <div>
                  <h3 className="room-holder-card-title">
                    {studentData.room.customId}
                  </h3>

                  <div className="room-data-holding-space">
                    {studentData.room.members.map((student, index) => (
                      <div className="room-data-member-card">
                        <div className="room-data-member-name">
                          {student.name}
                        </div>
                        <div className="room-data-member-username">
                          {student.username}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};

export default StudentFinder;
