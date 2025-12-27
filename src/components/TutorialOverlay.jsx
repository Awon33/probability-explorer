import React, { useState, useEffect } from 'react';

const TutorialOverlay = () => {
  const [showTutorial, setShowTutorial] = useState(false);

  useEffect(() => {
    // Check if user has seen tutorial before
    const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
    if (!hasSeenTutorial) {
      setShowTutorial(true);
    }
  }, []);

  const closeTutorial = () => {
    localStorage.setItem('hasSeenTutorial', 'true');
    setShowTutorial(false);
  };

  if (!showTutorial) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative max-w-md w-full bg-gradient-to-b from-white to-blue-50 rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
        {/* Decorative elements */}
        <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20"></div>
        <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full opacity-20"></div>
        
        <div className="relative p-8">
          {/* Header with logo */}
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <span className="text-3xl font-bold text-gray-900">
              Prob<span className="text-blue-600">X</span>
            </span>
          </div>

          {/* Content */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-blue-100 to-purple-100 mb-4">
              <span className="text-3xl">😁</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Welcome to Prob<span className="text-blue-600">X</span>!
            </h2>
            <p className="text-gray-700 mb-6">
              This is your first time here. Let's get you started!
            </p>
          </div>

          {/* Tutorial points */}
          <div className="space-y-4 mb-8">
            <div className="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-blue-400 flex items-center justify-center mr-4">
                <span className="text-xl">🎮</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Tap Cards to Play</h3>
                <p className="text-gray-700 text-sm">Choose from various probability games and simulations</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-yellow-500 to-orange-400 flex items-center justify-center mr-4">
                <span className="text-xl">⭐</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Earn Stars as You Learn</h3>
                <p className="text-gray-700 text-sm">Track your progress and master probability concepts</p>
              </div>
            </div>

            <div className="flex items-start p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-gradient-to-r from-purple-500 to-pink-400 flex items-center justify-center mr-4">
                <span className="text-xl">🎯</span>
              </div>
              <div className="text-left">
                <h3 className="font-semibold text-gray-900 mb-1">Hands-On Learning</h3>
                <p className="text-gray-700 text-sm">Interactive experiments and visual simulations</p>
              </div>
            </div>
          </div>

          {/* Action button */}
          <div className="flex flex-col space-y-4">
            <button 
              onClick={closeTutorial}
              className="group relative px-6 py-4 text-lg font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5 hover:scale-105 active:scale-95 w-full"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <span>Let's Get Started!</span>
                <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TutorialOverlay;