import React from 'react';
import './Dice.css';

const Dice = ({ number, isRolling, onClick }) => {
  
  // Helper to render dots based on the face number
  const renderPips = (val) => {
    // 3x3 Grid mapping for dice dots
    const pips = [];
    
    // Logic to determine which dots are visible for which number
    const showDot = (positions) => positions.includes(val);

    // Center Dot (Odd numbers)
    if (showDot([1, 3, 5])) pips.push(<div key="c" className="pip center" />);
    
    // Top Left & Bottom Right (2, 3, 4, 5, 6)
    if (showDot([2, 3, 4, 5, 6])) {
      pips.push(<div key="tl" className="pip top-left" />);
      pips.push(<div key="br" className="pip bottom-right" />);
    }

    // Top Right & Bottom Left (4, 5, 6)
    if (showDot([4, 5, 6])) {
      pips.push(<div key="tr" className="pip top-right" />);
      pips.push(<div key="bl" className="pip bottom-left" />);
    }

    // Middle Left & Middle Right (6 only)
    if (showDot([6])) {
      pips.push(<div key="ml" className="pip middle-left" />);
      pips.push(<div key="mr" className="pip middle-right" />);
    }

    return pips;
  };

  return (
    <div className="dice-container">
      <div className="scene" onClick={onClick}>
        <div className={`cube ${isRolling ? 'rolling' : `show-${number}`}`}>
          <div className="cube-face face-1">{renderPips(1)}</div>
          <div className="cube-face face-2">{renderPips(2)}</div>
          <div className="cube-face face-3">{renderPips(3)}</div>
          <div className="cube-face face-4">{renderPips(4)}</div>
          <div className="cube-face face-5">{renderPips(5)}</div>
          <div className="cube-face face-6">{renderPips(6)}</div>
        </div>
      </div>
      {/* Floor Shadow for realism */}
      <div className={`floor-shadow ${isRolling ? 'blur-shadow' : ''}`}></div>
    </div>
  );
};

export default Dice;