import React from 'react';
import './Coin.css';

const Coin = ({ side, isFlipping, onClick }) => {
  return (
    <div className="coin-container" onClick={onClick}>
      <div className={`coin ${isFlipping ? 'flipping' : side}`}>
        <div className="coin-face coin-face-heads">
          <div className="coin-content">
            <div className="coin-icon">H</div>
            <div className="coin-label">HEADS</div>
            <div className="coin-glow"></div>
          </div>
        </div>
        <div className="coin-face coin-face-tails">
          <div className="coin-content">
            <div className="coin-icon">T</div>
            <div className="coin-label">TAILS</div>
            <div className="coin-glow"></div>
          </div>
        </div>
      </div>
      
      {/* Reflection effect */}
      <div className="coin-reflection"></div>
      
      {/* Interactive glow effect */}
      <div className="coin-glow-effect"></div>
    </div>
  );
};

export default Coin;