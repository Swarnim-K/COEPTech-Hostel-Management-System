import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './FeaturesComponent.css';

const FeaturesComponent = () => {
  const navigate = useNavigate();
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
        <input
          type="text"
          placeholder="Search by MIS, Name, Room number"
          value={searchInput}
          onChange={handleInputChange}
        />
      </div>
      <div className="features-container">
        {studentData ? (
          <>
            <div className="feature-card">
              <h3>{studentData.name}</h3>
              <p>MIS: {studentData.username}</p>
            </div>
            <div className="feature-card">
              <h3>{studentData.room.customId}</h3>
              <h4>Roommates:</h4>
              <ul>
                {studentData.room.members.map(member => (
                  <li key={member._id}>
                    Name: {member.name}, MIS: {member.username}
                  </li>
                ))}
              </ul>
            </div>
          </>
        ) : error ? (
          <div className="feature-card">
            <p>{error}</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default FeaturesComponent;