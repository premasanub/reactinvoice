import React from "react";
import InvoiceEditor from "../Components/InvoiceEditor";

const InvoicePage = () => {
  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <InvoiceEditor />
      </div>
    </div>
  );
};

export default InvoicePage;