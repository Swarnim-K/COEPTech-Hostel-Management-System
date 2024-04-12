import React, {useState} from 'react';
import './AllotmentMainPage.css';
import AllotmentYearCard from './AllotmentYearCard';
import AcademicDropdown from './AcademicDropdown';

const AllotmentMainPage = () => {

  const [year, setYear] = useState('23-24');
  function handleYear(y){
    setYear(y);
  }
  return (
    <div className="allotment-main-page-container">
      <div className='dropdown-container'>
        <AcademicDropdown className='dropdown' handleYear={handleYear}/>
      </div>
      <div className='year-card-container'>
        <div className='year-card'>
          <AllotmentYearCard 
          academicYear={year}
          class='F.Y.'/>
        </div>

        <div className='year-card'>
          <AllotmentYearCard 
            academicYear={year}
            class='S.Y.'/>
        </div>

        <div className='year-card'>
          <AllotmentYearCard 
            academicYear={year}
            class='T.Y.'/>
        </div>

        <div className='year-card'>
          <AllotmentYearCard 
            academicYear={year}
            class='B.Tech'/>
        </div>
      
      </div>
    </div>
  );
};

export default AllotmentMainPage;
