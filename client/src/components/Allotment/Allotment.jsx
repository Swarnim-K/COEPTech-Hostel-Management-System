import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import './Allotment.css';

const Allotment = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('/api/applications')
      .then(res => {
        setApplications(res.data);
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  return <div className="allotment-container">Allotment Page</div>;
};

export default Allotment;
