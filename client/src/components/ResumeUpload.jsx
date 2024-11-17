import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import '../styles/ResumeUpload.css';

function ResumeUpload({ onUpload }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setIsLoading(true);
      setFile(selectedFile);

      // Call the onUpload callback to notify parent component (if needed)
      const fileUrl = URL.createObjectURL(selectedFile);
      onUpload(fileUrl);

      // Send the file to the API
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const response = await fetch('http://127.0.0.1:8080/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert('File uploaded successfully!');
          console.log('Uploaded file URL:', data.file_url);
        } else {
          const errorData = await response.json();
          alert(`Error: ${errorData.error}`);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        alert('An error occurred while uploading the file.');
      }

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
        <span>{isLoading ? 'Uploading...' : 'Upload Resume'}</span>
      </button>
    </div>
  );
}

export default ResumeUpload;