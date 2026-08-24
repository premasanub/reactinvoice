
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { InvoiceProvider } from './Context/InvoiceContext.jsx'

createRoot(document.getElementById('root')).render(
 <InvoiceProvider>
    <App />
 </InvoiceProvider>
)
