import React from 'react';
import { useInvoice } from '../Context/InvoiceContext';
import ItemRow from '../Components/ItemRow';
import InvoicePage from './InvoicePage';
import { useNavigate } from 'react-router';

const InvoiceEditor = () => {
  const { state, dispatch, totals } = useInvoice();
   const navigate=useNavigate();
const{name,address,email}=state.company;
console.log(state.company);

const handleCustomerChange = (e) => {
    const{name,value}=e.target;

    dispatch({ 
      type: 'UPDATE_CUSTOMER_DETAIL', 
      field: name, 
      value: value });
  };
const goToPreview=()=>{
   navigate("/invoice-Page")
};


  //  const handleCustomerChange = (e) => {
  //   const{name,value}=e.target;

  //   dispatch({ 
  //     type: 'SAVE_COMPANY_DETAIL', 
  //     field: name, 
  //     value: value });
  // };

  // const handleCompanyChange = (e) => {
  //   dispatch({ type: 'UPDATE_COMPANY_DETAIL', field: e.target.name, value: e.target.value });
  // };

  return (
    <div id="invoice-template" style={{ padding: '20px', border: '1px solid #ccc' }}>
      
      {/* Company Info & Invoice Header */}
       <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
      <div>
          <h2>From:</h2>
         <h2>{name}</h2>
         <h2>{address}</h2>
         <h2>{email}</h2>
        </div>
        <div>
          <h1>INVOICE Number</h1>
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
      
      

     {/* Customer  */}
      <div className="bg-white p-5 rounded shadow mb-6">
        <h2 className="text-xl font-bold mb-4">Customer Details</h2>

        <div className="grid grid-cols-2 gap-4">
          <input
            name="name"
            type='text'
            className="p-2 border rounded"
            placeholder="CustomerName"
            value={state.customer.name}
            onChange={handleCustomerChange}
          />

          <input
            name="email"
            type="email"
            className="p-2 border rounded"
            placeholder="Email"
            value={state.customer.email}
            onChange={handleCustomerChange}
          />
            <input
            name="address"
            className="p-2 border rounded"
            placeholder="Address"
            value={state.customer.address}
            onChange={handleCustomerChange}
          />

          <input
            name="phone"
            type='number'
            className="p-2 border rounded"
            placeholder="Phone"
            value={state.customer.phone}
            onChange={(e) => updateCustomer("phone", e.target.value)}
          />
        </div>
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
      <button onClick={goToPreview}>Go To PreView</button>
    </div>
  );
};

export default InvoiceEditor;