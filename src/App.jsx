import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router";

import InvoicePage from "./Pages/InvoicePage";
import PreviewPage from "./Pages/PriviewPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Default page */}
        <Route
          path="/"
          element={<Navigate to="/invoice-page" replace />}
        />

        {/* Invoice Editor */}
        <Route
          path="/invoice-page"
          element={<InvoicePage />}
        />

        {/* Invoice Preview */}
        <Route
          path="/invoice-preview"
          element={<PreviewPage />}
        />

      </Routes>
    </BrowserRouter>
  );
};

export default App;