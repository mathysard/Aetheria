import React from 'react';

export default function Loader({ 
  size = 40, 
  color = 'black', 
  thickness = 4, 
  speed = '0.8s' 
}) {
  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: '20px'
  };

  const spinnerStyle = {
    width: `${size}px`,
    height: `${size}px`,
    border: `${thickness}px solid #e5e7eb`,
    borderTop: `${thickness}px solid ${color}`,
    borderRadius: '50%',
    animation: `spin ${speed} linear infinite`,
  };

  return (
    <div style={containerStyle}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
      <div 
        style={spinnerStyle} 
        role="status" 
        aria-label="Loading"
      >
        <span style={{ display: 'none' }}>Loading...</span>
      </div>
    </div>
  );
}
