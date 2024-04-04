import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import ApplicantsColumn from './ApplicantsColumn';
import AllotmentColumn from './AllotmentColumn';
import './Allotment.css';

const Allotment = () => {
  const [applications, setApplications] = useState([]);
  const [allotments, setAllotments] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    axios
      .get('/api/applications')
      .then(res => {
        setApplications(res.data);
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
        <div className="allotment-columns">
          <ApplicantsColumn applications={applications} />
          <AllotmentColumn allotments={allotments} />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Allotment;
