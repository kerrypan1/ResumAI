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
      

      try {
        // Extract text from the PDF
        const textFormData = new FormData();
        textFormData.append('file', selectedFile);
        // console.log(textFormData);

        const textResponse = await fetch('http://127.0.0.1:8080/extract-text', {
          method: 'POST',
          body: textFormData,
        });

        if (!textResponse.ok) {
          const errorData = await textResponse.json();
          console.error(`Text Extraction Error: ${errorData.error}`);
          alert('Failed to extract text from the PDF.');
          setIsLoading(false);
          return;
        }

        const { text: extractedText } = await textResponse.json();
        // console.log('Extracted Text:', extractedText);

        // Generate feedback using scores and extracted text
        const mockScores = {
          totalScore: 61,
          grammerScore: 77,
          actionVerbScore: 68,
          qaScore: 36,
          experience: 60,
          skills: 53,
          education: 37,
        };

        const feedbackResponse = await fetch('http://127.0.0.1:8080/generate-feedback', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ scores: mockScores, text: extractedText }),
        });

        if (feedbackResponse.ok) {
          const feedbackData = await feedbackResponse.json();
          onFeedbackGenerated(feedbackData.feedback); // Pass feedback to parent component
        } else {
          const feedbackError = await feedbackResponse.json();
          console.error(`Feedback Error: ${feedbackError.error}`);
          alert('Failed to generate feedback.');
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
        <span>{isLoading ? 'Processing...' : 'Upload Resume'}</span>
      </button>
    </div>
  );
}

export default ResumeUpload;
