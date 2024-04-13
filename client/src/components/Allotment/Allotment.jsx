import React, { useState, useEffect } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import axios, { all } from 'axios';
import ApplicantsColumn from './ApplicantsColumn';
import AllotmentColumn from './AllotmentColumn';
import './Allotment.css';
import Refinement from './Refinement';
import WaitingListColumn from './WaitingListColumn';
import ConfirmationModal from './ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import generateExcel from '../../utilities/generateExcel';

const Allotment = ({ year, round }) => {
  const [applications, setApplications] = useState([]);
  const [refinedApplications, setRefinedApplications] = useState([]);
  const [allotments, setAllotments] = useState({});
  const [branch, setBranch] = useState('Civil Engineering');
  const [branches, setBranches] = useState([]);
  const [gender, setGender] = useState('Male');

  const [academicYearStart, setAcademicYearStart] = useState(2023);

  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

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
      .get(
        `/api/applications?round=${round}&year=${year}&academicYearStart=${academicYearStart}`,
      )
      .then(res => {
        setApplications(res.data);
        // Extract unique branches from applications
        const uniqueBranches = [...new Set(res.data.map(app => app.branch))];
        setBranches(uniqueBranches);

        // Initialize allotments for each branch with an empty array
        const initialAllotments = {};
        res.data.forEach(app => {
          initialAllotments[app.branch] = {
            Male: {
              Confirmed: [],
              Waiting: [],
            },
            Female: {
              Confirmed: [],
              Waiting: [],
            },
          };
        });
        setAllotments(initialAllotments);
      })
      .catch(err => {
        console.log(err.response.data);
        if (
          err.response.data === 'Allotment:Unstarted' ||
          err.response.data === 'Allotment:Completed'
        ) {
          navigate('/allotment');
        }
      });
  };

  const addSelectedApplicant = (applicant, destination) => {
    setAllotments(prevAllotments => {
      const branch = applicant.branch;
      const gender = applicant.gender;
      const newAllotments = { ...prevAllotments };
      refinedApplications.splice(
        refinedApplications.findIndex(app => app._id === applicant._id),
        1,
      );
      newAllotments[branch][gender][destination] = [
        ...prevAllotments[branch][gender][destination],
        applicant,
      ];
      return newAllotments;
    });

    setApplications(prevApplications => [
      ...prevApplications.filter(app => app._id !== applicant._id),
    ]);
  };

  const removeSelectedApplicant = (applicant, parent) => {
    setAllotments(prevAllotments => {
      const branch = applicant.branch;
      const newAllotments = { ...prevAllotments };
      newAllotments[branch][gender][parent] = prevAllotments[branch][gender][
        parent
      ].filter(app => app._id !== applicant._id);
      return newAllotments;
    });

    // setRefinedApplications(prevApplications => [
    //   ...prevApplications,
    //   applicant,
    // ]); // Sort by username

    setRefinedApplications(prevApplications => {
      if (prevApplications !== null) {
        return [...prevApplications, applicant];
      } else {
        return [applicant];
      }
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

  const showConfirmationModal = () => {
    setShowModal(true);
  };

  const updateAllotments = allotments => {
    // axios
    //   .put('/api/allotments/round', {
    //     year: year,
    //     round: round,
    //     academicYearStart: academicYearStart,
    //   })
    //   .then(res => {
    //     console.log(res.data);
    //   });
    axios
      .put(`/api/applications/${year}`, allotments)
      .then(res => {
        console.log(res.data);
        navigate('/allotment');
      })
      .catch(err => {
        console.log(err);
      });
  };

  const onAutoSortHandler = () => {
    branches.forEach(branch => {
      axios
        .post(
          `/api/applications/sort?round=${round}&year=${year}&academicYearStart=${academicYearStart}`,
          {
            applications: applications.filter(app => app.branch === branch),
            branch: branch,
          },
        )
        .then(res => {
          setAllotments(prevAllotments => {
            const newAllotments = { ...prevAllotments };
            newAllotments[branch] = res.data;
            return newAllotments;
          });
        });
    });
    setApplications([]);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {showModal && (
        <ConfirmationModal
          allotments={allotments}
          updateAllotments={updateAllotments}
          setShowModal={setShowModal}
        />
      )}
      <div className="allotment-container">
        {/* <BranchSelector branches={branches} setBranch={setBranch} /> */}
        <Refinement
          branches={branches}
          setBranch={setBranch}
          setGender={setGender}
        />
        <div className="allotment-page-columns">
          <ApplicantsColumn
            onAutoSortHandler={onAutoSortHandler}
            addSelectedApplicant={addSelectedApplicant}
            applications={refinedApplications.sort((a, b) =>
              a.grade < b.grade ? 1 : -1,
            )}
          />
          <div className="allotment-and-waiting-column">
            <AllotmentColumn
              branch={branch}
              allotments={allotments}
              setAllotments={setAllotments}
              gender={gender}
              year={year}
              round={round}
              removeSelectedApplicant={removeSelectedApplicant}
              showConfirmationModal={showConfirmationModal}
            />
            <WaitingListColumn
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
      </div>
    </DragDropContext>
  );
};

export default Allotment;
