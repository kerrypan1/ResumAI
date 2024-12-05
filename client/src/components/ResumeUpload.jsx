import React, { useState } from 'react';
import { Upload } from 'lucide-react';
import '../styles/ResumeUpload.css';

function ResumeUpload({ onUpload, onFeedbackGenerated }) {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setIsLoading(true);
      setFile(selectedFile);

      // Call the onUpload callback to notify the parent component (if needed)
      const fileUrl = URL.createObjectURL(selectedFile);
      onUpload(fileUrl);

      // Send the file to the API
      try {
        const formData = new FormData();
        formData.append('file', selectedFile);

        const uploadResponse = await fetch('http://127.0.0.1:8080/upload-pdf', {
          method: 'POST',
          body: formData,
        });

        if (uploadResponse.ok) {
          const uploadData = await uploadResponse.json();
          alert('File uploaded successfully!');
          console.log('Uploaded file URL:', uploadData.file_url);

          // Trigger mock feedback generation after successful file upload
          const mockScores = {
            experience: 4,
            skills: 3,
            education: 2,
          };

          const feedbackResponse = await fetch('http://127.0.0.1:8080/generate-feedback', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ scores: mockScores }),
          });

          if (feedbackResponse.ok) {
            const feedbackData = await feedbackResponse.json();
            console.log('Generated Feedback:', feedbackData.feedback);
            // Pass feedback to the parent component
            onFeedbackGenerated(feedbackData.feedback);
          } else {
            const feedbackError = await feedbackResponse.json();
            console.error(`Feedback Error: ${feedbackError.error}`);
            alert('Failed to generate feedback.');
          }
        } else {
          const uploadError = await uploadResponse.json();
          alert(`Error: ${uploadError.error}`);
        }
      } catch (error) {
        console.error('Error uploading file or generating feedback:', error);
        alert('An error occurred while processing your request.');
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
