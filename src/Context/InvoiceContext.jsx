import React, {
  createContext,
  useContext,
  useReducer,
  useEffect,
} from "react";

export const InvoiceContext = createContext();

const generateId = () =>
  Math.random().toString(36).substring(2, 9);

const savedCompany =
  JSON.parse(localStorage.getItem("companyDetails")) || {
    name: "",
    address: "",
    email: "",
    phone: "",
  };

export const initialState = {
  company: savedCompany,

  customer: {
    name: "",
    address: "",
    email: "",
    phone: "",
  },

  invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,

  invoiceDate: new Date().toISOString().split("T")[0],

  status: "Unpaid",

  items: [
    {
      id: generateId(),
      description: "Consulting Services",
      quantity: 1,
      price: 1500,
    },
  ],

  taxRate: 10,
};

export const invoiceReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_COMPANY_DETAIL":
      return {
        ...state,
        company: {
          ...state.company,
          [action.field]: action.value,
        },
      };

    case "SAVE_COMPANY_DETAIL":
      return {
        ...state,
        company: action.payload,
      };

    case "UPDATE_CUSTOMER_DETAIL":
      return {
        ...state,
        customer: {
          ...state.customer,
          [action.field]: action.value,
        },
      };

    case "UPDATE_INVOICE_NUMBER":
      return {
        ...state,
        invoiceNumber: action.value,
      };

    case "UPDATE_INVOICE_DATE":
      return {
        ...state,
        invoiceDate: action.value,
      };

    case "UPDATE_STATUS":
      return {
        ...state,
        status: action.value,
      };

    case "UPDATE_TAX_RATE":
      return {
        ...state,
        taxRate: Number(action.value) || 0,
      };

    case "ADD_ITEM":
      return {
        ...state,
        items: [
          ...state.items,
          {
            id: generateId(),
            description: "",
            quantity: 1,
            price: 0,
          },
        ],
      };

    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                [action.payload.field]: action.payload.value,
              }
            : item
        ),
      };

    case "DELETE_ITEM":
      return {
        ...state,
        items: state.items.filter(
          (item) => item.id !== action.payload.id
        ),
      };

    default:
      return state;
  }
};

export const InvoiceProvider = ({ children }) => {
  const [state, dispatch] = useReducer(
    invoiceReducer,
    initialState
  );

  useEffect(() => {
    localStorage.setItem(
      "companyDetails",
      JSON.stringify(state.company)
    );
  }, [state.company]);

  const subtotal = state.items.reduce(
    (sum, item) =>
      sum + Number(item.quantity) * Number(item.price),
    0
  );

  const taxAmount = subtotal * (state.taxRate / 100);

  const grandTotal = subtotal + taxAmount;

  const totals = {
    subtotal,
    taxAmount,
    grandTotal,
  };

  return (
    <InvoiceContext.Provider
      value={{ state, dispatch, totals }}
    >
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = () => useContext(InvoiceContext);