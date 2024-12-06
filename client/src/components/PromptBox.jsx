import React, { useState } from 'react';
import '../styles/PromptBox.css';

function PromptBox({ onSubmit }) {
  const [promptText, setPromptText] = useState('');

  const handleChange = (event) => {
    setPromptText(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (promptText.trim()) {
      onSubmit(promptText);  // Pass the prompt text to the parent onSubmit function
      setPromptText('');  // Clear the input after submission
    }
  };

  return (
    <div className="prompt-input-container" style={containerStyle}>
      <textarea
        style={textAreaStyle}
        placeholder="What would you like to ask about your resume?"
        value={promptText}
        onChange={handleChange}
        rows="4"
      />
      <button className="submit-button" onClick={handleSubmit}>Submit</button>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  width: '100%',
  maxWidth: '600px',
  margin: '1rem auto',
};

const textAreaStyle = {
  width: '100%',
  padding: '0.75rem',
  fontSize: '1rem',
  borderRadius: '0.375rem',
  border: '1px solid #D1D5DB',
  marginBottom: '1rem',
  resize: 'vertical',
};

export default PromptBox;
