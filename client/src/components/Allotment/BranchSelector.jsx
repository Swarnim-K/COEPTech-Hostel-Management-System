import React from 'react';

const BranchSelector = ({ branches, setBranch }) => {
  const handleChange = event => {
    const selectedBranch = event.target.value;
    setBranch(selectedBranch);
  };

  return (
    <div className="branch-selector">
      <label htmlFor="branch">Branch:</label>
      <select name="branch" id="branch" onChange={handleChange}>
        {branches.map(branch => (
          <option key={branch} value={branch}>
            {branch}
          </option>
        ))}
      </select>
    </div>
  );
};

export default BranchSelector;
