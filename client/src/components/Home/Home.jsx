import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import './StudentFinder.css';
import StudentFinder from './StudentFinder';
import RoomsSection from './RoomsSection';

const Home = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('/api/rooms')
      .then(res => {
        setRooms(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="home-container">
      <StudentFinder />
      <RoomsSection rooms={rooms} />
    </div>
  );
};

export default Home;
