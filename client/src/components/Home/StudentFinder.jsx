import { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentFinder.css';

const StudentFinderCombined = () => {
  const [searchMIS, setSearchMIS] = useState('');
  const [studentData, setStudentData] = useState(null);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState('1st');

  const handleSearch = (event) => {
    const newSearchMIS = event.target.value;
    setSearchMIS(newSearchMIS);
  };

  const handleYearChange = (year) => {
    setSelectedYear(year);
    // Reset the current state when changing years
    setStudentData(null);
    setSearchMIS('');
  };

  useEffect(() => {
    if (!searchMIS.length) return;

    const fetchData = async () => {
      try {
        // Modify your API call or data processing to filter by `selectedYear` if necessary
        const response = await axios.post('http://localhost:8000/api/checkStudent', { mis: searchMIS, year: selectedYear });
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

    fetchData();
  }, [searchMIS, selectedYear]);

  return (
    <div className='studentfindercombined'>
      <label className="studentfindercombined__searchbar">
        <input
          type="search"
          placeholder="Enter MIS or Room Number"
          value={searchMIS}
          onChange={handleSearch}
        />
      </label>
      <div className='studentdata'>
        {studentData ? (
          <div className='studentdata__inner'>
      
          </div>
        ) : (
          <p>{error || 'Please enter an MIS to search for a student or select a year.'}</p>
        )}
      </div>
    </div>
  );
};

export default StudentFinderCombined;
