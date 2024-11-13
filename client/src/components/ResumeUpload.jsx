import React, { useState } from 'react';
import '../styles/ResumeUpload.css';

function ResumeUpload({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please upload a valid PDF file.');
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      onUpload(fileUrl);
    } else {
      alert('Please select a PDF file to upload.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <div className="upload-container">
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="file-input"
        />
        <button
          className="upload-button"
          type="submit"
        >
          Upload Resume
        </button>
      </div>
    </form>
  );
}

export default ResumeUpload;