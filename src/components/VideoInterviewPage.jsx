import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as faceapi from 'face-api.js';
import './VideoInterviewPage.css';

const VideoInterviewPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [analysisResult, setAnalysisResult] = useState(null); // State to hold analysis results

  const handleEndInterview = () => {
    navigate('/result');
  };

  useEffect(() => {
    const startVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          await loadModels();
          // Analyze every second
          setInterval(() => {
            const frame = captureFrame();
            detectFace(frame);
          }, 1000);
        }
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
    };

    const loadModels = async () => {
      await faceapi.nets.tinyFaceDetector.loadFromUri('/models');
      await faceapi.nets.faceLandmark68Net.loadFromUri('/models');
      await faceapi.nets.faceRecognitionNet.loadFromUri('/models');
    };

    const captureFrame = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/png');
    };

    const detectFace = async (image) => {
      const img = await faceapi.fetchImage(image);
      const detections = await faceapi.detectAllFaces(img).withFaceLandmarks();
      if (detections.length > 0) {
        // Extract features and run emotion analysis
        const emotions = await analyzeEmotions(detections);
        setAnalysisResult(emotions); // Store analysis result in state
      }
    };

    const analyzeEmotions = async (detections) => {
      // Your emotion recognition logic here
      // For demonstration, using mock data
      const mockResult = {
        emotion: 'happy', // Example emotion
        confidence: 0.85, // Example confidence score
      };
      return mockResult; // Return the mock result
    };

    startVideoStream();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }
    };
  }, []);

  return (
    <div className="video-page">
      <div className="video-container">
        <h2 style={{ color: 'black' }}>Video Interview</h2>
        <div className="video-box">
          <video ref={videoRef} autoPlay playsInline></video>
        </div>
        <button onClick={handleEndInterview}>End Interview</button>
        {analysisResult && ( // Conditional rendering based on analysis result
          <div className="analysis-result">
            <h3>Analysis Result:</h3>
            <p>Emotion: {analysisResult.emotion}</p>
            <p>Confidence Level: {analysisResult.confidence}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VideoInterviewPage;
