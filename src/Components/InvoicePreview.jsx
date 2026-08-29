
import React from "react";
import { useInvoice } from "../Context/InvoiceContext";
import { useNavigate } from "react-router";
import { exportInvoiceToPDF } from "../Utils/PdfGenerator";

const InvoicePreview = () => {
  const { state, totals } = useInvoice();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-200 py-10 px-4">

      {/* ACTION BAR */}
      <div className="max-w-4xl mx-auto mb-6 flex justify-between">

        <button
          onClick={() => navigate("/invoice-page")}
          className="px-5 py-2 bg-white border rounded-lg"
        >
          ← Back to Edit
        </button>

        <button
          onClick={exportInvoiceToPDF}
          className="px-5 py-2 bg-blue-600 text-white rounded-lg"
        >
          Download PDF
        </button>

      </div>

      {/* INVOICE */}
      <div
        id="invoice-preview"
        className="max-w-4xl mx-auto bg-white shadow-2xl rounded-xl overflow-hidden"
      >

        {/* HEADER */}
        <div className="px-10 py-8 bg-slate-900 text-white flex justify-between">

          <div>
            <h1 className="text-4xl font-bold">
              INVOICE
            </h1>

            <p className="text-slate-300 mt-2">
              {state.invoiceNumber}
            </p>
          </div>

          <div className="text-right">

            <p className="text-slate-400 text-sm">
              Invoice Date
            </p>

            <p className="font-semibold">
              {state.invoiceDate}
            </p>

            <span
              className={`inline-block mt-3 px-3 py-1 rounded-full text-sm ${
                state.status === "Paid"
                  ? "bg-green-500"
                  : state.status === "Draft"
                  ? "bg-yellow-500 text-black"
                  : "bg-red-500"
              }`}
            >
              {state.status}
            </span>

          </div>

        </div>

        <div className="p-10">

          {/* COMPANY / CUSTOMER */}
          <div className="grid grid-cols-2 gap-10 mb-10">

            {/* COMPANY */}
            <div>

              <p className="text-sm uppercase tracking-wider text-slate-400 font-semibold">
                From
              </p>

              <h2 className="text-xl font-bold mt-2">
                {state.company.name || "Your Company"}
              </h2>

              <p className="text-slate-600 mt-2 whitespace-pre-line">
                {state.company.address}
              </p>

              <p className="text-slate-600">
                {state.company.email}
              </p>

              <p className="text-slate-600">
                {state.company.phone}
              </p>

            </div>

            {/* CUSTOMER */}
            <div>

              <p className="text-sm uppercase tracking-wider text-slate-400 font-semibold">
                Bill To
              </p>

              <h2 className="text-xl font-bold mt-2">
                {state.customer.name || "Customer"}
              </h2>

              <p className="text-slate-600 mt-2 whitespace-pre-line">
                {state.customer.address}
              </p>

              <p className="text-slate-600">
                {state.customer.email}
              </p>

              <p className="text-slate-600">
                {state.customer.phone}
              </p>

            </div>

          </div>

          {/* ITEMS */}
          <table className="w-full border-collapse">

            <thead>
              <tr className="bg-slate-100">

                <th className="p-4 text-left">
                  Description
                </th>

                <th className="p-4 text-center">
                  Qty
                </th>

                <th className="p-4 text-right">
                  Price
                </th>

                <th className="p-4 text-right">
                  Total
                </th>

              </tr>
            </thead>

            <tbody>

              {state.items.map((item) => (

                <tr
                  key={item.id}
                  className="border-b"
                >

                  <td className="p-4">
                    {item.description}
                  </td>

                  <td className="p-4 text-center">
                    {item.quantity}
                  </td>

                  <td className="p-4 text-right">
                    ${Number(item.price).toFixed(2)}
                  </td>

                  <td className="p-4 text-right font-semibold">
                    $
                    {(
                      Number(item.quantity) *
                      Number(item.price)
                    ).toFixed(2)}
                  </td>

                </tr>

              ))}

            </tbody>

          </table>

          {/* TOTAL */}
          <div className="flex justify-end mt-8">

            <div className="w-80">

              <div className="flex justify-between py-2">

                <span>
                  Subtotal
                </span>

                <span>
                  ${totals.subtotal.toFixed(2)}
                </span>

              </div>

              <div className="flex justify-between py-2">

                <span>
                  Tax ({state.taxRate}%)
                </span>

                <span>
                  ${totals.taxAmount.toFixed(2)}
                </span>

              </div>

              <div className="border-t-2 border-slate-900 mt-3 pt-4 flex justify-between text-2xl font-bold">

                <span>
                  Total
                </span>

                <span>
                  ${totals.grandTotal.toFixed(2)}
                </span>

              </div>

            </div>

          </div>

          {/* FOOTER */}
          <div className="border-t mt-12 pt-6 text-center text-slate-500">

            <p>
              Thank you for your business!
            </p>

            <p className="text-sm mt-1">
              This is a computer-generated invoice.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default InvoicePreview;
