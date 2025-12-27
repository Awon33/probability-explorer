import React from 'react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/menu');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex flex-col">
      <header className="w-full bg-amber-95/80 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4 md:justify-start md:space-x-10">
            {/* Logo */}
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <div className="flex items-center">
                <div className="w-15 h-15 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-5xl">P</span>
                </div>
                <span className="text-5xl font-bold text-gray-900">Prob<span className="text-blue-600">X</span></span>
              </div>
            </div>

            {/* Right side */}
            <div className="hidden md:flex items-center justify-end lg:w-0 lg:flex-1">
              <button onClick={handleStart} className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-10 py-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center p-6">
        <div className="max-w-6xl w-full flex flex-col lg:flex-row items-center justify-between gap-12 py-12">
          {/* Left side - Text content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="mb-8">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                Master
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                  Probability
                </span>
                Through Play
              </h1>

              <p className="text-xl lg:text-2xl text-gray-700 mb-10 leading-relaxed max-w-3xl">
                Discover the fascinating world of probability with interactive games,
                visual simulations, and hands-on experiments. Perfect for students,
                educators, and lifelong learners.
              </p>
            </div>

            <div className="mb-12">
              <button
                onClick={handleStart}
                className="group relative px-12 py-5 text-xl font-bold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 active:scale-95"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  <span>Start Learning Now</span>
                  <svg className="w-5 h-5 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </div>
          </div>

          {/* Right side - Visual elements */}
          <div className="flex-1 flex flex-col items-center justify-center">
            <div className="relative w-80 h-80 lg:w-96 lg:h-96">
              {/* Rotating dice container */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
                <div className="relative">
                  <div className="w-28 h-28 bg-gradient-to-br from-white to-gray-100 rounded-2xl shadow-2xl flex items-center justify-center animate-bounce">
                    <div className="grid grid-cols-3 grid-rows-3 gap-2 p-4">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((dot) => (
                        <div
                          key={dot}
                          className={`w-3 h-3 rounded-full ${[2, 4, 6, 8].includes(dot) ? 'bg-blue-500' : 'bg-gray-800'}`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-yellow-400 rounded-full animate-ping"></div>
                </div>
              </div>

              {/* Spinning coin */}
              <div className="absolute top-1/3 right-0 animate-spin-slow">
                <div className="relative w-24 h-24">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500 shadow-lg flex items-center justify-center">
                    <div className="text-xl font-bold text-gray-800">H</div>
                  </div>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-gray-300 to-gray-400 shadow-lg flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="text-xl font-bold text-gray-800">T</div>
                  </div>
                </div>
              </div>

              {/* Cards */}
              <div className="absolute bottom-1/3 left-0 transform rotate-12 hover:rotate-0 transition-transform duration-500">
                <div className="relative">
                  <div className="w-20 h-28 bg-white rounded-xl shadow-xl flex items-center justify-center border border-gray-200">
                    <div className="text-4xl text-red-500">♥</div>
                  </div>
                  <div className="absolute top-2 left-2 w-20 h-28 bg-white rounded-xl shadow-xl flex items-center justify-center border border-gray-200 transform -rotate-6">
                    <div className="text-4xl text-black">♠</div>
                  </div>
                  <div className="absolute top-4 left-4 w-20 h-28 bg-white rounded-xl shadow-xl flex items-center justify-center border border-gray-200 transform rotate-6">
                    <div className="text-4xl text-red-500">♦</div>
                  </div>
                </div>
              </div>

              {/* Probability chart */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2">
                <div className="w-72 h-40 bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-5 border border-gray-100">
                  <div className="flex items-end h-24 gap-2">
                    {[30, 60, 90, 70, 40, 80, 50, 75, 65].map((height, idx) => (
                      <div
                        key={idx}
                        className="flex-1 bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-lg transition-all duration-300 hover:opacity-80"
                        style={{ height: `${height}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-3 text-sm text-gray-600">
                    <span>Normal Distribution</span>
                    <span className="font-semibold text-blue-600">Live</span>
                  </div>
                </div>
              </div>
            </div>


          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full bg-gray-900 text-white mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <span className="text-2xl font-bold">Prob<span className="text-blue-400">X</span></span>
              </div>
              <p className="text-gray-400">
                Making probability accessible through interactive learning and games.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Games</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Coin Toss</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Dice Roll</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Card Probability</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Monty Hall</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Tutorials</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Probability Formulas</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Case Studies</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Teacher Resources</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <p className="text-gray-400 mb-4">
                Have questions or feedback? We'd love to hear from you.
              </p>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all">
                Contact Us
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} ProbX. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default WelcomeScreen;