import { useState, useEffect } from 'react';
import axios from 'axios';
import './StudentFinder.css';

const StudentDisplayCard = ({ studentData }) => {
  return (
    <>
      <div className="result-student-data">
        <div className="student-data-name">{studentData.name}</div>
        <div className="student-data-username">{studentData.username}</div>
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
                  <div className="room-data-member-name">{student.name}</div>
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
  );
};

export default StudentDisplayCard;
