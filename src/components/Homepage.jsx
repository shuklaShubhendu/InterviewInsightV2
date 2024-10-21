import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

const HomePage = ({ onResumeUpload, onJobTarget }) => {
  const [resume, setResume] = useState(null);
  const [jobTarget, setJobTarget] = useState('');
  const navigate = useNavigate();

  const handleResumeUpload = (e) => {
    setResume(e.target.files[0]);
    onResumeUpload(e.target.files[0]);
  };

  const handleJobTargetChange = (e) => {
    setJobTarget(e.target.value);
    onJobTarget(e.target.value);
  };

  const handleSubmit = () => {
    if (resume && jobTarget) {
      navigate('/resume-score');
    } else {
      alert('Please upload resume and enter target job.');
    }
  };

  return (
    <div className="homepage">
      <div className="spin-container left"></div>
      <div className="upload-container">
        <h2>Upload Your Resume</h2>
        <input type="file" onChange={handleResumeUpload} />
        <input
          type="text"
          placeholder="Target Job Position"
          value={jobTarget}
          onChange={handleJobTargetChange}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
      <div className="spin-container right"></div>
    </div>
  );
};

export default HomePage;
