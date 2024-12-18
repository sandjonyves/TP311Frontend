import React from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import { Viewer } from '@react-pdf-viewer/core';
// import './Test.js'
// Configurez le worker de PDF.js
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.10.377/pdf.worker.min.js`;
import test from './Test';
import '@react-pdf-viewer/core/lib/styles/index.css';
// import BottomNavigation from '../bottomNavidation/BottomNavigation';

// PdfJs.GlobalWorkerOptions.workerSrc = PDFWorker;
test()
const PDFViewer = ({ pdfUrl }) => {
  const [numPages, setNumPages] = React.useState(null);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div>

            <Viewer
                fileUrl={pdfUrl}
                
            />
      {/* <Document
        file={pdfUrl}
        onLoadSuccess={onLoadSuccess}
        onLoadError={error => console.error('Error while loading PDF: ', error)}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <Page key={`page_${index + 1}`} pageNumber={index + 1} />
        ))}
      </Document> */}
    </div>
  );
};

export default PDFViewer;