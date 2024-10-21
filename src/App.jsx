import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import ResumeScorePage from './components/ResumeScorePage';
import VideoInterviewPage from './components/VideoInterviewPage';
import ResultPage from './components/ResultPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume-score" element={<ResumeScorePage />} />
        <Route path="/video-interview" element={<VideoInterviewPage />} />
        <Route path="/result" element={<ResultPage />} />
      </Routes>
    </Router>
  );
}

export default App;
