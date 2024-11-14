// ResumeUpload.jsx
import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import '../styles/ResumeUpload.css';

function ResumeUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setIsLoading(true);
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      onUpload(fileUrl);
      setIsLoading(false);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleButtonClick = () => {
    document.getElementById('file-input').click();
  };

  return (
    <div className="upload-container">
      <input
        type="file"
        id="file-input"
        accept="application/pdf"
        onChange={handleFileChange}
        className="file-input"
      />
      <button
        className={`upload-button ${isLoading ? 'loading' : ''}`}
        type="button"
        onClick={handleButtonClick}
        disabled={isLoading}
      >
        <Upload className="upload-icon" />
        <span>Upload Resume</span>
      </button>
    </div>
  );
}

export default ResumeUpload;