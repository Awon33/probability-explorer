import React from 'react';
import TutorialOverlay from '../components/TutorialOverlay';
import { Circle, Square, PieChart, BarChart3, ChevronRight, Target, Zap, Trophy, Home, Sparkles, Brain, Gamepad2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MainMenu = () => {
    const navigate = useNavigate();

    const activities = [
        {
            title: 'Coin Toss',
            description: 'Master 50/50 probability concepts through interactive coin flipping',
            icon: Circle,
            gradient: 'from-blue-500 to-cyan-400',
            bgGradient: 'from-blue-50 to-blue-100',
            route: '/coin-toss',
            badge: 'Beginner',
            accent: 'blue'
        },
        {
            title: 'Dice Roll',
            description: 'Explore 6-sided probability and combinations with virtual dice',
            icon: Square,
            gradient: 'from-purple-500 to-pink-400',
            bgGradient: 'from-purple-50 to-purple-100',
            route: '/dice-roll',
            badge: 'Intermediate',
            accent: 'purple'
        },
        {
            title: 'Spinner',
            description: 'Learn 4-section probability with colorful interactive spinners',
            icon: PieChart,
            gradient: 'from-green-500 to-emerald-400',
            bgGradient: 'from-green-50 to-emerald-100',
            route: '/spinner',
            badge: 'Beginner',
            accent: 'green'
        },
        {
            title: 'Progress Tracker',
            description: 'Monitor your learning journey and achievements',
            icon: BarChart3,
            gradient: 'from-amber-500 to-orange-400',
            bgGradient: 'from-amber-50 to-orange-100',
            route: '/progress',
            badge: 'Stats',
            accent: 'amber'
        }
    ];

    const handleProgress = () => {
        navigate('/progress');
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-orange-50 flex flex-col">            {/* Tutorial Overlay */}
            <TutorialOverlay />

            {/* Header - Same as WelcomeScreen */}
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
                            <button
                                onClick={handleProgress}
                                className="group flex items-center gap-2 ml-8 whitespace-nowrap inline-flex items-center justify-center px-8 py-3.5 border border-transparent rounded-xl shadow-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-0.5"
                            >
                                <Trophy size={20} />
                                Progress Tracker
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-grow flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-7xl">
                    {/* Hero Section */}
                    <div className="text-center mb-8 lg:mb-12 px-4">
                        <div className="inline-flex items-center justify-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-full border border-blue-100">
                            <Sparkles size={16} className="text-blue-500" />
                            <span className="text-sm font-medium text-blue-600">Interactive Learning Platform</span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 lg:mb-6 leading-tight">
                            Choose Your
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 block">
                                Probability Adventure
                            </span>
                        </h1>

                        <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Select an interactive game below to start exploring probability concepts through hands-on experiments and real-time simulations.
                        </p>
                    </div>

                    {/* Activities Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 lg:mb-12 px-4">
                        {activities.map((activity, index) => {
                            const Icon = activity.icon;
                            return (
                                <div
                                    key={index}
                                    onClick={() => navigate(activity.route)}
                                    className="group cursor-pointer"
                                >
                                    <div className="relative h-full bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-5 sm:p-6 border border-gray-200 hover:border-blue-300 hover:transform hover:-translate-y-1 overflow-hidden">
                                        {/* Background gradient */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${activity.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}></div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Icon and Badge */}
                                            <div className="flex items-start justify-between mb-4 sm:mb-6">
                                                <div className={`p-3 rounded-xl bg-gradient-to-r ${activity.gradient} shadow-sm`}>
                                                    <Icon size={24} sm:size={28} lg:size={32} className="text-white" />
                                                </div>
                                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${activity.badge === 'Beginner' ? 'bg-blue-100 text-blue-600' :
                                                    activity.badge === 'Intermediate' ? 'bg-purple-100 text-purple-600' :
                                                        activity.badge === 'Stats' ? 'bg-amber-100 text-amber-600' :
                                                            'bg-gray-100 text-gray-600'
                                                    }`}>
                                                    {activity.badge}
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3 group-hover:text-gray-950 transition-colors">
                                                {activity.title}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6 leading-relaxed">
                                                {activity.description}
                                            </p>

                                            {/* CTA Button */}
                                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100 group-hover:border-gray-200 transition-colors">
                                                <span className="flex items-center gap-2 text-sm sm:text-base font-medium text-blue-600 group-hover:text-blue-700 transition-colors">
                                                    Start Learning
                                                    <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                                </span>
                                                <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${activity.gradient}`}></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Quick Stats Banner */}
                    <div className="px-4">
                        <div className="bg-gradient-to-r from-blue-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-blue-100 shadow-sm">
                            <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-8">
                                <div className="text-center sm:text-left">
                                    <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                                        Ready to Master Probability?
                                    </h3>
                                    <p className="text-sm sm:text-base text-gray-600 max-w-xl">
                                        Each game adapts to your skill level and provides instant feedback to help you learn faster.
                                    </p>
                                </div>
                                <button
                                    onClick={() => navigate('/coin-toss')}
                                    className="group flex-shrink-0 flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-0.5"
                                >
                                    <Zap size={20} />
                                    <span>Start Learning</span>
                                    <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="mt-8 lg:mt-12 px-4">
                        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center mb-6 sm:mb-8">
                            Why Learn With <span className="text-blue-600">ProbX</span>
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg">
                                        <Target size={20} className="text-blue-500" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Adaptive Learning</h3>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Games adjust difficulty based on your performance for optimal learning.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                                        <Gamepad2 size={20} className="text-purple-500" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Interactive Games</h3>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Hands-on experiments make probability concepts tangible and memorable.
                                </p>
                            </div>

                            <div className="bg-white rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg">
                                        <Brain size={20} className="text-green-500" />
                                    </div>
                                    <h3 className="font-bold text-gray-900">Real-time Feedback</h3>
                                </div>
                                <p className="text-sm text-gray-600">
                                    Instant feedback and visualizations help you understand concepts faster.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer - Same as WelcomeScreen */}
            <footer className="w-full bg-gray-900 text-white mt-12 sm:mt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                        <div>
                            <div className="flex items-center mb-4 sm:mb-6">
                                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center mr-3">
                                    <span className="text-white font-bold text-lg sm:text-xl">P</span>
                                </div>
                                <span className="text-xl sm:text-2xl font-bold">Prob<span className="text-blue-400">X</span></span>
                            </div>
                            <p className="text-gray-400 text-sm sm:text-base">
                                Making probability accessible through interactive learning and games.
                            </p>
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Games</h3>
                            <ul className="space-y-2">
                                <li><button onClick={() => navigate('/coin-toss')} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Coin Toss</button></li>
                                <li><button onClick={() => navigate('/dice-roll')} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Dice Roll</button></li>
                                <li><button onClick={() => navigate('/spinner')} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Spinner</button></li>
                                <li><button onClick={() => navigate('/progress')} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Progress</button></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Resources</h3>
                            <ul className="space-y-2">
                                <li><button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Tutorials</button></li>
                                <li><button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Probability Formulas</button></li>
                                <li><button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Case Studies</button></li>
                                <li><button className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">Teacher Resources</button></li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">Connect</h3>
                            <p className="text-gray-400 mb-3 sm:mb-4 text-sm sm:text-base">
                                Have questions or feedback? We'd love to hear from you.
                            </p>
                            <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all text-sm sm:text-base">
                                Contact Us
                            </button>
                        </div>
                    </div>

                    <div className="border-t border-gray-800 mt-6 sm:mt-8 pt-6 sm:pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                        <p className="text-gray-400 text-sm">
                            © {new Date().getFullYear()} ProbX. All rights reserved.
                        </p>
                        <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
                            <button className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</button>
                            <button className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</button>
                            <button className="text-gray-400 hover:text-white transition-colors text-sm">Cookie Policy</button>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default MainMenu;