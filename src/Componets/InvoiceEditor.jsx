import React from 'react';
import { useInvoice } from '../Context/InvoiceContext';
import ItemRow from './ItemRow';

const InvoiceEditor = () => {
  const { state, dispatch, totals } = useInvoice();

  const handleCustomerChange = (e) => {
    dispatch({ type: 'UPDATE_CUSTOMER_DETAIL', field: e.target.name, value: e.target.value });
  };

  const handleCompanyChange = (e) => {
    dispatch({ type: 'UPDATE_COMPANY_DETAIL', field: e.target.name, value: e.target.value });
  };

  return (
    <div id="invoice-template" style={{ padding: '20px', border: '1px solid #ccc' }}>
      
      {/* Company Info & Invoice Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <div>
          <h2>From:</h2>
          <input type="text" name="name" value={state.company.name} onChange={handleCompanyChange} style={{fontWeight: 'bold'}} /><br />
          <input type="text" name="address" value={state.company.address} onChange={handleCompanyChange} />
        </div>
        <div>
          <h1>INVOICE</h1>
          <label>Date: </label>
          <input type="date" value={state.invoiceDate} onChange={(e) => dispatch({ type: 'UPDATE_INVOICE_DATE', value: e.target.value })} /><br/>
          <label>Status: </label>
          <select value={state.status} onChange={(e) => dispatch({ type: 'UPDATE_STATUS', value: e.target.value })}>
            <option value="Unpaid">Unpaid</option>
            <option value="Paid">Paid</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
      </div>
      
      {/* Customer Details Input */}
      <div style={{ marginBottom: '20px' }}>
        <h2>Bill To:</h2>
        <label>Name: </label>
        <input type="text" name="name" value={state.customer.name} onChange={handleCustomerChange} /><br />
        <label>Address: </label>
        <input type="text" name="address" value={state.customer.address} onChange={handleCustomerChange} /><br />
        <label>Email: </label>
        <input type="email" name="email" value={state.customer.email} onChange={handleCustomerChange} />
      </div>

      {/* Items Table (Editable) */}
      <table>
        <thead>
          <tr>
            <th>Description</th><th>Quantity</th><th>Price ($)</th><th>Total ($)</th><th>Action</th>
          </tr>
        </thead>
        <tbody>
          {state.items.map(item => (<ItemRow key={item.id} item={item} />))}
        </tbody>
      </table>
      <button onClick={() => dispatch({ type: 'ADD_ITEM' })}>+ Add Item</button>

      {/* Totals Section */}
      <div style={{ marginTop: '20px', textAlign: 'right' }}>
        <p>Subtotal: ${totals.subtotal.toFixed(2)}</p>
        <p>Tax ({state.taxRate}%): ${totals.taxAmount.toFixed(2)}</p>
        <h3>Grand Total: ${totals.grandTotal.toFixed(2)}</h3>
      </div>
    </div>
  );
};

export default InvoiceEditor;