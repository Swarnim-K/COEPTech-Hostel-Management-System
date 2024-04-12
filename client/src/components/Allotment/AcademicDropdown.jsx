import React, {useState} from 'react';
import './AcademicDropdown.css';

function AcademicDropdown ({handleYear}){
    //const [formData, setFormData] = useState({});
    var year;
    function handleChange(e) {
        return handleYear(e.target.value);
        };
        //console.log(name, value);
    

    return (
        <div className="form-field">
          <label htmlFor="academic-year"> <h1 className='dropdown-title'>Academic Year </h1></label>
          <select
            id="academic-year"
            name="academic-year"
            value={year}
            onChange={handleChange}
          >
            <option className='option' value="">Select Academic Year</option>
            <option className='option' value="23-24">23-24</option>
            <option className='option' value="22-23">22-23</option>
            <option className='option' value="21-22">21-22</option>
            <option className='option' value="20-21">20-21</option>
          </select>
        </div>
    );
}

export default AcademicDropdown;
