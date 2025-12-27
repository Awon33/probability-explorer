import { useLocation, useNavigate } from 'react-router-dom';
import { Star, Home, RotateCcw, Trophy, Sparkles, ChevronRight, Zap, ArrowLeft, Menu, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';

const SummaryScreen = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { game, score, totalQuestions } = location.state || { game: 'practice', score: 0, totalQuestions: 0 };
    const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

    // Determine Stars (Gamification)
    const getStars = () => {
        if (percentage === 100) return 3;
        if (percentage >= 50) return 2;
        return 1;
    };

    const stars = getStars();

    // Get game title based on game type
    const getGameTitle = () => {
        switch (game) {
            case 'coin': return 'Coin Toss';
            case 'dice': return 'Dice Roll';
            case 'spinner': return 'Spinner';
            default: return 'Probability Practice';
        }
    };

    // Get game route for play again
    const getGameRoute = () => {
        switch (game) {
            case 'coin': return '/coin-toss';
            case 'dice': return '/dice-roll';
            case 'spinner': return '/spinner';
            default: return '/menu';
        }
    };

    // Get gradient based on score
    const getScoreGradient = () => {
        if (percentage === 100) return 'from-emerald-500 to-green-400';
        if (percentage >= 70) return 'from-blue-500 to-cyan-400';
        if (percentage >= 50) return 'from-amber-500 to-yellow-400';
        return 'from-purple-500 to-pink-400';
    };

    // Get message based on score
    const getMessage = () => {
        if (percentage === 100) return "Perfect Score! 🏆";
        if (percentage >= 80) return "Excellent work!";
        if (percentage >= 60) return "Good job!";
        return "Good effort!";
    };

    // Get detailed message for mobile
    const getDetailedMessage = () => {
        if (percentage === 100) return "You're a probability master!";
        if (percentage >= 80) return "You're really getting the hang of this!";
        if (percentage >= 60) return "Keep practicing to improve!";
        return "Review the concepts and try again!";
    };

    // LOGIC TO SAVE PROGRESS
    useEffect(() => {
        if (totalQuestions > 0) {
            const savedData = JSON.parse(localStorage.getItem('userProgress')) || { coin: 0, dice: 0, spinner: 0 };
            if (savedData.spinner === undefined) savedData.spinner = 0;

            const starsEarned = percentage === 100 ? 3 : percentage >= 50 ? 2 : 1;

            if (game === 'coin' && starsEarned > savedData.coin) savedData.coin = starsEarned;
            if (game === 'dice' && starsEarned > savedData.dice) savedData.dice = starsEarned;
            if (game === 'spinner' && starsEarned > savedData.spinner) savedData.spinner = starsEarned;

            localStorage.setItem('userProgress', JSON.stringify(savedData));
        }
    }, [game, percentage, totalQuestions]);

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex flex-col">            {/* Mobile Navigation Overlay */}
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
                            <Home size={20} />
                            Main Menu
                        </button>
                        <button
                            onClick={() => navigate('/progress')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4"
                        >
                            <Trophy size={20} />
                            View Progress
                        </button>
                        <button
                            onClick={() => navigate('/')}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-xl mb-4"
                        >
                            <ArrowLeft size={20} />
                            Home Screen
                        </button>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-grow flex items-center justify-center p-4 lg:p-8">
                <div className="w-full max-w-md lg:max-w-lg">
                    <div className="relative">
                        {/* Decorative Elements - Hidden on mobile for performance */}
                        <div className="hidden lg:block absolute -top-8 -left-8 w-24 h-24 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-xl"></div>
                        <div className="hidden lg:block absolute -bottom-8 -right-8 w-20 h-20 bg-gradient-to-r from-yellow-400/20 to-orange-400/20 rounded-full blur-xl"></div>

                        {/* Main Card */}
                        <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl lg:rounded-3xl shadow-xl lg:shadow-2xl p-6 lg:p-8 border border-gray-200 z-10">
                            {/* Trophy Badge */}
                            <div className="absolute -top-4 lg:-top-6 left-1/2 transform -translate-x-1/2">
                                <div className="relative">
                                    <div className="w-12 h-12 lg:w-16 lg:h-16 rounded-xl lg:rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-400 flex items-center justify-center shadow-lg">
                                        <Trophy size={24} lg:size={32} className="text-white" />
                                    </div>
                                    <div className="absolute -inset-2 bg-amber-400/30 rounded-2xl lg:rounded-3xl blur-md animate-pulse"></div>
                                </div>
                            </div>

                            {/* Game Title */}
                            <div className="text-center mb-6 lg:mb-8 pt-4 lg:pt-6">
                                <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
                                    Level Complete!
                                </h1>
                                <p className="text-gray-600 text-sm lg:text-base">
                                    You've mastered {getGameTitle()}
                                </p>
                            </div>

                            {/* Animated Stars */}
                            <div className="flex justify-center gap-2 lg:gap-3 mb-6 lg:mb-8">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="relative"
                                        style={{
                                            animation: `popIn 0.6s ease forwards ${i * 0.2}s`,
                                            transform: 'scale(0)'
                                        }}
                                    >
                                        <Star
                                            size={36} lg:size={48}
                                            className={`transition-all duration-300 ${i < stars ? 'fill-yellow-400 text-yellow-500' : 'fill-gray-200 text-gray-300'}`}
                                        />
                                        {i < stars && (
                                            <div className="absolute -inset-1 lg:-inset-2 bg-yellow-400/30 rounded-full blur-md animate-pulse"></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            {/* Score Report */}
                            <div className="mb-6 lg:mb-8">
                                <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl lg:rounded-2xl p-4 lg:p-6 mb-3 lg:mb-4">
                                    <div className="flex items-center justify-center gap-3 lg:gap-4 mb-3 lg:mb-4">
                                        <div className={`text-4xl lg:text-5xl font-bold bg-gradient-to-r ${getScoreGradient()} bg-clip-text text-transparent`}>
                                            {percentage.toFixed(0)}%
                                        </div>
                                        <div className="text-left">
                                            <div className="text-xl lg:text-2xl font-bold text-gray-900">
                                                {score} / {totalQuestions}
                                            </div>
                                            <p className="text-gray-600 text-xs lg:text-sm">Correct Answers</p>
                                        </div>
                                    </div>

                                    <div className="h-1.5 lg:h-2 bg-gray-200 rounded-full overflow-hidden mb-2 lg:mb-3">
                                        <div
                                            className={`h-full bg-gradient-to-r ${getScoreGradient()} transition-all duration-1000 ease-out`}
                                            style={{ width: `${percentage}%` }}
                                        ></div>
                                    </div>

                                    <p className="text-gray-700 text-center font-medium text-sm lg:text-base">
                                        {getMessage()}
                                    </p>
                                    <p className="text-gray-600 text-center text-xs lg:text-sm mt-1">
                                        {getDetailedMessage()}
                                    </p>
                                </div>


                            </div>

                            {/* Action Buttons */}
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-4">
                                <button
                                    onClick={() => navigate('/menu')}
                                    className="group flex items-center justify-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-white hover:to-gray-50 text-gray-700 font-medium lg:font-semibold rounded-xl lg:rounded-2xl shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <Home size={18} lg:size={20} />
                                    <span className="text-sm lg:text-base">Main Menu</span>
                                </button>

                                <button
                                    onClick={() => navigate(getGameRoute())}
                                    className="group flex items-center justify-center gap-2 lg:gap-3 px-4 lg:px-6 py-3 lg:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium lg:font-semibold rounded-xl lg:rounded-2xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <RotateCcw size={18} lg:size={20} />
                                    <span className="text-sm lg:text-base">Play Again</span>
                                    <ChevronRight size={16} lg:size={18} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>

                            {/* Quick Stats */}
                            <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200">
                                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                                    <div className="text-center p-2 lg:p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg lg:rounded-xl">
                                        <div className="text-lg lg:text-xl font-bold text-blue-600">{stars}</div>
                                        <p className="text-gray-600 text-xs mt-0.5 lg:mt-1">Stars Earned</p>
                                    </div>
                                    <div className="text-center p-2 lg:p-3 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg lg:rounded-xl">
                                        <div className="text-lg lg:text-xl font-bold text-purple-600">{totalQuestions}</div>
                                        <p className="text-gray-600 text-xs mt-0.5 lg:mt-1">Questions</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Animation Styles */}
            <style>{`
                @keyframes popIn {
                    0% { transform: scale(0) rotate(-180deg); opacity: 0; }
                    80% { transform: scale(1.2) rotate(10deg); opacity: 1; }
                    100% { transform: scale(1) rotate(0deg); opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default SummaryScreen;