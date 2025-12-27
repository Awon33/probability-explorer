import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, Trophy, Target, Award, RefreshCw, TrendingUp, Sparkles, BarChart, ChevronRight, Home, Zap, Menu, X } from 'lucide-react';

const MyProgress = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState({ coin: 0, dice: 0, spinner: 0 });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('userProgress')) || { coin: 0, dice: 0, spinner: 0 };
    setProgress(savedData);
  }, []);

  const renderStars = (count) => {
    const safeCount = count || 0;
    return [...Array(3)].map((_, i) => (
      <div key={i} className="relative group">
        <Star
          size={24}
          className={`transition-all duration-300 ${i < safeCount ? 'fill-yellow-400 text-yellow-500' : 'fill-gray-200 text-gray-300'}`}
        />
        {i < safeCount && (
          <div className="absolute -inset-1 bg-yellow-400/20 rounded-full blur-sm animate-pulse"></div>
        )}
      </div>
    ));
  };

  const getCompletionPercentage = () => {
    const totalStars = (progress.coin || 0) + (progress.dice || 0) + (progress.spinner || 0);
    const maxStars = 9;
    return Math.round((totalStars / maxStars) * 100);
  };

  const getGameStats = (count) => {
    const stats = [
      { level: "Beginner", message: "Start your journey", color: "text-blue-600 bg-gradient-to-r from-blue-50 to-blue-100" },
      { level: "Intermediate", message: "Making great progress", color: "text-purple-600 bg-gradient-to-r from-purple-50 to-purple-100" },
      { level: "Advanced", message: "Almost there!", color: "text-amber-600 bg-gradient-to-r from-amber-50 to-amber-100" },
      { level: "Master", message: "Perfect score! 🎉", color: "text-emerald-600 bg-gradient-to-r from-emerald-50 to-emerald-100" }
    ];
    return stats[Math.min(count, 3)];
  };

  const games = [
    {
      id: 'coin',
      name: 'Coin Toss',
      page: '/coin-toss', // Updated to match route
      description: 'Master 50/50 probability concepts',
      icon: Target,
      gradient: 'from-blue-500 to-cyan-400',
      stats: getGameStats(progress.coin)
    },
    {
      id: 'dice',
      name: 'Dice Roll',
      page: '/dice-roll', // Updated to match route
      description: 'Understand 6-sided probability',
      icon: Award,
      gradient: 'from-purple-500 to-pink-400',
      stats: getGameStats(progress.dice)
    },
    {
      id: 'spinner',
      name: 'Spinner',
      page: '/spinner', // Updated to match route
      description: 'Learn 4-section probability',
      icon: TrendingUp,
      gradient: 'from-green-500 to-emerald-400',
      stats: getGameStats(progress.spinner)
    }
  ];

  const totalGamesMastered = () => {
    return [progress.coin, progress.dice, progress.spinner].filter(count => count === 3).length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex flex-col">      {/* Mobile Navigation Overlay */}
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
              onClick={() => navigate('/menu')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4"
            >
              <ArrowLeft size={20} />
              Back to Menu
            </button>
            <button
              onClick={() => navigate('/')}
              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4"
            >
              <Home size={20} />
              Home Screen
            </button>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="w-full bg-amber-95/80 backdrop-blur-sm border-b border-amber-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-3 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <Menu size={24} className="text-gray-600" />
              </button>
            </div>

            {/* Desktop Layout: Logo on left, back button on right */}
            <div className="hidden lg:flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                <span className="text-white font-bold">P</span>
              </div>
              <span className="text-2xl font-bold text-gray-900">
                <span className="text-blue-600">TRACKER</span>
              </span>
            </div>

            {/* Desktop Back Button */}
            <div className="hidden lg:block">
              <button
                onClick={() => navigate('/menu')}
                className="group flex items-center gap-2 px-5 py-3 bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg hover:shadow-xl hover:bg-white transition-all duration-300"
              >
                <ArrowLeft size={20} className="text-gray-600 group-hover:text-gray-900 transition-colors" />
                <span className="text-gray-700 font-medium group-hover:text-gray-900 transition-colors">Back to Menu</span>
              </button>
            </div>

            {/* Mobile Layout: Logo in center */}
            <div className="lg:hidden flex-1 flex justify-center">
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mr-3">
                  <span className="text-white font-bold">P</span>
                </div>
                <div className="text-center">
                  <span className="text-2xl font-bold text-gray-900">
                    <span className="text-blue-600">TRACKER</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Stats */}
            <div className="lg:hidden">
              <div className="flex items-center gap-2 bg-gradient-to-r from-blue-50 to-purple-50 px-3 py-2 rounded-xl">
                <Trophy size={20} className="text-amber-500" />
                <span className="font-bold text-gray-900">{getCompletionPercentage()}%</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-8">
        {/* Hero Section */}
        <div className="text-center mb-8 lg:mb-12">
          <div className="relative inline-block mb-6">
            <div className="relative z-10 w-20 h-20 lg:w-24 lg:h-24 rounded-2xl bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center mx-auto shadow-2xl">
              <Trophy size={32} lg:size={40} className="text-white" />
            </div>
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-400/30 to-purple-400/30 rounded-3xl blur-xl animate-pulse"></div>
          </div>

          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-3">
            Your Learning <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Progress</span>
          </h1>
          <p className="text-base lg:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            Track your mastery across all probability games and activities
          </p>

          {/* Overall Progress Card */}
          <div className="max-w-md mx-auto">
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-gray-200">
              <div className="flex justify-between items-center mb-4">
                <span className="text-gray-700 font-medium flex items-center gap-2">
                  <BarChart size={18} />
                  Overall Progress
                </span>
                <span className="text-2xl font-bold text-gray-900">{getCompletionPercentage()}%</span>
              </div>
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden mb-3">
                <div
                  className="h-full bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 transition-all duration-700 ease-out"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
              <p className="text-sm text-gray-500">
                Earned {progress.coin + progress.dice + progress.spinner} of 9 stars
              </p>
            </div>
          </div>
        </div>

        {/* Game Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 lg:mb-12">
          {games.map((game) => (
            <div
              key={game.id}
              className="group bg-white rounded-2xl shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex items-start justify-between mb-6">
                <div className="p-3 bg-gradient-to-r from-white to-gray-50 rounded-xl">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${game.gradient} flex items-center justify-center shadow-sm`}>
                    <game.icon size={20} className="text-white" />
                  </div>
                </div>
                <span className={`text-xs font-semibold px-3 py-1.5 rounded-full ${game.stats.color}`}>
                  {game.stats.level}
                </span>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-2">{game.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{game.description}</p>

              {/* Stars */}
              <div className="flex justify-center gap-1 mb-6">
                {renderStars(progress[game.id])}
              </div>

              {/* Progress Bar */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Progress</span>
                  <span className="font-semibold text-gray-900">
                    {Math.round((progress[game.id] / 3) * 100)}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full bg-gradient-to-r ${game.gradient} transition-all duration-700`}
                    style={{ width: `${(progress[game.id] / 3) * 100}%` }}
                  ></div>
                </div>
                <p className="text-xs text-gray-400 mt-2 text-center">{game.stats.message}</p>
              </div>

              {/* Play Button - Now uses correct route */}
              <button
                onClick={() => navigate(game.page)}
                className="mt-6 group/btn w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 text-gray-700 font-medium rounded-xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300"
              >
                <span>Continue Learning</span>
                <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        {/* Stats Dashboard */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 lg:p-8 border border-gray-200 mb-8 lg:mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Sparkles className="text-yellow-500" />
            Achievement Dashboard
          </h2>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">
                {progress.coin + progress.dice + progress.spinner}
              </div>
              <p className="text-gray-600 text-sm">Total Stars</p>
              <div className="mt-2 flex justify-center gap-1">
                {renderStars(Math.floor((progress.coin + progress.dice + progress.spinner) / 3))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-emerald-600 mb-2">
                {totalGamesMastered()}
              </div>
              <p className="text-gray-600 text-sm">Games Mastered</p>
              <div className="mt-2">
                <div className="inline-flex items-center gap-1 text-sm font-medium text-emerald-700">
                  <Trophy size={16} />
                  {totalGamesMastered()}/3 Complete
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">
                {getCompletionPercentage()}%
              </div>
              <p className="text-gray-600 text-sm">Overall Complete</p>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-400"
                  style={{ width: `${getCompletionPercentage()}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-xl p-4 lg:p-6 text-center group hover:shadow-md transition-shadow duration-300">
              <div className="text-3xl lg:text-4xl font-bold text-amber-600 mb-2">9</div>
              <p className="text-gray-600 text-sm">Total Available</p>
              <div className="mt-2">
                <div className="flex justify-center gap-1">
                  {[...Array(3)].map((_, i) => (
                    <Star key={i} size={16} className="text-amber-400" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 lg:mb-12">
          <button
            onClick={() => navigate('/menu')}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5 w-full sm:w-auto"
          >
            <Zap size={20} />
            <span>Continue Learning</span>
            <ChevronRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>

          <button
            onClick={() => {
              if (window.confirm("Are you sure you want to reset all progress? This cannot be undone.")) {
                localStorage.removeItem('userProgress');
                setProgress({ coin: 0, dice: 0, spinner: 0 });
              }
            }}
            className="group flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:from-gray-200 hover:to-gray-300 transition-all duration-300 border border-gray-300 w-full sm:w-auto"
          >
            <RefreshCw size={20} />
            <span>Reset Progress</span>
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-8 lg:mt-12 bg-white border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <span className="text-white font-bold text-xl">P</span>
                </div>
                <div>
                  <span className="text-2xl font-bold text-gray-900">Prob<span className="text-blue-600">X</span></span>
                  <p className="text-sm text-gray-500 mt-1">Interactive Probability Learning</p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-6 text-sm">
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Learning Guide</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Achievements</button>
              <button className="text-gray-600 hover:text-blue-600 transition-colors">Help Center</button>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-100">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-500 text-sm text-center md:text-left">
                © {new Date().getFullYear()} ProbX. Progress saved locally in your browser.
              </p>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-500">Auto-save enabled</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MyProgress;