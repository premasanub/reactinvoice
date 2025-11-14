import React from 'react';
import { InvoiceProvider } from './Context/InvoiceContext';
import InvoicePage from './Pages/InvoicePage.jsx';

function App() {
  return (
    <InvoiceProvider>
      <div className="App">
        <InvoicePage />
      </div>
    </InvoiceProvider>
  );
}

export default App;