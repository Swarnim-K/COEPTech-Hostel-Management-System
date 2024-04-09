import React from 'react';
import '../App.css';

const NotFoundPage = () => {
  return (
    <div className="not-found-page-container">
      <header title="404" className="not-found-header">
        404
      </header>
      <h1 className="not-found-title">Page Not Found</h1>
      <p>
        The page you are looking for might have been removed, had its name
        changed or is temporarily unavailable.
      </p>
    </div>
  );
};

export default NotFoundPage;
