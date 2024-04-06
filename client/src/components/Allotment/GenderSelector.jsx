import React from 'react';

const GenderSelector = ({ setGender }) => {
  const handleChange = event => {
    const selectedGender = event.target.value;
    setGender(selectedGender);
  };
  return (
    <div className="branch-selector">
      <label htmlFor="gender">Gender:</label>
      <select name="gender" id="gender" onChange={handleChange}>
        <option key="Male" value="Male">
          Male
        </option>
        <option key="Female" value="Female">
          Female
        </option>
      </select>
    </div>
  );
};

export default GenderSelector;
