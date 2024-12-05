import React from 'react';
import '../styles/FeedbackBox.css';

function FeedbackBox({feedback}) {
  return (
    <div className="feedback-box-one">
        <div className="feedback">
            <h2 className="feedback-title">Example resume feedback</h2>
            <p className="feedback-points">Feedback details will go here.</p>
            <p>{feedback}</p>
        </div>
    </div>
  );
}

export default FeedbackBox;