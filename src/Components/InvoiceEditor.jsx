import React from "react";
import { useInvoice } from "../Context/InvoiceContext";
import ItemRow from "./ItemRow";
import { useNavigate } from "react-router";

const InvoiceEditor = () => {
  const { state, dispatch, totals } = useInvoice();
  const navigate = useNavigate();

  const handleCustomerChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_CUSTOMER_DETAIL",
      field: name,
      value,
    });
  };

  const handleCompanyChange = (e) => {
    const { name, value } = e.target;

    dispatch({
      type: "UPDATE_COMPANY_DETAIL",
      field: name,
      value,
    });
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl overflow-hidden">

      {/* TOP HEADER */}
      <div className="bg-slate-900 text-white px-8 py-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">
            Create Invoice
          </h1>

          <p className="text-slate-300 mt-1">
            Fill in the details below
          </p>
        </div>

        <div className="text-right">
          <p className="text-sm text-slate-400">
            Invoice Number
          </p>

          <input
            name="invoiceNumber"
            value={state.invoiceNumber}
            onChange={(e) =>
              dispatch({
                type: "UPDATE_INVOICE_NUMBER",
                value: e.target.value,
              })
            }
            className="mt-1 bg-white text-slate-900 px-3 py-2 rounded-lg outline-none"
          />
        </div>
      </div>

      <div className="p-8">

        {/* COMPANY + CUSTOMER */}
        <div className="grid md:grid-cols-2 gap-8">

          {/* COMPANY */}
          <section className="border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-5">
              Your Company
            </h2>

            <div className="space-y-4">

              <input
                name="name"
                value={state.company.name}
                onChange={handleCompanyChange}
                placeholder="Company Name"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                name="email"
                type="email"
                value={state.company.email}
                onChange={handleCompanyChange}
                placeholder="Company Email"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                name="phone"
                value={state.company.phone}
                onChange={handleCompanyChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <textarea
                name="address"
                value={state.company.address}
                onChange={handleCompanyChange}
                placeholder="Company Address"
                rows="3"
                className="w-full px-4 py-3 border rounded-lg resize-none"
              />

            </div>
          </section>

          {/* CUSTOMER */}
          <section className="border border-slate-200 rounded-xl p-6">
            <h2 className="text-lg font-bold text-slate-800 mb-5">
              Bill To
            </h2>

            <div className="space-y-4">

              <input
                name="name"
                value={state.customer.name}
                onChange={handleCustomerChange}
                placeholder="Customer Name"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                name="email"
                type="email"
                value={state.customer.email}
                onChange={handleCustomerChange}
                placeholder="Customer Email"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <input
                name="phone"
                value={state.customer.phone}
                onChange={handleCustomerChange}
                placeholder="Phone Number"
                className="w-full px-4 py-3 border rounded-lg"
              />

              <textarea
                name="address"
                value={state.customer.address}
                onChange={handleCustomerChange}
                placeholder="Customer Address"
                rows="3"
                className="w-full px-4 py-3 border rounded-lg resize-none"
              />

            </div>
          </section>
        </div>

        {/* INVOICE SETTINGS */}
        <div className="grid md:grid-cols-3 gap-5 mt-8">

          <div>
            <label className="block text-sm font-semibold mb-2">
              Invoice Date
            </label>

            <input
              type="date"
              value={state.invoiceDate}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_INVOICE_DATE",
                  value: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Status
            </label>

            <select
              value={state.status}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_STATUS",
                  value: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option>Unpaid</option>
              <option>Paid</option>
              <option>Draft</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold mb-2">
              Tax Rate (%)
            </label>

            <input
              type="number"
              value={state.taxRate}
              onChange={(e) =>
                dispatch({
                  type: "UPDATE_TAX_RATE",
                  value: e.target.value,
                })
              }
              className="w-full px-4 py-3 border rounded-lg"
            />
          </div>

        </div>

        {/* ITEMS */}
        <section className="mt-10">

          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">
              Invoice Items
            </h2>

            <button
              onClick={() =>
                dispatch({ type: "ADD_ITEM" })
              }
              className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-700"
            >
              + Add Item
            </button>
          </div>

          <div className="overflow-x-auto border rounded-xl">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-100">
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Qty</th>
                  <th className="p-4 text-left">Price</th>
                  <th className="p-4 text-left">Total</th>
                  <th className="p-4">Action</th>
                </tr>
              </thead>

              <tbody>
                {state.items.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                  />
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* TOTALS */}
        <div className="flex justify-end mt-8">
          <div className="w-full md:w-80 space-y-3">

            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>
                ${totals.subtotal.toFixed(2)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Tax ({state.taxRate}%)</span>
              <span>
                ${totals.taxAmount.toFixed(2)}
              </span>
            </div>

            <div className="border-t pt-4 flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>
                ${totals.grandTotal.toFixed(2)}
              </span>
            </div>

          </div>
        </div>

        {/* PREVIEW BUTTON */}
        <div className="flex justify-end mt-8">

          <button
            onClick={() => navigate("/invoice-preview")}
            className="px-7 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg"
          >
            Preview Invoice →
          </button>

        </div>

      </div>
    </div>
  );
};

export default InvoiceEditor;