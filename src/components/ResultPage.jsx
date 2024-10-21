import React, { useState } from 'react';
import ReactSpeedometer from 'react-d3-speedometer';
import './ResultPage.css';

const ResultPage = () => {
  const [activeTab, setActiveTab] = useState('response');

  return (
    <div className="result-page">
      <h2>Interview Result</h2>
      <div className="tabs">
        <button onClick={() => setActiveTab('response')}>Response Score</button>
        <button onClick={() => setActiveTab('confidence')}>Confidence</button>
      </div>

      {activeTab === 'response' && (
        <div className="tab-content">
          <h3>Answer Score</h3>
          <ReactSpeedometer value={75} maxValue={100} />
        </div>
      )}

      {activeTab === 'confidence' && (
        <div className="tab-content">
          <h3>Speech & Facial Confidence</h3>
          <ReactSpeedometer value={65} maxValue={100} />
        </div>
      )}
    </div>
  );
};

export default ResultPage;
