import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Coin from '../components/Coin';
import QuestionModal from '../components/QuestionModal';
import { coinQuestions } from '../data/coinQuestions';
import { ArrowLeft, Trophy, TrendingUp, Target, Zap, BarChart, RefreshCw, ChevronRight, Sparkles, Menu, X, AlertCircle, Check, XCircle } from 'lucide-react';

const CoinToss = () => {
  const navigate = useNavigate();

  // Game State
  const [isFlipping, setIsFlipping] = useState(false);
  const [side, setSide] = useState('heads');
  const [stats, setStats] = useState({ heads: 0, tails: 0, total: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Adaptive Learning State
  const [showModal, setShowModal] = useState(false);
  const [score, setScore] = useState(0);
  const [usedQuestionIds, setUsedQuestionIds] = useState([]);
  const [difficulty, setDifficulty] = useState('easy');
  const [currentQuestion, setCurrentQuestion] = useState(null);

  const MAX_QUESTIONS = 5;
  const [questionsAskedCount, setQuestionsAskedCount] = useState(0);

  // Helper: Find a question based on difficulty
  const getNextQuestion = (targetDifficulty, excludeIds) => {
    const available = coinQuestions.filter(q =>
      q.difficulty === targetDifficulty && !excludeIds.includes(q.id)
    );

    if (available.length === 0) {
      const anyAvailable = coinQuestions.filter(q => !excludeIds.includes(q.id));
      if (anyAvailable.length === 0) return null;
      return anyAvailable[0];
    }

    const randomIndex = Math.floor(Math.random() * available.length);
    return available[randomIndex];
  };

  const tossCoin = () => {
    if (isFlipping) return;
    setIsFlipping(true);

    setTimeout(() => {
      const randomValue = Math.random();
      const result = randomValue > 0.5 ? 'heads' : 'tails';
      setSide(result);

      const newTotal = stats.total + 1;
      setStats(prev => ({ ...prev, [result]: prev[result] + 1, total: newTotal }));
      setIsFlipping(false);

      if (newTotal % 3 === 0 && questionsAskedCount < MAX_QUESTIONS) {
        if (!currentQuestion) {
          const firstQ = getNextQuestion('easy', []);
          setCurrentQuestion(firstQ);
        }

        setTimeout(() => setShowModal(true), 800);
      }
      else if (questionsAskedCount >= MAX_QUESTIONS && newTotal % 3 === 0) {
        finishGame();
      }
    }, 1000);
  };

  const handleAnswer = (isCorrect) => {
    if (isCorrect) setScore(prev => prev + 1);

    if (isCorrect) {
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
    navigate('/summary', {
      state: {
        game: 'coin',
        score: score,
        totalQuestions: questionsAskedCount
      }
    });
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

  const headsPercentage = stats.total > 0 ? ((stats.heads / stats.total) * 100).toFixed(1) : 0;
  const tailsPercentage = stats.total > 0 ? ((stats.tails / stats.total) * 100).toFixed(1) : 0;

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
                    <p className="text-xs text-gray-500">Flips</p>
                    <p className="text-lg font-bold text-blue-600">{stats.total}</p>
                  </div>
                  <div className="bg-white p-3 rounded-lg">
                    <p className="text-xs text-gray-500">Score</p>
                    <p className="text-lg font-bold text-green-600">{score}</p>
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

      {/* Progress Header - Simplified for mobile */}
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
            {/* Mobile Back Button */}
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

            {/* Title - Centered on mobile */}
            <div className="text-center flex-1 lg:flex-none">
              <div className="flex items-center justify-center gap-2 lg:gap-3 mb-1 lg:mb-2">
                <div className={`w-8 h-8 lg:w-12 lg:h-12 rounded-xl lg:rounded-2xl bg-gradient-to-r ${getHeaderColor()} flex items-center justify-center shadow-lg`}>
                  <Zap size={16} lg:size={24} className="text-white" />
                </div>
                <h1 className="text-2xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                  Coin Toss
                </h1>
              </div>
              <p className="text-xs lg:text-base text-gray-600 hidden lg:block">Flip, learn, and master 50/50 probability</p>
              <p className="text-xs text-gray-600 lg:hidden">50/50 Probability Lab</p>
            </div>

            {/* Difficulty Badge - Hidden on mobile (moved to menu) */}
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
                <div className="text-xl font-bold text-blue-600">{stats.total}</div>
                <p className="text-xs text-gray-500 mt-1">Flips</p>
              </div>

              <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-sm p-3 text-center border border-gray-100">
                <div className="text-xl font-bold text-green-600">{score}</div>
                <p className="text-xs text-gray-500 mt-1">Correct</p>
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
                  <Coin side={side} isFlipping={isFlipping} onClick={tossCoin} />

                  {/* Floating Particles - Hidden on mobile */}
                  <div className="hidden lg:block absolute -top-6 -right-6 w-12 h-12 bg-yellow-400/20 rounded-full animate-ping"></div>
                  <div className="hidden lg:block absolute -bottom-6 -left-6 w-10 h-10 bg-blue-400/20 rounded-full animate-pulse"></div>
                </div>

                <button
                  onClick={tossCoin}
                  disabled={isFlipping || showModal}
                  className={`group relative w-full lg:w-auto px-8 lg:px-14 py-4 lg:py-5 text-lg lg:text-2xl font-bold text-white rounded-xl lg:rounded-2xl shadow-xl lg:shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 overflow-hidden ${isFlipping || showModal
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 hover:shadow-3xl'
                    }`}
                >
                  <div className="relative z-10 flex items-center justify-center gap-2 lg:gap-3">
                    {isFlipping ? (
                      <>
                        <RefreshCw className="animate-spin" size={20} lg:size={24} />
                        <span className="animate-pulse">Flipping...</span>
                      </>
                    ) : (
                      <>
                        <Sparkles size={20} lg:size={24} />
                        <span className="lg:hidden">Toss Coin</span>
                        <span className="hidden lg:inline">Toss Coin Now</span>
                        <ChevronRight className="group-hover:translate-x-1 lg:group-hover:translate-x-2 transition-transform" size={20} lg:size={24} />
                      </>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>

                <div className="mt-4 lg:mt-6 text-center">
                  <p className="text-xs lg:text-sm text-gray-500 mb-2">
                    <span className="font-semibold text-blue-600">Tip:</span> Every 3rd flip triggers a question
                  </p>
                  <div className="inline-flex items-center gap-1 lg:gap-2 text-xs lg:text-sm bg-gradient-to-r from-blue-50 to-indigo-50 px-3 lg:px-4 py-1 lg:py-2 rounded-full">
                    <Target size={12} lg:size={14} className="text-blue-600" />
                    <span className="text-gray-600">Questions: <strong>{questionsAskedCount}/{MAX_QUESTIONS}</strong></span>
                  </div>
                </div>
              </div>
            </div>

            {/* Stats & Analytics */}
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-100">
              <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-4 lg:mb-6 flex items-center gap-2 lg:gap-3">
                <BarChart className="text-blue-600" size={20} lg:size={24} />
                Live Statistics
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
                {/* Heads vs Tails Distribution */}
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Distribution</h3>
                  <div className="space-y-3 lg:space-y-4">
                    <div>
                      <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-1">
                        <span>Heads ({headsPercentage}%)</span>
                        <span>{stats.heads}</span>
                      </div>
                      <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-500"
                          style={{ width: `${headsPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs lg:text-sm text-gray-600 mb-1">
                        <span>Tails ({tailsPercentage}%)</span>
                        <span>{stats.tails}</span>
                      </div>
                      <div className="h-3 lg:h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-400 transition-all duration-500"
                          style={{ width: `${tailsPercentage}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div>
                  <h3 className="text-base lg:text-lg font-semibold text-gray-800 mb-3 lg:mb-4">Summary</h3>
                  <div className="grid grid-cols-2 gap-3 lg:gap-4">
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 lg:p-4 rounded-xl lg:rounded-2xl text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-blue-700">{stats.total}</div>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1">Total Flips</p>
                    </div>
                    <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 lg:p-4 rounded-xl lg:rounded-2xl text-center">
                      <div className="text-2xl lg:text-3xl font-bold text-green-700">{score}</div>
                      <p className="text-xs lg:text-sm text-gray-600 mt-1">Correct</p>
                    </div>
                  </div>
                  <div className="mt-3 lg:mt-4 p-3 lg:p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl lg:rounded-2xl">
                    <p className="text-xs lg:text-sm text-gray-600">
                      <span className="font-semibold">Expected:</span> 50% Heads, 50% Tails
                    </p>
                  </div>
                </div>
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
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                    <TrendingUp className="text-blue-600 mb-1 lg:mb-2" size={16} lg:size={20} />
                    <div className="text-base lg:text-lg font-bold text-gray-900">{difficulty.toUpperCase()}</div>
                    <p className="text-xs text-gray-500">Level</p>
                  </div>
                  <div className="bg-gradient-to-br from-purple-50 to-violet-50 p-3 lg:p-4 rounded-xl lg:rounded-2xl">
                    <Target className="text-purple-600 mb-1 lg:mb-2" size={16} lg:size={20} />
                    <div className="text-base lg:text-lg font-bold text-gray-900">
                      {Math.round((score / Math.max(questionsAskedCount, 1)) * 100)}%
                    </div>
                    <p className="text-xs text-gray-500">Accuracy</p>
                  </div>
                </div>

                <div className="p-3 lg:p-4 bg-gradient-to-r from-blue-50/50 to-indigo-50/50 rounded-xl lg:rounded-2xl border border-blue-100">
                  <p className="text-xs lg:text-sm text-gray-700">
                    <span className="font-semibold text-blue-600">How it works:</span> Answer questions to level up!
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
              <h2 className="text-lg lg:text-xl font-bold text-gray-900 mb-3 lg:mb-4">Probability Facts</h2>
              <div className="space-y-3 lg:space-y-4">
                <div className="p-3 lg:p-4 bg-gradient-to-r from-emerald-50 to-green-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Theoretical Probability</p>
                  <p className="text-xs text-gray-600 mt-1">Exactly 50% chance for heads or tails</p>
                </div>
                <div className="p-3 lg:p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Law of Large Numbers</p>
                  <p className="text-xs text-gray-600 mt-1">More flips = closer to 50/50</p>
                </div>
                <div className="p-3 lg:p-4 bg-gradient-to-r from-purple-50 to-violet-50 rounded-xl lg:rounded-2xl">
                  <p className="text-sm font-medium text-gray-800">Independent Events</p>
                  <p className="text-xs text-gray-600 mt-1">Past flips don't affect future ones</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Bottom Info Bar */}
        <footer className="pb-6 lg:pb-8 mt-6 lg:mt-8">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-gray-200 shadow-md">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              {/* Logo and App Name */}
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">P</span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-gray-900 truncate">ProbX Coin Lab</p>
                  <p className="text-xs text-gray-500 truncate">Interactive probability learning</p>
                </div>
              </div>

              {/* Session Stats */}
              <div className="w-full sm:w-auto text-center sm:text-right">
                <div className="inline-flex items-center justify-center sm:justify-end gap-2 bg-gray-50 px-4 py-2 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{stats.total}</p>
                    <p className="text-xs text-gray-500">Flips</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div className="text-center">
                    <p className="text-sm font-medium text-gray-700">{questionsAskedCount}/{MAX_QUESTIONS}</p>
                    <p className="text-xs text-gray-500">Questions</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Results update in real-time</p>
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

export default CoinToss;