import React, { createContext, useContext, useReducer } from "react";

export const InvoiceContext = createContext();

const generateId = () => Math.random().toString(36).substr(2, 9);

export const initalState = {
  company: {
    name: 'Tech Solutions Inc.',
    address: '456 Tech Lane, Silicon Valley, CA 90210',
  },
  customer: {
    name: 'Customer Name',
    address: '123 Customer St, City, State, Zip',
    email: 'customer@example.com',
  },
  invoiceDate: new Date().toISOString().split('T')[0], // YYYY-MM-DD
  status: 'Unpaid', // New field for invoice status
  items: [
    { id: generateId(), description: 'Consulting Services', quantity: 1, price: 1500.00 },
  ],
  taxRate: 10, // 10% tax
};

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_CUSTOMER_DETAIL':
      return { ...state, customer: { ...state.customer, [action.field]: action.value } };
    case 'UPDATE_COMPANY_DETAIL':
      return { ...state, company: { ...state.company, [action.field]: action.value } };
    case 'UPDATE_INVOICE_DATE':
      return { ...state, invoiceDate: action.value };
    case 'UPDATE_STATUS': // New action to update status
      return { ...state, status: action.value };
    case 'ADD_ITEM':
      return { ...state, items: [...state.items, { id: generateId(), description: '', quantity: 1, price: 0 }] };
    case 'UPDATE_ITEM':
      return { ...state, items: state.items.map(item =>
          item.id === action.payload.id ? { ...item, [action.payload.field]: action.payload.value } : item )};
    case 'DELETE_ITEM':
      return { ...state, items: state.items.filter(item => item.id !== action.payload.id) };
    default:
      return state;
  }
};
export const InvoiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(invoiceReducer, initalState);

  // Auto-calculation logic is centralized here
  const calculateTotals = (items, taxRate) => {
    const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);
    const taxAmount = subtotal * (taxRate / 100);
    const grandTotal = subtotal + taxAmount;
    return { subtotal, taxAmount, grandTotal };
  };

  const totals = calculateTotals(state.items, state.taxRate);

  return (
    <InvoiceContext.Provider value={{ state, dispatch, totals }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);