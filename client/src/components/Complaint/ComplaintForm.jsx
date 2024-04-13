import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ComplaintForm.css';

function ComplaintForm() {
  const navigate = useNavigate();
  const handleSubmit = event => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    axios
      .post('/api/reports', data)
      .then(response => {
        console.log('Response:', response);
        form.reset();
        navigate('/');
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="complaint-form-container">
      <form className="complaint-form" onSubmit={handleSubmit}>
        <fieldset>
          <h2> Your Complaint </h2>
          <div className="form-field">
            <label>What went wrong?</label>
            <select name="complaint" id="complaint">
              <option value="Electrical">Electrical</option>
              <option value="Carpentry">Carpentry</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Pest-Control">Pest Control</option>
              <option value="Plumbing">Plumbing</option>
              <option value="other">Other(Please specify details)</option>
            </select>
          </div>

          <div className="form-field">
            <label>Details about your complaint</label>
            <textarea
              name="details"
              id="details"
              rows="10"
              cols="50"
              placeholder="Please provide as much detail as possible"
              //value={details}
            ></textarea>
          </div>
        </fieldset>

        <button className="complaint-submit-button" type="submit">
          Submit Complaint
        </button>
      </form>
    </div>
  );
}

export default ComplaintForm;
