import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from React Router
import './FeaturesComponent.css'; 

const FeaturesComponent = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  const features = [
    {
      icon: '🎓',
      title: 'Admit Student',
      description: 'Our product effortlessly adjusts to your needs, boosting efficiency and simplifying your tasks.',
      path: '/admit-student' // Specify the path for Admit Student page
    },
    {
      icon: '🔍',
      title: 'Search Student',
      description: 'Experience unmatched durability that goes above and beyond with lasting investment.',
      path: '/search-student' // Specify the path for Search Student page
    },
    {
      icon: '📊',
      title: 'Room data',
      description: 'Efficiently plan and manage events with our intuitive scheduling system.',
      path: '/room-data' // Specify the path for Room Data page
    },
    {
      icon: '📤',
      title: 'Export Data',
      description: 'Efficiently plan and manage events with our intuitive scheduling system.',
      path: '/export-data' // Specify the path for Export Data page
    },
    {
      icon: '🏠',
      title: 'Guest Room',
      description: 'Efficiently plan and manage events with our intuitive scheduling system.',
      path: '/guest-room' // Specify the path for Guest Room page
    },
    {
      icon: '🔧', 
      title: 'Room Maintenance',
      description: 'Efficiently plan and manage events with our intuitive scheduling system.',
      path: '/room-maintenance' // Specify the path for Room Maintenance page
    },
  ];

  const handleClick = (path) => {
    navigate(path); // Navigate to the specified path when the card is clicked
  };

  return (
    <>
        <div className="sticky-search-bar">
            <input type="text" placeholder="Search by MIS, Name, Room number" />
        </div>
        <div className="features-container">
        {features.map((feature, index) => (
          <div className="feature-card" key={index} onClick={() => handleClick(feature.path)}>
            <div className="icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
        </div>
    </>    
  );
};

export default FeaturesComponent;
