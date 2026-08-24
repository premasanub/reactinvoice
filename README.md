# Invoice Builder – React

A responsive **Invoice Builder** application built with **React.js** that allows users to create professional invoices dynamically. Users can enter customer details, add multiple products or services, calculate subtotals, taxes, and totals automatically, and generate a printable/PDF-ready invoice.

## 🚀 Features

* Create invoices dynamically
* Add multiple invoice items
* Edit and remove invoice items
* Enter customer information
* Enter invoice number and date
* Automatic subtotal calculation
* Automatic tax calculation
* Automatic grand total calculation
* Responsive design
* Printable invoice layout
* PDF export/print support
* Local state management using React hooks
* Clean and user-friendly interface

## 🛠️ Technologies Used

* **React.js**
* **JavaScript (ES6+)**
* **React Hooks**
* **CSS / Tailwind CSS**
* **React Icons**
* **Vite**
* **jsPDF / html2canvas** *(if used for PDF generation)*

## 📂 Project Structure

```text
invoice-builder/
├── public/
├── src/
│   ├── components/
│   │   ├── InvoiceForm.jsx
│   │   ├── InvoiceItems.jsx
│   │   └── InvoicePreview.jsx
│   │
│   ├── pages/
│   │   └── Invoice.jsx
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── package.json
├── vite.config.js
└── README.md
```

> The folder structure can be adjusted according to the actual project structure.

## ⚙️ Installation

### 1. Clone the repository

```bash
git clone <your-github-repository-url>
```

### 2. Navigate to the project

```bash
cd invoice-builder
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:5173
```

## 📦 Required Packages

If these packages are used in the project, install them with:

```bash
npm install react react-dom react-icons
```

For PDF generation:

```bash
npm install jspdf html2canvas
```

## 🧾 How It Works

1. Enter the **customer/client details**.
2. Enter the **invoice number and date**.
3. Add invoice items.
4. Enter the item description, quantity, and price.
5. The application automatically calculates:

   * Item total
   * Subtotal
   * Tax
   * Grand total
6. Review the generated invoice.
7. Print or export the invoice as a PDF.

## 💰 Invoice Calculation

The application calculates the invoice total using:

```text
Item Total = Quantity × Unit Price

Subtotal = Sum of all Item Totals

Tax Amount = Subtotal × Tax Rate / 100

Grand Total = Subtotal + Tax Amount
```

### Example

```text
Product        Qty    Price
--------------------------------
Web Design      1     ₹10,000
Hosting         2     ₹2,000

Subtotal:             ₹14,000
Tax (18%):             ₹2,520
--------------------------------
Grand Total:          ₹16,520
```

## 📱 Responsive Design

The application is designed to work across:

* 💻 Desktop
* 💻 Laptop
* 📱 Mobile
* 📱 Tablet

## 🖨️ Print / PDF

The invoice preview can be printed using the browser's print functionality or exported as a PDF when PDF-generation libraries are configured.

## 🔮 Future Enhancements

* Save invoices to Local Storage
* Invoice history
* Edit previously created invoices
* Delete invoices
* Download invoices directly as PDF
* Company logo upload
* Multiple currency support
* Multiple tax types
* Customer database
* Invoice status tracking
* Backend integration
* MongoDB invoice storage
* User authentication

## 📜 Available Scripts

### Start development server

```bash
npm run dev
```

### Build for production

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## 🌐 Deployment

The project can be deployed using platforms such as:

* Vercel
* Netlify
* GitHub Pages

For Vercel:

```bash
npm run build
```

Then connect the GitHub repository to Vercel and deploy.

## 👨‍💻 Author

**Kezia K**

## 📄 License

This project is created for learning and demonstration purposes.
## Deployment Link
                  :https://reactinvoice-ten.vercel.app/

