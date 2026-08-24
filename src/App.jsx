import React from 'react';

import CompanyInfo from './Pages/companyInfo';
import InvoiceHeader from './Components/InvoiceHeader';
import { InvoiceProvider } from './Context/InvoiceContext';
import { BrowserRouter, Route, Routes } from 'react-router';
import Layout from './Layout/Layout';
import InvoiceEditor from './Pages/InvoiceEditor';
import InvoicePage from './Pages/InvoicePage';
const App = () => {
  return (
    <>
    
    <BrowserRouter>
    <Layout />
    <div>
    <Routes>
      <Route path="/" element={<InvoiceEditor />} />
      
      <Route path="/company" element={<CompanyInfo />} />
      <Route path="/invoice-Page" element={<InvoicePage />} />
      <Route path="/invoice-Edit" element={<InvoiceEditor />} />


      </Routes>
      </div>
    </BrowserRouter>
   

    </>
  );
};

export default App;
  
 