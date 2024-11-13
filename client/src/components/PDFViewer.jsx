import React from 'react';
import '../styles/PDFViewer.css';

const PDFViewer = ({ pdfUrl }) => {
  return (
    <div className="pdf-container">
      <iframe
        src={pdfUrl}
        className="pdf-frame"
        title="Resume PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer;