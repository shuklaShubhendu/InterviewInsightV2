import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ResumeScorePage.css';

const ResumeScorePage = () => {
  const navigate = useNavigate();

  const handleStartInterview = () => {
    navigate('/video-interview');
  };

  return (
    <div className="resume-score-page">
      <div className="spin-container left"></div>
      <div className="score-container">
        <h2>Your Resume Score: 85%</h2>
        <p>Suggestions: Improve your project descriptions and add more technical skills.</p>
        <button onClick={handleStartInterview}>Start Interview</button>
      </div>
      <div className="spin-container right"></div>
    </div>
  );
};

export default ResumeScorePage;
