import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import ApplicantsColumn from './ApplicantsColumn';
import AllotmentColumn from './AllotmentColumn';
import BranchSelector from './BranchSelector';
import './Allotment.css';

const Allotment = () => {
  const [applications, setApplications] = useState([]);
  const [branchWiseApplications, setBranchWiseApplications] = useState([]);
  const [allotments, setAllotments] = useState({});
  const [branch, setBranch] = useState('Civil Engineering');
  const [branches, setBranches] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredApplications = applications.filter(
      app => app.branch === branch,
    );
    setBranchWiseApplications(filteredApplications);
  }, [branch, applications]);

  const fetchData = () => {
    axios
      .get('/api/applications')
      .then(res => {
        setApplications(res.data);
        // Extract unique branches from applications
        const uniqueBranches = [...new Set(res.data.map(app => app.branch))];
        setBranches(uniqueBranches);

        // Initialize allotments for each branch with an empty array
        const initialAllotments = {};
        res.data.forEach(app => {
          initialAllotments[app.branch] = [];
        });
        setAllotments(initialAllotments);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onDragEnd = result => {
    const { source, destination, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      source.droppableId === 'applicants-column' &&
      destination.droppableId === 'allotment-column'
    ) {
      // Get the dragged applicant
      const draggedApplicant = applications.find(
        applicant => applicant._id === draggableId,
      );
      if (!draggedApplicant) {
        return;
      }

      // Remove the dragged item from applications
      const newApplications = applications.filter(
        applicant => applicant._id !== draggableId,
      );
      setApplications(newApplications); // Update the state of applications

      // Update the state of allotments by adding the dragged applicant to its corresponding branch array
      setAllotments(prevAllotments => {
        const branch = draggedApplicant.branch;
        const newAllotments = { ...prevAllotments };
        newAllotments[branch] = [...prevAllotments[branch], draggedApplicant];
        return newAllotments;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="allotment-container">
        <BranchSelector branches={branches} setBranch={setBranch} />
        <div className="allotment-columns">
          <ApplicantsColumn applications={branchWiseApplications} />
          <AllotmentColumn
            key={branch}
            branch={branch}
            allotments={allotments}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Allotment;
