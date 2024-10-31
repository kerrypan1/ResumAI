import React, { useState } from 'react';

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
      handleUpload();
    } else {
      alert('Please select a PDF file to upload.');
    }
  };

  const handleUpload = async () => {
    //send to backend
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button type="submit">Upload Resume</button>
    </form>
  );
}

export default ResumeUpload;
