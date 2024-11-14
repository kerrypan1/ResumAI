import React, { useState } from 'react';
import ResumeUpload from "../components/ResumeUpload";
import PDFViewer from "../components/PDFViewer";
import InfoBox from "../components/Info";
import FeedbackBox from "../components/Feedback";
import PromptBox from "../components/PromptBox";
import '../styles/HomePage.css';

function HomePage() {
  const [pdfUrl, setPdfUrl] = useState("/dummy-resume.pdf");
  const [isUploaded, setIsUploaded] = useState(false);
  const [promptText, setPromptText] = useState('');

  const handleUpload = (fileUrl) => {
    setPdfUrl(fileUrl);
    setIsUploaded(true);
  };

  const handlePromptChange = (text) => {
    setPromptText(text);
  };

  const handlePromptSubmit = () => {
    if (promptText.trim()) {
      console.log("Prompt submitted:", promptText);
      setPromptText('');
    }
  };

  return (
    <div className="home-page">
      <div className="content-wrapper">
        <h1 className="main-heading">
          Get Expert Feedback on Your Resume
          <span className="heading-underline"></span>
        </h1>
        
        <div className="centered-upload">
          <ResumeUpload onUpload={handleUpload} />
        </div>

        {isUploaded && (
          <div className="status-message">
            <div className="status-icon">✓</div>
            Resume uploaded successfully!
          </div>
        )}

        <div className="split-content">
          <div className="section pdf-section">
            <div className="section-card">
              <PDFViewer pdfUrl={pdfUrl} />
            </div>
          </div>

          <div className="section right-stack">
            <div className="prompt-section section-card">
              <h2 className="section-title">Prompt Box</h2>
              <PromptBox onSubmit={handlePromptChange} />
            </div>

            <div className="feedback-section section-card">
              <h2 className="section-title">AI Feedback</h2>
              <FeedbackBox />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
