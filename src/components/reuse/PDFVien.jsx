import { Viewer } from '@react-pdf-viewer/core';
import React from 'react';
import { Document, Page } from 'react-pdf'; // Assurez-vous que `react-pdf` est installé
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

export default function PDFViewer({ pdfUrl }) {
  return (
    <div>
      {/* <Document file={pdfUrl}> */}
        {/* Rendre uniquement la première page */}
        <Page pageNumber={1} />
       <Viewer
                           fileUrl={pdfUrl}
                          //  plugins={[themePluginInstance]}
                       />
      {/* </Document> */}
    </div>
  );
}
