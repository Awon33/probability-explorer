import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomeScreen from './pages/WelcomeScreen';
import MainMenu from './pages/MainMenu';
import CoinToss from './pages/CoinToss';
import SummaryScreen from './pages/SummaryScreen';
import DiceRoll from './pages/DiceRoll';
import MyProgress from './pages/MyProgress';
import SpinnerGame from './pages/SpinnerGame';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomeScreen />} />
        <Route path="/menu" element={<MainMenu />} />
        <Route path="/coin-toss" element={<CoinToss />} />
        <Route path="/summary" element={<SummaryScreen />} />
        <Route path="/dice-roll" element={<DiceRoll />} />
        <Route path="/progress" element={<MyProgress />} />
        <Route path="/spinner" element={<SpinnerGame />} />
      </Routes>
    </Router>
  );
}

export default App;