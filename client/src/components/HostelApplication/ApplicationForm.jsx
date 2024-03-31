import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import './ApplicationForm.css'; // Make sure the CSS file is in the same folder

const ApplicationForm = () => {
  const [formData, setFormData] = useState({});

  const navigate = useNavigate();

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    axios
      .post('/api/students', { id: userInfo._id })
      .then(res => {
        setFormData(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const handleChange = e => {
    const { name, value, files } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: files ? files[0] : value,
    }));
  };

  // Handle form submission
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formData); // Process the form data as needed
    axios
      .post('/api/applications', { form: formData })
      .then(res => {
        console.log(res.data);
        navigate('/');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div className="student-form-container">
      <form className="student-form" onSubmit={handleSubmit}>
        <h2>COLLEGE OF ENGINEERING PUNE Application for Hostel Admission</h2>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="username">MIS ID:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="gender">Gender:</label>
          <select
            id="gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="F.Y.B.Tech">F.Y.B.Tech</option>
            <option value="S.Y.B.Tech">S.Y.B.Tech</option>
            <option value="T.Y.B.Tech">T.Y.B.Tech</option>
            <option value="Final Year B.Tech">B.Tech</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="grade">CGPA:</label>
          <input
            type="text"
            id="grade"
            name="grade"
            value={formData.grade}
            onChange={handleChange}
          />
        </div>
        <div className="form-field">
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option value="General">General</option>
            <option value="OBC">OBC</option>
            <option value="SC">SC</option>
            <option value="ST">ST</option>
          </select>
        </div>
        <div className="form-field">
          <label htmlFor="permanentAddress">Permanent Address:</label>
          <textarea
            id="address"
            name="address"
            value={formData.permanentAddress}
            onChange={handleChange}
          ></textarea>
        </div>
        <button className="student-form-submit-btn" type="submit">
          Confirm
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
