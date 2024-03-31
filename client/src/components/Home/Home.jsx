import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './Home.css';
import './StudentFinder.css';
import StudentFinder from './StudentFinder';
import RoomsSection from './RoomsSection';
import StudentProfile from './StudentProfile';

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);
  const [studentData, setStudentData] = useState(null);

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    fetchData();
  }, [navigate, userInfo]);

  const fetchData = () => {
    axios
      .get('/api/rooms')
      .then(res => {
        setRooms(res.data);
      })
      .catch(err => {
        console.log(err);
      });

    axios
      .post('/api/students', { id: userInfo._id })
      .then(res => {
        setStudentData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="home-container">
      {studentData && <StudentProfile studentData={studentData} />}
      {rooms.length > 0 && (
        <>
          <StudentFinder />
          <RoomsSection rooms={rooms} />
        </>
      )}
    </div>
  );
};

export default Home;
