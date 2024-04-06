import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios from 'axios';
import ApplicantsColumn from './ApplicantsColumn';
import AllotmentColumn from './AllotmentColumn';
import './Allotment.css';
import Refinement from './Refinement';

const Allotment = ({ year, round }) => {
  const [applications, setApplications] = useState([]);
  const [refinedApplications, setRefinedApplications] = useState([]);
  const [allotments, setAllotments] = useState({});
  const [branch, setBranch] = useState('Civil Engineering');
  const [branches, setBranches] = useState([]);
  const [gender, setGender] = useState('Male');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filteredApplications = applications
      .filter(app => app.branch === branch)
      .filter(app => app.gender === gender);
    setRefinedApplications(filteredApplications);
  }, [branch, gender, applications]);

  const fetchData = () => {
    axios
      .get(`/api/applications?year=${year}`)
      .then(res => {
        setApplications(res.data);
        // Extract unique branches from applications
        const uniqueBranches = [...new Set(res.data.map(app => app.branch))];
        setBranches(uniqueBranches);

        // Initialize allotments for each branch with an empty array
        const initialAllotments = {};
        res.data.forEach(app => {
          initialAllotments[app.branch] = {
            Male: [],
            Female: [],
          };
        });
        setAllotments(initialAllotments);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const addSelectedApplicant = applicant => {
    setAllotments(prevAllotments => {
      const branch = applicant.branch;
      const gender = applicant.gender;
      const newAllotments = { ...prevAllotments };
      refinedApplications.splice(
        refinedApplications.findIndex(app => app._id === applicant._id),
        1,
      );
      newAllotments[branch][gender] = [
        ...prevAllotments[branch][gender],
        applicant,
      ];
      return newAllotments;
    });
  };

  const removeSelectedApplicant = applicant => {
    setAllotments(prevAllotments => {
      const branch = applicant.branch;
      const newAllotments = { ...prevAllotments };
      newAllotments[branch][gender] = prevAllotments[branch][gender].filter(
        app => app._id !== applicant._id,
      );
      return newAllotments;
    });
    setRefinedApplications(prevApplications => [
      ...prevApplications,
      applicant,
    ]); // Sort by username
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
        const gender = draggedApplicant.gender;
        const newAllotments = { ...prevAllotments };
        newAllotments[branch][gender] = [
          ...prevAllotments[branch][gender],
          draggedApplicant,
        ];
        return newAllotments;
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="allotment-container">
        {/* <BranchSelector branches={branches} setBranch={setBranch} /> */}
        <Refinement
          branches={branches}
          setBranch={setBranch}
          setGender={setGender}
        />
        <div className="allotment-columns">
          <ApplicantsColumn
            addSelectedApplicant={addSelectedApplicant}
            applications={refinedApplications.sort((a, b) =>
              a.grade < b.grade ? 1 : -1,
            )}
          />
          <AllotmentColumn
            key={branch}
            branch={branch}
            allotments={allotments}
            setAllotments={setAllotments}
            gender={gender}
            year={year}
            round={round}
            removeSelectedApplicant={removeSelectedApplicant}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default Allotment;
