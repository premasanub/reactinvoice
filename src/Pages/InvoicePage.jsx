import React from 'react';
import InvoiceEditor from '../Componets/InvoiceEditor';
import { exportInvoiceToPDF } from '../Utils/PdfGenerator';

const InvoicePage = () => {
  return (
    <div style={{ maxWidth: '800px', margin: '20px auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#333' }}>Invoice Generator</h1>
        <button onClick={exportInvoiceToPDF} style={{ padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', cursor: 'pointer' }}>
          Export to PDF
        </button>
      </header>
      <main>
        <InvoiceEditor /> 
      </main>
    </div>
  );
};

export default InvoicePage;