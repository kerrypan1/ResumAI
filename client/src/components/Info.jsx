import React from 'react';
import '../styles/InfoBox.css';

function InfoBox() {
  return (
    <div className="information-box">
        <div className="information">
            <h2 className="info-title">Info about ResumAI</h2>
            <p className="info-points"> 
                Info 1
                <br />
                Info 2
            </p>
        </div>
    </div>
  );
}

export default InfoBox;