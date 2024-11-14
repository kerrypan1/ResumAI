import React, { useState } from 'react';
import ResumeUpload from "../components/ResumeUpload";
import PDFViewer from "../components/PDFViewer";
import InfoBox from "../components/Info";
import FeedbackBox from "../components/Feedback";
import PromptBox from "../components/PromptBox";
import { motion } from 'framer-motion';
import '../styles/HomePage.css';

const HomePage = () => {
  const [pdfUrl, setPdfUrl] = useState("/dummy-resume.pdf");
  const [isUploaded, setIsUploaded] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState([]);

  const handleUpload = (fileUrl) => {
    setPdfUrl(fileUrl);
    setIsUploaded(true);
  };

  const handlePromptChange = (text) => {
    setPromptText(text);
  };

  const handlePromptSubmit = () => {
    if (promptText.trim()) {
      const newFeedback = {
        id: Date.now(),
        prompt: promptText,
        response: "This is a sample AI feedback response."
      };
      setFeedbackHistory(prev => [...prev, newFeedback]);
      setPromptText('');
    }
  };

  return (
    <div className="home-page">
      <motion.div 
        className="content-wrapper"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <header className="header">
          <h1 className="main-heading">
            Resume Review Assistant
            <span className="heading-accent">AI-Powered Feedback</span>
          </h1>
        </header>

        <div className="upload-container">
          <ResumeUpload onUpload={handleUpload} />
          {isUploaded && (
            <motion.div 
              className="status-message"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="status-icon">✓</div>
              <span>Resume uploaded successfully!</span>
            </motion.div>
          )}
        </div>

        <div className="main-content">
          <div className="pdf-section">
            <motion.div 
              className="section-card"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <PDFViewer pdfUrl={pdfUrl} />
            </motion.div>
          </div>

          <div className="interaction-section">
            <motion.div 
              className="prompt-container"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="section-title">Ask for Feedback</h2>
              <PromptBox 
                value={promptText}
                onChange={handlePromptChange}
                onSubmit={handlePromptSubmit}
              />
            </motion.div>

            <motion.div 
              className="feedback-container"
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <h2 className="section-title">AI Feedback</h2>
              <FeedbackBox history={feedbackHistory} />
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;