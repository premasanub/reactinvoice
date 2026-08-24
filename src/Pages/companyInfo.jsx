import {  useState } from "react";
import { useNavigate } from "react-router";
import { useInvoice } from "../Context/InvoiceContext";

export default function CompanyForm() {
  const { state, dispatch } = useInvoice();
  const navigate=useNavigate();
  const [form, setForm] = useState({
    name:"",
    email:"",
    address:""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch({ type: "SAVE_COMPANY_DETAIL", payload: form });
    alert("Company details saved!");
    navigate("/invoice-Edit")
  };

  return (
    <div>
      <h2>Company Details</h2>

      <input
        name="name"
        placeholder="Company Name"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="address"
        placeholder="Address"
        value={form.address}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
      />

      <input
        name="phone"
        placeholder="Phone"
        value={form.phone}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Save</button>
    </div>
  );
}