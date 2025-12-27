import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';
import QuestionModal from '../components/QuestionModal';
import { spinnerQuestions } from '../data/spinnerQuestions';
import { ArrowLeft, Trophy, TrendingUp, Target, Zap, BarChart, RefreshCw, ChevronRight, Sparkles, Menu, X, Circle, AlertCircle, Check, XCircle } from 'lucide-react';

const SpinnerGame = () => {
  const navigate = useNavigate();

  // Visual State
  const [isSpinning, setIsSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [result, setResult] = useState("Tap to Spin");
  const [stats, setStats] = useState({ Red: 0, Blue: 0, Yellow: 0, Green: 0, total: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Adaptive Logic
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [questionsAskedCount, setQuestionsAskedCount] = useState(0);

  const MAX_QUESTIONS = 5;

  const getNextQuestion = (targetDifficulty, excludeIds) => {
    const available = spinnerQuestions.filter(q => q.difficulty === targetDifficulty && !excludeIds.includes(q.id));
    if (available.length === 0) {
      const anyAvailable = spinnerQuestions.filter(q => !excludeIds.includes(q.id));
      if (anyAvailable.length === 0) return null;
      return anyAvailable[0];
    }
    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  };

  const getDifficultyColor = () => {
    switch (difficulty) {
      case 'hard': return 'text-red-600 bg-gradient-to-r from-red-50 to-red-100 border-red-200';
      case 'medium': return 'text-amber-600 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      default: return 'text-green-600 bg-gradient-to-r from-green-50 to-green-100 border-green-200';
    }
  };

  const getProgressColor = () => {
    switch (difficulty) {
      case 'hard': return 'bg-gradient-to-r from-red-500 via-red-400 to-red-300';
      case 'medium': return 'bg-gradient-to-r from-amber-500 via-amber-400 to-amber-300';
      default: return 'bg-gradient-to-r from-green-500 via-green-400 to-green-300';
    }
  };

  const getHeaderColor = () => {
    switch (difficulty) {
      case 'hard': return 'from-red-600 to-orange-500';
      case 'medium': return 'from-amber-600 to-yellow-500';
      default: return 'from-green-600 to-emerald-500';
    }
  };

  const getResultColor = () => {
    switch (result) {
      case 'Red': return 'text-red-600 bg-gradient-to-r from-red-50 to-red-100 border-red-200';
      case 'Blue': return 'text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200';
      case 'Yellow': return 'text-amber-600 bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200';
      case 'Green': return 'text-green-600 bg-gradient-to-r from-green-50 to-green-100 border-green-200';
      default: return 'text-gray-600 bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const getColorPercentage = (color) => {
    return stats.total > 0 ? ((stats[color] / stats.total) * 100).toFixed(1) : 0;
  };

  const spinWheel = () => {
    if (isSpinning) return;
    setIsSpinning(true);

    const randomDeg = Math.floor(Math.random() * 360);
    const totalRotation = rotation + 1080 + randomDeg;
    setRotation(totalRotation);

    setTimeout(() => {
      const finalDeg = totalRotation % 360;
      let color = "";
      if (finalDeg >= 0 && finalDeg < 90) color = "Green";
      else if (finalDeg >= 90 && finalDeg < 180) color = "Yellow";
      else if (finalDeg >= 180 && finalDeg < 270) color = "Blue";
      else color = "Red";

      setResult(color);

      const newTotal = stats.total + 1;
      setStats(prev => ({ ...prev, [color]: prev[color] + 1, total: newTotal }));
      setIsSpinning(false);

      if (newTotal % 2 === 0 && questionsAskedCount < MAX_QUESTIONS) {
        if (!currentQuestion) {
          const firstQ = getNextQuestion('easy', []);
          setCurrentQuestion(firstQ);
        }
        setTimeout(() => setShowModal(true), 1000);
      } else if (questionsAskedCount >= MAX_QUESTIONS && newTotal % 2 === 0) {
        finishGame();
      }
    }, 2000);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) {
      setScore(s => s + 1);
      if (difficulty === 'easy') setDifficulty('medium');
      else if (difficulty === 'medium') setDifficulty('hard');
    } else {
      if (difficulty === 'hard') setDifficulty('medium');
      else if (difficulty === 'medium') setDifficulty('easy');
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    const newUsedIds = [...usedQuestionIds, currentQuestion.id];
    setUsedQuestionIds(newUsedIds);

    const newCount = questionsAskedCount + 1;
    setQuestionsAskedCount(newCount);

    if (newCount >= MAX_QUESTIONS) {
      finishGame();
    } else {
      const nextQ = getNextQuestion(difficulty, newUsedIds);
      setCurrentQuestion(nextQ);
    }
  };

  const finishGame = () => {
    navigate('/summary', { state: { game: 'spinner', score, totalQuestions: questionsAskedCount } });
  };

  const handleExit = () => {
    setShowExitConfirm(true);
  };

  const confirmExit = () => {
    setShowExitConfirm(false);
    navigate('/menu');
  };

  const cancelExit = () => {
    setShowExitConfirm(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex flex-col">
      {/* Exit Confirmation Modal */}
      {showExitConfirm && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 border border-gray-200 animate-in zoom-in-95 duration-200">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-100 to-orange-100 flex items-center justify-center">
                <AlertCircle size={24} className="text-red-500" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Leave Game?</h3>
                <p className="text-gray-600 text-sm">You have unsaved progress</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl">
                <p className="text-gray-700 font-medium mb-2">Current Session:</p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Spins</p>
                    <p className="text-lg font-bold text-green-600">{stats.total}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Score</p>
                    <p className="text-lg font-bold text-blue-600">{score}</p>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-3">
                  Your progress will be saved, but current session stats will reset.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={cancelExit}
                  className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-gray-100 hover:to-gray-200 text-gray-700 font-semibold rounded-xl border border-gray-300 transition-all duration-300"
                >
                  <XCircle size={18} />
                  Cancel
                </button>
                <button
                  onClick={confirmExit}
                  className="group flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <Check size={18} />
                  Yes, Leave Game
                </button>
              </div>
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Progress is auto-saved after completing questions
            </p>
          </div>
        </div>
      )}

      {/* Progress Header */}
      <div className={`fixed top-0 left-0 w-full h-1.5 ${getProgressColor()} transition-all duration-500 z-30`}
        style={{ width: `${(questionsAskedCount / MAX_QUESTIONS) * 100}%` }}>
      </div>

      {/* Mobile Navigation Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 h-full w-64 bg-white shadow-2xl p-6" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold text-gray-900">Menu</h3>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X size={24} />
              </button>
            </div>
            <button
              onClick={handleExit}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4"
            >
              <ArrowLeft size={20} />
              Back to Menu
            </button>
            <div className="space-y-4">
              <div className={`px-4 py-3 rounded-xl ${getDifficultyColor()} font-semibold`}>
                {difficulty.toUpperCase()} MODE
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <p className="text-sm text-gray-600">Progress: {questionsAskedCount}/{MAX_QUESTIONS}</p>
                <p className="text-sm text-gray-600 mt-1">Score: {score} points</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-0 max-w-6xl mx-auto px-3 sm:px-4 lg:px-8">

        {/* Mobile Header */}
        <header className="pt-6 pb-4 lg:pt-8">
          <div className="flex items-center justify-between mb-4 lg:mb-8">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Desktop Back Button */}
            <div className="hidden lg:block">
              <button
                onClick={handleExit}
                className="group flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Back to Menu</span>
              </button>
            </div>

            {/* Title - Centered */}
            <div className="text-center flex-1 lg:flex-none">
              <div className="flex items-center justify-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-r ${getHeaderColor()} flex items-center justify-center shadow-lg`}>
                  <Circle size={16} lg:size={24} className="text-white" />
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-green-700 bg-clip-text text-transparent">
                  Color Spinner
                </h1>
              </div>
              <p className="text-xs lg:text-base text-gray-600 hidden lg:block">Spin, learn, and master 4-section probability</p>
              <p className="text-xs text-gray-600 lg:hidden">4-Section Probability Lab</p>
            </div>

            {/* Difficulty Badge - Hidden on mobile */}
            <div className={`hidden lg:flex px-5 py-3 rounded-2xl border ${getDifficultyColor()} font-semibold shadow-sm`}>
              {difficulty.toUpperCase()} MODE
            </div>

            {/* Mobile Spacer */}
            <div className="lg:hidden w-12"></div>
          </div>

          {/* Quick Stats for Mobile */}
          <div className="lg:hidden mb-6">
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3 text-center border border-gray-100">
                <div className="text-xl font-bold text-green-600">{stats.total}</div>
                <p className="text-xs text-gray-500 mt-1">Spins</p>
              </div>

              <div className={`${getResultColor()} rounded-xl shadow-sm p-3 text-center border`}>
                <div className="text-xl font-bold truncate">{result.charAt(0)}</div>
                <p className="text-xs text-gray-500 mt-1">Result</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3 text-center border border-gray-100">
                <div className="flex flex-col items-center">
                  <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor().replace('border', '').trim()}`}>
                    {difficulty.charAt(0).toUpperCase()}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Level</p>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content Grid */}
        <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 pb-8 lg:pb-12">

          {/* Left Column - Game Control */}
          <div className="lg:col-span-2 space-y-6 lg:space-y-8">

            {/* Game Area */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex flex-col items-center">
                <div className="relative mb-6 lg:mb-10">
                  <Spinner rotation={rotation} isSpinning={isSpinning} onClick={spinWheel} />
                </div>

                {/* Current Result Display */}
                <div className={`mb-6 lg:mb-8 px-6 lg:px-8 py-3 lg:py-4 rounded-2xl border ${getResultColor()} font-bold text-lg lg:text-xl`}>
                  Current Result: <span className="font-extrabold">{result}</span>
                </div>

                <button
                  onClick={spinWheel}
                  disabled={isSpinning || showModal}
                  className={`group relative w-full lg:w-auto px-8 lg:px-14 py-4 lg:py-5 text-lg lg:text-2xl font-bold text-white rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${isSpinning || showModal
                      ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-600 via-blue-600 to-green-700 hover:shadow-3xl'
                    }`}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2 lg:gap-3">
                    {isSpinning ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} lg:size={24} />
                        <span className="animate-pulse">Spinning...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} lg:size={24} />
                        <span className="lg:hidden">Spin Wheel</span>
                        <span className="hidden lg:inline">Spin Wheel Now</span>
                        <ChevronRight className="group-hover:translate-x-1 lg:group-hover:translate-x-2 transition-transform" size={20} lg:size={24} />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-green-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <div className="mt-4 lg:mt-6 text-center">
                  <p className="text-xs lg:text-sm text-gray-500 mb-2">
                    <span className="font-semibold text-green-600">Tip:</span> Every 2nd spin triggers a question
                  </p>
                  <div className="inline-flex items-center gap-1 lg:gap-2 text-xs lg:text-sm bg-gradient-to-r from-green-50 to-blue-50 px-3 lg:px-4 py-1 lg:py-2 rounded-full">
                    <Target size={12} lg:size={14} className="text-green-600" />
                    <span className="text-gray-600">Questions: <strong>{questionsAskedCount}/{MAX_QUESTIONS}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Color Distribution Stats */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
                <BarChart className="text-green-600" size={20} lg:size={24} />
                Color Distribution
              </h2>

              <div className="space-y-4">
                {[
                  { color: 'Red', count: stats.Red, bg: 'bg-red-500', text: 'text-red-600', gradient: 'from-red-400 to-red-500' },
                  { color: 'Blue', count: stats.Blue, bg: 'bg-blue-500', text: 'text-blue-600', gradient: 'from-blue-400 to-blue-500' },
                  { color: 'Yellow', count: stats.Yellow, bg: 'bg-amber-500', text: 'text-amber-600', gradient: 'from-amber-400 to-amber-500' },
                  { color: 'Green', count: stats.Green, bg: 'bg-green-500', text: 'text-green-600', gradient: 'from-green-400 to-green-500' }
                ].map((item) => (
                  <div key={item.color} className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center gap-2">
                        <div className={`w-4 h-4 rounded-full ${item.bg}`}></div>
                        <span>{item.color}</span>
                      </div>
                      <span>{item.count} ({getColorPercentage(item.color)}%)</span>
                    </div>
                    <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full bg-gradient-to-r ${item.gradient} transition-all duration-500`}
                        style={{ width: `${getColorPercentage(item.color)}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Progress & Info */}
          <div className="space-y-6 lg:space-y-8">

            {/* Learning Progress Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <div className="flex items-center justify-between mb-4 lg:mb-6">
                <h2 className="text-xl lg:text-2xl font-bold text-gray-900">Progress</h2>
                <div className="flex items-center gap-1 lg:gap-2">
                  <Trophy className="text-amber-500" size={18} lg:size={20} />
                  <span className="text-sm font-semibold text-amber-600">{score} pts</span>
                </div>
              </div>

              <div className="space-y-4 lg:space-y-6">
                <div>
                  <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-2 lg:mb-3">
                    <span>Learning Journey</span>
                    <span className="font-semibold">{questionsAskedCount}/{MAX_QUESTIONS}</span>
                  </div>
                  <div className="h-2 lg:h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${getProgressColor()} transition-all duration-500`}
                      style={{ width: `${(questionsAskedCount / MAX_QUESTIONS) * 100}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between mt-1 lg:mt-2 text-xs text-gray-500">
                    <span>Start</span>
                    <span>Complete</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                    <TrendingUp className="text-green-600 mb-1 lg:mb-2" size={16} lg:size={20} />
                    <div className="text-base lg:text-lg font-bold text-gray-900">{difficulty.toUpperCase()}</div>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                    <Target className="text-blue-600 mb-1 lg:mb-2" size={16} lg:size={20} />
                    <div className="text-base lg:text-lg font-bold text-gray-900">
                      {Math.round((score / Math.max(questionsAskedCount, 1)) * 100)}%
                    </div>
                    <p className="text-xs text-gray-500">Accuracy</p>
                  </div>
                </div>

                <div className="p-3 lg:p-4 bg-gradient-to-r from-green-50/50 to-blue-50/50 rounded-xl lg:rounded-2xl border border-green-100">
                  <p className="text-xs lg:text-sm text-gray-700">
                    <span className="font-semibold text-green-600">How it works:</span> Answer questions to level up!
                  </p>
                  <div className="flex items-center justify-between mt-2 lg:mt-3 text-xs">
                    <span className={`px-2 py-1 rounded-full ${difficulty === 'easy' ? 'bg-green-100 text-green-700' : 'text-gray-500'}`}>Easy</span>
                    <div className="w-6 lg:w-8 h-px bg-gray-300"></div>
                    <span className={`px-2 py-1 rounded-full ${difficulty === 'medium' ? 'bg-amber-100 text-amber-700' : 'text-gray-500'}`}>Med</span>
                    <div className="w-6 lg:w-8 h-px bg-gray-300"></div>
                    <span className={`px-2 py-1 rounded-full ${difficulty === 'hard' ? 'bg-red-100 text-red-700' : 'text-gray-500'}`}>Hard</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Probability Info Card */}
            <div className="bg-gradient-to-br from-white to-gray-50 rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">Spinner Facts</h2>
              <div className="space-y-3 lg:space-y-4">
                <div className="p-3 lg:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Equal Probability</p>
                  <p className="text-xs text-gray-600 mt-1">Each color has 1/4 (25%) chance</p>
                </div>
                <div className="p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Independent Events</p>
                  <p className="text-xs text-gray-600 mt-1">Each spin is independent of others</p>
                </div>
                <div className="p-3 lg:p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Theoretical Distribution</p>
                  <p className="text-xs text-gray-600 mt-1">Expected: 25% each color</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Info Bar */}
        <footer className="pb-6 lg:pb-8 mt-6 lg:mt-8 px-2">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-md">
            <div className="flex items-center justify-between gap-4">
              {/* Logo and App Name */}
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-8 h-8 lg:w-10 lg:h-10 rounded-lg lg:rounded-xl bg-gradient-to-r from-green-600 to-blue-600 flex items-center justify-center">
                  <span className="text-white font-bold text-sm lg:text-base">P</span>
                </div>
                <div>
                  <p className="text-sm lg:font-medium text-gray-900">ProbX Spinner Lab</p>
                  <p className="text-xs text-gray-500">4-color probability learning</p>
                </div>
              </div>

              {/* Session Stats */}
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-2 lg:gap-3">
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-800">{stats.total}</p>
                      <p className="text-[10px] text-gray-500">Spins</p>
                    </div>
                    <div className="w-px h-6 bg-gray-300"></div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-800">{questionsAskedCount}</p>
                      <p className="text-[10px] text-gray-500">Q's</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1">Live updates</p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>

      {/* Question Modal */}
      {showModal && currentQuestion && (
        <QuestionModal
          questionData={currentQuestion}
          onClose={handleCloseModal}
          onAnswer={handleAnswer}
        />
      )}
    </div>
  );
};

export default SpinnerGame;