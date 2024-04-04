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
  const [allotments, setAllotments] = useState([]);
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
      source.droppableId === 'allotment-column' &&
      destination.droppableId === 'allotment-column'
    ) {
      const newAllotments = Array.from(allotments);
      const [removed] = newAllotments.splice(source.index, 1); // Remove the dragged item from the array
      newAllotments.splice(destination.index, 0, removed); // Insert the dragged item at the destination index
      setAllotments(newAllotments); // Update the state with the new array order
    }

    if (
      source.droppableId === 'applicants-column' &&
      destination.droppableId === 'allotment-column'
    ) {
      // Determine the index to insert the dragged item into
      let newIndex = destination.index;
      if (newIndex > source.index) {
        // If the destination index is greater than the source index,
        // adjust the index to insert the dragged item after the destination index
        newIndex -= 1;
      }

      // Remove the dragged item from applications and add it to allotments
      const newApplications = Array.from(applications);
      const [removed] = newApplications.splice(source.index, 1); // Remove the dragged item from applications
      setApplications(newApplications); // Update the state of applications

      // Update the state of allotments by inserting the removed item at the determined index
      setAllotments(prevAllotments => {
        const newAllotments = [...prevAllotments];
        newAllotments.splice(newIndex, 0, removed);
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
