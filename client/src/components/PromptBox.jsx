import React, { useState } from 'react';

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
      <button style={buttonStyle} onClick={handleSubmit}>Submit</button>
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
  marginBottom: '0.5rem',
  resize: 'vertical',
};

const buttonStyle = {
  padding: '0.5rem 1.5rem',
  fontSize: '1rem',
  fontWeight: 'bold',
  color: '#FFFFFF',
  backgroundColor: '#E3A8A0',
  border: 'none',
  borderRadius: '0.375rem',
  cursor: 'pointer',
};

export default PromptBox;
