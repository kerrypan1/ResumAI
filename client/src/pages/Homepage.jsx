import React, { useState } from 'react';
import ResumeUpload from "../components/ResumeUpload";
import PDFViewer from "../components/PDFViewer";
import InfoBox from "../components/Info";
import FeedbackBox from "../components/Feedback";
import '../styles/HomePage.css';

function HomePage() {
  // Initialize with the dummy resume
  const [pdfUrl, setPdfUrl] = useState("/dummy-resume.pdf");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = (fileUrl) => {
    setPdfUrl(fileUrl);
    setIsUploaded(true);
  };

  const fontLink = document.createElement('link');
  fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600&display=swap';
  fontLink.rel = 'stylesheet';
  document.head.appendChild(fontLink);

  return (
    <div className="home-page" style={{ fontFamily: 'Poppins' }}>
      <div className="content-wrapper">
        <div className="info-and-feedback">
          <div className="feedback-box">
            <FeedbackBox />
          </div>
          <div className="info-box">
            <InfoBox />
          </div>
        </div>
        <div className="resume-upload">
          <ResumeUpload  onUpload={handleUpload} />
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