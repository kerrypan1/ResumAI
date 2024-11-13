import React, { useState } from 'react';
import ResumeUpload from "../components/ResumeUpload";
import PDFViewer from "../components/PDFViewer";
import InfoBox from "../components/Info";
import FeedbackBox from "../components/Feedback"; 
import PromptBox from "../components/PromptBox"; 
import '../styles/HomePage.css';

function HomePage() {
  // Initialize with the dummy resume
  const [pdfUrl, setPdfUrl] = useState("/dummy-resume.pdf");
  const [isUploaded, setIsUploaded] = useState(false);
  const [promptText, setPromptText] = useState('');

  const handleUpload = (fileUrl) => {
    setPdfUrl(fileUrl);
    setIsUploaded(true);
  };

  const handlePromptChange = (text) => {
    setPromptText(text); // Update prompt text when user types
  };

  const handlePromptSubmit = () => {
    if (promptText.trim()) {
      console.log("Prompt submitted:", promptText);
      // Here you would send the promptText to the AI chatbot API
      setPromptText(''); // Clear the text input after submission
    }
  };

  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  return (
    <div className="home-page" style={{ fontFamily: 'Poppins' }}>
      <div className="content-wrapper">
        <div className="info-and-feedback">
          <div className="info-box">
            <InfoBox />
          </div>
          <div className="feedback-box">
            <FeedbackBox />
          </div>
        </div>
        
        
        <div className="upload-and-prompt">
          <div className="resume-upload">
            <h2 className="upload-and-prompt-title">Step 1: Upload Your Resume</h2>
            <ResumeUpload onUpload={handleUpload} />
          </div>
          <div className="prompt-box">
            <h2 className="upload-and-prompt-title">Step 2: Ask ResumAI anything about your Resume!</h2>
            <PromptBox onSubmit={handlePromptChange} /> {/* Pass change handler here */}
          </div>
        </div>
        
        {isUploaded && (
          <div className="status-message">
            Resume uploaded successfully!
          </div>
        )}

        <div className="resume-viewer">
          <PDFViewer pdfUrl={pdfUrl} />
        </div>
      </div>
    </div>
  );
}
export default HomePage;
