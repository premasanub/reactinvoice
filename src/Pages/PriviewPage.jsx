import React from "react";
import { useInvoice } from "../Context/InvoiceContext";
import { useNavigate } from "react-router";
import InvoiceHeader from "../Components/InvoiceHeader";
import { exportInvoiceToPDF } from "../Utils/PdfGenerator";

const PreviewPage = () => {
  const { state, totals } = useInvoice();
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4">

      {/* Top Buttons */}
      <div className="max-w-5xl mx-auto mb-6 flex justify-between items-center">

        <button
          onClick={() => navigate("/invoice-page")}
          className="px-5 py-2.5 bg-white border border-slate-300 rounded-lg text-slate-700 font-medium hover:bg-slate-50 transition"
        >
          ← Back to Edit
        </button>

        <button
          onClick={exportInvoiceToPDF}
          className="px-5 py-2.5 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition shadow"
        >
          Download PDF
        </button>

      </div>

      {/* Invoice Preview */}
      <div
        id="invoice-preview"
        className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
      >

        {/* Invoice Header */}
        <div className="p-10 border-b border-slate-200">
          <InvoiceHeader preview />
        </div>

        {/* Customer Information */}
        <div className="px-10 py-8 grid md:grid-cols-2 gap-10">

          {/* Bill To */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Bill To
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-2">
              {state.customer.name || "Customer Name"}
            </h2>

            {state.customer.address && (
              <p className="text-slate-600 mt-2 whitespace-pre-line">
                {state.customer.address}
              </p>
            )}

            {state.customer.email && (
              <p className="text-slate-600">
                {state.customer.email}
              </p>
            )}

            {state.customer.phone && (
              <p className="text-slate-600">
                {state.customer.phone}
              </p>
            )}
          </div>

          {/* Payment Status */}
          <div className="md:text-right">

            <p className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Payment Status
            </p>

            <span
              className={`inline-block mt-3 px-4 py-2 rounded-full text-sm font-semibold ${
                state.status === "Paid"
                  ? "bg-green-100 text-green-700"
                  : state.status === "Draft"
                  ? "bg-yellow-100 text-yellow-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {state.status}
            </span>

          </div>

        </div>

        {/* Items Table */}
  {/* ITEMS */}
<div className="mt-8">
  <table
    className="w-full"
    style={{
      borderCollapse: "collapse",
      width: "100%",
    }}
  >
    <thead>
      <tr
        style={{
          backgroundColor: "#f1f5f9",
          color: "#0f172a",
        }}
      >
        <th
          style={{
            padding: "14px",
            textAlign: "left",
            fontWeight: "700",
            borderBottom: "2px solid #cbd5e1",
          }}
        >
          Description
        </th>

        <th
          style={{
            padding: "14px",
            textAlign: "center",
            fontWeight: "700",
            borderBottom: "2px solid #cbd5e1",
          }}
        >
          Quantity
        </th>

        <th
          style={{
            padding: "14px",
            textAlign: "right",
            fontWeight: "700",
            borderBottom: "2px solid #cbd5e1",
          }}
        >
          Price
        </th>

        <th
          style={{
            padding: "14px",
            textAlign: "right",
            fontWeight: "700",
            borderBottom: "2px solid #cbd5e1",
          }}
        >
          Total
        </th>
      </tr>
    </thead>

    <tbody>
      {state.items.map((item) => (
        <tr
          key={item.id}
          style={{
            borderBottom: "1px solid #e2e8f0",
          }}
        >
          <td
            style={{
              padding: "14px",
              textAlign: "left",
              color: "#334155",
            }}
          >
            {item.description || "-"}
          </td>

          <td
            style={{
              padding: "14px",
              textAlign: "center",
              color: "#334155",
            }}
          >
            {item.quantity || 0}
          </td>

          <td
            style={{
              padding: "14px",
              textAlign: "right",
              color: "#334155",
            }}
          >
            ${Number(item.price || 0).toFixed(2)}
          </td>

          <td
            style={{
              padding: "14px",
              textAlign: "right",
              fontWeight: "600",
              color: "#0f172a",
            }}
          >
            $
            {(
              Number(item.quantity || 0) *
              Number(item.price || 0)
            ).toFixed(2)}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
</div>

        {/* Totals */}
        <div className="px-10 py-8 flex justify-end">

          <div className="w-full sm:w-96">

            <div className="flex justify-between py-2 text-slate-600">
              <span>Subtotal</span>

              <span>
                ${totals.subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between py-2 text-slate-600">
              <span>
                Tax ({state.taxRate}%)
              </span>

              <span>
                ${totals.taxAmount.toFixed(2)}
              </span>
            </div>

            <div className="border-t-2 border-slate-900 mt-3 pt-4 flex justify-between items-center">

              <span className="text-xl font-bold text-slate-900">
                Grand Total
              </span>

              <span className="text-2xl font-bold text-slate-900">
                ${totals.grandTotal.toFixed(2)}
              </span>

            </div>

          </div>

        </div>

        {/* Footer */}
        <div className="bg-slate-50 border-t border-slate-200 px-10 py-8 text-center">

          <p className="text-slate-700 font-medium">
            Thank you for your business!
          </p>

          <p className="text-sm text-slate-400 mt-1">
            We appreciate your trust and support.
          </p>

        </div>

      </div>

    </div>
  );
};

export default PreviewPage;