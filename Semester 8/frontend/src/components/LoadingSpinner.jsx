import React from 'react';
import './LoadingSpinner.css'; // Make sure to create this CSS file

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="loading-spinner"></div>
    </div>
  );
};

export default LoadingSpinner;