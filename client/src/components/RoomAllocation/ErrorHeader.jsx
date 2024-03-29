import React, { useState, useEffect } from 'react';
import './ErrorHeader.css';

const ErrorHeader = ({ error }) => {
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    if (error) {
      setIsActive(true);
      // Set a timeout to remove the active class after 3 seconds
      const timeout = setTimeout(() => {
        setIsActive(false);
      }, 3000);
      return () => clearTimeout(timeout);
    }
  }, [error]);

  return (
    <div className={`error-header ${isActive ? 'active' : ''}`}>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default ErrorHeader;
