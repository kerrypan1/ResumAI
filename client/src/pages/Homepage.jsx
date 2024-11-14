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
        <div className="upload-and-prompt">
          <div className="resume-upload">
            <h2 className="upload-and-prompt-title">Step 1: Upload Your Resume</h2>
            <ResumeUpload onUpload={handleUpload} />
          </div>
          <div className="prompt-box">
            <h2 className="upload-and-prompt-title">Step 2: Ask ResumAI anything about your Resume!</h2>
            <PromptBox onSubmit={handlePromptChange} />
          </div>
        </div>

        {isUploaded && (
          <div className="status-message">
            Resume uploaded successfully!
          </div>
        )}

        <div className="viewer-feedback-container">
          <div className="resume-viewer">
            <PDFViewer pdfUrl={pdfUrl} />
          </div>
          <FeedbackBox />
        </div>
      </div>
    </div>
  );
}

export default HomePage;