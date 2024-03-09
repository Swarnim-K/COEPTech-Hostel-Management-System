// SearchBar.jsx
import { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchMIS, setSearchMIS] = useState('');

  const handleSearch = (event) => {
    const newSearchMIS = event.target.value;
    setSearchMIS(newSearchMIS);
    onSearch(newSearchMIS);
  };

  return (
    <label className="studentfinder__searchbar">
      <div className="studentfinder__searchbar_inner">
        <div className="studentfinder__searchbar_holder">
          <div className="studentfinder__searchbar_input_holder">
            <input
              type="search"
              placeholder="Enter MIS or Room Number"
              value={searchMIS}
              onChange={handleSearch}
            />
          </div>
        </div>
      </div>
    </label>
  );
};

export default SearchBar;
