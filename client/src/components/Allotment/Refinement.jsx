import React from 'react';
import BranchSelector from './BranchSelector';
import GenderSelector from './GenderSelector';
import './Allotment.css';

const Refinement = ({ branches, setBranch, setGender }) => {
  return (
    <div className="refinement">
      <GenderSelector setGender={setGender} />
      <BranchSelector branches={branches} setBranch={setBranch} />
    </div>
  );
};

export default Refinement;
