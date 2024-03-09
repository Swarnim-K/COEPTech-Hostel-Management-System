// StudentFinder.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import SearchBar from './SearchBar';
import StudentData from './StudentData';
import "./StudentFinder.css"

const StudentFinder = () => {
  const [searchMIS, setSearchMIS] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = (newSearchMIS) => {
    setSearchMIS(newSearchMIS);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post('http://localhost:8000/api/checkStudent', { mis: searchMIS });

        if (response) {
          setStudentData(response.data);
          setError(null);
        } else {
          setStudentData(null);
          setError('No data received or unexpected response structure.');
        }
      } catch (error) {
        setStudentData(null);
        setError('An error occurred while fetching data.');
        console.error('Error:', error.message);
      }
    };

    if (searchMIS.length) {
      fetchData();
    }
  }, [searchMIS]);

  return (
    <div className='studentfinder'>
      <SearchBar onSearch={handleSearch} />
      <StudentData studentData={studentData} />
    </div >
  );
};

export default StudentFinder;
