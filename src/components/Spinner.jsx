import React from 'react';
import './Spinner.css';

const Spinner = ({ rotation, isSpinning, onClick }) => {
  return (
    <div className="spinner-container" onClick={onClick}>
      <div className="spinner-wrapper">
        {/* The Wheel */}
        <div 
          className={`spinner-wheel ${isSpinning ? 'spinning' : ''}`}
          style={{ transform: `rotate(${rotation}deg)` }}
        >
          {/* Center Circle */}
          <div className="spinner-center">
            <div className="spinner-center-glow"></div>
          </div>
          
          {/* Thin white divider lines */}
          <div className="spinner-divider divider-vertical"></div>
          <div className="spinner-divider divider-horizontal"></div>
        </div>
        
        {/* The Pointer */}
        <div className="spinner-pointer">
          <div className="pointer-triangle"></div>
          <div className="pointer-base"></div>
        </div>
        
        {/* Center Dot */}
        <div className="spinner-center-dot"></div>
        
        {/* Glow Effect */}
        <div className="spinner-glow-effect"></div>
      </div>
      
      {/* Decorative Elements */}
      <div className="spinner-outer-ring"></div>
      <div className="spinner-shadow"></div>
    </div>
  );
};

export default Spinner;