import React from 'react';
import '../styles/FeedbackBox.css';

function FeedbackBox({feedback}) {
  return (
    <div className="feedback-box-one">
        <div className="feedback">
            {feedback}
        </div>
    </div>
  );
}

export default FeedbackBox;