import React from 'react';
import Allotment from '../components/Allotment/Allotment';
import { useParams } from 'react-router-dom';

const AllotmentPage = () => {
  const { round, year } = useParams();
  return (
    <div>
      <Allotment year={year} round={round} />
    </div>
  );
};

export default AllotmentPage;
