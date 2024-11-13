import React, { useState } from 'react';
import '../styles/ResumeUpload.css';

function ResumeUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
      const fileUrl = URL.createObjectURL(selectedFile);
      onUpload(fileUrl);
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
        style={{ display: 'none' }}
      />
      <button
        className="upload-button"
        type="button"
        onClick={handleButtonClick}
      >
        Upload Resume
      </button>
    </div>
  );
}

export default ResumeUpload;
