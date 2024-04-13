import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ComplaintForm from './ComplaintForm.jsx';
import ComplaintReview from './ComplaintReview.jsx';

// Import statements...

const Complaint = () => {
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.auth);
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (userInfo) {
      axios
        .get(`/api/users/${userInfo._id}`)
        .then(response => {
          setUserRole(response.data.role);
        })
        .catch(error => {
          console.error('Error fetching user role:', error);
        });
    }
  }, [userInfo]);

  return (
    <div>
      {userRole === 'student' && <ComplaintForm />}
      {userRole === 'admin' && <ComplaintReview />}
    </div>
  );
};

export default Complaint;
