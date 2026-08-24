
import { useInvoice } from "../context/InvoiceContext";

export default function InvoiceHeader() {
  const { state } =useInvoice();
  const { company } = state;

  return (
    <header style={{ padding: "10px", borderBottom: "1px solid #ccc" }}>
      <h2>{company.name || "Your Company Name"}</h2>
      <p>{company.address}</p>
      <p>{company.email}</p>
      <p>{company.phone}</p>
    </header>
  );
}