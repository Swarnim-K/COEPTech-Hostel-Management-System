import { useState, useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import './StudentProfile.css';

const StudentProfile = ({ studentData }) => {
  const [hasRegistered, setHasRegistered] = useState(false);
  const [allotmentStatus, setAllotmentStatus] = useState('');

  const { userInfo } = useSelector(state => state.auth);

  useEffect(() => {
    axios
      .get(`/api/applications/${userInfo._id}`)
      .then(res => {
        if (res.data) {
          setHasRegistered(true);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <div className="student-profile">
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
        <div className="student-profile-actions">
          {hasRegistered ? (
            <button className="room-allocation-button already-applied" disabled>
              Room Allocation Applied
            </button>
          ) : (
            <LinkContainer to="/rooms/allocate/register">
              <button className="room-allocation-button">
                Apply for Room Allocation
              </button>
            </LinkContainer>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentProfile;
