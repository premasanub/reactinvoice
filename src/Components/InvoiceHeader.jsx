import React from "react";
import { useInvoice } from "../Context/InvoiceContext";

const InvoiceHeader = ({ preview = false }) => {
  const { state } = useInvoice();

  const { company } = state;

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">

      {/* Company Details */}
      <div>
        <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
          From
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mt-2">
          {company.name || "Your Company Name"}
        </h2>

        {company.address && (
          <p className="text-slate-600 mt-2 whitespace-pre-line">
            {company.address}
          </p>
        )}

        {company.email && (
          <p className="text-slate-600">
            {company.email}
          </p>
        )}

        {company.phone && (
          <p className="text-slate-600">
            {company.phone}
          </p>
        )}
      </div>

      {/* Invoice Details */}
      <div className="md:text-right">

        <h1 className="text-4xl font-bold text-slate-900">
          INVOICE
        </h1>

        <p className="text-slate-500 mt-2">
          Invoice #{state.invoiceNumber}
        </p>

        <p className="text-slate-500">
          Date: {state.invoiceDate}
        </p>

        {/* <span
          className={`inline-block mt-3 px-4 py-1 rounded-full text-sm font-semibold ${
            state.status === "Paid"
              ? "bg-green-100 text-green-700"
              : state.status === "Draft"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {state.status}
        </span> */}

      </div>

    </div>
  );
};

export default InvoiceHeader;