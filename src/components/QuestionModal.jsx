import React, { useState } from 'react';
import { CheckCircle, XCircle, Lightbulb } from 'lucide-react';

const QuestionModal = ({ questionData, onClose, onAnswer }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const handleCheck = (index) => {
    setSelectedOption(index);
    setIsAnswered(true);
    
    const correct = index === questionData.correctAnswer;
    
    if (correct) {
      setIsCorrect(true);
      onAnswer(true);
    } else {
      setIsCorrect(false);
      onAnswer(false);
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex',
      alignItems: 'center', justifyContent: 'center', zIndex: 2000
    }}>
      <div style={{
        background: 'white', padding: '30px', borderRadius: '15px',
        maxWidth: '400px', width: '90%', textAlign: 'center'
      }}>
        
        {/* The Question (FR8) */}
        <h3 style={{ marginBottom: '20px' }}>🧠 Quick Check!</h3>
        <p style={{ fontSize: '1.2rem' }}>{questionData.question}</p>

        {/* Hint Section */}
        {!isAnswered && (
          <div style={{ marginBottom: '15px' }}>
            <button 
              onClick={() => setShowHint(!showHint)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#f39c12', 
                cursor: 'pointer', 
                display: 'flex', 
                alignItems: 'center', 
                gap: '5px', 
                margin: '0 auto',
                fontSize: '0.95rem',
                fontWeight: '500'
              }}
            >
              <Lightbulb size={18} /> {showHint ? "Hide Hint" : "Need a Hint?"}
            </button>
            
            {showHint && (
              <p style={{ 
                fontSize: '0.9rem', 
                color: '#666', 
                background: '#fff3cd', 
                padding: '10px', 
                borderRadius: '5px', 
                marginTop: '5px',
                border: '1px solid #ffeaa7',
                textAlign: 'left'
              }}>
                💡 <strong>Hint:</strong> {questionData.hint || "Think about the total number of possibilities."}
              </p>
            )}
          </div>
        )}

        {/* The Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {questionData.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleCheck(index)}
              disabled={isAnswered}
              style={{
                padding: '12px',
                borderRadius: '8px',
                border: isAnswered && index === questionData.correctAnswer ? '2px solid #28a745' :
                        isAnswered && index === selectedOption && index !== questionData.correctAnswer ? '2px solid #dc3545' :
                        '2px solid #ddd',
                background: isAnswered && index === questionData.correctAnswer ? '#d4edda' :
                            isAnswered && index === selectedOption && index !== questionData.correctAnswer ? '#f8d7da' :
                            'white',
                cursor: isAnswered ? 'default' : 'pointer',
                fontWeight: 'bold',
                transition: 'all 0.2s ease',
                ':hover': !isAnswered ? {
                  backgroundColor: '#f8f9fa',
                  borderColor: '#007bff'
                } : {}
              }}
            >
              {option}
            </button>
          ))}
        </div>

        {/* Feedback Section (FR9) */}
        {isAnswered && (
          <div style={{ marginTop: '20px', animation: 'fadeIn 0.5s' }}>
            {isCorrect ? (
              <div style={{ 
                color: 'green', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px',
                marginBottom: '10px'
              }}>
                <CheckCircle size={24} /> Excellent!
              </div>
            ) : (
              <div style={{ 
                color: 'red', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '10px',
                marginBottom: '10px'
              }}>
                <XCircle size={24} /> Not quite.
              </div>
            )}
            
            <p style={{ 
              fontStyle: 'italic', 
              color: '#555',
              background: '#f8f9fa',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              {questionData.explanation}
            </p>

            <button 
              className="btn-primary" 
              onClick={onClose} 
              style={{ 
                marginTop: '10px', 
                fontSize: '1rem', 
                padding: '10px 30px',
                backgroundColor: '#007bff',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
                fontWeight: 'bold',
                transition: 'background-color 0.2s',
                ':hover': {
                  backgroundColor: '#0056b3'
                }
              }}
            >
              Continue
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

export default QuestionModal;