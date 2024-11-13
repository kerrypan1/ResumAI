import React from 'react';
import '../styles/PDFViewer.css';

const PDFViewer = ({ pdfUrl }) => {
  const firstPageUrl = `${pdfUrl}#page=1&toolbar=0`;

  return (
    <div className="pdf-container">
      <iframe
        src={firstPageUrl}
        className="pdf-frame"
        title="Resume PDF Viewer"
      />
    </div>
  );
};

export default PDFViewer;