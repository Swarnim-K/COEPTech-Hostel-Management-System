// StudentData.jsx
import React from 'react';
import "./StudentData.css"

const StudentData = ({ studentData }) => {
  return (
    <div className='studentdata'>
      {studentData ? (
        <div className='studentdata__inner'>
            <div className='studentdata__student'>
                <p>
                    Name: {studentData.name}
                </p>
                <p>
                    MIS: {studentData.mis}
                </p>
            </div>
            <div className='studentdata__room'>
                Room:{' '}
                {`${studentData.room.block}${studentData.room.floor * 100 + studentData.room.roomNumber}`}
            </div>
        </div>
      ) : (
        <p></p>
      )}
    </div>
  );
};

export default StudentData;
