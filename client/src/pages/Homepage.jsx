import React, { useState } from 'react';
import ResumeUpload from '../components/ResumeUpload';
import PDFViewer from '../components/PDFViewer';
import FeedbackBox from '../components/Feedback';
import PromptBox from '../components/PromptBox';
import { motion } from 'framer-motion';
import '../styles/HomePage.css';

/* Example websites:
https://www.wonsulting.ai/resumai
https://www.canva.com/ai-resume-builder/
https://www.resumenerd.ai/landings?utm_source=google&utm_medium=cpc&utm_term=automatic%20resume%20builder&utm_campaign=21033265870&adid=691148541514&gad_source=1&gbraid=0AAAAA9Sa83ONQOtQmXqESEvEACInAYmvb&gclid=CjwKCAiA9bq6BhAKEiwAH6bqoFcwCKVn103lSkCEGkKvElsIhXxWuYEFbE41jfLaVjv0xZQadN8k5RoCBuQQAvD_BwE
https://resume.co/?afid=gdnuss&utm_source=google&utm_medium=cpc&utm_campaign=20156252285&utm_term=ai%20resume%20builder&gad_source=1&gbraid=0AAAAAofXKxu-1kqZzYZ13Ua1M8E6u-7PH&gclid=CjwKCAiA9bq6BhAKEiwAH6bqoMMk4ZYsI-eFB2L_LfHKdCR00qArWV8BKijuYs4AO6NF_zXyuBrSxhoC0hEQAvD_BwE
https://enhancv.com/ai-resume-builder/
https://www.resumebuilder.com
https://www.resume-now.com/home_1



 */

const HomePage = () => {
  const [pdfUrl, setPdfUrl] = useState('/Colorful-Resume-Template.pdf');
  const [isUploaded, setIsUploaded] = useState(false);
  const [promptText, setPromptText] = useState('');
  const [feedbackHistory, setFeedbackHistory] = useState([]);
  const [feedback, setFeedback] = useState('');

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
        response: 'This is a sample AI feedback response.',
      };
      setFeedbackHistory((prev) => [...prev, newFeedback]);
      setPromptText('');
    }
  };

  const handleFeedbackGenerated = (feedbackTest) => {
    setFeedback(feedbackTest);
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
            Reinvent Your Resume with AI
            <span className="heading-accent">
              Optimize your resume in no time with AI-powered content that’s
              tailored just for you
            </span>
          </h1>
        </header>

        <div className="upload-container">
          <ResumeUpload
            onUpload={handleUpload}
            onFeedbackGenerated={handleFeedbackGenerated}
          />
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
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <PDFViewer pdfUrl={pdfUrl} />
            </motion.div>
          </div>

          <div className="interaction-section">
            <motion.div
              className="prompt-container"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="section-title">AI Feedback</h2>
              <FeedbackBox history={feedbackHistory} feedback={feedback} />
            </motion.div>

            {/* <motion.div
              className="feedback-container"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h2 className="section-title">Ask for more feedback</h2>
              <PromptBox
                value={promptText}
                onChange={handlePromptChange}
                onSubmit={handlePromptSubmit}
              />
            </motion.div> */}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default HomePage;
