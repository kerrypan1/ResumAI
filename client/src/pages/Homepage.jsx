import React, { useState } from 'react';
import ResumeUpload from "../components/ResumeUpload";
import PDFViewer from "../components/PDFViewer";
import '../styles/HomePage.css';

function HomePage() {
  // Initialize with the dummy resume
  const [pdfUrl, setPdfUrl] = useState("/dummy-resume.pdf");
  const [isUploaded, setIsUploaded] = useState(false);

  const handleUpload = (fileUrl) => {
    setPdfUrl(fileUrl);
    setIsUploaded(true);
  };

  return (
    <div className="home-page">
      <div className="content-wrapper">
        <div className="header">
          <h1>ResumAI</h1>
          <h2>Upload your resume here:</h2>
        </div>
        <ResumeUpload onUpload={handleUpload} />
        {isUploaded && (
          <div className="status-message">
            Resume uploaded successfully!
          </div>
        )}
        <PDFViewer pdfUrl={pdfUrl} />
      </div>
    </div>
  );
}

export default HomePage;